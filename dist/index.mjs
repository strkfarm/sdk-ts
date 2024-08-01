// src/modules/pricer.ts
import axios from "axios";

// src/data/tokens.json
var tokens_default = [
  {
    name: "Ether",
    symbol: "ETH",
    address: "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
    decimals: 18,
    pricerKey: "ETH-USDT"
  },
  {
    name: "USD Coin",
    symbol: "USDC",
    address: "0x053c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8",
    decimals: 6,
    pricerKey: "USDC-USDT"
  },
  {
    name: "Wrapped BTC",
    symbol: "WBTC",
    address: "0x03fe2b97c1fd336e750087d68b9b867997fd64a2661ff3ca5a7c771641e8e7ac",
    decimals: 8,
    pricerKey: "WBTC-USDT"
  },
  {
    name: "Tether USD",
    symbol: "USDT",
    address: "0x068f5c6a61780768455de69077e07e89787839bf8166decfbf92b645209c0fb8",
    decimals: 6,
    pricerKey: "USDT-USDT"
  },
  {
    name: "Dai Stablecoin",
    symbol: "DAIv0",
    address: "",
    decimals: 18,
    pricerKey: "DAI-USDT"
  },
  {
    name: "Starknet Wrapped Staked Ether",
    symbol: "wstETH",
    address: "0x042b8f0484674ca266ac5d08e4ac6a3fe65bd3129795def2dca5c34ecc5f96d2",
    decimals: 18,
    pricerKey: "wstETH-USDT"
  },
  {
    name: "Starknet Token",
    symbol: "STRK",
    address: "0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
    decimals: 18,
    pricerKey: "STRK-USDT"
  },
  {
    name: "zkLend Token",
    symbol: "ZEND",
    address: "",
    decimals: 18,
    pricerKey: "ZEND-USDT"
  },
  {
    name: "Dai Stablecoin",
    symbol: "DAI",
    address: "",
    decimals: 18,
    pricerKey: "DAI-USDT"
  }
];

// src/global.ts
var logger = {
  ...console,
  verbose(message) {
    console.log(`[VERBOSE] ${message}`);
  }
};
var FatalError = class extends Error {
  constructor(message, err) {
    super(message);
    logger.error(message);
    if (err)
      logger.error(err.message);
    this.name = "FatalError";
  }
};
var Global = class {
  static fatalError(message, err) {
    logger.error(message);
    console.error(message, err);
    if (err)
      console.error(err);
    process.exit(1);
  }
  static httpError(url, err, message) {
    logger.error(`${url}: ${message}`);
    console.error(err);
  }
  static async getTokens() {
    return tokens_default;
  }
  static assert(condition, message) {
    if (!condition) {
      throw new FatalError(message);
    }
  }
};

// src/modules/pricer.ts
var Pricer = class {
  constructor(config, tokens) {
    this.tokens = [];
    this.prices = {};
    /**
     * TOKENA and TOKENB are the two token names to get price of TokenA in terms of TokenB
     */
    this.PRICE_API = `https://api.coinbase.com/v2/prices/{{PRICER_KEY}}/buy`;
    this.config = config;
    this.tokens = tokens;
  }
  isReady() {
    const allPricesExist = Object.keys(this.prices).length === this.tokens.length;
    if (!allPricesExist) return false;
    let atleastOneStale = false;
    for (let token of this.tokens) {
      const priceInfo = this.prices[token.symbol];
      const isStale = this.isStale(priceInfo.timestamp, token.symbol);
      if (isStale) {
        atleastOneStale = true;
        logger.warn(`Atleast one stale: ${token.symbol}: ${JSON.stringify(this.prices[token.symbol])}`);
        break;
      }
    }
    return allPricesExist && !atleastOneStale;
  }
  waitTillReady() {
    return new Promise((resolve, reject) => {
      const interval = setInterval(() => {
        logger.verbose(`Waiting for pricer to initialise`);
        if (this.isReady()) {
          logger.verbose(`Pricer initialised`);
          clearInterval(interval);
          resolve();
        }
      }, 1e3);
    });
  }
  start() {
    this._loadPrices();
    setInterval(() => {
      this._loadPrices();
    }, 3e4);
  }
  isStale(timestamp, tokenName) {
    const STALE_TIME = 6e4;
    return (/* @__PURE__ */ new Date()).getTime() - timestamp.getTime() > STALE_TIME;
  }
  assertNotStale(timestamp, tokenName) {
    Global.assert(!this.isStale(timestamp, tokenName), `Price of ${tokenName} is stale`);
  }
  async getPrice(tokenName) {
    Global.assert(this.prices[tokenName], `Price of ${tokenName} not found`);
    this.assertNotStale(this.prices[tokenName].timestamp, tokenName);
    return this.prices[tokenName];
  }
  _loadPrices(onUpdate = () => {
  }) {
    this.tokens.forEach(async (token) => {
      const MAX_RETRIES = 10;
      let retry = 0;
      while (retry < MAX_RETRIES) {
        try {
          if (token.symbol === "USDT") {
            this.prices[token.symbol] = {
              price: 1,
              timestamp: /* @__PURE__ */ new Date()
            };
            onUpdate(token.symbol);
            return;
          }
          if (!token.pricerKey) {
            throw new FatalError(`Pricer key not found for ${token.name}`);
          }
          const url = this.PRICE_API.replace("{{PRICER_KEY}}", token.pricerKey);
          const result = await axios.get(url);
          const data = result.data;
          const price = Number(data.data.amount);
          this.prices[token.symbol] = {
            price,
            timestamp: /* @__PURE__ */ new Date()
          };
          onUpdate(token.symbol);
          logger.verbose(`Fetched price of ${token.name} as ${price}`);
          break;
        } catch (error) {
          if (retry < MAX_RETRIES) {
            logger.warn(`Error fetching data from ${token.name}, retry: ${retry}`);
            logger.warn(error);
            retry++;
            await new Promise((resolve) => setTimeout(resolve, retry * 2e3));
          } else {
            throw new FatalError(`Error fetching data from ${token.name}`, error);
          }
        }
      }
    });
    if (this.isReady() && this.config.heartbeatUrl) {
      console.log(`sending beat`);
      axios.get(this.config.heartbeatUrl).catch((err) => {
        console.error("Pricer: Heartbeat err", err);
      });
    }
  }
};

// src/modules/pragma.ts
import { Contract } from "starknet";

// src/data/pragma.abi.json
var pragma_abi_default = [
  {
    data: [
      {
        name: "previousOwner",
        type: "felt"
      },
      {
        name: "newOwner",
        type: "felt"
      }
    ],
    keys: [],
    name: "OwnershipTransferred",
    type: "event"
  },
  {
    data: [
      {
        name: "token",
        type: "felt"
      },
      {
        name: "source",
        type: "felt"
      }
    ],
    keys: [],
    name: "TokenSourceChanged",
    type: "event"
  },
  {
    name: "constructor",
    type: "constructor",
    inputs: [
      {
        name: "owner",
        type: "felt"
      }
    ],
    outputs: []
  },
  {
    name: "get_price",
    type: "function",
    inputs: [
      {
        name: "token",
        type: "felt"
      }
    ],
    outputs: [
      {
        name: "price",
        type: "felt"
      }
    ],
    stateMutability: "view"
  },
  {
    name: "get_price_with_time",
    type: "function",
    inputs: [
      {
        name: "token",
        type: "felt"
      }
    ],
    outputs: [
      {
        name: "price",
        type: "felt"
      },
      {
        name: "update_time",
        type: "felt"
      }
    ],
    stateMutability: "view"
  },
  {
    name: "set_token_source",
    type: "function",
    inputs: [
      {
        name: "token",
        type: "felt"
      },
      {
        name: "source",
        type: "felt"
      }
    ],
    outputs: []
  }
];

// src/modules/pragma.ts
var Pragma = class {
  constructor(provider) {
    this.contractAddr = "0x023fb3afbff2c0e3399f896dcf7400acf1a161941cfb386e34a123f228c62832";
    this.contract = new Contract(pragma_abi_default, this.contractAddr, provider);
  }
  async getPrice(tokenAddr) {
    if (!tokenAddr) {
      throw new Error(`Pragma:getPrice - no token`);
    }
    const result = await this.contract.call("get_price", [tokenAddr]);
    const price = Number(result.price) / 10 ** 8;
    logger.verbose(`Pragma:${tokenAddr}: ${price}`);
    return price;
  }
};

// src/modules/zkLend.ts
import axios2 from "axios";

// src/dataTypes/bignumber.ts
import BigNumber from "bignumber.js";
var Web3Number = class _Web3Number extends BigNumber {
  constructor(value, decimals) {
    super(value);
    this.decimals = decimals;
  }
  static fromWei(weiNumber, decimals) {
    const bn = new _Web3Number(weiNumber, decimals).dividedBy(10 ** decimals);
    return new _Web3Number(bn.toString(), decimals);
  }
  toWei() {
    return this.mul(10 ** this.decimals).toString();
  }
  multipliedBy(value) {
    return new _Web3Number(this.mul(value).toString(), this.decimals);
  }
  dividedBy(value) {
    return new _Web3Number(this.div(value).toString(), this.decimals);
  }
  plus(value) {
    return new _Web3Number(this.add(value).toString(), this.decimals);
  }
  minus(n, base) {
    return new _Web3Number(super.minus(n, base).toString(), this.decimals);
  }
  toString(base) {
    return super.toString(base);
  }
  // [customInspectSymbol](depth: any, inspectOptions: any, inspect: any) {
  // return this.toString();
  // }
};
BigNumber.config({ DECIMAL_PLACES: 18 });
Web3Number.config({ DECIMAL_PLACES: 18 });

// src/interfaces/lending.ts
var MarginType = /* @__PURE__ */ ((MarginType2) => {
  MarginType2["SHARED"] = "shared";
  MarginType2["NONE"] = "none";
  return MarginType2;
})(MarginType || {});
var ILending = class {
  constructor(config, metadata) {
    this.tokens = [];
    this.initialised = false;
    this.metadata = metadata;
    this.config = config;
    this.init();
  }
  /** Wait for initialisation */
  waitForInitilisation() {
    return new Promise((resolve, reject) => {
      const interval = setInterval(() => {
        logger.verbose(`Waiting for ${this.metadata.name} to initialise`);
        if (this.initialised) {
          logger.verbose(`${this.metadata.name} initialised`);
          clearInterval(interval);
          resolve();
        }
      }, 1e3);
    });
  }
};

// src/modules/zkLend.ts
var _ZkLend = class _ZkLend extends ILending {
  constructor(config, pricer) {
    super(config, {
      name: "zkLend",
      logo: "https://app.zklend.com/favicon.ico"
    });
    this.POSITION_URL = "https://app.zklend.com/api/users/{{USER_ADDR}}/all";
    this.pricer = pricer;
  }
  async init() {
    try {
      logger.verbose(`Initialising ${this.metadata.name}`);
      const result = await axios2.get(_ZkLend.POOLS_URL);
      const data = result.data;
      const savedTokens = await Global.getTokens();
      data.forEach((pool) => {
        let collareralFactor = new Web3Number(0, 0);
        if (pool.collateral_factor) {
          collareralFactor = Web3Number.fromWei(pool.collateral_factor.value, pool.collateral_factor.decimals);
        }
        const savedTokenInfo = savedTokens.find((t) => t.symbol == pool.token.symbol);
        const token = {
          name: pool.token.name,
          symbol: pool.token.symbol,
          address: savedTokenInfo?.address || "",
          decimals: pool.token.decimals,
          borrowFactor: Web3Number.fromWei(pool.borrow_factor.value, pool.borrow_factor.decimals),
          collareralFactor
        };
        this.tokens.push(token);
      });
      logger.info(`Initialised ${this.metadata.name} with ${this.tokens.length} tokens`);
      this.initialised = true;
    } catch (error) {
      return Global.httpError(_ZkLend.POOLS_URL, error);
    }
  }
  /**
   * @description Get the health factor of the user for given lending and debt tokens
   * @param lending_tokens 
   * @param debt_tokens 
   * @param user 
   * @returns hf (e.g. returns 1.5 for 150% health factor)
   */
  async get_health_factor_tokenwise(lending_tokens, debt_tokens, user) {
    const positions = await this.getPositions(user);
    logger.verbose(`${this.metadata.name}:: Positions: ${JSON.stringify(positions)}`);
    let effectiveDebt = new Web3Number(0, 6);
    positions.filter((pos) => {
      return debt_tokens.find((t) => t.symbol === pos.tokenSymbol);
    }).forEach((pos) => {
      const token = this.tokens.find((t) => t.symbol === pos.tokenSymbol);
      if (!token) {
        throw new FatalError(`Token ${pos.tokenName} not found in ${this.metadata.name}`);
      }
      effectiveDebt = effectiveDebt.plus(pos.debtUSD.dividedBy(token.borrowFactor.toFixed(6)).toString());
    });
    logger.verbose(`${this.metadata.name}:: Effective debt: ${effectiveDebt}`);
    if (effectiveDebt.isZero()) {
      return Infinity;
    }
    let effectiveCollateral = new Web3Number(0, 6);
    positions.filter((pos) => {
      const exp1 = lending_tokens.find((t) => t.symbol === pos.tokenSymbol);
      const exp2 = pos.marginType === "shared" /* SHARED */;
      return exp1 && exp2;
    }).forEach((pos) => {
      const token = this.tokens.find((t) => t.symbol === pos.tokenSymbol);
      if (!token) {
        throw new FatalError(`Token ${pos.tokenName} not found in ${this.metadata.name}`);
      }
      logger.verbose(`${this.metadata.name}:: Token: ${pos.tokenName}, Collateral factor: ${token.collareralFactor.toFixed(6)}`);
      effectiveCollateral = effectiveCollateral.plus(pos.supplyUSD.multipliedBy(token.collareralFactor.toFixed(6)).toString());
    });
    logger.verbose(`${this.metadata.name}:: Effective collateral: ${effectiveCollateral}`);
    const healthFactor = effectiveCollateral.dividedBy(effectiveDebt.toFixed(6)).toNumber();
    logger.verbose(`${this.metadata.name}:: Health factor: ${healthFactor}`);
    return healthFactor;
  }
  /**
   * @description Get the health factor of the user
   * - Considers all tokens for collateral and debt
   */
  async get_health_factor(user) {
    return this.get_health_factor_tokenwise(this.tokens, this.tokens, user);
  }
  async getPositionsSummary(user) {
    const pos = await this.getPositions(user);
    const collateralUSD = pos.reduce((acc, p) => acc + p.supplyUSD.toNumber(), 0);
    const debtUSD = pos.reduce((acc, p) => acc + p.debtUSD.toNumber(), 0);
    return {
      collateralUSD,
      debtUSD
    };
  }
  /**
   * @description Get the token-wise collateral and debt positions of the user 
   * @param user Contract address of the user
   * @returns Promise<ILendingPosition[]>
   */
  async getPositions(user) {
    const url = this.POSITION_URL.replace("{{USER_ADDR}}", user.address);
    const result = await axios2.get(url);
    const data = result.data;
    const lendingPosition = [];
    logger.verbose(`${this.metadata.name}:: Positions: ${JSON.stringify(data)}`);
    for (let i = 0; i < data.pools.length; i++) {
      const pool = data.pools[i];
      const token = this.tokens.find((t) => {
        return t.symbol === pool.token_symbol;
      });
      if (!token) {
        throw new FatalError(`Token ${pool.token_symbol} not found in ${this.metadata.name}`);
      }
      const debtAmount = Web3Number.fromWei(pool.data.debt_amount, token.decimals);
      const supplyAmount = Web3Number.fromWei(pool.data.supply_amount, token.decimals);
      const price = (await this.pricer.getPrice(token.symbol)).price;
      lendingPosition.push({
        tokenName: token.name,
        tokenSymbol: token.symbol,
        marginType: pool.data.is_collateral ? "shared" /* SHARED */ : "none" /* NONE */,
        debtAmount,
        debtUSD: debtAmount.multipliedBy(price.toFixed(6)),
        supplyAmount,
        supplyUSD: supplyAmount.multipliedBy(price.toFixed(6))
      });
    }
    ;
    return lendingPosition;
  }
};
_ZkLend.POOLS_URL = "https://app.zklend.com/api/pools";
var ZkLend = _ZkLend;

// src/interfaces/common.ts
import { RpcProvider as RpcProvider2 } from "starknet";
var Network = /* @__PURE__ */ ((Network2) => {
  Network2["mainnet"] = "mainnet";
  Network2["sepolia"] = "sepolia";
  Network2["devnet"] = "devnet";
  return Network2;
})(Network || {});
function getMainnetConfig(rpcUrl = "https://starknet-mainnet.public.blastapi.io", blockIdentifier = "pending") {
  return {
    provider: new RpcProvider2({
      nodeUrl: rpcUrl,
      blockIdentifier
    }),
    stage: "production",
    network: "mainnet" /* mainnet */
  };
}

// src/interfaces/initializable.ts
var Initializable = class {
  constructor() {
    this.initialized = false;
  }
  async waitForInitilisation() {
    return new Promise((resolve, reject) => {
      const interval = setInterval(() => {
        if (this.initialized) {
          console.log("Initialised");
          clearInterval(interval);
          resolve();
        }
      }, 1e3);
    });
  }
};

// src/dataTypes/address.ts
import { num } from "starknet";
var ContractAddr = class _ContractAddr {
  constructor(address) {
    this.address = _ContractAddr.standardise(address);
  }
  static from(address) {
    return new _ContractAddr(address);
  }
  eq(other) {
    return this.address === other.address;
  }
  eqString(other) {
    return this.address === _ContractAddr.standardise(other);
  }
  static standardise(address) {
    let _a = address;
    if (!address) {
      _a = "0";
    }
    const a = num.getHexString(num.getDecimalString(_a.toString()));
    return a;
  }
  static eqString(a, b) {
    return _ContractAddr.standardise(a) === _ContractAddr.standardise(b);
  }
};

// src/strategies/autoCompounderStrk.ts
import { Contract as Contract2, uint256 } from "starknet";
var AutoCompounderSTRK = class {
  constructor(config, pricer) {
    this.addr = ContractAddr.from("0x541681b9ad63dff1b35f79c78d8477f64857de29a27902f7298f7b620838ea");
    this.initialized = false;
    this.contract = null;
    this.metadata = {
      decimals: 18,
      underlying: {
        // zSTRK
        address: ContractAddr.from("0x06d8fa671ef84f791b7f601fa79fea8f6ceb70b5fa84189e3159d532162efc21"),
        name: "STRK",
        symbol: "STRK"
      },
      name: "AutoCompounderSTRK"
    };
    this.config = config;
    this.pricer = pricer;
    this.init();
  }
  async init() {
    const cls = await this.config.provider.getClassAt(this.addr.address);
    this.contract = new Contract2(cls.abi, this.addr.address, this.config.provider);
    this.initialized = true;
  }
  async waitForInitilisation() {
    return new Promise((resolve, reject) => {
      const interval = setInterval(() => {
        if (this.initialized) {
          clearInterval(interval);
          resolve();
        }
      }, 1e3);
    });
  }
  /** Returns shares of user */
  async balanceOf(user) {
    const result = await this.contract.balanceOf(user.address);
    return Web3Number.fromWei(result.toString(), this.metadata.decimals);
  }
  /** Returns underlying assets of user */
  async balanceOfUnderlying(user) {
    const balanceShares = await this.balanceOf(user);
    const assets = await this.contract.convert_to_assets(uint256.bnToUint256(balanceShares.toWei()));
    return Web3Number.fromWei(assets.toString(), this.metadata.decimals);
  }
  /** Returns usd value of assets */
  async usdBalanceOfUnderlying(user) {
    const assets = await this.balanceOfUnderlying(user);
    const price = await this.pricer.getPrice(this.metadata.underlying.name);
    const usd = assets.multipliedBy(price.price.toFixed(6));
    return {
      usd,
      assets
    };
  }
};

// src/notifs/telegram.ts
import TelegramBot from "node-telegram-bot-api";
var TelegramNotif = class {
  constructor(token, shouldPoll) {
    this.subscribers = ["6820228303"];
    this.bot = new TelegramBot(token, { polling: shouldPoll });
  }
  // listen to start msgs, register chatId and send registered msg
  activateChatBot() {
  }
  // send a given msg to all registered users
  sendMessage(msg) {
    logger.verbose(`Tg: Sending message: ${msg}`);
    for (let chatId of this.subscribers) {
      this.bot.sendMessage(chatId, msg).catch((err) => {
        logger.error(`Tg: Error sending message: ${err.message}`);
      }).then(() => {
        logger.verbose(`Tg: Message sent to ${chatId}`);
      });
    }
  }
};

// src/utils/store.ts
import fs, { readFileSync, writeFileSync } from "fs";
import { Account } from "starknet";
import * as crypto2 from "crypto";

// src/utils/encrypt.ts
import * as crypto from "crypto";
var PasswordJsonCryptoUtil = class {
  constructor() {
    this.algorithm = "aes-256-gcm";
    this.keyLength = 32;
    // 256 bits
    this.saltLength = 16;
    // 128 bits
    this.ivLength = 12;
    // 96 bits for GCM
    this.tagLength = 16;
    // 128 bits
    this.pbkdf2Iterations = 1e5;
  }
  // Number of iterations for PBKDF2
  deriveKey(password, salt) {
    return crypto.pbkdf2Sync(password, salt, this.pbkdf2Iterations, this.keyLength, "sha256");
  }
  encrypt(data, password) {
    const jsonString = JSON.stringify(data);
    const salt = crypto.randomBytes(this.saltLength);
    const iv = crypto.randomBytes(this.ivLength);
    const key = this.deriveKey(password, salt);
    const cipher = crypto.createCipheriv(this.algorithm, key, iv, { authTagLength: this.tagLength });
    let encrypted = cipher.update(jsonString, "utf8", "hex");
    encrypted += cipher.final("hex");
    const tag = cipher.getAuthTag();
    return Buffer.concat([salt, iv, tag, Buffer.from(encrypted, "hex")]).toString("base64");
  }
  decrypt(encryptedData, password) {
    const data = Buffer.from(encryptedData, "base64");
    const salt = data.subarray(0, this.saltLength);
    const iv = data.subarray(this.saltLength, this.saltLength + this.ivLength);
    const tag = data.subarray(this.saltLength + this.ivLength, this.saltLength + this.ivLength + this.tagLength);
    const encrypted = data.subarray(this.saltLength + this.ivLength + this.tagLength);
    const key = this.deriveKey(password, salt);
    const decipher = crypto.createDecipheriv(this.algorithm, key, iv, { authTagLength: this.tagLength });
    decipher.setAuthTag(tag);
    try {
      let decrypted = decipher.update(encrypted.toString("hex"), "hex", "utf8");
      decrypted += decipher.final("utf8");
      return JSON.parse(decrypted);
    } catch (error) {
      throw new Error("Decryption failed. This could be due to an incorrect password or corrupted data.");
    }
  }
};

// src/utils/store.ts
function getDefaultStoreConfig(network) {
  if (!process.env.HOME) {
    throw new Error("StoreConfig: HOME environment variable not found");
  }
  return {
    SECRET_FILE_FOLDER: `${process.env.HOME}/.starknet-store`,
    NETWORK: network,
    ACCOUNTS_FILE_NAME: "accounts.json",
    PASSWORD: crypto2.randomBytes(16).toString("hex")
  };
}
var Store = class _Store {
  constructor(config, storeConfig) {
    this.encryptor = new PasswordJsonCryptoUtil();
    this.config = config;
    const defaultStoreConfig = getDefaultStoreConfig(config.network);
    if (!storeConfig.PASSWORD) {
      _Store.logPassword(defaultStoreConfig.PASSWORD);
    }
    this.storeConfig = {
      ...defaultStoreConfig,
      ...storeConfig
    };
    _Store.ensureFolder(this.storeConfig.SECRET_FILE_FOLDER);
  }
  static logPassword(password) {
    logger.warn(`\u26A0\uFE0F=========================================\u26A0\uFE0F`);
    logger.warn(`Generated a random password for store`);
    logger.warn(`\u26A0\uFE0F Password: ${password}`);
    logger.warn(`This not stored anywhere, please you backup this password for future use`);
    logger.warn(`\u26A0\uFE0F=========================================\u26A0\uFE0F`);
  }
  getAccount(accountKey) {
    const accounts = this.loadAccounts();
    logger.verbose(`nAccounts loaded for network: ${Object.keys(accounts).length}`);
    const data = accounts[accountKey];
    if (!data) {
      throw new Error(`Account not found: ${accountKey}`);
    }
    logger.verbose(`Account loaded: ${accountKey} from network: ${this.config.network}`);
    logger.verbose(`Address: ${data.address}`);
    return new Account(this.config.provider, data.address, data.pk);
  }
  addAccount(accountKey, address, pk) {
    const allAccounts = this.getAllAccounts();
    if (!allAccounts[this.config.network]) {
      allAccounts[this.config.network] = {};
    }
    allAccounts[this.config.network][accountKey] = {
      address,
      pk
    };
    const encryptedData = this.encryptor.encrypt(allAccounts, this.storeConfig.PASSWORD);
    writeFileSync(this.getAccountFilePath(), encryptedData);
    logger.verbose(`Account added: ${accountKey} to network: ${this.config.network}`);
  }
  getAccountFilePath() {
    const path = `${this.storeConfig.SECRET_FILE_FOLDER}/${this.storeConfig.ACCOUNTS_FILE_NAME}`;
    logger.verbose(`Path: ${path}`);
    return path;
  }
  getAllAccounts() {
    const PATH = this.getAccountFilePath();
    if (!fs.existsSync(PATH)) {
      logger.verbose(`Accounts: files doesnt exist`);
      return {};
    }
    let encryptedData = readFileSync(PATH, {
      encoding: "utf-8"
    });
    let data = this.encryptor.decrypt(encryptedData, this.storeConfig.PASSWORD);
    return data;
  }
  /**
   * @description Load all accounts of the network
   * @returns NetworkAccounts
   */
  loadAccounts() {
    const allData = this.getAllAccounts();
    logger.verbose(`Accounts loaded for network: ${this.config.network}`);
    if (!allData[this.config.network]) {
      allData[this.config.network] = {};
    }
    return allData[this.config.network];
  }
  /**
   * @description List all accountKeys of the network
   * @returns string[]
   */
  listAccounts() {
    return Object.keys(this.loadAccounts());
  }
  static ensureFolder(folder) {
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }
    if (!fs.existsSync(`${folder}`)) {
      throw new Error(`Store folder not found: ${folder}`);
    }
  }
};

// src/node/pricer-redis.ts
import { createClient } from "redis";
var PricerRedis = class extends Pricer {
  constructor(config, tokens) {
    super(config, tokens);
    this.redisClient = null;
  }
  /** Reads prices from Pricer._loadPrices and uses a callback to set prices in redis */
  async startWithRedis(redisUrl) {
    await this.initRedis(redisUrl);
    logger.info(`Starting Pricer with Redis`);
    this._loadPrices(this._setRedisPrices.bind(this));
    setInterval(() => {
      this._loadPrices(this._setRedisPrices.bind(this));
    }, 3e4);
  }
  async initRedis(redisUrl) {
    logger.info(`Initialising Redis Client`);
    this.redisClient = await createClient({
      url: redisUrl
    });
    this.redisClient.on("error", (err) => console.log("Redis Client Error", err)).connect();
    logger.info(`Redis Client Initialised`);
  }
  /** sets current local price in redis */
  _setRedisPrices(tokenSymbol) {
    if (!this.redisClient) {
      throw new FatalError(`Redis client not initialised`);
    }
    this.redisClient.set(`Price:${tokenSymbol}`, JSON.stringify(this.prices[tokenSymbol])).catch((err) => {
      logger.warn(`Error setting price in redis for ${tokenSymbol}`);
    });
  }
  /** Returns price from redis */
  async getPrice(tokenSymbol) {
    const STALE_TIME = 6e4;
    if (!this.redisClient) {
      throw new FatalError(`Redis client not initialised`);
    }
    const data = await this.redisClient.get(`Price:${tokenSymbol}`);
    if (!data) {
      throw new FatalError(`Redis:Price of ${tokenSymbol} not found`);
    }
    logger.verbose(`Redis:Price of ${tokenSymbol} is ${data}`);
    const priceInfo = JSON.parse(data);
    priceInfo.timestamp = new Date(priceInfo.timestamp);
    const isStale = (/* @__PURE__ */ new Date()).getTime() - priceInfo.timestamp.getTime() > STALE_TIME;
    Global.assert(!isStale, `Price of ${tokenSymbol} is stale`);
    return priceInfo;
  }
};
export {
  AutoCompounderSTRK,
  ContractAddr,
  FatalError,
  Global,
  ILending,
  Initializable,
  MarginType,
  Network,
  PasswordJsonCryptoUtil,
  Pragma,
  Pricer,
  PricerRedis,
  Store,
  TelegramNotif,
  Web3Number,
  ZkLend,
  getDefaultStoreConfig,
  getMainnetConfig,
  logger
};
