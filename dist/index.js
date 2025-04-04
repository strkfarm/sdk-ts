"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  AutoCompounderSTRK: () => AutoCompounderSTRK,
  AvnuWrapper: () => AvnuWrapper,
  ContractAddr: () => ContractAddr,
  ERC20: () => ERC20,
  EkuboCLVault: () => EkuboCLVault,
  EkuboCLVaultStrategies: () => EkuboCLVaultStrategies,
  FatalError: () => FatalError,
  FlowChartColors: () => FlowChartColors,
  Global: () => Global,
  ILending: () => ILending,
  Initializable: () => Initializable,
  MarginType: () => MarginType,
  Network: () => Network,
  PasswordJsonCryptoUtil: () => PasswordJsonCryptoUtil,
  Pragma: () => Pragma,
  Pricer: () => Pricer,
  PricerFromApi: () => PricerFromApi,
  PricerRedis: () => PricerRedis,
  RiskType: () => RiskType,
  Store: () => Store,
  TelegramNotif: () => TelegramNotif,
  VesuRebalance: () => VesuRebalance,
  VesuRebalanceStrategies: () => VesuRebalanceStrategies,
  Web3Number: () => Web3Number,
  ZkLend: () => ZkLend,
  assert: () => assert,
  getAPIUsingHeadlessBrowser: () => getAPIUsingHeadlessBrowser,
  getDefaultStoreConfig: () => getDefaultStoreConfig,
  getMainnetConfig: () => getMainnetConfig,
  getNoRiskTags: () => getNoRiskTags,
  getRiskColor: () => getRiskColor,
  getRiskExplaination: () => getRiskExplaination,
  logger: () => logger
});
module.exports = __toCommonJS(src_exports);

// src/modules/pricer.ts
var import_axios2 = __toESM(require("axios"));

// src/global.ts
var import_axios = __toESM(require("axios"));

// src/dataTypes/bignumber.node.ts
var import_util = __toESM(require("util"));

// src/dataTypes/_bignumber.ts
var import_bignumber = __toESM(require("bignumber.js"));
var _Web3Number = class extends import_bignumber.default {
  constructor(value, decimals) {
    super(value);
    this.decimals = decimals;
  }
  toWei() {
    return this.mul(10 ** this.decimals).toFixed(0);
  }
  multipliedBy(value) {
    let _value = Number(value).toFixed(13);
    return this.construct(this.mul(_value).toString(), this.decimals);
  }
  dividedBy(value) {
    let _value = Number(value).toFixed(13);
    return this.construct(this.div(_value).toString(), this.decimals);
  }
  plus(value) {
    const _value = Number(value).toFixed(13);
    return this.construct(this.add(_value).toString(), this.decimals);
  }
  minus(n, base) {
    const _value = Number(n).toFixed(13);
    return this.construct(super.minus(_value, base).toString(), this.decimals);
  }
  construct(value, decimals) {
    return new this.constructor(value, decimals);
  }
  toString(base) {
    return super.toString(base);
  }
  toJSON() {
    return this.toString();
  }
  valueOf() {
    return this.toString();
  }
};
import_bignumber.default.config({ DECIMAL_PLACES: 18 });
_Web3Number.config({ DECIMAL_PLACES: 18 });

// src/dataTypes/bignumber.node.ts
var Web3Number = class _Web3Number2 extends _Web3Number {
  static fromWei(weiNumber, decimals) {
    const bn = new _Web3Number2(weiNumber, decimals).dividedBy(10 ** decimals);
    return new _Web3Number2(bn.toString(), decimals);
  }
  [import_util.default.inspect.custom](depth, opts) {
    return this.toString();
  }
  [Symbol.for("nodejs.util.inspect.custom")](depth, inspectOptions, inspect) {
    return this.toString();
  }
  inspect(depth, opts) {
    return this.toString();
  }
};

// src/dataTypes/address.ts
var import_starknet = require("starknet");
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
    const a = import_starknet.num.getHexString(import_starknet.num.getDecimalString(_a.toString()));
    return a;
  }
  static eqString(a, b) {
    return _ContractAddr.standardise(a) === _ContractAddr.standardise(b);
  }
  toString() {
    return this.address;
  }
};

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
var defaultTokens = [{
  name: "Starknet",
  symbol: "STRK",
  logo: "https://assets.coingecko.com/coins/images/26433/small/starknet.png",
  address: ContractAddr.from("0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d"),
  decimals: 18,
  coingeckId: "starknet"
}, {
  name: "xSTRK",
  symbol: "xSTRK",
  logo: "https://dashboard.endur.fi/endur-fi.svg",
  address: ContractAddr.from("0x028d709c875c0ceac3dce7065bec5328186dc89fe254527084d1689910954b0a"),
  decimals: 18,
  coingeckId: void 0
}, {
  name: "ETH",
  symbol: "ETH",
  logo: "https://opbnb.bscscan.com/token/images/ether.svg",
  address: ContractAddr.from("0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7"),
  decimals: 18,
  coingeckId: void 0
}, {
  name: "USDC",
  symbol: "USDC",
  logo: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
  address: ContractAddr.from("0x53c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8"),
  decimals: 6,
  coingeckId: void 0
}, {
  name: "USDT",
  symbol: "USDT",
  logo: "https://assets.coingecko.com/coins/images/325/small/Tether.png",
  address: ContractAddr.from("0x68f5c6a61780768455de69077e07e89787839bf8166decfbf92b645209c0fb8"),
  decimals: 6,
  coingeckId: void 0
}, {
  name: "WBTC",
  symbol: "WBTC",
  logo: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599/logo.png",
  address: ContractAddr.from("0x3fe2b97c1fd336e750087d68b9b867997fd64a2661ff3ca5a7c771641e8e7ac"),
  decimals: 8,
  coingeckId: void 0
}];
var tokens = defaultTokens;
var Global = class _Global {
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
  static getDefaultTokens() {
    return tokens;
  }
  static async getTokens() {
    if (tokens.length) return tokens;
    const data = await import_axios.default.get("https://starknet.api.avnu.fi/v1/starknet/tokens");
    const tokensData = data.data.content;
    tokensData.forEach((token) => {
      if (!token.tags.includes("AVNU") || !token.tags.includes("Verified")) {
        return;
      }
      tokens.push({
        name: token.name,
        symbol: token.symbol,
        address: ContractAddr.from(token.address),
        decimals: token.decimals,
        logo: token.logoUri,
        coingeckId: token.extensions.coingeckoId
      });
    });
    console.log(tokens);
    return tokens;
  }
  static assert(condition, message) {
    if (!condition) {
      throw new FatalError(message);
    }
  }
  static async getTokenInfoFromAddr(addr) {
    if (tokens.length == defaultTokens.length) {
      await _Global.getTokens();
    }
    const token = tokens.find((token2) => addr.eq(token2.address));
    if (!token) {
      throw new FatalError(`Token not found: ${addr.address}`);
    }
    return token;
  }
};

// src/modules/pricerBase.ts
var PricerBase = class {
  constructor(config, tokens2) {
    this.config = config;
    this.tokens = tokens2;
  }
  async getPrice(tokenSymbol) {
    throw new Error("Method not implemented");
  }
};

// src/modules/pricer.ts
var Pricer = class extends PricerBase {
  // e.g. ETH/USDC
  constructor(config, tokens2) {
    super(config, tokens2);
    this.prices = {};
    // code populates this map during runtime to determine which method to use for a given token
    // The method set will be the first one to try after first attempt
    this.methodToUse = {};
    /**
     * TOKENA and TOKENB are the two token names to get price of TokenA in terms of TokenB
     */
    this.PRICE_API = `https://api.coinbase.com/v2/prices/{{PRICER_KEY}}/buy`;
    this.EKUBO_API = "https://quoter-mainnet-api.ekubo.org/{{AMOUNT}}/{{TOKEN_ADDRESS}}/0x053c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8";
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
  async getPrice(tokenSymbol) {
    Global.assert(this.prices[tokenSymbol], `Price of ${tokenSymbol} not found`);
    this.assertNotStale(this.prices[tokenSymbol].timestamp, tokenSymbol);
    return this.prices[tokenSymbol];
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
          const price = await this._getPrice(token);
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
      import_axios2.default.get(this.config.heartbeatUrl).catch((err) => {
        console.error("Pricer: Heartbeat err", err);
      });
    }
  }
  async _getPrice(token, defaultMethod = "all") {
    const methodToUse = this.methodToUse[token.symbol] || defaultMethod;
    logger.info(`Fetching price of ${token.symbol} using ${methodToUse}`);
    switch (methodToUse) {
      case "Coinbase":
        try {
          const result = await this._getPriceCoinbase(token);
          this.methodToUse[token.symbol] = "Coinbase";
          return result;
        } catch (error) {
          console.warn(`Coinbase: price err: message [${token.symbol}]: `, error.message);
        }
      case "Coinmarketcap":
        try {
          const result = await this._getPriceCoinMarketCap(token);
          this.methodToUse[token.symbol] = "Coinmarketcap";
          return result;
        } catch (error) {
          console.warn(`CoinMarketCap: price err [${token.symbol}]: `, Object.keys(error));
          console.warn(`CoinMarketCap: price err [${token.symbol}]: `, error.message);
        }
      case "Ekubo":
        try {
          const result = await this._getPriceEkubo(token);
          this.methodToUse[token.symbol] = "Ekubo";
          return result;
        } catch (error) {
          console.warn(`Ekubo: price err [${token.symbol}]: `, error.message);
          console.warn(`Ekubo: price err [${token.symbol}]: `, Object.keys(error));
        }
    }
    if (defaultMethod == "all") {
      return await this._getPrice(token, "Coinbase");
    }
    throw new FatalError(`Price not found for ${token.symbol}`);
  }
  async _getPriceCoinbase(token) {
    const url = this.PRICE_API.replace("{{PRICER_KEY}}", `${token.symbol}-USD`);
    const result = await import_axios2.default.get(url);
    const data = result.data;
    return Number(data.data.amount);
  }
  async _getPriceCoinMarketCap(token) {
    throw new Error("Not implemented");
  }
  async _getPriceEkubo(token, amountIn = new Web3Number(1, token.decimals), retry = 0) {
    const url = this.EKUBO_API.replace("{{TOKEN_ADDRESS}}", token.address.toString()).replace("{{AMOUNT}}", amountIn.toWei());
    const result = await import_axios2.default.get(url);
    const data = result.data;
    const outputUSDC = Number(Web3Number.fromWei(data.total_calculated, 6).toFixed(6));
    logger.verbose(`Ekubo: ${token.symbol} -> USDC: ${outputUSDC}, retry: ${retry}`);
    if (outputUSDC === 0 && retry < 3) {
      const amountIn2 = new Web3Number(100, token.decimals);
      return await this._getPriceEkubo(token, amountIn2, retry + 1);
    }
    const usdcPrice = 1;
    logger.verbose(`USDC Price: ${usdcPrice}`);
    return outputUSDC * usdcPrice;
  }
};

// src/modules/pragma.ts
var import_starknet2 = require("starknet");

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
    this.contract = new import_starknet2.Contract(pragma_abi_default, this.contractAddr, provider);
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
var import_axios3 = __toESM(require("axios"));

// src/dataTypes/bignumber.browser.ts
var Web3Number2 = class _Web3Number2 extends _Web3Number {
  static fromWei(weiNumber, decimals) {
    const bn = new _Web3Number2(weiNumber, decimals).dividedBy(10 ** decimals);
    return new _Web3Number2(bn.toString(), decimals);
  }
};

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
      const result = await import_axios3.default.get(_ZkLend.POOLS_URL);
      const data = result.data;
      const savedTokens = await Global.getTokens();
      data.forEach((pool) => {
        let collareralFactor = new Web3Number2(0, 0);
        if (pool.collateral_factor) {
          collareralFactor = Web3Number2.fromWei(pool.collateral_factor.value, pool.collateral_factor.decimals);
        }
        const savedTokenInfo = savedTokens.find((t) => t.symbol == pool.token.symbol);
        const token = {
          name: pool.token.name,
          symbol: pool.token.symbol,
          address: savedTokenInfo?.address || ContractAddr.from(""),
          logo: "",
          decimals: pool.token.decimals,
          borrowFactor: Web3Number2.fromWei(pool.borrow_factor.value, pool.borrow_factor.decimals),
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
    let effectiveDebt = new Web3Number2(0, 6);
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
    let effectiveCollateral = new Web3Number2(0, 6);
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
    const result = await import_axios3.default.get(url);
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
      const debtAmount = Web3Number2.fromWei(pool.data.debt_amount, token.decimals);
      const supplyAmount = Web3Number2.fromWei(pool.data.supply_amount, token.decimals);
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

// src/modules/pricer-from-api.ts
var import_axios4 = __toESM(require("axios"));
var PricerFromApi = class extends PricerBase {
  constructor(config, tokens2) {
    super(config, tokens2);
  }
  async getPrice(tokenSymbol) {
    try {
      return await this.getPriceFromMyAPI(tokenSymbol);
    } catch (e) {
      logger.warn("getPriceFromMyAPI error", e);
    }
    logger.log("getPrice coinbase", tokenSymbol);
    let retry = 0;
    const MAX_RETRIES = 5;
    for (retry = 1; retry < MAX_RETRIES + 1; retry++) {
      try {
        const priceInfo = await import_axios4.default.get(
          `https://api.coinbase.com/v2/prices/${tokenSymbol}-USDT/spot`
        );
        if (!priceInfo) {
          throw new Error("Failed to fetch price");
        }
        const data = await priceInfo.data;
        const price = Number(data.data.amount);
        return {
          price,
          timestamp: /* @__PURE__ */ new Date()
        };
      } catch (e) {
        logger.warn("getPrice coinbase error", e, retry);
        await new Promise((resolve) => setTimeout(resolve, retry * 1e3));
      }
    }
    throw new Error(`Failed to fetch price for ${tokenSymbol}`);
  }
  async getPriceFromMyAPI(tokenSymbol) {
    logger.verbose(`getPrice from redis: ${tokenSymbol}`);
    const endpoint = "https://app.strkfarm.com";
    const url = `${endpoint}/api/price/${tokenSymbol}`;
    const priceInfoRes = await fetch(url);
    const priceInfo = await priceInfoRes.json();
    const now = /* @__PURE__ */ new Date();
    const priceTime = new Date(priceInfo.timestamp);
    if (now.getTime() - priceTime.getTime() > 9e5) {
      throw new Error("Price is stale");
    }
    const price = Number(priceInfo.price);
    return {
      price,
      timestamp: new Date(priceInfo.timestamp)
    };
  }
};

// src/modules/erc20.ts
var import_starknet3 = require("starknet");

// src/data/erc20.abi.json
var erc20_abi_default = [
  {
    name: "LockingContract",
    type: "impl",
    interface_name: "src::mintable_lock_interface::ILockingContract"
  },
  {
    name: "src::mintable_lock_interface::ILockingContract",
    type: "interface",
    items: [
      {
        name: "set_locking_contract",
        type: "function",
        inputs: [
          {
            name: "locking_contract",
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        outputs: [],
        state_mutability: "external"
      },
      {
        name: "get_locking_contract",
        type: "function",
        inputs: [],
        outputs: [
          {
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        state_mutability: "view"
      }
    ]
  },
  {
    name: "LockAndDelegate",
    type: "impl",
    interface_name: "src::mintable_lock_interface::ILockAndDelegate"
  },
  {
    name: "core::integer::u256",
    type: "struct",
    members: [
      {
        name: "low",
        type: "core::integer::u128"
      },
      {
        name: "high",
        type: "core::integer::u128"
      }
    ]
  },
  {
    name: "src::mintable_lock_interface::ILockAndDelegate",
    type: "interface",
    items: [
      {
        name: "lock_and_delegate",
        type: "function",
        inputs: [
          {
            name: "delegatee",
            type: "core::starknet::contract_address::ContractAddress"
          },
          {
            name: "amount",
            type: "core::integer::u256"
          }
        ],
        outputs: [],
        state_mutability: "external"
      },
      {
        name: "lock_and_delegate_by_sig",
        type: "function",
        inputs: [
          {
            name: "account",
            type: "core::starknet::contract_address::ContractAddress"
          },
          {
            name: "delegatee",
            type: "core::starknet::contract_address::ContractAddress"
          },
          {
            name: "amount",
            type: "core::integer::u256"
          },
          {
            name: "nonce",
            type: "core::felt252"
          },
          {
            name: "expiry",
            type: "core::integer::u64"
          },
          {
            name: "signature",
            type: "core::array::Array::<core::felt252>"
          }
        ],
        outputs: [],
        state_mutability: "external"
      }
    ]
  },
  {
    name: "MintableToken",
    type: "impl",
    interface_name: "src::mintable_token_interface::IMintableToken"
  },
  {
    name: "src::mintable_token_interface::IMintableToken",
    type: "interface",
    items: [
      {
        name: "permissioned_mint",
        type: "function",
        inputs: [
          {
            name: "account",
            type: "core::starknet::contract_address::ContractAddress"
          },
          {
            name: "amount",
            type: "core::integer::u256"
          }
        ],
        outputs: [],
        state_mutability: "external"
      },
      {
        name: "permissioned_burn",
        type: "function",
        inputs: [
          {
            name: "account",
            type: "core::starknet::contract_address::ContractAddress"
          },
          {
            name: "amount",
            type: "core::integer::u256"
          }
        ],
        outputs: [],
        state_mutability: "external"
      }
    ]
  },
  {
    name: "MintableTokenCamelImpl",
    type: "impl",
    interface_name: "src::mintable_token_interface::IMintableTokenCamel"
  },
  {
    name: "src::mintable_token_interface::IMintableTokenCamel",
    type: "interface",
    items: [
      {
        name: "permissionedMint",
        type: "function",
        inputs: [
          {
            name: "account",
            type: "core::starknet::contract_address::ContractAddress"
          },
          {
            name: "amount",
            type: "core::integer::u256"
          }
        ],
        outputs: [],
        state_mutability: "external"
      },
      {
        name: "permissionedBurn",
        type: "function",
        inputs: [
          {
            name: "account",
            type: "core::starknet::contract_address::ContractAddress"
          },
          {
            name: "amount",
            type: "core::integer::u256"
          }
        ],
        outputs: [],
        state_mutability: "external"
      }
    ]
  },
  {
    name: "Replaceable",
    type: "impl",
    interface_name: "src::replaceability_interface::IReplaceable"
  },
  {
    name: "core::array::Span::<core::felt252>",
    type: "struct",
    members: [
      {
        name: "snapshot",
        type: "@core::array::Array::<core::felt252>"
      }
    ]
  },
  {
    name: "src::replaceability_interface::EICData",
    type: "struct",
    members: [
      {
        name: "eic_hash",
        type: "core::starknet::class_hash::ClassHash"
      },
      {
        name: "eic_init_data",
        type: "core::array::Span::<core::felt252>"
      }
    ]
  },
  {
    name: "core::option::Option::<src::replaceability_interface::EICData>",
    type: "enum",
    variants: [
      {
        name: "Some",
        type: "src::replaceability_interface::EICData"
      },
      {
        name: "None",
        type: "()"
      }
    ]
  },
  {
    name: "core::bool",
    type: "enum",
    variants: [
      {
        name: "False",
        type: "()"
      },
      {
        name: "True",
        type: "()"
      }
    ]
  },
  {
    name: "src::replaceability_interface::ImplementationData",
    type: "struct",
    members: [
      {
        name: "impl_hash",
        type: "core::starknet::class_hash::ClassHash"
      },
      {
        name: "eic_data",
        type: "core::option::Option::<src::replaceability_interface::EICData>"
      },
      {
        name: "final",
        type: "core::bool"
      }
    ]
  },
  {
    name: "src::replaceability_interface::IReplaceable",
    type: "interface",
    items: [
      {
        name: "get_upgrade_delay",
        type: "function",
        inputs: [],
        outputs: [
          {
            type: "core::integer::u64"
          }
        ],
        state_mutability: "view"
      },
      {
        name: "get_impl_activation_time",
        type: "function",
        inputs: [
          {
            name: "implementation_data",
            type: "src::replaceability_interface::ImplementationData"
          }
        ],
        outputs: [
          {
            type: "core::integer::u64"
          }
        ],
        state_mutability: "view"
      },
      {
        name: "add_new_implementation",
        type: "function",
        inputs: [
          {
            name: "implementation_data",
            type: "src::replaceability_interface::ImplementationData"
          }
        ],
        outputs: [],
        state_mutability: "external"
      },
      {
        name: "remove_implementation",
        type: "function",
        inputs: [
          {
            name: "implementation_data",
            type: "src::replaceability_interface::ImplementationData"
          }
        ],
        outputs: [],
        state_mutability: "external"
      },
      {
        name: "replace_to",
        type: "function",
        inputs: [
          {
            name: "implementation_data",
            type: "src::replaceability_interface::ImplementationData"
          }
        ],
        outputs: [],
        state_mutability: "external"
      }
    ]
  },
  {
    name: "AccessControlImplExternal",
    type: "impl",
    interface_name: "src::access_control_interface::IAccessControl"
  },
  {
    name: "src::access_control_interface::IAccessControl",
    type: "interface",
    items: [
      {
        name: "has_role",
        type: "function",
        inputs: [
          {
            name: "role",
            type: "core::felt252"
          },
          {
            name: "account",
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        outputs: [
          {
            type: "core::bool"
          }
        ],
        state_mutability: "view"
      },
      {
        name: "get_role_admin",
        type: "function",
        inputs: [
          {
            name: "role",
            type: "core::felt252"
          }
        ],
        outputs: [
          {
            type: "core::felt252"
          }
        ],
        state_mutability: "view"
      }
    ]
  },
  {
    name: "RolesImpl",
    type: "impl",
    interface_name: "src::roles_interface::IMinimalRoles"
  },
  {
    name: "src::roles_interface::IMinimalRoles",
    type: "interface",
    items: [
      {
        name: "is_governance_admin",
        type: "function",
        inputs: [
          {
            name: "account",
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        outputs: [
          {
            type: "core::bool"
          }
        ],
        state_mutability: "view"
      },
      {
        name: "is_upgrade_governor",
        type: "function",
        inputs: [
          {
            name: "account",
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        outputs: [
          {
            type: "core::bool"
          }
        ],
        state_mutability: "view"
      },
      {
        name: "register_governance_admin",
        type: "function",
        inputs: [
          {
            name: "account",
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        outputs: [],
        state_mutability: "external"
      },
      {
        name: "remove_governance_admin",
        type: "function",
        inputs: [
          {
            name: "account",
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        outputs: [],
        state_mutability: "external"
      },
      {
        name: "register_upgrade_governor",
        type: "function",
        inputs: [
          {
            name: "account",
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        outputs: [],
        state_mutability: "external"
      },
      {
        name: "remove_upgrade_governor",
        type: "function",
        inputs: [
          {
            name: "account",
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        outputs: [],
        state_mutability: "external"
      },
      {
        name: "renounce",
        type: "function",
        inputs: [
          {
            name: "role",
            type: "core::felt252"
          }
        ],
        outputs: [],
        state_mutability: "external"
      }
    ]
  },
  {
    name: "ERC20Impl",
    type: "impl",
    interface_name: "openzeppelin::token::erc20::interface::IERC20"
  },
  {
    name: "openzeppelin::token::erc20::interface::IERC20",
    type: "interface",
    items: [
      {
        name: "name",
        type: "function",
        inputs: [],
        outputs: [
          {
            type: "core::felt252"
          }
        ],
        state_mutability: "view"
      },
      {
        name: "symbol",
        type: "function",
        inputs: [],
        outputs: [
          {
            type: "core::felt252"
          }
        ],
        state_mutability: "view"
      },
      {
        name: "decimals",
        type: "function",
        inputs: [],
        outputs: [
          {
            type: "core::integer::u8"
          }
        ],
        state_mutability: "view"
      },
      {
        name: "total_supply",
        type: "function",
        inputs: [],
        outputs: [
          {
            type: "core::integer::u256"
          }
        ],
        state_mutability: "view"
      },
      {
        name: "balance_of",
        type: "function",
        inputs: [
          {
            name: "account",
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        outputs: [
          {
            type: "core::integer::u256"
          }
        ],
        state_mutability: "view"
      },
      {
        name: "allowance",
        type: "function",
        inputs: [
          {
            name: "owner",
            type: "core::starknet::contract_address::ContractAddress"
          },
          {
            name: "spender",
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        outputs: [
          {
            type: "core::integer::u256"
          }
        ],
        state_mutability: "view"
      },
      {
        name: "transfer",
        type: "function",
        inputs: [
          {
            name: "recipient",
            type: "core::starknet::contract_address::ContractAddress"
          },
          {
            name: "amount",
            type: "core::integer::u256"
          }
        ],
        outputs: [
          {
            type: "core::bool"
          }
        ],
        state_mutability: "external"
      },
      {
        name: "transfer_from",
        type: "function",
        inputs: [
          {
            name: "sender",
            type: "core::starknet::contract_address::ContractAddress"
          },
          {
            name: "recipient",
            type: "core::starknet::contract_address::ContractAddress"
          },
          {
            name: "amount",
            type: "core::integer::u256"
          }
        ],
        outputs: [
          {
            type: "core::bool"
          }
        ],
        state_mutability: "external"
      },
      {
        name: "approve",
        type: "function",
        inputs: [
          {
            name: "spender",
            type: "core::starknet::contract_address::ContractAddress"
          },
          {
            name: "amount",
            type: "core::integer::u256"
          }
        ],
        outputs: [
          {
            type: "core::bool"
          }
        ],
        state_mutability: "external"
      }
    ]
  },
  {
    name: "ERC20CamelOnlyImpl",
    type: "impl",
    interface_name: "openzeppelin::token::erc20::interface::IERC20CamelOnly"
  },
  {
    name: "openzeppelin::token::erc20::interface::IERC20CamelOnly",
    type: "interface",
    items: [
      {
        name: "totalSupply",
        type: "function",
        inputs: [],
        outputs: [
          {
            type: "core::integer::u256"
          }
        ],
        state_mutability: "view"
      },
      {
        name: "balanceOf",
        type: "function",
        inputs: [
          {
            name: "account",
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        outputs: [
          {
            type: "core::integer::u256"
          }
        ],
        state_mutability: "view"
      },
      {
        name: "transferFrom",
        type: "function",
        inputs: [
          {
            name: "sender",
            type: "core::starknet::contract_address::ContractAddress"
          },
          {
            name: "recipient",
            type: "core::starknet::contract_address::ContractAddress"
          },
          {
            name: "amount",
            type: "core::integer::u256"
          }
        ],
        outputs: [
          {
            type: "core::bool"
          }
        ],
        state_mutability: "external"
      }
    ]
  },
  {
    name: "constructor",
    type: "constructor",
    inputs: [
      {
        name: "name",
        type: "core::felt252"
      },
      {
        name: "symbol",
        type: "core::felt252"
      },
      {
        name: "decimals",
        type: "core::integer::u8"
      },
      {
        name: "initial_supply",
        type: "core::integer::u256"
      },
      {
        name: "recipient",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        name: "permitted_minter",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        name: "provisional_governance_admin",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        name: "upgrade_delay",
        type: "core::integer::u64"
      }
    ]
  },
  {
    name: "increase_allowance",
    type: "function",
    inputs: [
      {
        name: "spender",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        name: "added_value",
        type: "core::integer::u256"
      }
    ],
    outputs: [
      {
        type: "core::bool"
      }
    ],
    state_mutability: "external"
  },
  {
    name: "decrease_allowance",
    type: "function",
    inputs: [
      {
        name: "spender",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        name: "subtracted_value",
        type: "core::integer::u256"
      }
    ],
    outputs: [
      {
        type: "core::bool"
      }
    ],
    state_mutability: "external"
  },
  {
    name: "increaseAllowance",
    type: "function",
    inputs: [
      {
        name: "spender",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        name: "addedValue",
        type: "core::integer::u256"
      }
    ],
    outputs: [
      {
        type: "core::bool"
      }
    ],
    state_mutability: "external"
  },
  {
    name: "decreaseAllowance",
    type: "function",
    inputs: [
      {
        name: "spender",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        name: "subtractedValue",
        type: "core::integer::u256"
      }
    ],
    outputs: [
      {
        type: "core::bool"
      }
    ],
    state_mutability: "external"
  },
  {
    kind: "struct",
    name: "src::strk::erc20_lockable::ERC20Lockable::Transfer",
    type: "event",
    members: [
      {
        kind: "data",
        name: "from",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        kind: "data",
        name: "to",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        kind: "data",
        name: "value",
        type: "core::integer::u256"
      }
    ]
  },
  {
    kind: "struct",
    name: "src::strk::erc20_lockable::ERC20Lockable::Approval",
    type: "event",
    members: [
      {
        kind: "data",
        name: "owner",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        kind: "data",
        name: "spender",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        kind: "data",
        name: "value",
        type: "core::integer::u256"
      }
    ]
  },
  {
    kind: "struct",
    name: "src::replaceability_interface::ImplementationAdded",
    type: "event",
    members: [
      {
        kind: "data",
        name: "implementation_data",
        type: "src::replaceability_interface::ImplementationData"
      }
    ]
  },
  {
    kind: "struct",
    name: "src::replaceability_interface::ImplementationRemoved",
    type: "event",
    members: [
      {
        kind: "data",
        name: "implementation_data",
        type: "src::replaceability_interface::ImplementationData"
      }
    ]
  },
  {
    kind: "struct",
    name: "src::replaceability_interface::ImplementationReplaced",
    type: "event",
    members: [
      {
        kind: "data",
        name: "implementation_data",
        type: "src::replaceability_interface::ImplementationData"
      }
    ]
  },
  {
    kind: "struct",
    name: "src::replaceability_interface::ImplementationFinalized",
    type: "event",
    members: [
      {
        kind: "data",
        name: "impl_hash",
        type: "core::starknet::class_hash::ClassHash"
      }
    ]
  },
  {
    kind: "struct",
    name: "src::access_control_interface::RoleGranted",
    type: "event",
    members: [
      {
        kind: "data",
        name: "role",
        type: "core::felt252"
      },
      {
        kind: "data",
        name: "account",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        kind: "data",
        name: "sender",
        type: "core::starknet::contract_address::ContractAddress"
      }
    ]
  },
  {
    kind: "struct",
    name: "src::access_control_interface::RoleRevoked",
    type: "event",
    members: [
      {
        kind: "data",
        name: "role",
        type: "core::felt252"
      },
      {
        kind: "data",
        name: "account",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        kind: "data",
        name: "sender",
        type: "core::starknet::contract_address::ContractAddress"
      }
    ]
  },
  {
    kind: "struct",
    name: "src::access_control_interface::RoleAdminChanged",
    type: "event",
    members: [
      {
        kind: "data",
        name: "role",
        type: "core::felt252"
      },
      {
        kind: "data",
        name: "previous_admin_role",
        type: "core::felt252"
      },
      {
        kind: "data",
        name: "new_admin_role",
        type: "core::felt252"
      }
    ]
  },
  {
    kind: "struct",
    name: "src::roles_interface::GovernanceAdminAdded",
    type: "event",
    members: [
      {
        kind: "data",
        name: "added_account",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        kind: "data",
        name: "added_by",
        type: "core::starknet::contract_address::ContractAddress"
      }
    ]
  },
  {
    kind: "struct",
    name: "src::roles_interface::GovernanceAdminRemoved",
    type: "event",
    members: [
      {
        kind: "data",
        name: "removed_account",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        kind: "data",
        name: "removed_by",
        type: "core::starknet::contract_address::ContractAddress"
      }
    ]
  },
  {
    kind: "struct",
    name: "src::roles_interface::UpgradeGovernorAdded",
    type: "event",
    members: [
      {
        kind: "data",
        name: "added_account",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        kind: "data",
        name: "added_by",
        type: "core::starknet::contract_address::ContractAddress"
      }
    ]
  },
  {
    kind: "struct",
    name: "src::roles_interface::UpgradeGovernorRemoved",
    type: "event",
    members: [
      {
        kind: "data",
        name: "removed_account",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        kind: "data",
        name: "removed_by",
        type: "core::starknet::contract_address::ContractAddress"
      }
    ]
  },
  {
    kind: "enum",
    name: "src::strk::erc20_lockable::ERC20Lockable::Event",
    type: "event",
    variants: [
      {
        kind: "nested",
        name: "Transfer",
        type: "src::strk::erc20_lockable::ERC20Lockable::Transfer"
      },
      {
        kind: "nested",
        name: "Approval",
        type: "src::strk::erc20_lockable::ERC20Lockable::Approval"
      },
      {
        kind: "nested",
        name: "ImplementationAdded",
        type: "src::replaceability_interface::ImplementationAdded"
      },
      {
        kind: "nested",
        name: "ImplementationRemoved",
        type: "src::replaceability_interface::ImplementationRemoved"
      },
      {
        kind: "nested",
        name: "ImplementationReplaced",
        type: "src::replaceability_interface::ImplementationReplaced"
      },
      {
        kind: "nested",
        name: "ImplementationFinalized",
        type: "src::replaceability_interface::ImplementationFinalized"
      },
      {
        kind: "nested",
        name: "RoleGranted",
        type: "src::access_control_interface::RoleGranted"
      },
      {
        kind: "nested",
        name: "RoleRevoked",
        type: "src::access_control_interface::RoleRevoked"
      },
      {
        kind: "nested",
        name: "RoleAdminChanged",
        type: "src::access_control_interface::RoleAdminChanged"
      },
      {
        kind: "nested",
        name: "GovernanceAdminAdded",
        type: "src::roles_interface::GovernanceAdminAdded"
      },
      {
        kind: "nested",
        name: "GovernanceAdminRemoved",
        type: "src::roles_interface::GovernanceAdminRemoved"
      },
      {
        kind: "nested",
        name: "UpgradeGovernorAdded",
        type: "src::roles_interface::UpgradeGovernorAdded"
      },
      {
        kind: "nested",
        name: "UpgradeGovernorRemoved",
        type: "src::roles_interface::UpgradeGovernorRemoved"
      }
    ]
  }
];

// src/modules/erc20.ts
var ERC20 = class {
  constructor(config) {
    this.config = config;
  }
  contract(addr) {
    const _addr = typeof addr === "string" ? addr : addr.address;
    return new import_starknet3.Contract(erc20_abi_default, _addr, this.config.provider);
  }
  async balanceOf(token, address, tokenDecimals) {
    const contract = this.contract(token);
    const balance = await contract.call("balanceOf", [address.toString()]);
    return Web3Number.fromWei(balance.toString(), tokenDecimals);
  }
};

// src/modules/avnu.ts
var import_starknet4 = require("starknet");
var import_avnu_sdk = require("@avnu/avnu-sdk");

// src/utils/index.ts
function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

// src/modules/avnu.ts
var AvnuWrapper = class {
  async getQuotes(fromToken, toToken, amountWei, taker) {
    const params = {
      sellTokenAddress: fromToken,
      buyTokenAddress: toToken,
      sellAmount: amountWei,
      takerAddress: taker
    };
    assert(fromToken != toToken, "From and to tokens are the same");
    const quotes = await (0, import_avnu_sdk.fetchQuotes)(params);
    assert(quotes.length > 0, "No quotes found");
    return quotes[0];
  }
  async getSwapInfo(quote, taker, integratorFeeBps, integratorFeeRecipient, minAmount) {
    const calldata = await (0, import_avnu_sdk.fetchBuildExecuteTransaction)(quote.quoteId);
    const call = calldata.calls[1];
    const callData = call.calldata;
    const routesLen = Number(callData[11]);
    assert(routesLen > 0, "No routes found");
    let startIndex = 12;
    const routes = [];
    for (let i = 0; i < routesLen; ++i) {
      const swap_params_len = Number(callData[startIndex + 4]);
      const route = {
        token_from: callData[startIndex],
        token_to: callData[startIndex + 1],
        exchange_address: callData[startIndex + 2],
        percent: Number(callData[startIndex + 3]),
        additional_swap_params: swap_params_len > 0 ? callData.slice(startIndex + 5, startIndex + 5 + swap_params_len) : []
      };
      routes.push(route);
      startIndex += 5 + swap_params_len;
    }
    const swapInfo = {
      token_from_address: quote.sellTokenAddress,
      token_from_amount: import_starknet4.uint256.bnToUint256(quote.sellAmount),
      token_to_address: quote.buyTokenAddress,
      token_to_amount: import_starknet4.uint256.bnToUint256(quote.buyAmount),
      token_to_min_amount: import_starknet4.uint256.bnToUint256(minAmount),
      beneficiary: taker,
      integrator_fee_amount_bps: integratorFeeBps,
      integrator_fee_recipient: integratorFeeRecipient,
      routes
    };
    return swapInfo;
  }
};

// src/interfaces/common.ts
var import_starknet5 = require("starknet");
var RiskType = /* @__PURE__ */ ((RiskType2) => {
  RiskType2["MARKET_RISK"] = "Market Risk";
  RiskType2["IMPERMANENT_LOSS"] = "Impermanent Loss Risk";
  RiskType2["LIQUIDATION_RISK"] = "Liquidation Risk";
  RiskType2["LOW_LIQUIDITY_RISK"] = "Low Liquidity Risk";
  RiskType2["SMART_CONTRACT_RISK"] = "Smart Contract Risk";
  RiskType2["ORACLE_RISK"] = "Oracle Risk";
  RiskType2["TECHNICAL_RISK"] = "Technical Risk";
  RiskType2["COUNTERPARTY_RISK"] = "Counterparty Risk";
  return RiskType2;
})(RiskType || {});
var Network = /* @__PURE__ */ ((Network2) => {
  Network2["mainnet"] = "mainnet";
  Network2["sepolia"] = "sepolia";
  Network2["devnet"] = "devnet";
  return Network2;
})(Network || {});
var FlowChartColors = /* @__PURE__ */ ((FlowChartColors2) => {
  FlowChartColors2["Green"] = "purple";
  FlowChartColors2["Blue"] = "#35484f";
  FlowChartColors2["Purple"] = "#6e53dc";
  return FlowChartColors2;
})(FlowChartColors || {});
function getMainnetConfig(rpcUrl = "https://starknet-mainnet.public.blastapi.io", blockIdentifier = "pending") {
  return {
    provider: new import_starknet5.RpcProvider({
      nodeUrl: rpcUrl,
      blockIdentifier
    }),
    stage: "production",
    network: "mainnet" /* mainnet */
  };
}
var getRiskExplaination = (riskType) => {
  switch (riskType) {
    case "Market Risk" /* MARKET_RISK */:
      return "The risk of the market moving against the position.";
    case "Impermanent Loss Risk" /* IMPERMANENT_LOSS */:
      return "The temporary loss of value experienced by liquidity providers in AMMs when asset prices diverge compared to simply holding them.";
    case "Liquidation Risk" /* LIQUIDATION_RISK */:
      return "The risk of losing funds due to the position being liquidated.";
    case "Low Liquidity Risk" /* LOW_LIQUIDITY_RISK */:
      return "The risk of low liquidity in the pool, which can lead to high slippages or reduced in-abilities to quickly exit the position.";
    case "Oracle Risk" /* ORACLE_RISK */:
      return "The risk of the oracle being manipulated or incorrect.";
    case "Smart Contract Risk" /* SMART_CONTRACT_RISK */:
      return "The risk of the smart contract being vulnerable to attacks.";
    case "Technical Risk" /* TECHNICAL_RISK */:
      return "The risk of technical issues e.g. backend failure.";
    case "Counterparty Risk" /* COUNTERPARTY_RISK */:
      return "The risk of the counterparty defaulting e.g. bad debt on lending platforms.";
  }
};
var getRiskColor = (risk) => {
  const value = risk.value;
  if (value === 0) return "green";
  if (value < 2.5) return "yellow";
  return "red";
};
var getNoRiskTags = (risks) => {
  const noRisks1 = risks.filter((risk) => risk.value === 0).map((risk) => risk.type);
  const noRisks2 = Object.values(RiskType).filter((risk) => !risks.map((risk2) => risk2.type).includes(risk));
  const mergedUnique = [.../* @__PURE__ */ new Set([...noRisks1, ...noRisks2])];
  return mergedUnique.map((risk) => `No ${risk}`);
};

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

// src/strategies/autoCompounderStrk.ts
var import_starknet6 = require("starknet");
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
    const provider = this.config.provider;
    const cls = await provider.getClassAt(this.addr.address);
    this.contract = new import_starknet6.Contract(cls.abi, this.addr.address, provider);
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
    const assets = await this.contract.convert_to_assets(import_starknet6.uint256.bnToUint256(balanceShares.toWei()));
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

// src/strategies/vesu-rebalance.ts
var import_starknet7 = require("starknet");

// src/data/vesu-rebalance.abi.json
var vesu_rebalance_abi_default = [
  {
    type: "impl",
    name: "ExternalImpl",
    interface_name: "strkfarm_contracts::strategies::vesu_rebalance::interface::IVesuRebal"
  },
  {
    type: "enum",
    name: "strkfarm_contracts::strategies::vesu_rebalance::interface::Feature",
    variants: [
      {
        name: "DEPOSIT",
        type: "()"
      },
      {
        name: "WITHDRAW",
        type: "()"
      }
    ]
  },
  {
    type: "struct",
    name: "core::integer::u256",
    members: [
      {
        name: "low",
        type: "core::integer::u128"
      },
      {
        name: "high",
        type: "core::integer::u128"
      }
    ]
  },
  {
    type: "struct",
    name: "strkfarm_contracts::strategies::vesu_rebalance::interface::Action",
    members: [
      {
        name: "pool_id",
        type: "core::felt252"
      },
      {
        name: "feature",
        type: "strkfarm_contracts::strategies::vesu_rebalance::interface::Feature"
      },
      {
        name: "token",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        name: "amount",
        type: "core::integer::u256"
      }
    ]
  },
  {
    type: "struct",
    name: "strkfarm_contracts::interfaces::IEkuboDistributor::Claim",
    members: [
      {
        name: "id",
        type: "core::integer::u64"
      },
      {
        name: "claimee",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        name: "amount",
        type: "core::integer::u128"
      }
    ]
  },
  {
    type: "struct",
    name: "core::array::Span::<core::felt252>",
    members: [
      {
        name: "snapshot",
        type: "@core::array::Array::<core::felt252>"
      }
    ]
  },
  {
    type: "struct",
    name: "strkfarm_contracts::components::swap::Route",
    members: [
      {
        name: "token_from",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        name: "token_to",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        name: "exchange_address",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        name: "percent",
        type: "core::integer::u128"
      },
      {
        name: "additional_swap_params",
        type: "core::array::Array::<core::felt252>"
      }
    ]
  },
  {
    type: "struct",
    name: "strkfarm_contracts::components::swap::AvnuMultiRouteSwap",
    members: [
      {
        name: "token_from_address",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        name: "token_from_amount",
        type: "core::integer::u256"
      },
      {
        name: "token_to_address",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        name: "token_to_amount",
        type: "core::integer::u256"
      },
      {
        name: "token_to_min_amount",
        type: "core::integer::u256"
      },
      {
        name: "beneficiary",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        name: "integrator_fee_amount_bps",
        type: "core::integer::u128"
      },
      {
        name: "integrator_fee_recipient",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        name: "routes",
        type: "core::array::Array::<strkfarm_contracts::components::swap::Route>"
      }
    ]
  },
  {
    type: "struct",
    name: "strkfarm_contracts::strategies::vesu_rebalance::interface::Settings",
    members: [
      {
        name: "default_pool_index",
        type: "core::integer::u8"
      },
      {
        name: "fee_bps",
        type: "core::integer::u32"
      },
      {
        name: "fee_receiver",
        type: "core::starknet::contract_address::ContractAddress"
      }
    ]
  },
  {
    type: "struct",
    name: "strkfarm_contracts::strategies::vesu_rebalance::interface::PoolProps",
    members: [
      {
        name: "pool_id",
        type: "core::felt252"
      },
      {
        name: "max_weight",
        type: "core::integer::u32"
      },
      {
        name: "v_token",
        type: "core::starknet::contract_address::ContractAddress"
      }
    ]
  },
  {
    type: "interface",
    name: "strkfarm_contracts::strategies::vesu_rebalance::interface::IVesuRebal",
    items: [
      {
        type: "function",
        name: "rebalance",
        inputs: [
          {
            name: "actions",
            type: "core::array::Array::<strkfarm_contracts::strategies::vesu_rebalance::interface::Action>"
          }
        ],
        outputs: [],
        state_mutability: "external"
      },
      {
        type: "function",
        name: "rebalance_weights",
        inputs: [
          {
            name: "actions",
            type: "core::array::Array::<strkfarm_contracts::strategies::vesu_rebalance::interface::Action>"
          }
        ],
        outputs: [],
        state_mutability: "external"
      },
      {
        type: "function",
        name: "emergency_withdraw",
        inputs: [],
        outputs: [],
        state_mutability: "external"
      },
      {
        type: "function",
        name: "emergency_withdraw_pool",
        inputs: [
          {
            name: "pool_index",
            type: "core::integer::u32"
          }
        ],
        outputs: [],
        state_mutability: "external"
      },
      {
        type: "function",
        name: "compute_yield",
        inputs: [],
        outputs: [
          {
            type: "(core::integer::u256, core::integer::u256)"
          }
        ],
        state_mutability: "view"
      },
      {
        type: "function",
        name: "harvest",
        inputs: [
          {
            name: "rewardsContract",
            type: "core::starknet::contract_address::ContractAddress"
          },
          {
            name: "claim",
            type: "strkfarm_contracts::interfaces::IEkuboDistributor::Claim"
          },
          {
            name: "proof",
            type: "core::array::Span::<core::felt252>"
          },
          {
            name: "swapInfo",
            type: "strkfarm_contracts::components::swap::AvnuMultiRouteSwap"
          }
        ],
        outputs: [],
        state_mutability: "external"
      },
      {
        type: "function",
        name: "set_settings",
        inputs: [
          {
            name: "settings",
            type: "strkfarm_contracts::strategies::vesu_rebalance::interface::Settings"
          }
        ],
        outputs: [],
        state_mutability: "external"
      },
      {
        type: "function",
        name: "set_allowed_pools",
        inputs: [
          {
            name: "pools",
            type: "core::array::Array::<strkfarm_contracts::strategies::vesu_rebalance::interface::PoolProps>"
          }
        ],
        outputs: [],
        state_mutability: "external"
      },
      {
        type: "function",
        name: "set_incentives_off",
        inputs: [],
        outputs: [],
        state_mutability: "external"
      },
      {
        type: "function",
        name: "get_settings",
        inputs: [],
        outputs: [
          {
            type: "strkfarm_contracts::strategies::vesu_rebalance::interface::Settings"
          }
        ],
        state_mutability: "view"
      },
      {
        type: "function",
        name: "get_allowed_pools",
        inputs: [],
        outputs: [
          {
            type: "core::array::Array::<strkfarm_contracts::strategies::vesu_rebalance::interface::PoolProps>"
          }
        ],
        state_mutability: "view"
      },
      {
        type: "function",
        name: "get_previous_index",
        inputs: [],
        outputs: [
          {
            type: "core::integer::u128"
          }
        ],
        state_mutability: "view"
      }
    ]
  },
  {
    type: "impl",
    name: "VesuERC4626Impl",
    interface_name: "strkfarm_contracts::interfaces::IERC4626::IERC4626"
  },
  {
    type: "interface",
    name: "strkfarm_contracts::interfaces::IERC4626::IERC4626",
    items: [
      {
        type: "function",
        name: "asset",
        inputs: [],
        outputs: [
          {
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        state_mutability: "view"
      },
      {
        type: "function",
        name: "total_assets",
        inputs: [],
        outputs: [
          {
            type: "core::integer::u256"
          }
        ],
        state_mutability: "view"
      },
      {
        type: "function",
        name: "convert_to_shares",
        inputs: [
          {
            name: "assets",
            type: "core::integer::u256"
          }
        ],
        outputs: [
          {
            type: "core::integer::u256"
          }
        ],
        state_mutability: "view"
      },
      {
        type: "function",
        name: "convert_to_assets",
        inputs: [
          {
            name: "shares",
            type: "core::integer::u256"
          }
        ],
        outputs: [
          {
            type: "core::integer::u256"
          }
        ],
        state_mutability: "view"
      },
      {
        type: "function",
        name: "max_deposit",
        inputs: [
          {
            name: "receiver",
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        outputs: [
          {
            type: "core::integer::u256"
          }
        ],
        state_mutability: "view"
      },
      {
        type: "function",
        name: "preview_deposit",
        inputs: [
          {
            name: "assets",
            type: "core::integer::u256"
          }
        ],
        outputs: [
          {
            type: "core::integer::u256"
          }
        ],
        state_mutability: "view"
      },
      {
        type: "function",
        name: "deposit",
        inputs: [
          {
            name: "assets",
            type: "core::integer::u256"
          },
          {
            name: "receiver",
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        outputs: [
          {
            type: "core::integer::u256"
          }
        ],
        state_mutability: "external"
      },
      {
        type: "function",
        name: "max_mint",
        inputs: [
          {
            name: "receiver",
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        outputs: [
          {
            type: "core::integer::u256"
          }
        ],
        state_mutability: "view"
      },
      {
        type: "function",
        name: "preview_mint",
        inputs: [
          {
            name: "shares",
            type: "core::integer::u256"
          }
        ],
        outputs: [
          {
            type: "core::integer::u256"
          }
        ],
        state_mutability: "view"
      },
      {
        type: "function",
        name: "mint",
        inputs: [
          {
            name: "shares",
            type: "core::integer::u256"
          },
          {
            name: "receiver",
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        outputs: [
          {
            type: "core::integer::u256"
          }
        ],
        state_mutability: "external"
      },
      {
        type: "function",
        name: "max_withdraw",
        inputs: [
          {
            name: "owner",
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        outputs: [
          {
            type: "core::integer::u256"
          }
        ],
        state_mutability: "view"
      },
      {
        type: "function",
        name: "preview_withdraw",
        inputs: [
          {
            name: "assets",
            type: "core::integer::u256"
          }
        ],
        outputs: [
          {
            type: "core::integer::u256"
          }
        ],
        state_mutability: "view"
      },
      {
        type: "function",
        name: "withdraw",
        inputs: [
          {
            name: "assets",
            type: "core::integer::u256"
          },
          {
            name: "receiver",
            type: "core::starknet::contract_address::ContractAddress"
          },
          {
            name: "owner",
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        outputs: [
          {
            type: "core::integer::u256"
          }
        ],
        state_mutability: "external"
      },
      {
        type: "function",
        name: "max_redeem",
        inputs: [
          {
            name: "owner",
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        outputs: [
          {
            type: "core::integer::u256"
          }
        ],
        state_mutability: "view"
      },
      {
        type: "function",
        name: "preview_redeem",
        inputs: [
          {
            name: "shares",
            type: "core::integer::u256"
          }
        ],
        outputs: [
          {
            type: "core::integer::u256"
          }
        ],
        state_mutability: "view"
      },
      {
        type: "function",
        name: "redeem",
        inputs: [
          {
            name: "shares",
            type: "core::integer::u256"
          },
          {
            name: "receiver",
            type: "core::starknet::contract_address::ContractAddress"
          },
          {
            name: "owner",
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        outputs: [
          {
            type: "core::integer::u256"
          }
        ],
        state_mutability: "external"
      }
    ]
  },
  {
    type: "impl",
    name: "VesuERC20Impl",
    interface_name: "openzeppelin_token::erc20::interface::IERC20Mixin"
  },
  {
    type: "enum",
    name: "core::bool",
    variants: [
      {
        name: "False",
        type: "()"
      },
      {
        name: "True",
        type: "()"
      }
    ]
  },
  {
    type: "struct",
    name: "core::byte_array::ByteArray",
    members: [
      {
        name: "data",
        type: "core::array::Array::<core::bytes_31::bytes31>"
      },
      {
        name: "pending_word",
        type: "core::felt252"
      },
      {
        name: "pending_word_len",
        type: "core::integer::u32"
      }
    ]
  },
  {
    type: "interface",
    name: "openzeppelin_token::erc20::interface::IERC20Mixin",
    items: [
      {
        type: "function",
        name: "total_supply",
        inputs: [],
        outputs: [
          {
            type: "core::integer::u256"
          }
        ],
        state_mutability: "view"
      },
      {
        type: "function",
        name: "balance_of",
        inputs: [
          {
            name: "account",
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        outputs: [
          {
            type: "core::integer::u256"
          }
        ],
        state_mutability: "view"
      },
      {
        type: "function",
        name: "allowance",
        inputs: [
          {
            name: "owner",
            type: "core::starknet::contract_address::ContractAddress"
          },
          {
            name: "spender",
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        outputs: [
          {
            type: "core::integer::u256"
          }
        ],
        state_mutability: "view"
      },
      {
        type: "function",
        name: "transfer",
        inputs: [
          {
            name: "recipient",
            type: "core::starknet::contract_address::ContractAddress"
          },
          {
            name: "amount",
            type: "core::integer::u256"
          }
        ],
        outputs: [
          {
            type: "core::bool"
          }
        ],
        state_mutability: "external"
      },
      {
        type: "function",
        name: "transfer_from",
        inputs: [
          {
            name: "sender",
            type: "core::starknet::contract_address::ContractAddress"
          },
          {
            name: "recipient",
            type: "core::starknet::contract_address::ContractAddress"
          },
          {
            name: "amount",
            type: "core::integer::u256"
          }
        ],
        outputs: [
          {
            type: "core::bool"
          }
        ],
        state_mutability: "external"
      },
      {
        type: "function",
        name: "approve",
        inputs: [
          {
            name: "spender",
            type: "core::starknet::contract_address::ContractAddress"
          },
          {
            name: "amount",
            type: "core::integer::u256"
          }
        ],
        outputs: [
          {
            type: "core::bool"
          }
        ],
        state_mutability: "external"
      },
      {
        type: "function",
        name: "name",
        inputs: [],
        outputs: [
          {
            type: "core::byte_array::ByteArray"
          }
        ],
        state_mutability: "view"
      },
      {
        type: "function",
        name: "symbol",
        inputs: [],
        outputs: [
          {
            type: "core::byte_array::ByteArray"
          }
        ],
        state_mutability: "view"
      },
      {
        type: "function",
        name: "decimals",
        inputs: [],
        outputs: [
          {
            type: "core::integer::u8"
          }
        ],
        state_mutability: "view"
      },
      {
        type: "function",
        name: "totalSupply",
        inputs: [],
        outputs: [
          {
            type: "core::integer::u256"
          }
        ],
        state_mutability: "view"
      },
      {
        type: "function",
        name: "balanceOf",
        inputs: [
          {
            name: "account",
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        outputs: [
          {
            type: "core::integer::u256"
          }
        ],
        state_mutability: "view"
      },
      {
        type: "function",
        name: "transferFrom",
        inputs: [
          {
            name: "sender",
            type: "core::starknet::contract_address::ContractAddress"
          },
          {
            name: "recipient",
            type: "core::starknet::contract_address::ContractAddress"
          },
          {
            name: "amount",
            type: "core::integer::u256"
          }
        ],
        outputs: [
          {
            type: "core::bool"
          }
        ],
        state_mutability: "external"
      }
    ]
  },
  {
    type: "impl",
    name: "CommonCompImpl",
    interface_name: "strkfarm_contracts::interfaces::common::ICommon"
  },
  {
    type: "interface",
    name: "strkfarm_contracts::interfaces::common::ICommon",
    items: [
      {
        type: "function",
        name: "upgrade",
        inputs: [
          {
            name: "new_class",
            type: "core::starknet::class_hash::ClassHash"
          }
        ],
        outputs: [],
        state_mutability: "external"
      },
      {
        type: "function",
        name: "pause",
        inputs: [],
        outputs: [],
        state_mutability: "external"
      },
      {
        type: "function",
        name: "unpause",
        inputs: [],
        outputs: [],
        state_mutability: "external"
      },
      {
        type: "function",
        name: "is_paused",
        inputs: [],
        outputs: [
          {
            type: "core::bool"
          }
        ],
        state_mutability: "view"
      }
    ]
  },
  {
    type: "impl",
    name: "RewardShareImpl",
    interface_name: "strkfarm_contracts::components::harvester::reward_shares::IRewardShare"
  },
  {
    type: "struct",
    name: "strkfarm_contracts::components::harvester::reward_shares::UserRewardsInfo",
    members: [
      {
        name: "pending_round_points",
        type: "core::integer::u128"
      },
      {
        name: "shares_owned",
        type: "core::integer::u128"
      },
      {
        name: "block_number",
        type: "core::integer::u64"
      },
      {
        name: "index",
        type: "core::integer::u32"
      }
    ]
  },
  {
    type: "struct",
    name: "strkfarm_contracts::components::harvester::reward_shares::RewardsInfo",
    members: [
      {
        name: "amount",
        type: "core::integer::u128"
      },
      {
        name: "shares",
        type: "core::integer::u128"
      },
      {
        name: "total_round_points",
        type: "core::integer::u128"
      },
      {
        name: "block_number",
        type: "core::integer::u64"
      }
    ]
  },
  {
    type: "interface",
    name: "strkfarm_contracts::components::harvester::reward_shares::IRewardShare",
    items: [
      {
        type: "function",
        name: "get_user_reward_info",
        inputs: [
          {
            name: "user",
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        outputs: [
          {
            type: "strkfarm_contracts::components::harvester::reward_shares::UserRewardsInfo"
          }
        ],
        state_mutability: "view"
      },
      {
        type: "function",
        name: "get_rewards_info",
        inputs: [
          {
            name: "index",
            type: "core::integer::u32"
          }
        ],
        outputs: [
          {
            type: "strkfarm_contracts::components::harvester::reward_shares::RewardsInfo"
          }
        ],
        state_mutability: "view"
      },
      {
        type: "function",
        name: "get_total_rewards",
        inputs: [],
        outputs: [
          {
            type: "core::integer::u32"
          }
        ],
        state_mutability: "view"
      },
      {
        type: "function",
        name: "get_total_unminted_shares",
        inputs: [],
        outputs: [
          {
            type: "core::integer::u128"
          }
        ],
        state_mutability: "view"
      },
      {
        type: "function",
        name: "get_additional_shares",
        inputs: [
          {
            name: "user",
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        outputs: [
          {
            type: "(core::integer::u128, core::integer::u64, core::integer::u128)"
          }
        ],
        state_mutability: "view"
      }
    ]
  },
  {
    type: "struct",
    name: "strkfarm_contracts::interfaces::IVesu::IStonDispatcher",
    members: [
      {
        name: "contract_address",
        type: "core::starknet::contract_address::ContractAddress"
      }
    ]
  },
  {
    type: "struct",
    name: "strkfarm_contracts::components::vesu::vesuStruct",
    members: [
      {
        name: "singleton",
        type: "strkfarm_contracts::interfaces::IVesu::IStonDispatcher"
      },
      {
        name: "pool_id",
        type: "core::felt252"
      },
      {
        name: "debt",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        name: "col",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        name: "oracle",
        type: "core::starknet::contract_address::ContractAddress"
      }
    ]
  },
  {
    type: "constructor",
    name: "constructor",
    inputs: [
      {
        name: "asset",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        name: "access_control",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        name: "allowed_pools",
        type: "core::array::Array::<strkfarm_contracts::strategies::vesu_rebalance::interface::PoolProps>"
      },
      {
        name: "settings",
        type: "strkfarm_contracts::strategies::vesu_rebalance::interface::Settings"
      },
      {
        name: "vesu_settings",
        type: "strkfarm_contracts::components::vesu::vesuStruct"
      }
    ]
  },
  {
    type: "event",
    name: "openzeppelin_security::reentrancyguard::ReentrancyGuardComponent::Event",
    kind: "enum",
    variants: []
  },
  {
    type: "event",
    name: "strkfarm_contracts::components::erc4626::ERC4626Component::Deposit",
    kind: "struct",
    members: [
      {
        name: "sender",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "key"
      },
      {
        name: "owner",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "key"
      },
      {
        name: "assets",
        type: "core::integer::u256",
        kind: "data"
      },
      {
        name: "shares",
        type: "core::integer::u256",
        kind: "data"
      }
    ]
  },
  {
    type: "event",
    name: "strkfarm_contracts::components::erc4626::ERC4626Component::Withdraw",
    kind: "struct",
    members: [
      {
        name: "sender",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "key"
      },
      {
        name: "receiver",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "key"
      },
      {
        name: "owner",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "key"
      },
      {
        name: "assets",
        type: "core::integer::u256",
        kind: "data"
      },
      {
        name: "shares",
        type: "core::integer::u256",
        kind: "data"
      }
    ]
  },
  {
    type: "event",
    name: "strkfarm_contracts::components::erc4626::ERC4626Component::Event",
    kind: "enum",
    variants: [
      {
        name: "Deposit",
        type: "strkfarm_contracts::components::erc4626::ERC4626Component::Deposit",
        kind: "nested"
      },
      {
        name: "Withdraw",
        type: "strkfarm_contracts::components::erc4626::ERC4626Component::Withdraw",
        kind: "nested"
      }
    ]
  },
  {
    type: "event",
    name: "strkfarm_contracts::components::harvester::reward_shares::RewardShareComponent::Rewards",
    kind: "struct",
    members: [
      {
        name: "index",
        type: "core::integer::u32",
        kind: "data"
      },
      {
        name: "info",
        type: "strkfarm_contracts::components::harvester::reward_shares::RewardsInfo",
        kind: "data"
      },
      {
        name: "total_reward_shares",
        type: "core::integer::u128",
        kind: "data"
      },
      {
        name: "timestamp",
        type: "core::integer::u64",
        kind: "data"
      }
    ]
  },
  {
    type: "event",
    name: "strkfarm_contracts::components::harvester::reward_shares::RewardShareComponent::UserRewards",
    kind: "struct",
    members: [
      {
        name: "user",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "key"
      },
      {
        name: "info",
        type: "strkfarm_contracts::components::harvester::reward_shares::UserRewardsInfo",
        kind: "data"
      },
      {
        name: "total_reward_shares",
        type: "core::integer::u128",
        kind: "data"
      },
      {
        name: "timestamp",
        type: "core::integer::u64",
        kind: "data"
      }
    ]
  },
  {
    type: "event",
    name: "strkfarm_contracts::components::harvester::reward_shares::RewardShareComponent::Event",
    kind: "enum",
    variants: [
      {
        name: "Rewards",
        type: "strkfarm_contracts::components::harvester::reward_shares::RewardShareComponent::Rewards",
        kind: "nested"
      },
      {
        name: "UserRewards",
        type: "strkfarm_contracts::components::harvester::reward_shares::RewardShareComponent::UserRewards",
        kind: "nested"
      }
    ]
  },
  {
    type: "event",
    name: "openzeppelin_token::erc20::erc20::ERC20Component::Transfer",
    kind: "struct",
    members: [
      {
        name: "from",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "key"
      },
      {
        name: "to",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "key"
      },
      {
        name: "value",
        type: "core::integer::u256",
        kind: "data"
      }
    ]
  },
  {
    type: "event",
    name: "openzeppelin_token::erc20::erc20::ERC20Component::Approval",
    kind: "struct",
    members: [
      {
        name: "owner",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "key"
      },
      {
        name: "spender",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "key"
      },
      {
        name: "value",
        type: "core::integer::u256",
        kind: "data"
      }
    ]
  },
  {
    type: "event",
    name: "openzeppelin_token::erc20::erc20::ERC20Component::Event",
    kind: "enum",
    variants: [
      {
        name: "Transfer",
        type: "openzeppelin_token::erc20::erc20::ERC20Component::Transfer",
        kind: "nested"
      },
      {
        name: "Approval",
        type: "openzeppelin_token::erc20::erc20::ERC20Component::Approval",
        kind: "nested"
      }
    ]
  },
  {
    type: "event",
    name: "openzeppelin_introspection::src5::SRC5Component::Event",
    kind: "enum",
    variants: []
  },
  {
    type: "event",
    name: "openzeppelin_upgrades::upgradeable::UpgradeableComponent::Upgraded",
    kind: "struct",
    members: [
      {
        name: "class_hash",
        type: "core::starknet::class_hash::ClassHash",
        kind: "data"
      }
    ]
  },
  {
    type: "event",
    name: "openzeppelin_upgrades::upgradeable::UpgradeableComponent::Event",
    kind: "enum",
    variants: [
      {
        name: "Upgraded",
        type: "openzeppelin_upgrades::upgradeable::UpgradeableComponent::Upgraded",
        kind: "nested"
      }
    ]
  },
  {
    type: "event",
    name: "openzeppelin_security::pausable::PausableComponent::Paused",
    kind: "struct",
    members: [
      {
        name: "account",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data"
      }
    ]
  },
  {
    type: "event",
    name: "openzeppelin_security::pausable::PausableComponent::Unpaused",
    kind: "struct",
    members: [
      {
        name: "account",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data"
      }
    ]
  },
  {
    type: "event",
    name: "openzeppelin_security::pausable::PausableComponent::Event",
    kind: "enum",
    variants: [
      {
        name: "Paused",
        type: "openzeppelin_security::pausable::PausableComponent::Paused",
        kind: "nested"
      },
      {
        name: "Unpaused",
        type: "openzeppelin_security::pausable::PausableComponent::Unpaused",
        kind: "nested"
      }
    ]
  },
  {
    type: "event",
    name: "strkfarm_contracts::components::common::CommonComp::Event",
    kind: "enum",
    variants: []
  },
  {
    type: "event",
    name: "strkfarm_contracts::strategies::vesu_rebalance::vesu_rebalance::VesuRebalance::Rebalance",
    kind: "struct",
    members: [
      {
        name: "yield_before",
        type: "core::integer::u128",
        kind: "data"
      },
      {
        name: "yield_after",
        type: "core::integer::u128",
        kind: "data"
      }
    ]
  },
  {
    type: "event",
    name: "strkfarm_contracts::strategies::vesu_rebalance::vesu_rebalance::VesuRebalance::CollectFees",
    kind: "struct",
    members: [
      {
        name: "fee_collected",
        type: "core::integer::u128",
        kind: "data"
      },
      {
        name: "fee_collector",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data"
      }
    ]
  },
  {
    type: "event",
    name: "strkfarm_contracts::strategies::vesu_rebalance::vesu_rebalance::VesuRebalance::Event",
    kind: "enum",
    variants: [
      {
        name: "ReentrancyGuardEvent",
        type: "openzeppelin_security::reentrancyguard::ReentrancyGuardComponent::Event",
        kind: "flat"
      },
      {
        name: "ERC4626Event",
        type: "strkfarm_contracts::components::erc4626::ERC4626Component::Event",
        kind: "flat"
      },
      {
        name: "RewardShareEvent",
        type: "strkfarm_contracts::components::harvester::reward_shares::RewardShareComponent::Event",
        kind: "flat"
      },
      {
        name: "ERC20Event",
        type: "openzeppelin_token::erc20::erc20::ERC20Component::Event",
        kind: "flat"
      },
      {
        name: "SRC5Event",
        type: "openzeppelin_introspection::src5::SRC5Component::Event",
        kind: "flat"
      },
      {
        name: "UpgradeableEvent",
        type: "openzeppelin_upgrades::upgradeable::UpgradeableComponent::Event",
        kind: "flat"
      },
      {
        name: "PausableEvent",
        type: "openzeppelin_security::pausable::PausableComponent::Event",
        kind: "flat"
      },
      {
        name: "CommonCompEvent",
        type: "strkfarm_contracts::components::common::CommonComp::Event",
        kind: "flat"
      },
      {
        name: "Rebalance",
        type: "strkfarm_contracts::strategies::vesu_rebalance::vesu_rebalance::VesuRebalance::Rebalance",
        kind: "nested"
      },
      {
        name: "CollectFees",
        type: "strkfarm_contracts::strategies::vesu_rebalance::vesu_rebalance::VesuRebalance::CollectFees",
        kind: "nested"
      }
    ]
  }
];

// src/strategies/base-strategy.ts
var BaseStrategy = class {
  constructor(config) {
    this.config = config;
  }
  async getUserTVL(user) {
    throw new Error("Not implemented");
  }
  async getTVL() {
    throw new Error("Not implemented");
  }
  depositCall(amountInfo, receiver) {
    throw new Error("Not implemented");
  }
  withdrawCall(amountInfo, receiver, owner) {
    throw new Error("Not implemented");
  }
};

// src/node/headless.browser.ts
var import_axios5 = __toESM(require("axios"));
async function getAPIUsingHeadlessBrowser(url) {
  const res = await import_axios5.default.get(url);
  return res.data;
}

// src/strategies/vesu-rebalance.ts
var VesuRebalance = class _VesuRebalance extends BaseStrategy {
  // 10000 bps = 100%
  /**
   * Creates a new VesuRebalance strategy instance.
   * @param config - Configuration object containing provider and other settings
   * @param pricer - Pricer instance for token price calculations
   * @param metadata - Strategy metadata including deposit tokens and address
   * @throws {Error} If more than one deposit token is specified
   */
  constructor(config, pricer, metadata) {
    super(config);
    this.BASE_WEIGHT = 1e4;
    this.pricer = pricer;
    assert(metadata.depositTokens.length === 1, "VesuRebalance only supports 1 deposit token");
    this.metadata = metadata;
    this.address = metadata.address;
    this.contract = new import_starknet7.Contract(vesu_rebalance_abi_default, this.address.address, this.config.provider);
  }
  /**
   * Creates a deposit call to the strategy contract.
   * @param assets - Amount of assets to deposit
   * @param receiver - Address that will receive the strategy tokens
   * @returns Populated contract call for deposit
   */
  depositCall(amountInfo, receiver) {
    assert(amountInfo.tokenInfo.address.eq(this.asset().address), "Deposit token mismatch");
    const assetContract = new import_starknet7.Contract(vesu_rebalance_abi_default, this.asset().address.address, this.config.provider);
    const call1 = assetContract.populate("approve", [this.address.address, import_starknet7.uint256.bnToUint256(amountInfo.amount.toWei())]);
    const call2 = this.contract.populate("deposit", [import_starknet7.uint256.bnToUint256(amountInfo.amount.toWei()), receiver.address]);
    return [call1, call2];
  }
  /**
   * Creates a withdrawal call to the strategy contract.
   * @param assets - Amount of assets to withdraw
   * @param receiver - Address that will receive the withdrawn assets
   * @param owner - Address that owns the strategy tokens
   * @returns Populated contract call for withdrawal
   */
  withdrawCall(amountInfo, receiver, owner) {
    return [this.contract.populate("withdraw", [import_starknet7.uint256.bnToUint256(amountInfo.amount.toWei()), receiver.address, owner.address])];
  }
  /**
   * Returns the underlying asset token of the strategy.
   * @returns The deposit token supported by this strategy
   */
  asset() {
    return this.metadata.depositTokens[0];
  }
  /**
   * Returns the number of decimals used by the strategy token.
   * @returns Number of decimals (same as the underlying token)
   */
  decimals() {
    return this.metadata.depositTokens[0].decimals;
  }
  /**
   * Calculates the Total Value Locked (TVL) for a specific user.
   * @param user - Address of the user
   * @returns Object containing the amount in token units and USD value
   */
  async getUserTVL(user) {
    const shares = await this.contract.balanceOf(user.address);
    const assets = await this.contract.convert_to_assets(import_starknet7.uint256.bnToUint256(shares));
    const amount = Web3Number.fromWei(assets.toString(), this.metadata.depositTokens[0].decimals);
    let price = await this.pricer.getPrice(this.metadata.depositTokens[0].symbol);
    const usdValue = Number(amount.toFixed(6)) * price.price;
    return {
      tokenInfo: this.asset(),
      amount,
      usdValue
    };
  }
  /**
   * Calculates the total TVL of the strategy.
   * @returns Object containing the total amount in token units and USD value
   */
  async getTVL() {
    const assets = await this.contract.total_assets();
    const amount = Web3Number.fromWei(assets.toString(), this.metadata.depositTokens[0].decimals);
    let price = await this.pricer.getPrice(this.metadata.depositTokens[0].symbol);
    const usdValue = Number(amount.toFixed(6)) * price.price;
    return {
      tokenInfo: this.asset(),
      amount,
      usdValue
    };
  }
  static async getAllPossibleVerifiedPools(asset) {
    const data = await getAPIUsingHeadlessBrowser("https://api.vesu.xyz/pools");
    const verifiedPools = data.data.filter((d) => d.isVerified);
    const pools = verifiedPools.map((p) => {
      const hasMyAsset = p.assets.find((a) => asset.eqString(a.address));
      if (hasMyAsset) {
        return {
          pool_id: ContractAddr.from(p.id),
          max_weight: 1e4,
          v_token: ContractAddr.from(hasMyAsset.vToken.address),
          name: p.name
        };
      }
      return null;
    }).filter((p) => p !== null);
    return pools;
  }
  /**
   * Retrieves the list of allowed pools and their detailed information from multiple sources:
   * 1. Contract's allowed pools
   * 2. Vesu positions API for current positions
   * 3. Vesu pools API for APY and utilization data
   * 
   * @returns {Promise<{
   *   data: Array<PoolInfoFull>,
   *   isErrorPositionsAPI: boolean
   * }>} Object containing:
   *   - data: Array of pool information including IDs, weights, amounts, APYs and utilization
   *   - isErrorPositionsAPI: Boolean indicating if there was an error fetching position data
   */
  async getPools() {
    const allowedPools = (await this.contract.get_allowed_pools()).map((p) => ({
      pool_id: ContractAddr.from(p.pool_id),
      max_weight: Number(p.max_weight) / this.BASE_WEIGHT,
      v_token: ContractAddr.from(p.v_token)
    }));
    let isErrorPositionsAPI = false;
    let vesuPositions = [];
    try {
      const data2 = await getAPIUsingHeadlessBrowser(`https://api.vesu.xyz/positions?walletAddress=${this.address.address}`);
      vesuPositions = data2.data;
    } catch (e) {
      console.error(`${_VesuRebalance.name}: Error fetching positions for ${this.address.address}`, e);
      isErrorPositionsAPI = true;
    }
    let isErrorPoolsAPI = false;
    let pools = [];
    try {
      const data2 = await getAPIUsingHeadlessBrowser("https://api.vesu.xyz/pools");
      pools = data2.data;
    } catch (e) {
      console.error(`${_VesuRebalance.name}: Error fetching pools for ${this.address.address}`, e);
      isErrorPoolsAPI = true;
    }
    const totalAssets = (await this.getTVL()).amount;
    const info = allowedPools.map(async (p) => {
      const vesuPosition = vesuPositions.find((d) => d.pool.id.toString() === import_starknet7.num.getDecimalString(p.pool_id.address.toString()));
      const pool = pools.find((d) => d.id == import_starknet7.num.getDecimalString(p.pool_id.address));
      const assetInfo = pool?.assets.find((d) => this.asset().address.eqString(d.address));
      let vTokenContract = new import_starknet7.Contract(vesu_rebalance_abi_default, p.v_token.address, this.config.provider);
      const bal = await vTokenContract.balanceOf(this.address.address);
      const assets = await vTokenContract.convert_to_assets(import_starknet7.uint256.bnToUint256(bal.toString()));
      const item = {
        pool_id: p.pool_id,
        pool_name: pool.name,
        max_weight: p.max_weight,
        current_weight: isErrorPositionsAPI || !vesuPosition ? 0 : Number(Web3Number.fromWei(vesuPosition.collateral.value, this.decimals()).dividedBy(totalAssets.toString()).toFixed(6)),
        v_token: p.v_token,
        amount: Web3Number.fromWei(assets.toString(), this.decimals()),
        usdValue: isErrorPositionsAPI || !vesuPosition ? Web3Number.fromWei("0", this.decimals()) : Web3Number.fromWei(vesuPosition.collateral.usdPrice.value, vesuPosition.collateral.usdPrice.decimals),
        APY: isErrorPoolsAPI || !assetInfo ? {
          baseApy: 0,
          defiSpringApy: 0,
          netApy: 0
        } : {
          baseApy: Number(Web3Number.fromWei(assetInfo.stats.supplyApy.value, assetInfo.stats.supplyApy.decimals).toFixed(6)),
          defiSpringApy: Number(Web3Number.fromWei(assetInfo.stats.defiSpringSupplyApr.value, assetInfo.stats.defiSpringSupplyApr.decimals).toFixed(6)),
          netApy: 0
        },
        currentUtilization: isErrorPoolsAPI || !assetInfo ? 0 : Number(Web3Number.fromWei(assetInfo.stats.currentUtilization.value, assetInfo.stats.currentUtilization.decimals).toFixed(6)),
        maxUtilization: isErrorPoolsAPI || !assetInfo ? 0 : Number(Web3Number.fromWei(assetInfo.config.maxUtilization.value, assetInfo.config.maxUtilization.decimals).toFixed(6))
      };
      item.APY.netApy = item.APY.baseApy + item.APY.defiSpringApy;
      return item;
    });
    const data = await Promise.all(info);
    return {
      data,
      isErrorPositionsAPI,
      isErrorPoolsAPI,
      isError: isErrorPositionsAPI || isErrorPoolsAPI
    };
  }
  /**
   * Calculates the weighted average APY across all pools based on USD value.
   * @returns {Promise<number>} The weighted average APY across all pools
   */
  async netAPY() {
    const { data: pools } = await this.getPools();
    return this.netAPYGivenPools(pools);
  }
  /**
   * Calculates the weighted average APY across all pools based on USD value.
   * @returns {Promise<number>} The weighted average APY across all pools
   */
  netAPYGivenPools(pools) {
    const weightedApy = pools.reduce((acc, curr) => {
      const weight = curr.current_weight;
      return acc + curr.APY.netApy * weight;
    }, 0);
    return weightedApy * (1 - this.metadata.additionalInfo.feeBps / 1e4);
  }
  /**
   * Calculates optimal position changes to maximize APY while respecting max weights.
   * The algorithm:
   * 1. Sorts pools by APY (highest first)
   * 2. Calculates target amounts based on max weights
   * 3. For each pool that needs more funds:
   *    - Takes funds from lowest APY pools that are over their target
   * 4. Validates that total assets remain constant
   * 
   * @returns {Promise<{  
   *   changes: Change[],
   *   finalPools: PoolInfoFull[],
   *   isAnyPoolOverMaxWeight: boolean
   * }>} Object containing:
   *   - changes: Array of position changes
   *   - finalPools: Array of pool information after rebalance
   * @throws Error if rebalance is not possible while maintaining constraints
   */
  async getRebalancedPositions() {
    const { data: pools } = await this.getPools();
    const totalAssets = (await this.getTVL()).amount;
    if (totalAssets.eq(0)) return {
      changes: [],
      finalPools: []
    };
    const sumPools = pools.reduce((acc, curr) => acc.plus(curr.amount.toString()), Web3Number.fromWei("0", this.decimals()));
    assert(sumPools.lte(totalAssets), "Sum of pools.amount must be less than or equal to totalAssets");
    const sortedPools = [...pools].sort((a, b) => b.APY.netApy - a.APY.netApy);
    const targetAmounts = {};
    let remainingAssets = totalAssets;
    let isAnyPoolOverMaxWeight = false;
    for (const pool of sortedPools) {
      const maxAmount = totalAssets.multipliedBy(pool.max_weight * 0.9);
      const targetAmount = remainingAssets.gte(maxAmount) ? maxAmount : remainingAssets;
      targetAmounts[pool.pool_id.address.toString()] = targetAmount;
      remainingAssets = remainingAssets.minus(targetAmount.toString());
      if (pool.current_weight > pool.max_weight) {
        isAnyPoolOverMaxWeight = true;
      }
    }
    assert(remainingAssets.lt(1e-5), "Remaining assets must be 0");
    const changes = sortedPools.map((pool) => {
      const target = targetAmounts[pool.pool_id.address.toString()] || Web3Number.fromWei("0", this.decimals());
      const change = Web3Number.fromWei(target.minus(pool.amount.toString()).toWei(), this.decimals());
      return {
        pool_id: pool.pool_id,
        changeAmt: change,
        finalAmt: target,
        isDeposit: change.gt(0)
      };
    });
    const sumChanges = changes.reduce((sum, c) => sum.plus(c.changeAmt.toString()), Web3Number.fromWei("0", this.decimals()));
    const sumFinal = changes.reduce((sum, c) => sum.plus(c.finalAmt.toString()), Web3Number.fromWei("0", this.decimals()));
    const hasChanges = changes.some((c) => !c.changeAmt.eq(0));
    if (!sumChanges.eq(0)) throw new Error("Sum of changes must be zero");
    if (!sumFinal.eq(totalAssets)) throw new Error("Sum of final amounts must equal total assets");
    if (!hasChanges) throw new Error("No changes required");
    const finalPools = pools.map((p) => {
      const target = targetAmounts[p.pool_id.address.toString()] || Web3Number.fromWei("0", this.decimals());
      return {
        ...p,
        amount: target,
        usdValue: Web3Number.fromWei("0", this.decimals())
      };
    });
    return {
      changes,
      finalPools,
      isAnyPoolOverMaxWeight
    };
  }
  /**
   * Creates a rebalance Call object for the strategy contract
   * @param pools - Array of pool information including IDs, weights, amounts, APYs and utilization
   * @returns Populated contract call for rebalance
   */
  async getRebalanceCall(pools, isOverWeightAdjustment) {
    const actions = [];
    pools.sort((a, b) => b.isDeposit ? -1 : 1);
    console.log("pools", pools);
    pools.forEach((p) => {
      if (p.changeAmt.eq(0)) return null;
      actions.push({
        pool_id: p.pool_id.address,
        feature: new import_starknet7.CairoCustomEnum(p.isDeposit ? { DEPOSIT: {} } : { WITHDRAW: {} }),
        token: this.asset().address,
        amount: import_starknet7.uint256.bnToUint256(p.changeAmt.multipliedBy(p.isDeposit ? 1 : -1).toWei())
      });
    });
    if (actions.length === 0) return null;
    if (isOverWeightAdjustment) {
      return this.contract.populate("rebalance_weights", [actions]);
    }
    return this.contract.populate("rebalance", [actions]);
  }
  async getInvestmentFlows(pools) {
    const netYield = this.netAPYGivenPools(pools);
    const baseFlow = {
      title: "Your Deposit",
      subItems: [{ key: `Net yield`, value: `${(netYield * 100).toFixed(2)}%` }],
      linkedFlows: [],
      style: { backgroundColor: "#6e53dc" /* Purple */.valueOf() }
    };
    let _pools = [...pools];
    _pools = _pools.sort((a, b) => Number(b.amount.toString()) - Number(a.amount.toString()));
    _pools.forEach((p) => {
      const flow = {
        title: `Pool name: ${p.pool_name}`,
        subItems: [
          { key: `APY`, value: `${(p.APY.netApy * 100).toFixed(2)}%` },
          { key: "Weight", value: `${(p.current_weight * 100).toFixed(2)} / ${(p.max_weight * 100).toFixed(2)}%` }
        ],
        linkedFlows: [],
        style: p.amount.greaterThan(0) ? { backgroundColor: "#35484f" /* Blue */.valueOf() } : { color: "gray" }
      };
      baseFlow.linkedFlows.push(flow);
    });
    return [baseFlow];
  }
};
var _description = "Automatically diversify {{TOKEN}} holdings into different Vesu pools while reducing risk and maximizing yield. Defi spring STRK Rewards are auto-compounded as well.";
var _protocol = { name: "Vesu", logo: "https://static-assets-8zct.onrender.com/integrations/vesu/logo.png" };
var _riskFactor = [
  { type: "Smart Contract Risk" /* SMART_CONTRACT_RISK */, value: 0.5, weight: 25 },
  { type: "Counterparty Risk" /* COUNTERPARTY_RISK */, value: 1, weight: 50 },
  { type: "Oracle Risk" /* ORACLE_RISK */, value: 0.5, weight: 25 }
];
var AUDIT_URL = "https://assets.strkfarm.com/strkfarm/audit_report_vesu_and_ekubo_strats.pdf";
var VesuRebalanceStrategies = [{
  name: "Vesu Fusion STRK",
  description: _description.replace("{{TOKEN}}", "STRK"),
  address: ContractAddr.from("0x778007f8136a5b827325d21613803e796bda4d676fbe1e34aeab0b2a2ec027f"),
  type: "ERC4626",
  depositTokens: [Global.getDefaultTokens().find((t) => t.symbol === "STRK")],
  protocols: [_protocol],
  auditUrl: AUDIT_URL,
  maxTVL: Web3Number.fromWei("0", 18),
  risk: {
    riskFactor: _riskFactor,
    netRisk: _riskFactor.reduce((acc, curr) => acc + curr.value * curr.weight, 0) / _riskFactor.reduce((acc, curr) => acc + curr.weight, 0)
  },
  additionalInfo: {
    feeBps: 1e3
  }
}, {
  name: "Vesu Fusion ETH",
  description: _description.replace("{{TOKEN}}", "ETH"),
  address: ContractAddr.from("0x26ea414fdf74ace1df5bc5ac72cbac670d438ef19b31edf9d59f98718fc0ab2"),
  type: "ERC4626",
  auditUrl: AUDIT_URL,
  depositTokens: [Global.getDefaultTokens().find((t) => t.symbol === "ETH")],
  protocols: [_protocol],
  maxTVL: Web3Number.fromWei("0", 18),
  risk: {
    riskFactor: _riskFactor,
    netRisk: _riskFactor.reduce((acc, curr) => acc + curr.value * curr.weight, 0) / _riskFactor.reduce((acc, curr) => acc + curr.weight, 0)
  },
  additionalInfo: {
    feeBps: 1e3
  }
}, {
  name: "Vesu Fusion USDC",
  description: _description.replace("{{TOKEN}}", "USDC"),
  address: ContractAddr.from("0x3a69adeb993cddb266962d9c995e3d0641dab627df22b825fa31bda460c3c14"),
  type: "ERC4626",
  auditUrl: AUDIT_URL,
  depositTokens: [Global.getDefaultTokens().find((t) => t.symbol === "USDC")],
  protocols: [_protocol],
  maxTVL: Web3Number.fromWei("0", 6),
  risk: {
    riskFactor: _riskFactor,
    netRisk: _riskFactor.reduce((acc, curr) => acc + curr.value * curr.weight, 0) / _riskFactor.reduce((acc, curr) => acc + curr.weight, 0)
  },
  additionalInfo: {
    feeBps: 1e3
  }
  // }, {
  //     name: 'Vesu Fusion USDT',
  //     description: _description.replace('{{TOKEN}}', 'USDT'),
  //     address: ContractAddr.from('0x778007f8136a5b827325d21613803e796bda4d676fbe1e34aeab0b2a2ec027f'),
  //     type: 'ERC4626',
  //     depositTokens: [Global.getDefaultTokens().find(t => t.symbol === 'USDT')!],
  //     protocols: [_protocol],
  //     maxTVL: Web3Number.fromWei('0', 6),
  //     risk: {
  //         riskFactor: _riskFactor,
  //         netRisk: _riskFactor.reduce((acc, curr) => acc + curr.value * curr.weight, 0) / _riskFactor.reduce((acc, curr) => acc + curr.weight, 0),
  //     },
  //     additionalInfo: {
  //         feeBps: 1000,
  //     },
  // }, {
  //     name: 'Vesu Fusion WBTC',
  //     description: _description.replace('{{TOKEN}}', 'WBTC'),
  //     address: ContractAddr.from('0x778007f8136a5b827325d21613803e796bda4d676fbe1e34aeab0b2a2ec027f'),
  //     type: 'ERC4626',
  //     depositTokens: [Global.getDefaultTokens().find(t => t.symbol === 'WBTC')!],
  //     protocols: [_protocol],
  //     maxTVL: Web3Number.fromWei('0', 8),
  //     risk: {
  //         riskFactor: _riskFactor,
  //         netRisk: _riskFactor.reduce((acc, curr) => acc + curr.value * curr.weight, 0) / _riskFactor.reduce((acc, curr) => acc + curr.weight, 0),
  //     },
  //     additionalInfo: {
  //         feeBps: 1000,
  //     },
}];

// src/strategies/ekubo-cl-vault.ts
var import_starknet8 = require("starknet");

// src/data/cl-vault.abi.json
var cl_vault_abi_default = [
  {
    type: "impl",
    name: "ExternalImpl",
    interface_name: "strkfarm_contracts::strategies::cl_vault::interface::IClVault"
  },
  {
    type: "struct",
    name: "core::integer::u256",
    members: [
      {
        name: "low",
        type: "core::integer::u128"
      },
      {
        name: "high",
        type: "core::integer::u128"
      }
    ]
  },
  {
    type: "struct",
    name: "strkfarm_contracts::strategies::cl_vault::interface::MyPosition",
    members: [
      {
        name: "liquidity",
        type: "core::integer::u256"
      },
      {
        name: "amount0",
        type: "core::integer::u256"
      },
      {
        name: "amount1",
        type: "core::integer::u256"
      }
    ]
  },
  {
    type: "enum",
    name: "core::bool",
    variants: [
      {
        name: "False",
        type: "()"
      },
      {
        name: "True",
        type: "()"
      }
    ]
  },
  {
    type: "struct",
    name: "ekubo::types::i129::i129",
    members: [
      {
        name: "mag",
        type: "core::integer::u128"
      },
      {
        name: "sign",
        type: "core::bool"
      }
    ]
  },
  {
    type: "struct",
    name: "strkfarm_contracts::interfaces::IEkuboCore::Bounds",
    members: [
      {
        name: "lower",
        type: "ekubo::types::i129::i129"
      },
      {
        name: "upper",
        type: "ekubo::types::i129::i129"
      }
    ]
  },
  {
    type: "struct",
    name: "strkfarm_contracts::interfaces::IEkuboCore::PositionKey",
    members: [
      {
        name: "salt",
        type: "core::integer::u64"
      },
      {
        name: "owner",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        name: "bounds",
        type: "strkfarm_contracts::interfaces::IEkuboCore::Bounds"
      }
    ]
  },
  {
    type: "struct",
    name: "ekubo::types::fees_per_liquidity::FeesPerLiquidity",
    members: [
      {
        name: "value0",
        type: "core::felt252"
      },
      {
        name: "value1",
        type: "core::felt252"
      }
    ]
  },
  {
    type: "struct",
    name: "ekubo::types::position::Position",
    members: [
      {
        name: "liquidity",
        type: "core::integer::u128"
      },
      {
        name: "fees_per_liquidity_inside_last",
        type: "ekubo::types::fees_per_liquidity::FeesPerLiquidity"
      }
    ]
  },
  {
    type: "struct",
    name: "strkfarm_contracts::interfaces::IEkuboDistributor::Claim",
    members: [
      {
        name: "id",
        type: "core::integer::u64"
      },
      {
        name: "claimee",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        name: "amount",
        type: "core::integer::u128"
      }
    ]
  },
  {
    type: "struct",
    name: "core::array::Span::<core::felt252>",
    members: [
      {
        name: "snapshot",
        type: "@core::array::Array::<core::felt252>"
      }
    ]
  },
  {
    type: "struct",
    name: "strkfarm_contracts::components::swap::Route",
    members: [
      {
        name: "token_from",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        name: "token_to",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        name: "exchange_address",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        name: "percent",
        type: "core::integer::u128"
      },
      {
        name: "additional_swap_params",
        type: "core::array::Array::<core::felt252>"
      }
    ]
  },
  {
    type: "struct",
    name: "strkfarm_contracts::components::swap::AvnuMultiRouteSwap",
    members: [
      {
        name: "token_from_address",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        name: "token_from_amount",
        type: "core::integer::u256"
      },
      {
        name: "token_to_address",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        name: "token_to_amount",
        type: "core::integer::u256"
      },
      {
        name: "token_to_min_amount",
        type: "core::integer::u256"
      },
      {
        name: "beneficiary",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        name: "integrator_fee_amount_bps",
        type: "core::integer::u128"
      },
      {
        name: "integrator_fee_recipient",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        name: "routes",
        type: "core::array::Array::<strkfarm_contracts::components::swap::Route>"
      }
    ]
  },
  {
    type: "struct",
    name: "strkfarm_contracts::interfaces::IEkuboCore::PoolKey",
    members: [
      {
        name: "token0",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        name: "token1",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        name: "fee",
        type: "core::integer::u128"
      },
      {
        name: "tick_spacing",
        type: "core::integer::u128"
      },
      {
        name: "extension",
        type: "core::starknet::contract_address::ContractAddress"
      }
    ]
  },
  {
    type: "struct",
    name: "strkfarm_contracts::strategies::cl_vault::interface::FeeSettings",
    members: [
      {
        name: "fee_bps",
        type: "core::integer::u256"
      },
      {
        name: "fee_collector",
        type: "core::starknet::contract_address::ContractAddress"
      }
    ]
  },
  {
    type: "struct",
    name: "strkfarm_contracts::strategies::cl_vault::interface::ClSettings",
    members: [
      {
        name: "ekubo_positions_contract",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        name: "bounds_settings",
        type: "strkfarm_contracts::interfaces::IEkuboCore::Bounds"
      },
      {
        name: "pool_key",
        type: "strkfarm_contracts::interfaces::IEkuboCore::PoolKey"
      },
      {
        name: "ekubo_positions_nft",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        name: "contract_nft_id",
        type: "core::integer::u64"
      },
      {
        name: "ekubo_core",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        name: "oracle",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        name: "fee_settings",
        type: "strkfarm_contracts::strategies::cl_vault::interface::FeeSettings"
      }
    ]
  },
  {
    type: "interface",
    name: "strkfarm_contracts::strategies::cl_vault::interface::IClVault",
    items: [
      {
        type: "function",
        name: "deposit",
        inputs: [
          {
            name: "amount0",
            type: "core::integer::u256"
          },
          {
            name: "amount1",
            type: "core::integer::u256"
          },
          {
            name: "receiver",
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        outputs: [
          {
            type: "core::integer::u256"
          }
        ],
        state_mutability: "external"
      },
      {
        type: "function",
        name: "withdraw",
        inputs: [
          {
            name: "shares",
            type: "core::integer::u256"
          },
          {
            name: "receiver",
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        outputs: [
          {
            type: "strkfarm_contracts::strategies::cl_vault::interface::MyPosition"
          }
        ],
        state_mutability: "external"
      },
      {
        type: "function",
        name: "convert_to_shares",
        inputs: [
          {
            name: "amount0",
            type: "core::integer::u256"
          },
          {
            name: "amount1",
            type: "core::integer::u256"
          }
        ],
        outputs: [
          {
            type: "core::integer::u256"
          }
        ],
        state_mutability: "view"
      },
      {
        type: "function",
        name: "convert_to_assets",
        inputs: [
          {
            name: "shares",
            type: "core::integer::u256"
          }
        ],
        outputs: [
          {
            type: "strkfarm_contracts::strategies::cl_vault::interface::MyPosition"
          }
        ],
        state_mutability: "view"
      },
      {
        type: "function",
        name: "total_liquidity",
        inputs: [],
        outputs: [
          {
            type: "core::integer::u256"
          }
        ],
        state_mutability: "view"
      },
      {
        type: "function",
        name: "get_position_key",
        inputs: [],
        outputs: [
          {
            type: "strkfarm_contracts::interfaces::IEkuboCore::PositionKey"
          }
        ],
        state_mutability: "view"
      },
      {
        type: "function",
        name: "get_position",
        inputs: [],
        outputs: [
          {
            type: "ekubo::types::position::Position"
          }
        ],
        state_mutability: "view"
      },
      {
        type: "function",
        name: "handle_fees",
        inputs: [],
        outputs: [],
        state_mutability: "external"
      },
      {
        type: "function",
        name: "harvest",
        inputs: [
          {
            name: "rewardsContract",
            type: "core::starknet::contract_address::ContractAddress"
          },
          {
            name: "claim",
            type: "strkfarm_contracts::interfaces::IEkuboDistributor::Claim"
          },
          {
            name: "proof",
            type: "core::array::Span::<core::felt252>"
          },
          {
            name: "swapInfo1",
            type: "strkfarm_contracts::components::swap::AvnuMultiRouteSwap"
          },
          {
            name: "swapInfo2",
            type: "strkfarm_contracts::components::swap::AvnuMultiRouteSwap"
          }
        ],
        outputs: [],
        state_mutability: "external"
      },
      {
        type: "function",
        name: "get_settings",
        inputs: [],
        outputs: [
          {
            type: "strkfarm_contracts::strategies::cl_vault::interface::ClSettings"
          }
        ],
        state_mutability: "view"
      },
      {
        type: "function",
        name: "handle_unused",
        inputs: [
          {
            name: "swap_params",
            type: "strkfarm_contracts::components::swap::AvnuMultiRouteSwap"
          }
        ],
        outputs: [],
        state_mutability: "external"
      },
      {
        type: "function",
        name: "rebalance",
        inputs: [
          {
            name: "new_bounds",
            type: "strkfarm_contracts::interfaces::IEkuboCore::Bounds"
          },
          {
            name: "swap_params",
            type: "strkfarm_contracts::components::swap::AvnuMultiRouteSwap"
          }
        ],
        outputs: [],
        state_mutability: "external"
      },
      {
        type: "function",
        name: "set_settings",
        inputs: [
          {
            name: "fee_settings",
            type: "strkfarm_contracts::strategies::cl_vault::interface::FeeSettings"
          }
        ],
        outputs: [],
        state_mutability: "external"
      },
      {
        type: "function",
        name: "set_incentives_off",
        inputs: [],
        outputs: [],
        state_mutability: "external"
      }
    ]
  },
  {
    type: "impl",
    name: "VesuERC20Impl",
    interface_name: "openzeppelin_token::erc20::interface::IERC20Mixin"
  },
  {
    type: "struct",
    name: "core::byte_array::ByteArray",
    members: [
      {
        name: "data",
        type: "core::array::Array::<core::bytes_31::bytes31>"
      },
      {
        name: "pending_word",
        type: "core::felt252"
      },
      {
        name: "pending_word_len",
        type: "core::integer::u32"
      }
    ]
  },
  {
    type: "interface",
    name: "openzeppelin_token::erc20::interface::IERC20Mixin",
    items: [
      {
        type: "function",
        name: "total_supply",
        inputs: [],
        outputs: [
          {
            type: "core::integer::u256"
          }
        ],
        state_mutability: "view"
      },
      {
        type: "function",
        name: "balance_of",
        inputs: [
          {
            name: "account",
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        outputs: [
          {
            type: "core::integer::u256"
          }
        ],
        state_mutability: "view"
      },
      {
        type: "function",
        name: "allowance",
        inputs: [
          {
            name: "owner",
            type: "core::starknet::contract_address::ContractAddress"
          },
          {
            name: "spender",
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        outputs: [
          {
            type: "core::integer::u256"
          }
        ],
        state_mutability: "view"
      },
      {
        type: "function",
        name: "transfer",
        inputs: [
          {
            name: "recipient",
            type: "core::starknet::contract_address::ContractAddress"
          },
          {
            name: "amount",
            type: "core::integer::u256"
          }
        ],
        outputs: [
          {
            type: "core::bool"
          }
        ],
        state_mutability: "external"
      },
      {
        type: "function",
        name: "transfer_from",
        inputs: [
          {
            name: "sender",
            type: "core::starknet::contract_address::ContractAddress"
          },
          {
            name: "recipient",
            type: "core::starknet::contract_address::ContractAddress"
          },
          {
            name: "amount",
            type: "core::integer::u256"
          }
        ],
        outputs: [
          {
            type: "core::bool"
          }
        ],
        state_mutability: "external"
      },
      {
        type: "function",
        name: "approve",
        inputs: [
          {
            name: "spender",
            type: "core::starknet::contract_address::ContractAddress"
          },
          {
            name: "amount",
            type: "core::integer::u256"
          }
        ],
        outputs: [
          {
            type: "core::bool"
          }
        ],
        state_mutability: "external"
      },
      {
        type: "function",
        name: "name",
        inputs: [],
        outputs: [
          {
            type: "core::byte_array::ByteArray"
          }
        ],
        state_mutability: "view"
      },
      {
        type: "function",
        name: "symbol",
        inputs: [],
        outputs: [
          {
            type: "core::byte_array::ByteArray"
          }
        ],
        state_mutability: "view"
      },
      {
        type: "function",
        name: "decimals",
        inputs: [],
        outputs: [
          {
            type: "core::integer::u8"
          }
        ],
        state_mutability: "view"
      },
      {
        type: "function",
        name: "totalSupply",
        inputs: [],
        outputs: [
          {
            type: "core::integer::u256"
          }
        ],
        state_mutability: "view"
      },
      {
        type: "function",
        name: "balanceOf",
        inputs: [
          {
            name: "account",
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        outputs: [
          {
            type: "core::integer::u256"
          }
        ],
        state_mutability: "view"
      },
      {
        type: "function",
        name: "transferFrom",
        inputs: [
          {
            name: "sender",
            type: "core::starknet::contract_address::ContractAddress"
          },
          {
            name: "recipient",
            type: "core::starknet::contract_address::ContractAddress"
          },
          {
            name: "amount",
            type: "core::integer::u256"
          }
        ],
        outputs: [
          {
            type: "core::bool"
          }
        ],
        state_mutability: "external"
      }
    ]
  },
  {
    type: "impl",
    name: "RewardShareImpl",
    interface_name: "strkfarm_contracts::components::harvester::reward_shares::IRewardShare"
  },
  {
    type: "struct",
    name: "strkfarm_contracts::components::harvester::reward_shares::UserRewardsInfo",
    members: [
      {
        name: "pending_round_points",
        type: "core::integer::u128"
      },
      {
        name: "shares_owned",
        type: "core::integer::u128"
      },
      {
        name: "block_number",
        type: "core::integer::u64"
      },
      {
        name: "index",
        type: "core::integer::u32"
      }
    ]
  },
  {
    type: "struct",
    name: "strkfarm_contracts::components::harvester::reward_shares::RewardsInfo",
    members: [
      {
        name: "amount",
        type: "core::integer::u128"
      },
      {
        name: "shares",
        type: "core::integer::u128"
      },
      {
        name: "total_round_points",
        type: "core::integer::u128"
      },
      {
        name: "block_number",
        type: "core::integer::u64"
      }
    ]
  },
  {
    type: "interface",
    name: "strkfarm_contracts::components::harvester::reward_shares::IRewardShare",
    items: [
      {
        type: "function",
        name: "get_user_reward_info",
        inputs: [
          {
            name: "user",
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        outputs: [
          {
            type: "strkfarm_contracts::components::harvester::reward_shares::UserRewardsInfo"
          }
        ],
        state_mutability: "view"
      },
      {
        type: "function",
        name: "get_rewards_info",
        inputs: [
          {
            name: "index",
            type: "core::integer::u32"
          }
        ],
        outputs: [
          {
            type: "strkfarm_contracts::components::harvester::reward_shares::RewardsInfo"
          }
        ],
        state_mutability: "view"
      },
      {
        type: "function",
        name: "get_total_rewards",
        inputs: [],
        outputs: [
          {
            type: "core::integer::u32"
          }
        ],
        state_mutability: "view"
      },
      {
        type: "function",
        name: "get_total_unminted_shares",
        inputs: [],
        outputs: [
          {
            type: "core::integer::u128"
          }
        ],
        state_mutability: "view"
      },
      {
        type: "function",
        name: "get_additional_shares",
        inputs: [
          {
            name: "user",
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        outputs: [
          {
            type: "(core::integer::u128, core::integer::u64, core::integer::u128)"
          }
        ],
        state_mutability: "view"
      }
    ]
  },
  {
    type: "impl",
    name: "CommonCompImpl",
    interface_name: "strkfarm_contracts::interfaces::common::ICommon"
  },
  {
    type: "interface",
    name: "strkfarm_contracts::interfaces::common::ICommon",
    items: [
      {
        type: "function",
        name: "upgrade",
        inputs: [
          {
            name: "new_class",
            type: "core::starknet::class_hash::ClassHash"
          }
        ],
        outputs: [],
        state_mutability: "external"
      },
      {
        type: "function",
        name: "pause",
        inputs: [],
        outputs: [],
        state_mutability: "external"
      },
      {
        type: "function",
        name: "unpause",
        inputs: [],
        outputs: [],
        state_mutability: "external"
      },
      {
        type: "function",
        name: "is_paused",
        inputs: [],
        outputs: [
          {
            type: "core::bool"
          }
        ],
        state_mutability: "view"
      }
    ]
  },
  {
    type: "constructor",
    name: "constructor",
    inputs: [
      {
        name: "name",
        type: "core::byte_array::ByteArray"
      },
      {
        name: "symbol",
        type: "core::byte_array::ByteArray"
      },
      {
        name: "access_control",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        name: "ekubo_positions_contract",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        name: "bounds_settings",
        type: "strkfarm_contracts::interfaces::IEkuboCore::Bounds"
      },
      {
        name: "pool_key",
        type: "strkfarm_contracts::interfaces::IEkuboCore::PoolKey"
      },
      {
        name: "ekubo_positions_nft",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        name: "ekubo_core",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        name: "oracle",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        name: "fee_settings",
        type: "strkfarm_contracts::strategies::cl_vault::interface::FeeSettings"
      }
    ]
  },
  {
    type: "event",
    name: "openzeppelin_security::reentrancyguard::ReentrancyGuardComponent::Event",
    kind: "enum",
    variants: []
  },
  {
    type: "event",
    name: "openzeppelin_token::erc20::erc20::ERC20Component::Transfer",
    kind: "struct",
    members: [
      {
        name: "from",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "key"
      },
      {
        name: "to",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "key"
      },
      {
        name: "value",
        type: "core::integer::u256",
        kind: "data"
      }
    ]
  },
  {
    type: "event",
    name: "openzeppelin_token::erc20::erc20::ERC20Component::Approval",
    kind: "struct",
    members: [
      {
        name: "owner",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "key"
      },
      {
        name: "spender",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "key"
      },
      {
        name: "value",
        type: "core::integer::u256",
        kind: "data"
      }
    ]
  },
  {
    type: "event",
    name: "openzeppelin_token::erc20::erc20::ERC20Component::Event",
    kind: "enum",
    variants: [
      {
        name: "Transfer",
        type: "openzeppelin_token::erc20::erc20::ERC20Component::Transfer",
        kind: "nested"
      },
      {
        name: "Approval",
        type: "openzeppelin_token::erc20::erc20::ERC20Component::Approval",
        kind: "nested"
      }
    ]
  },
  {
    type: "event",
    name: "openzeppelin_introspection::src5::SRC5Component::Event",
    kind: "enum",
    variants: []
  },
  {
    type: "event",
    name: "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferred",
    kind: "struct",
    members: [
      {
        name: "previous_owner",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "key"
      },
      {
        name: "new_owner",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "key"
      }
    ]
  },
  {
    type: "event",
    name: "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferStarted",
    kind: "struct",
    members: [
      {
        name: "previous_owner",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "key"
      },
      {
        name: "new_owner",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "key"
      }
    ]
  },
  {
    type: "event",
    name: "openzeppelin_access::ownable::ownable::OwnableComponent::Event",
    kind: "enum",
    variants: [
      {
        name: "OwnershipTransferred",
        type: "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferred",
        kind: "nested"
      },
      {
        name: "OwnershipTransferStarted",
        type: "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferStarted",
        kind: "nested"
      }
    ]
  },
  {
    type: "event",
    name: "openzeppelin_upgrades::upgradeable::UpgradeableComponent::Upgraded",
    kind: "struct",
    members: [
      {
        name: "class_hash",
        type: "core::starknet::class_hash::ClassHash",
        kind: "data"
      }
    ]
  },
  {
    type: "event",
    name: "openzeppelin_upgrades::upgradeable::UpgradeableComponent::Event",
    kind: "enum",
    variants: [
      {
        name: "Upgraded",
        type: "openzeppelin_upgrades::upgradeable::UpgradeableComponent::Upgraded",
        kind: "nested"
      }
    ]
  },
  {
    type: "event",
    name: "openzeppelin_security::pausable::PausableComponent::Paused",
    kind: "struct",
    members: [
      {
        name: "account",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data"
      }
    ]
  },
  {
    type: "event",
    name: "openzeppelin_security::pausable::PausableComponent::Unpaused",
    kind: "struct",
    members: [
      {
        name: "account",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data"
      }
    ]
  },
  {
    type: "event",
    name: "openzeppelin_security::pausable::PausableComponent::Event",
    kind: "enum",
    variants: [
      {
        name: "Paused",
        type: "openzeppelin_security::pausable::PausableComponent::Paused",
        kind: "nested"
      },
      {
        name: "Unpaused",
        type: "openzeppelin_security::pausable::PausableComponent::Unpaused",
        kind: "nested"
      }
    ]
  },
  {
    type: "event",
    name: "strkfarm_contracts::components::common::CommonComp::Event",
    kind: "enum",
    variants: []
  },
  {
    type: "event",
    name: "strkfarm_contracts::components::harvester::reward_shares::RewardShareComponent::Rewards",
    kind: "struct",
    members: [
      {
        name: "index",
        type: "core::integer::u32",
        kind: "data"
      },
      {
        name: "info",
        type: "strkfarm_contracts::components::harvester::reward_shares::RewardsInfo",
        kind: "data"
      },
      {
        name: "total_reward_shares",
        type: "core::integer::u128",
        kind: "data"
      },
      {
        name: "timestamp",
        type: "core::integer::u64",
        kind: "data"
      }
    ]
  },
  {
    type: "event",
    name: "strkfarm_contracts::components::harvester::reward_shares::RewardShareComponent::UserRewards",
    kind: "struct",
    members: [
      {
        name: "user",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "key"
      },
      {
        name: "info",
        type: "strkfarm_contracts::components::harvester::reward_shares::UserRewardsInfo",
        kind: "data"
      },
      {
        name: "total_reward_shares",
        type: "core::integer::u128",
        kind: "data"
      },
      {
        name: "timestamp",
        type: "core::integer::u64",
        kind: "data"
      }
    ]
  },
  {
    type: "event",
    name: "strkfarm_contracts::components::harvester::reward_shares::RewardShareComponent::Event",
    kind: "enum",
    variants: [
      {
        name: "Rewards",
        type: "strkfarm_contracts::components::harvester::reward_shares::RewardShareComponent::Rewards",
        kind: "nested"
      },
      {
        name: "UserRewards",
        type: "strkfarm_contracts::components::harvester::reward_shares::RewardShareComponent::UserRewards",
        kind: "nested"
      }
    ]
  },
  {
    type: "event",
    name: "strkfarm_contracts::strategies::cl_vault::cl_vault::ConcLiquidityVault::Deposit",
    kind: "struct",
    members: [
      {
        name: "sender",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "key"
      },
      {
        name: "owner",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "key"
      },
      {
        name: "assets",
        type: "core::integer::u256",
        kind: "data"
      },
      {
        name: "shares",
        type: "core::integer::u256",
        kind: "data"
      }
    ]
  },
  {
    type: "event",
    name: "strkfarm_contracts::strategies::cl_vault::cl_vault::ConcLiquidityVault::Withdraw",
    kind: "struct",
    members: [
      {
        name: "sender",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "key"
      },
      {
        name: "receiver",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "key"
      },
      {
        name: "owner",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "key"
      },
      {
        name: "assets",
        type: "core::integer::u256",
        kind: "data"
      },
      {
        name: "shares",
        type: "core::integer::u256",
        kind: "data"
      }
    ]
  },
  {
    type: "event",
    name: "strkfarm_contracts::strategies::cl_vault::cl_vault::ConcLiquidityVault::Rebalance",
    kind: "struct",
    members: [
      {
        name: "old_bounds",
        type: "strkfarm_contracts::interfaces::IEkuboCore::Bounds",
        kind: "data"
      },
      {
        name: "old_liquidity",
        type: "core::integer::u256",
        kind: "data"
      },
      {
        name: "new_bounds",
        type: "strkfarm_contracts::interfaces::IEkuboCore::Bounds",
        kind: "data"
      },
      {
        name: "new_liquidity",
        type: "core::integer::u256",
        kind: "data"
      }
    ]
  },
  {
    type: "event",
    name: "strkfarm_contracts::strategies::cl_vault::cl_vault::ConcLiquidityVault::HandleFees",
    kind: "struct",
    members: [
      {
        name: "token0_addr",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data"
      },
      {
        name: "token0_origin_bal",
        type: "core::integer::u256",
        kind: "data"
      },
      {
        name: "token0_deposited",
        type: "core::integer::u256",
        kind: "data"
      },
      {
        name: "token1_addr",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data"
      },
      {
        name: "token1_origin_bal",
        type: "core::integer::u256",
        kind: "data"
      },
      {
        name: "token1_deposited",
        type: "core::integer::u256",
        kind: "data"
      }
    ]
  },
  {
    type: "event",
    name: "strkfarm_contracts::strategies::cl_vault::interface::FeeSettings",
    kind: "struct",
    members: [
      {
        name: "fee_bps",
        type: "core::integer::u256",
        kind: "data"
      },
      {
        name: "fee_collector",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data"
      }
    ]
  },
  {
    type: "event",
    name: "strkfarm_contracts::strategies::cl_vault::cl_vault::ConcLiquidityVault::Event",
    kind: "enum",
    variants: [
      {
        name: "ReentrancyGuardEvent",
        type: "openzeppelin_security::reentrancyguard::ReentrancyGuardComponent::Event",
        kind: "flat"
      },
      {
        name: "ERC20Event",
        type: "openzeppelin_token::erc20::erc20::ERC20Component::Event",
        kind: "flat"
      },
      {
        name: "SRC5Event",
        type: "openzeppelin_introspection::src5::SRC5Component::Event",
        kind: "flat"
      },
      {
        name: "OwnableEvent",
        type: "openzeppelin_access::ownable::ownable::OwnableComponent::Event",
        kind: "flat"
      },
      {
        name: "UpgradeableEvent",
        type: "openzeppelin_upgrades::upgradeable::UpgradeableComponent::Event",
        kind: "flat"
      },
      {
        name: "PausableEvent",
        type: "openzeppelin_security::pausable::PausableComponent::Event",
        kind: "flat"
      },
      {
        name: "CommonCompEvent",
        type: "strkfarm_contracts::components::common::CommonComp::Event",
        kind: "flat"
      },
      {
        name: "RewardShareEvent",
        type: "strkfarm_contracts::components::harvester::reward_shares::RewardShareComponent::Event",
        kind: "flat"
      },
      {
        name: "Deposit",
        type: "strkfarm_contracts::strategies::cl_vault::cl_vault::ConcLiquidityVault::Deposit",
        kind: "nested"
      },
      {
        name: "Withdraw",
        type: "strkfarm_contracts::strategies::cl_vault::cl_vault::ConcLiquidityVault::Withdraw",
        kind: "nested"
      },
      {
        name: "Rebalance",
        type: "strkfarm_contracts::strategies::cl_vault::cl_vault::ConcLiquidityVault::Rebalance",
        kind: "nested"
      },
      {
        name: "HandleFees",
        type: "strkfarm_contracts::strategies::cl_vault::cl_vault::ConcLiquidityVault::HandleFees",
        kind: "nested"
      },
      {
        name: "FeeSettings",
        type: "strkfarm_contracts::strategies::cl_vault::interface::FeeSettings",
        kind: "nested"
      }
    ]
  }
];

// src/data/ekubo-positions.abi.json
var ekubo_positions_abi_default = [
  {
    type: "impl",
    name: "PositionsHasInterface",
    interface_name: "ekubo::components::upgradeable::IHasInterface"
  },
  {
    type: "interface",
    name: "ekubo::components::upgradeable::IHasInterface",
    items: [
      {
        type: "function",
        name: "get_primary_interface_id",
        inputs: [],
        outputs: [
          {
            type: "core::felt252"
          }
        ],
        state_mutability: "view"
      }
    ]
  },
  {
    type: "impl",
    name: "ILockerImpl",
    interface_name: "ekubo::interfaces::core::ILocker"
  },
  {
    type: "struct",
    name: "core::array::Span::<core::felt252>",
    members: [
      {
        name: "snapshot",
        type: "@core::array::Array::<core::felt252>"
      }
    ]
  },
  {
    type: "interface",
    name: "ekubo::interfaces::core::ILocker",
    items: [
      {
        type: "function",
        name: "locked",
        inputs: [
          {
            name: "id",
            type: "core::integer::u32"
          },
          {
            name: "data",
            type: "core::array::Span::<core::felt252>"
          }
        ],
        outputs: [
          {
            type: "core::array::Span::<core::felt252>"
          }
        ],
        state_mutability: "external"
      }
    ]
  },
  {
    type: "impl",
    name: "PositionsImpl",
    interface_name: "ekubo::interfaces::positions::IPositions"
  },
  {
    type: "struct",
    name: "ekubo::types::keys::PoolKey",
    members: [
      {
        name: "token0",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        name: "token1",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        name: "fee",
        type: "core::integer::u128"
      },
      {
        name: "tick_spacing",
        type: "core::integer::u128"
      },
      {
        name: "extension",
        type: "core::starknet::contract_address::ContractAddress"
      }
    ]
  },
  {
    type: "enum",
    name: "core::bool",
    variants: [
      {
        name: "False",
        type: "()"
      },
      {
        name: "True",
        type: "()"
      }
    ]
  },
  {
    type: "struct",
    name: "ekubo::types::i129::i129",
    members: [
      {
        name: "mag",
        type: "core::integer::u128"
      },
      {
        name: "sign",
        type: "core::bool"
      }
    ]
  },
  {
    type: "struct",
    name: "ekubo::types::bounds::Bounds",
    members: [
      {
        name: "lower",
        type: "ekubo::types::i129::i129"
      },
      {
        name: "upper",
        type: "ekubo::types::i129::i129"
      }
    ]
  },
  {
    type: "struct",
    name: "ekubo::interfaces::positions::GetTokenInfoRequest",
    members: [
      {
        name: "id",
        type: "core::integer::u64"
      },
      {
        name: "pool_key",
        type: "ekubo::types::keys::PoolKey"
      },
      {
        name: "bounds",
        type: "ekubo::types::bounds::Bounds"
      }
    ]
  },
  {
    type: "struct",
    name: "core::array::Span::<ekubo::interfaces::positions::GetTokenInfoRequest>",
    members: [
      {
        name: "snapshot",
        type: "@core::array::Array::<ekubo::interfaces::positions::GetTokenInfoRequest>"
      }
    ]
  },
  {
    type: "struct",
    name: "core::integer::u256",
    members: [
      {
        name: "low",
        type: "core::integer::u128"
      },
      {
        name: "high",
        type: "core::integer::u128"
      }
    ]
  },
  {
    type: "struct",
    name: "ekubo::types::pool_price::PoolPrice",
    members: [
      {
        name: "sqrt_ratio",
        type: "core::integer::u256"
      },
      {
        name: "tick",
        type: "ekubo::types::i129::i129"
      }
    ]
  },
  {
    type: "struct",
    name: "ekubo::interfaces::positions::GetTokenInfoResult",
    members: [
      {
        name: "pool_price",
        type: "ekubo::types::pool_price::PoolPrice"
      },
      {
        name: "liquidity",
        type: "core::integer::u128"
      },
      {
        name: "amount0",
        type: "core::integer::u128"
      },
      {
        name: "amount1",
        type: "core::integer::u128"
      },
      {
        name: "fees0",
        type: "core::integer::u128"
      },
      {
        name: "fees1",
        type: "core::integer::u128"
      }
    ]
  },
  {
    type: "struct",
    name: "core::array::Span::<ekubo::interfaces::positions::GetTokenInfoResult>",
    members: [
      {
        name: "snapshot",
        type: "@core::array::Array::<ekubo::interfaces::positions::GetTokenInfoResult>"
      }
    ]
  },
  {
    type: "struct",
    name: "ekubo::interfaces::extensions::twamm::OrderKey",
    members: [
      {
        name: "sell_token",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        name: "buy_token",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        name: "fee",
        type: "core::integer::u128"
      },
      {
        name: "start_time",
        type: "core::integer::u64"
      },
      {
        name: "end_time",
        type: "core::integer::u64"
      }
    ]
  },
  {
    type: "struct",
    name: "core::array::Span::<(core::integer::u64, ekubo::interfaces::extensions::twamm::OrderKey)>",
    members: [
      {
        name: "snapshot",
        type: "@core::array::Array::<(core::integer::u64, ekubo::interfaces::extensions::twamm::OrderKey)>"
      }
    ]
  },
  {
    type: "struct",
    name: "ekubo::interfaces::extensions::twamm::OrderInfo",
    members: [
      {
        name: "sale_rate",
        type: "core::integer::u128"
      },
      {
        name: "remaining_sell_amount",
        type: "core::integer::u128"
      },
      {
        name: "purchased_amount",
        type: "core::integer::u128"
      }
    ]
  },
  {
    type: "struct",
    name: "core::array::Span::<ekubo::interfaces::extensions::twamm::OrderInfo>",
    members: [
      {
        name: "snapshot",
        type: "@core::array::Array::<ekubo::interfaces::extensions::twamm::OrderInfo>"
      }
    ]
  },
  {
    type: "struct",
    name: "ekubo::interfaces::extensions::limit_orders::OrderKey",
    members: [
      {
        name: "token0",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        name: "token1",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        name: "tick",
        type: "ekubo::types::i129::i129"
      }
    ]
  },
  {
    type: "enum",
    name: "core::option::Option::<(core::integer::u64, core::integer::u128)>",
    variants: [
      {
        name: "Some",
        type: "(core::integer::u64, core::integer::u128)"
      },
      {
        name: "None",
        type: "()"
      }
    ]
  },
  {
    type: "struct",
    name: "core::array::Span::<(core::integer::u64, ekubo::interfaces::extensions::limit_orders::OrderKey)>",
    members: [
      {
        name: "snapshot",
        type: "@core::array::Array::<(core::integer::u64, ekubo::interfaces::extensions::limit_orders::OrderKey)>"
      }
    ]
  },
  {
    type: "struct",
    name: "ekubo::interfaces::extensions::limit_orders::OrderState",
    members: [
      {
        name: "initialized_ticks_crossed_snapshot",
        type: "core::integer::u64"
      },
      {
        name: "liquidity",
        type: "core::integer::u128"
      }
    ]
  },
  {
    type: "struct",
    name: "ekubo::interfaces::extensions::limit_orders::GetOrderInfoResult",
    members: [
      {
        name: "state",
        type: "ekubo::interfaces::extensions::limit_orders::OrderState"
      },
      {
        name: "executed",
        type: "core::bool"
      },
      {
        name: "amount0",
        type: "core::integer::u128"
      },
      {
        name: "amount1",
        type: "core::integer::u128"
      }
    ]
  },
  {
    type: "struct",
    name: "core::array::Span::<ekubo::interfaces::extensions::limit_orders::GetOrderInfoResult>",
    members: [
      {
        name: "snapshot",
        type: "@core::array::Array::<ekubo::interfaces::extensions::limit_orders::GetOrderInfoResult>"
      }
    ]
  },
  {
    type: "interface",
    name: "ekubo::interfaces::positions::IPositions",
    items: [
      {
        type: "function",
        name: "get_nft_address",
        inputs: [],
        outputs: [
          {
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        state_mutability: "view"
      },
      {
        type: "function",
        name: "upgrade_nft",
        inputs: [
          {
            name: "class_hash",
            type: "core::starknet::class_hash::ClassHash"
          }
        ],
        outputs: [],
        state_mutability: "external"
      },
      {
        type: "function",
        name: "set_twamm",
        inputs: [
          {
            name: "twamm_address",
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        outputs: [],
        state_mutability: "external"
      },
      {
        type: "function",
        name: "set_limit_orders",
        inputs: [
          {
            name: "limit_orders_address",
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        outputs: [],
        state_mutability: "external"
      },
      {
        type: "function",
        name: "get_twamm_address",
        inputs: [],
        outputs: [
          {
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        state_mutability: "view"
      },
      {
        type: "function",
        name: "get_limit_orders_address",
        inputs: [],
        outputs: [
          {
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        state_mutability: "view"
      },
      {
        type: "function",
        name: "get_tokens_info",
        inputs: [
          {
            name: "params",
            type: "core::array::Span::<ekubo::interfaces::positions::GetTokenInfoRequest>"
          }
        ],
        outputs: [
          {
            type: "core::array::Span::<ekubo::interfaces::positions::GetTokenInfoResult>"
          }
        ],
        state_mutability: "view"
      },
      {
        type: "function",
        name: "get_token_info",
        inputs: [
          {
            name: "id",
            type: "core::integer::u64"
          },
          {
            name: "pool_key",
            type: "ekubo::types::keys::PoolKey"
          },
          {
            name: "bounds",
            type: "ekubo::types::bounds::Bounds"
          }
        ],
        outputs: [
          {
            type: "ekubo::interfaces::positions::GetTokenInfoResult"
          }
        ],
        state_mutability: "view"
      },
      {
        type: "function",
        name: "get_orders_info_with_block_timestamp",
        inputs: [
          {
            name: "params",
            type: "core::array::Span::<(core::integer::u64, ekubo::interfaces::extensions::twamm::OrderKey)>"
          }
        ],
        outputs: [
          {
            type: "(core::integer::u64, core::array::Span::<ekubo::interfaces::extensions::twamm::OrderInfo>)"
          }
        ],
        state_mutability: "view"
      },
      {
        type: "function",
        name: "get_orders_info",
        inputs: [
          {
            name: "params",
            type: "core::array::Span::<(core::integer::u64, ekubo::interfaces::extensions::twamm::OrderKey)>"
          }
        ],
        outputs: [
          {
            type: "core::array::Span::<ekubo::interfaces::extensions::twamm::OrderInfo>"
          }
        ],
        state_mutability: "view"
      },
      {
        type: "function",
        name: "get_order_info",
        inputs: [
          {
            name: "id",
            type: "core::integer::u64"
          },
          {
            name: "order_key",
            type: "ekubo::interfaces::extensions::twamm::OrderKey"
          }
        ],
        outputs: [
          {
            type: "ekubo::interfaces::extensions::twamm::OrderInfo"
          }
        ],
        state_mutability: "view"
      },
      {
        type: "function",
        name: "mint",
        inputs: [
          {
            name: "pool_key",
            type: "ekubo::types::keys::PoolKey"
          },
          {
            name: "bounds",
            type: "ekubo::types::bounds::Bounds"
          }
        ],
        outputs: [
          {
            type: "core::integer::u64"
          }
        ],
        state_mutability: "external"
      },
      {
        type: "function",
        name: "mint_with_referrer",
        inputs: [
          {
            name: "pool_key",
            type: "ekubo::types::keys::PoolKey"
          },
          {
            name: "bounds",
            type: "ekubo::types::bounds::Bounds"
          },
          {
            name: "referrer",
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        outputs: [
          {
            type: "core::integer::u64"
          }
        ],
        state_mutability: "external"
      },
      {
        type: "function",
        name: "mint_v2",
        inputs: [
          {
            name: "referrer",
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        outputs: [
          {
            type: "core::integer::u64"
          }
        ],
        state_mutability: "external"
      },
      {
        type: "function",
        name: "check_liquidity_is_zero",
        inputs: [
          {
            name: "id",
            type: "core::integer::u64"
          },
          {
            name: "pool_key",
            type: "ekubo::types::keys::PoolKey"
          },
          {
            name: "bounds",
            type: "ekubo::types::bounds::Bounds"
          }
        ],
        outputs: [],
        state_mutability: "view"
      },
      {
        type: "function",
        name: "unsafe_burn",
        inputs: [
          {
            name: "id",
            type: "core::integer::u64"
          }
        ],
        outputs: [],
        state_mutability: "external"
      },
      {
        type: "function",
        name: "deposit_last",
        inputs: [
          {
            name: "pool_key",
            type: "ekubo::types::keys::PoolKey"
          },
          {
            name: "bounds",
            type: "ekubo::types::bounds::Bounds"
          },
          {
            name: "min_liquidity",
            type: "core::integer::u128"
          }
        ],
        outputs: [
          {
            type: "core::integer::u128"
          }
        ],
        state_mutability: "external"
      },
      {
        type: "function",
        name: "deposit_amounts_last",
        inputs: [
          {
            name: "pool_key",
            type: "ekubo::types::keys::PoolKey"
          },
          {
            name: "bounds",
            type: "ekubo::types::bounds::Bounds"
          },
          {
            name: "amount0",
            type: "core::integer::u128"
          },
          {
            name: "amount1",
            type: "core::integer::u128"
          },
          {
            name: "min_liquidity",
            type: "core::integer::u128"
          }
        ],
        outputs: [
          {
            type: "core::integer::u128"
          }
        ],
        state_mutability: "external"
      },
      {
        type: "function",
        name: "deposit",
        inputs: [
          {
            name: "id",
            type: "core::integer::u64"
          },
          {
            name: "pool_key",
            type: "ekubo::types::keys::PoolKey"
          },
          {
            name: "bounds",
            type: "ekubo::types::bounds::Bounds"
          },
          {
            name: "min_liquidity",
            type: "core::integer::u128"
          }
        ],
        outputs: [
          {
            type: "core::integer::u128"
          }
        ],
        state_mutability: "external"
      },
      {
        type: "function",
        name: "deposit_amounts",
        inputs: [
          {
            name: "id",
            type: "core::integer::u64"
          },
          {
            name: "pool_key",
            type: "ekubo::types::keys::PoolKey"
          },
          {
            name: "bounds",
            type: "ekubo::types::bounds::Bounds"
          },
          {
            name: "amount0",
            type: "core::integer::u128"
          },
          {
            name: "amount1",
            type: "core::integer::u128"
          },
          {
            name: "min_liquidity",
            type: "core::integer::u128"
          }
        ],
        outputs: [
          {
            type: "core::integer::u128"
          }
        ],
        state_mutability: "external"
      },
      {
        type: "function",
        name: "mint_and_deposit",
        inputs: [
          {
            name: "pool_key",
            type: "ekubo::types::keys::PoolKey"
          },
          {
            name: "bounds",
            type: "ekubo::types::bounds::Bounds"
          },
          {
            name: "min_liquidity",
            type: "core::integer::u128"
          }
        ],
        outputs: [
          {
            type: "(core::integer::u64, core::integer::u128)"
          }
        ],
        state_mutability: "external"
      },
      {
        type: "function",
        name: "mint_and_deposit_with_referrer",
        inputs: [
          {
            name: "pool_key",
            type: "ekubo::types::keys::PoolKey"
          },
          {
            name: "bounds",
            type: "ekubo::types::bounds::Bounds"
          },
          {
            name: "min_liquidity",
            type: "core::integer::u128"
          },
          {
            name: "referrer",
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        outputs: [
          {
            type: "(core::integer::u64, core::integer::u128)"
          }
        ],
        state_mutability: "external"
      },
      {
        type: "function",
        name: "mint_and_deposit_and_clear_both",
        inputs: [
          {
            name: "pool_key",
            type: "ekubo::types::keys::PoolKey"
          },
          {
            name: "bounds",
            type: "ekubo::types::bounds::Bounds"
          },
          {
            name: "min_liquidity",
            type: "core::integer::u128"
          }
        ],
        outputs: [
          {
            type: "(core::integer::u64, core::integer::u128, core::integer::u256, core::integer::u256)"
          }
        ],
        state_mutability: "external"
      },
      {
        type: "function",
        name: "collect_fees",
        inputs: [
          {
            name: "id",
            type: "core::integer::u64"
          },
          {
            name: "pool_key",
            type: "ekubo::types::keys::PoolKey"
          },
          {
            name: "bounds",
            type: "ekubo::types::bounds::Bounds"
          }
        ],
        outputs: [
          {
            type: "(core::integer::u128, core::integer::u128)"
          }
        ],
        state_mutability: "external"
      },
      {
        type: "function",
        name: "withdraw",
        inputs: [
          {
            name: "id",
            type: "core::integer::u64"
          },
          {
            name: "pool_key",
            type: "ekubo::types::keys::PoolKey"
          },
          {
            name: "bounds",
            type: "ekubo::types::bounds::Bounds"
          },
          {
            name: "liquidity",
            type: "core::integer::u128"
          },
          {
            name: "min_token0",
            type: "core::integer::u128"
          },
          {
            name: "min_token1",
            type: "core::integer::u128"
          },
          {
            name: "collect_fees",
            type: "core::bool"
          }
        ],
        outputs: [
          {
            type: "(core::integer::u128, core::integer::u128)"
          }
        ],
        state_mutability: "external"
      },
      {
        type: "function",
        name: "withdraw_v2",
        inputs: [
          {
            name: "id",
            type: "core::integer::u64"
          },
          {
            name: "pool_key",
            type: "ekubo::types::keys::PoolKey"
          },
          {
            name: "bounds",
            type: "ekubo::types::bounds::Bounds"
          },
          {
            name: "liquidity",
            type: "core::integer::u128"
          },
          {
            name: "min_token0",
            type: "core::integer::u128"
          },
          {
            name: "min_token1",
            type: "core::integer::u128"
          }
        ],
        outputs: [
          {
            type: "(core::integer::u128, core::integer::u128)"
          }
        ],
        state_mutability: "external"
      },
      {
        type: "function",
        name: "get_pool_price",
        inputs: [
          {
            name: "pool_key",
            type: "ekubo::types::keys::PoolKey"
          }
        ],
        outputs: [
          {
            type: "ekubo::types::pool_price::PoolPrice"
          }
        ],
        state_mutability: "view"
      },
      {
        type: "function",
        name: "mint_and_increase_sell_amount",
        inputs: [
          {
            name: "order_key",
            type: "ekubo::interfaces::extensions::twamm::OrderKey"
          },
          {
            name: "amount",
            type: "core::integer::u128"
          }
        ],
        outputs: [
          {
            type: "(core::integer::u64, core::integer::u128)"
          }
        ],
        state_mutability: "external"
      },
      {
        type: "function",
        name: "increase_sell_amount_last",
        inputs: [
          {
            name: "order_key",
            type: "ekubo::interfaces::extensions::twamm::OrderKey"
          },
          {
            name: "amount",
            type: "core::integer::u128"
          }
        ],
        outputs: [
          {
            type: "core::integer::u128"
          }
        ],
        state_mutability: "external"
      },
      {
        type: "function",
        name: "increase_sell_amount",
        inputs: [
          {
            name: "id",
            type: "core::integer::u64"
          },
          {
            name: "order_key",
            type: "ekubo::interfaces::extensions::twamm::OrderKey"
          },
          {
            name: "amount",
            type: "core::integer::u128"
          }
        ],
        outputs: [
          {
            type: "core::integer::u128"
          }
        ],
        state_mutability: "external"
      },
      {
        type: "function",
        name: "decrease_sale_rate_to",
        inputs: [
          {
            name: "id",
            type: "core::integer::u64"
          },
          {
            name: "order_key",
            type: "ekubo::interfaces::extensions::twamm::OrderKey"
          },
          {
            name: "sale_rate_delta",
            type: "core::integer::u128"
          },
          {
            name: "recipient",
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        outputs: [
          {
            type: "core::integer::u128"
          }
        ],
        state_mutability: "external"
      },
      {
        type: "function",
        name: "decrease_sale_rate_to_self",
        inputs: [
          {
            name: "id",
            type: "core::integer::u64"
          },
          {
            name: "order_key",
            type: "ekubo::interfaces::extensions::twamm::OrderKey"
          },
          {
            name: "sale_rate_delta",
            type: "core::integer::u128"
          }
        ],
        outputs: [
          {
            type: "core::integer::u128"
          }
        ],
        state_mutability: "external"
      },
      {
        type: "function",
        name: "withdraw_proceeds_from_sale_to_self",
        inputs: [
          {
            name: "id",
            type: "core::integer::u64"
          },
          {
            name: "order_key",
            type: "ekubo::interfaces::extensions::twamm::OrderKey"
          }
        ],
        outputs: [
          {
            type: "core::integer::u128"
          }
        ],
        state_mutability: "external"
      },
      {
        type: "function",
        name: "withdraw_proceeds_from_sale_to",
        inputs: [
          {
            name: "id",
            type: "core::integer::u64"
          },
          {
            name: "order_key",
            type: "ekubo::interfaces::extensions::twamm::OrderKey"
          },
          {
            name: "recipient",
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        outputs: [
          {
            type: "core::integer::u128"
          }
        ],
        state_mutability: "external"
      },
      {
        type: "function",
        name: "swap_to_limit_order_price",
        inputs: [
          {
            name: "order_key",
            type: "ekubo::interfaces::extensions::limit_orders::OrderKey"
          },
          {
            name: "amount",
            type: "core::integer::u128"
          },
          {
            name: "recipient",
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        outputs: [
          {
            type: "(core::integer::u128, core::integer::u128)"
          }
        ],
        state_mutability: "external"
      },
      {
        type: "function",
        name: "swap_to_limit_order_price_and_maybe_mint_and_place_limit_order_to",
        inputs: [
          {
            name: "order_key",
            type: "ekubo::interfaces::extensions::limit_orders::OrderKey"
          },
          {
            name: "amount",
            type: "core::integer::u128"
          },
          {
            name: "recipient",
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        outputs: [
          {
            type: "(core::integer::u128, core::integer::u128, core::option::Option::<(core::integer::u64, core::integer::u128)>)"
          }
        ],
        state_mutability: "external"
      },
      {
        type: "function",
        name: "swap_to_limit_order_price_and_maybe_mint_and_place_limit_order",
        inputs: [
          {
            name: "order_key",
            type: "ekubo::interfaces::extensions::limit_orders::OrderKey"
          },
          {
            name: "amount",
            type: "core::integer::u128"
          }
        ],
        outputs: [
          {
            type: "(core::integer::u128, core::integer::u128, core::option::Option::<(core::integer::u64, core::integer::u128)>)"
          }
        ],
        state_mutability: "external"
      },
      {
        type: "function",
        name: "place_limit_order",
        inputs: [
          {
            name: "id",
            type: "core::integer::u64"
          },
          {
            name: "order_key",
            type: "ekubo::interfaces::extensions::limit_orders::OrderKey"
          },
          {
            name: "amount",
            type: "core::integer::u128"
          }
        ],
        outputs: [
          {
            type: "core::integer::u128"
          }
        ],
        state_mutability: "external"
      },
      {
        type: "function",
        name: "maybe_mint_and_place_limit_order",
        inputs: [
          {
            name: "order_key",
            type: "ekubo::interfaces::extensions::limit_orders::OrderKey"
          },
          {
            name: "amount",
            type: "core::integer::u128"
          }
        ],
        outputs: [
          {
            type: "core::option::Option::<(core::integer::u64, core::integer::u128)>"
          }
        ],
        state_mutability: "external"
      },
      {
        type: "function",
        name: "mint_and_place_limit_order",
        inputs: [
          {
            name: "order_key",
            type: "ekubo::interfaces::extensions::limit_orders::OrderKey"
          },
          {
            name: "amount",
            type: "core::integer::u128"
          }
        ],
        outputs: [
          {
            type: "(core::integer::u64, core::integer::u128)"
          }
        ],
        state_mutability: "external"
      },
      {
        type: "function",
        name: "close_limit_order",
        inputs: [
          {
            name: "id",
            type: "core::integer::u64"
          },
          {
            name: "order_key",
            type: "ekubo::interfaces::extensions::limit_orders::OrderKey"
          }
        ],
        outputs: [
          {
            type: "(core::integer::u128, core::integer::u128)"
          }
        ],
        state_mutability: "external"
      },
      {
        type: "function",
        name: "close_limit_order_to",
        inputs: [
          {
            name: "id",
            type: "core::integer::u64"
          },
          {
            name: "order_key",
            type: "ekubo::interfaces::extensions::limit_orders::OrderKey"
          },
          {
            name: "recipient",
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        outputs: [
          {
            type: "(core::integer::u128, core::integer::u128)"
          }
        ],
        state_mutability: "external"
      },
      {
        type: "function",
        name: "get_limit_orders_info",
        inputs: [
          {
            name: "params",
            type: "core::array::Span::<(core::integer::u64, ekubo::interfaces::extensions::limit_orders::OrderKey)>"
          }
        ],
        outputs: [
          {
            type: "core::array::Span::<ekubo::interfaces::extensions::limit_orders::GetOrderInfoResult>"
          }
        ],
        state_mutability: "view"
      }
    ]
  },
  {
    type: "impl",
    name: "Owned",
    interface_name: "ekubo::components::owned::IOwned"
  },
  {
    type: "interface",
    name: "ekubo::components::owned::IOwned",
    items: [
      {
        type: "function",
        name: "get_owner",
        inputs: [],
        outputs: [
          {
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        state_mutability: "view"
      },
      {
        type: "function",
        name: "transfer_ownership",
        inputs: [
          {
            name: "new_owner",
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        outputs: [],
        state_mutability: "external"
      }
    ]
  },
  {
    type: "impl",
    name: "Upgradeable",
    interface_name: "ekubo::interfaces::upgradeable::IUpgradeable"
  },
  {
    type: "interface",
    name: "ekubo::interfaces::upgradeable::IUpgradeable",
    items: [
      {
        type: "function",
        name: "replace_class_hash",
        inputs: [
          {
            name: "class_hash",
            type: "core::starknet::class_hash::ClassHash"
          }
        ],
        outputs: [],
        state_mutability: "external"
      }
    ]
  },
  {
    type: "impl",
    name: "Clear",
    interface_name: "ekubo::components::clear::IClear"
  },
  {
    type: "struct",
    name: "ekubo::interfaces::erc20::IERC20Dispatcher",
    members: [
      {
        name: "contract_address",
        type: "core::starknet::contract_address::ContractAddress"
      }
    ]
  },
  {
    type: "interface",
    name: "ekubo::components::clear::IClear",
    items: [
      {
        type: "function",
        name: "clear",
        inputs: [
          {
            name: "token",
            type: "ekubo::interfaces::erc20::IERC20Dispatcher"
          }
        ],
        outputs: [
          {
            type: "core::integer::u256"
          }
        ],
        state_mutability: "view"
      },
      {
        type: "function",
        name: "clear_minimum",
        inputs: [
          {
            name: "token",
            type: "ekubo::interfaces::erc20::IERC20Dispatcher"
          },
          {
            name: "minimum",
            type: "core::integer::u256"
          }
        ],
        outputs: [
          {
            type: "core::integer::u256"
          }
        ],
        state_mutability: "view"
      },
      {
        type: "function",
        name: "clear_minimum_to_recipient",
        inputs: [
          {
            name: "token",
            type: "ekubo::interfaces::erc20::IERC20Dispatcher"
          },
          {
            name: "minimum",
            type: "core::integer::u256"
          },
          {
            name: "recipient",
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        outputs: [
          {
            type: "core::integer::u256"
          }
        ],
        state_mutability: "view"
      }
    ]
  },
  {
    type: "impl",
    name: "Expires",
    interface_name: "ekubo::components::expires::IExpires"
  },
  {
    type: "interface",
    name: "ekubo::components::expires::IExpires",
    items: [
      {
        type: "function",
        name: "expires",
        inputs: [
          {
            name: "at",
            type: "core::integer::u64"
          }
        ],
        outputs: [],
        state_mutability: "view"
      }
    ]
  },
  {
    type: "struct",
    name: "ekubo::interfaces::core::ICoreDispatcher",
    members: [
      {
        name: "contract_address",
        type: "core::starknet::contract_address::ContractAddress"
      }
    ]
  },
  {
    type: "constructor",
    name: "constructor",
    inputs: [
      {
        name: "owner",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        name: "core",
        type: "ekubo::interfaces::core::ICoreDispatcher"
      },
      {
        name: "nft_class_hash",
        type: "core::starknet::class_hash::ClassHash"
      },
      {
        name: "token_uri_base",
        type: "core::felt252"
      }
    ]
  },
  {
    type: "event",
    name: "ekubo::components::upgradeable::Upgradeable::ClassHashReplaced",
    kind: "struct",
    members: [
      {
        name: "new_class_hash",
        type: "core::starknet::class_hash::ClassHash",
        kind: "data"
      }
    ]
  },
  {
    type: "event",
    name: "ekubo::components::upgradeable::Upgradeable::Event",
    kind: "enum",
    variants: [
      {
        name: "ClassHashReplaced",
        type: "ekubo::components::upgradeable::Upgradeable::ClassHashReplaced",
        kind: "nested"
      }
    ]
  },
  {
    type: "event",
    name: "ekubo::components::owned::Owned::OwnershipTransferred",
    kind: "struct",
    members: [
      {
        name: "old_owner",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data"
      },
      {
        name: "new_owner",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data"
      }
    ]
  },
  {
    type: "event",
    name: "ekubo::components::owned::Owned::Event",
    kind: "enum",
    variants: [
      {
        name: "OwnershipTransferred",
        type: "ekubo::components::owned::Owned::OwnershipTransferred",
        kind: "nested"
      }
    ]
  },
  {
    type: "event",
    name: "ekubo::positions::Positions::PositionMintedWithReferrer",
    kind: "struct",
    members: [
      {
        name: "id",
        type: "core::integer::u64",
        kind: "data"
      },
      {
        name: "referrer",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data"
      }
    ]
  },
  {
    type: "event",
    name: "ekubo::positions::Positions::Event",
    kind: "enum",
    variants: [
      {
        name: "UpgradeableEvent",
        type: "ekubo::components::upgradeable::Upgradeable::Event",
        kind: "flat"
      },
      {
        name: "OwnedEvent",
        type: "ekubo::components::owned::Owned::Event",
        kind: "nested"
      },
      {
        name: "PositionMintedWithReferrer",
        type: "ekubo::positions::Positions::PositionMintedWithReferrer",
        kind: "nested"
      }
    ]
  }
];

// src/data/ekubo-math.abi.json
var ekubo_math_abi_default = [
  {
    name: "MathLibImpl",
    type: "impl",
    interface_name: "ekubo::interfaces::mathlib::IMathLib"
  },
  {
    name: "core::integer::u256",
    type: "struct",
    members: [
      {
        name: "low",
        type: "core::integer::u128"
      },
      {
        name: "high",
        type: "core::integer::u128"
      }
    ]
  },
  {
    name: "core::bool",
    type: "enum",
    variants: [
      {
        name: "False",
        type: "()"
      },
      {
        name: "True",
        type: "()"
      }
    ]
  },
  {
    name: "ekubo::types::i129::i129",
    type: "struct",
    members: [
      {
        name: "mag",
        type: "core::integer::u128"
      },
      {
        name: "sign",
        type: "core::bool"
      }
    ]
  },
  {
    name: "ekubo::types::delta::Delta",
    type: "struct",
    members: [
      {
        name: "amount0",
        type: "ekubo::types::i129::i129"
      },
      {
        name: "amount1",
        type: "ekubo::types::i129::i129"
      }
    ]
  },
  {
    name: "core::option::Option::<core::integer::u256>",
    type: "enum",
    variants: [
      {
        name: "Some",
        type: "core::integer::u256"
      },
      {
        name: "None",
        type: "()"
      }
    ]
  },
  {
    name: "ekubo::interfaces::mathlib::IMathLib",
    type: "interface",
    items: [
      {
        name: "amount0_delta",
        type: "function",
        inputs: [
          {
            name: "sqrt_ratio_a",
            type: "core::integer::u256"
          },
          {
            name: "sqrt_ratio_b",
            type: "core::integer::u256"
          },
          {
            name: "liquidity",
            type: "core::integer::u128"
          },
          {
            name: "round_up",
            type: "core::bool"
          }
        ],
        outputs: [
          {
            type: "core::integer::u128"
          }
        ],
        state_mutability: "view"
      },
      {
        name: "amount1_delta",
        type: "function",
        inputs: [
          {
            name: "sqrt_ratio_a",
            type: "core::integer::u256"
          },
          {
            name: "sqrt_ratio_b",
            type: "core::integer::u256"
          },
          {
            name: "liquidity",
            type: "core::integer::u128"
          },
          {
            name: "round_up",
            type: "core::bool"
          }
        ],
        outputs: [
          {
            type: "core::integer::u128"
          }
        ],
        state_mutability: "view"
      },
      {
        name: "liquidity_delta_to_amount_delta",
        type: "function",
        inputs: [
          {
            name: "sqrt_ratio",
            type: "core::integer::u256"
          },
          {
            name: "liquidity_delta",
            type: "ekubo::types::i129::i129"
          },
          {
            name: "sqrt_ratio_lower",
            type: "core::integer::u256"
          },
          {
            name: "sqrt_ratio_upper",
            type: "core::integer::u256"
          }
        ],
        outputs: [
          {
            type: "ekubo::types::delta::Delta"
          }
        ],
        state_mutability: "view"
      },
      {
        name: "max_liquidity_for_token0",
        type: "function",
        inputs: [
          {
            name: "sqrt_ratio_lower",
            type: "core::integer::u256"
          },
          {
            name: "sqrt_ratio_upper",
            type: "core::integer::u256"
          },
          {
            name: "amount",
            type: "core::integer::u128"
          }
        ],
        outputs: [
          {
            type: "core::integer::u128"
          }
        ],
        state_mutability: "view"
      },
      {
        name: "max_liquidity_for_token1",
        type: "function",
        inputs: [
          {
            name: "sqrt_ratio_lower",
            type: "core::integer::u256"
          },
          {
            name: "sqrt_ratio_upper",
            type: "core::integer::u256"
          },
          {
            name: "amount",
            type: "core::integer::u128"
          }
        ],
        outputs: [
          {
            type: "core::integer::u128"
          }
        ],
        state_mutability: "view"
      },
      {
        name: "max_liquidity",
        type: "function",
        inputs: [
          {
            name: "sqrt_ratio",
            type: "core::integer::u256"
          },
          {
            name: "sqrt_ratio_lower",
            type: "core::integer::u256"
          },
          {
            name: "sqrt_ratio_upper",
            type: "core::integer::u256"
          },
          {
            name: "amount0",
            type: "core::integer::u128"
          },
          {
            name: "amount1",
            type: "core::integer::u128"
          }
        ],
        outputs: [
          {
            type: "core::integer::u128"
          }
        ],
        state_mutability: "view"
      },
      {
        name: "next_sqrt_ratio_from_amount0",
        type: "function",
        inputs: [
          {
            name: "sqrt_ratio",
            type: "core::integer::u256"
          },
          {
            name: "liquidity",
            type: "core::integer::u128"
          },
          {
            name: "amount",
            type: "ekubo::types::i129::i129"
          }
        ],
        outputs: [
          {
            type: "core::option::Option::<core::integer::u256>"
          }
        ],
        state_mutability: "view"
      },
      {
        name: "next_sqrt_ratio_from_amount1",
        type: "function",
        inputs: [
          {
            name: "sqrt_ratio",
            type: "core::integer::u256"
          },
          {
            name: "liquidity",
            type: "core::integer::u128"
          },
          {
            name: "amount",
            type: "ekubo::types::i129::i129"
          }
        ],
        outputs: [
          {
            type: "core::option::Option::<core::integer::u256>"
          }
        ],
        state_mutability: "view"
      },
      {
        name: "tick_to_sqrt_ratio",
        type: "function",
        inputs: [
          {
            name: "tick",
            type: "ekubo::types::i129::i129"
          }
        ],
        outputs: [
          {
            type: "core::integer::u256"
          }
        ],
        state_mutability: "view"
      },
      {
        name: "sqrt_ratio_to_tick",
        type: "function",
        inputs: [
          {
            name: "sqrt_ratio",
            type: "core::integer::u256"
          }
        ],
        outputs: [
          {
            type: "ekubo::types::i129::i129"
          }
        ],
        state_mutability: "view"
      }
    ]
  },
  {
    kind: "enum",
    name: "ekubo::mathlib::MathLib::Event",
    type: "event",
    variants: []
  }
];

// src/data/erc4626.abi.json
var erc4626_abi_default = [
  {
    name: "MyERC4626Impl",
    type: "impl",
    interface_name: "lst::lst::interface::IERC4626"
  },
  {
    name: "core::integer::u256",
    type: "struct",
    members: [
      {
        name: "low",
        type: "core::integer::u128"
      },
      {
        name: "high",
        type: "core::integer::u128"
      }
    ]
  },
  {
    name: "lst::lst::interface::IERC4626",
    type: "interface",
    items: [
      {
        name: "asset",
        type: "function",
        inputs: [],
        outputs: [
          {
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        state_mutability: "view"
      },
      {
        name: "total_assets",
        type: "function",
        inputs: [],
        outputs: [
          {
            type: "core::integer::u256"
          }
        ],
        state_mutability: "view"
      },
      {
        name: "convert_to_shares",
        type: "function",
        inputs: [
          {
            name: "assets",
            type: "core::integer::u256"
          }
        ],
        outputs: [
          {
            type: "core::integer::u256"
          }
        ],
        state_mutability: "view"
      },
      {
        name: "convert_to_assets",
        type: "function",
        inputs: [
          {
            name: "shares",
            type: "core::integer::u256"
          }
        ],
        outputs: [
          {
            type: "core::integer::u256"
          }
        ],
        state_mutability: "view"
      },
      {
        name: "max_deposit",
        type: "function",
        inputs: [
          {
            name: "receiver",
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        outputs: [
          {
            type: "core::integer::u256"
          }
        ],
        state_mutability: "view"
      },
      {
        name: "preview_deposit",
        type: "function",
        inputs: [
          {
            name: "assets",
            type: "core::integer::u256"
          }
        ],
        outputs: [
          {
            type: "core::integer::u256"
          }
        ],
        state_mutability: "view"
      },
      {
        name: "deposit",
        type: "function",
        inputs: [
          {
            name: "assets",
            type: "core::integer::u256"
          },
          {
            name: "receiver",
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        outputs: [
          {
            type: "core::integer::u256"
          }
        ],
        state_mutability: "external"
      },
      {
        name: "max_mint",
        type: "function",
        inputs: [
          {
            name: "receiver",
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        outputs: [
          {
            type: "core::integer::u256"
          }
        ],
        state_mutability: "view"
      },
      {
        name: "preview_mint",
        type: "function",
        inputs: [
          {
            name: "shares",
            type: "core::integer::u256"
          }
        ],
        outputs: [
          {
            type: "core::integer::u256"
          }
        ],
        state_mutability: "view"
      },
      {
        name: "mint",
        type: "function",
        inputs: [
          {
            name: "shares",
            type: "core::integer::u256"
          },
          {
            name: "receiver",
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        outputs: [
          {
            type: "core::integer::u256"
          }
        ],
        state_mutability: "external"
      },
      {
        name: "max_withdraw",
        type: "function",
        inputs: [
          {
            name: "owner",
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        outputs: [
          {
            type: "core::integer::u256"
          }
        ],
        state_mutability: "view"
      },
      {
        name: "preview_withdraw",
        type: "function",
        inputs: [
          {
            name: "assets",
            type: "core::integer::u256"
          }
        ],
        outputs: [
          {
            type: "core::integer::u256"
          }
        ],
        state_mutability: "view"
      },
      {
        name: "withdraw",
        type: "function",
        inputs: [
          {
            name: "assets",
            type: "core::integer::u256"
          },
          {
            name: "receiver",
            type: "core::starknet::contract_address::ContractAddress"
          },
          {
            name: "owner",
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        outputs: [
          {
            type: "core::integer::u256"
          }
        ],
        state_mutability: "external"
      },
      {
        name: "max_redeem",
        type: "function",
        inputs: [
          {
            name: "owner",
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        outputs: [
          {
            type: "core::integer::u256"
          }
        ],
        state_mutability: "view"
      },
      {
        name: "preview_redeem",
        type: "function",
        inputs: [
          {
            name: "shares",
            type: "core::integer::u256"
          }
        ],
        outputs: [
          {
            type: "core::integer::u256"
          }
        ],
        state_mutability: "view"
      },
      {
        name: "redeem",
        type: "function",
        inputs: [
          {
            name: "shares",
            type: "core::integer::u256"
          },
          {
            name: "receiver",
            type: "core::starknet::contract_address::ContractAddress"
          },
          {
            name: "owner",
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        outputs: [
          {
            type: "core::integer::u256"
          }
        ],
        state_mutability: "external"
      }
    ]
  },
  {
    name: "LSTAdditionalImpl",
    type: "impl",
    interface_name: "lst::lst::interface::ILSTAdditional"
  },
  {
    name: "core::byte_array::ByteArray",
    type: "struct",
    members: [
      {
        name: "data",
        type: "core::array::Array::<core::bytes_31::bytes31>"
      },
      {
        name: "pending_word",
        type: "core::felt252"
      },
      {
        name: "pending_word_len",
        type: "core::integer::u32"
      }
    ]
  },
  {
    name: "lst::withdrawal_queue::interface::IWithdrawalQueueDispatcher",
    type: "struct",
    members: [
      {
        name: "contract_address",
        type: "core::starknet::contract_address::ContractAddress"
      }
    ]
  },
  {
    name: "contracts::staking::interface::IStakingDispatcher",
    type: "struct",
    members: [
      {
        name: "contract_address",
        type: "core::starknet::contract_address::ContractAddress"
      }
    ]
  },
  {
    name: "lst::lst::interface::Config",
    type: "struct",
    members: [
      {
        name: "deposit_fee_bps",
        type: "core::integer::u256"
      },
      {
        name: "withdraw_fee_bps",
        type: "core::integer::u256"
      },
      {
        name: "rewards_fee_bps",
        type: "core::integer::u256"
      },
      {
        name: "treasury",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        name: "withdraw_queue",
        type: "lst::withdrawal_queue::interface::IWithdrawalQueueDispatcher"
      },
      {
        name: "staker",
        type: "contracts::staking::interface::IStakingDispatcher"
      },
      {
        name: "validator",
        type: "core::starknet::contract_address::ContractAddress"
      }
    ]
  },
  {
    name: "core::bool",
    type: "enum",
    variants: [
      {
        name: "False",
        type: "()"
      },
      {
        name: "True",
        type: "()"
      }
    ]
  },
  {
    name: "lst::lst::interface::DelegatorInfo",
    type: "struct",
    members: [
      {
        name: "is_active",
        type: "core::bool"
      },
      {
        name: "delegator_index",
        type: "core::integer::u32"
      }
    ]
  },
  {
    name: "lst::lst::interface::ILSTAdditional",
    type: "interface",
    items: [
      {
        name: "initializer",
        type: "function",
        inputs: [
          {
            name: "calldata",
            type: "core::array::Array::<core::felt252>"
          }
        ],
        outputs: [],
        state_mutability: "external"
      },
      {
        name: "deposit_with_referral",
        type: "function",
        inputs: [
          {
            name: "assets",
            type: "core::integer::u256"
          },
          {
            name: "receiver",
            type: "core::starknet::contract_address::ContractAddress"
          },
          {
            name: "referral",
            type: "core::byte_array::ByteArray"
          }
        ],
        outputs: [
          {
            type: "core::integer::u256"
          }
        ],
        state_mutability: "external"
      },
      {
        name: "set_config",
        type: "function",
        inputs: [
          {
            name: "config",
            type: "lst::lst::interface::Config"
          }
        ],
        outputs: [],
        state_mutability: "external"
      },
      {
        name: "get_config",
        type: "function",
        inputs: [],
        outputs: [
          {
            type: "lst::lst::interface::Config"
          }
        ],
        state_mutability: "view"
      },
      {
        name: "stake",
        type: "function",
        inputs: [
          {
            name: "delegator",
            type: "core::starknet::contract_address::ContractAddress"
          },
          {
            name: "amount",
            type: "core::integer::u256"
          }
        ],
        outputs: [],
        state_mutability: "external"
      },
      {
        name: "send_to_withdraw_queue",
        type: "function",
        inputs: [
          {
            name: "amount",
            type: "core::integer::u256"
          }
        ],
        outputs: [],
        state_mutability: "external"
      },
      {
        name: "before_unstake",
        type: "function",
        inputs: [
          {
            name: "new_amount",
            type: "core::integer::u256"
          },
          {
            name: "old_amount",
            type: "core::integer::u256"
          }
        ],
        outputs: [],
        state_mutability: "external"
      },
      {
        name: "add_delegator",
        type: "function",
        inputs: [
          {
            name: "delegator",
            type: "core::starknet::contract_address::ContractAddress"
          },
          {
            name: "amount",
            type: "core::integer::u256"
          }
        ],
        outputs: [],
        state_mutability: "external"
      },
      {
        name: "update_delegator_info",
        type: "function",
        inputs: [
          {
            name: "delegator",
            type: "core::starknet::contract_address::ContractAddress"
          },
          {
            name: "info",
            type: "lst::lst::interface::DelegatorInfo"
          }
        ],
        outputs: [],
        state_mutability: "external"
      },
      {
        name: "is_delegator",
        type: "function",
        inputs: [
          {
            name: "delegator",
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        outputs: [
          {
            type: "core::bool"
          }
        ],
        state_mutability: "view"
      },
      {
        name: "claim_rewards",
        type: "function",
        inputs: [],
        outputs: [],
        state_mutability: "external"
      }
    ]
  },
  {
    name: "CommonCompImpl",
    type: "impl",
    interface_name: "lst::utils::common::ICommon"
  },
  {
    name: "lst::utils::common::ICommon",
    type: "interface",
    items: [
      {
        name: "upgrade",
        type: "function",
        inputs: [
          {
            name: "new_class",
            type: "core::starknet::class_hash::ClassHash"
          }
        ],
        outputs: [],
        state_mutability: "external"
      },
      {
        name: "pause",
        type: "function",
        inputs: [],
        outputs: [],
        state_mutability: "external"
      },
      {
        name: "unpause",
        type: "function",
        inputs: [],
        outputs: [],
        state_mutability: "external"
      },
      {
        name: "is_paused",
        type: "function",
        inputs: [],
        outputs: [
          {
            type: "core::bool"
          }
        ],
        state_mutability: "view"
      },
      {
        name: "owner",
        type: "function",
        inputs: [],
        outputs: [
          {
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        state_mutability: "view"
      },
      {
        name: "transfer_ownership",
        type: "function",
        inputs: [
          {
            name: "new_owner",
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        outputs: [],
        state_mutability: "external"
      },
      {
        name: "renounce_ownership",
        type: "function",
        inputs: [],
        outputs: [],
        state_mutability: "external"
      }
    ]
  },
  {
    name: "AccessControlImpl",
    type: "impl",
    interface_name: "openzeppelin_access::accesscontrol::interface::IAccessControl"
  },
  {
    name: "openzeppelin_access::accesscontrol::interface::IAccessControl",
    type: "interface",
    items: [
      {
        name: "has_role",
        type: "function",
        inputs: [
          {
            name: "role",
            type: "core::felt252"
          },
          {
            name: "account",
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        outputs: [
          {
            type: "core::bool"
          }
        ],
        state_mutability: "view"
      },
      {
        name: "get_role_admin",
        type: "function",
        inputs: [
          {
            name: "role",
            type: "core::felt252"
          }
        ],
        outputs: [
          {
            type: "core::felt252"
          }
        ],
        state_mutability: "view"
      },
      {
        name: "grant_role",
        type: "function",
        inputs: [
          {
            name: "role",
            type: "core::felt252"
          },
          {
            name: "account",
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        outputs: [],
        state_mutability: "external"
      },
      {
        name: "revoke_role",
        type: "function",
        inputs: [
          {
            name: "role",
            type: "core::felt252"
          },
          {
            name: "account",
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        outputs: [],
        state_mutability: "external"
      },
      {
        name: "renounce_role",
        type: "function",
        inputs: [
          {
            name: "role",
            type: "core::felt252"
          },
          {
            name: "account",
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        outputs: [],
        state_mutability: "external"
      }
    ]
  },
  {
    name: "ERC4626MetadataImpl",
    type: "impl",
    interface_name: "openzeppelin_token::erc20::interface::IERC20Metadata"
  },
  {
    name: "openzeppelin_token::erc20::interface::IERC20Metadata",
    type: "interface",
    items: [
      {
        name: "name",
        type: "function",
        inputs: [],
        outputs: [
          {
            type: "core::byte_array::ByteArray"
          }
        ],
        state_mutability: "view"
      },
      {
        name: "symbol",
        type: "function",
        inputs: [],
        outputs: [
          {
            type: "core::byte_array::ByteArray"
          }
        ],
        state_mutability: "view"
      },
      {
        name: "decimals",
        type: "function",
        inputs: [],
        outputs: [
          {
            type: "core::integer::u8"
          }
        ],
        state_mutability: "view"
      }
    ]
  },
  {
    name: "ERC20Impl",
    type: "impl",
    interface_name: "openzeppelin_token::erc20::interface::IERC20"
  },
  {
    name: "openzeppelin_token::erc20::interface::IERC20",
    type: "interface",
    items: [
      {
        name: "total_supply",
        type: "function",
        inputs: [],
        outputs: [
          {
            type: "core::integer::u256"
          }
        ],
        state_mutability: "view"
      },
      {
        name: "balance_of",
        type: "function",
        inputs: [
          {
            name: "account",
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        outputs: [
          {
            type: "core::integer::u256"
          }
        ],
        state_mutability: "view"
      },
      {
        name: "allowance",
        type: "function",
        inputs: [
          {
            name: "owner",
            type: "core::starknet::contract_address::ContractAddress"
          },
          {
            name: "spender",
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        outputs: [
          {
            type: "core::integer::u256"
          }
        ],
        state_mutability: "view"
      },
      {
        name: "transfer",
        type: "function",
        inputs: [
          {
            name: "recipient",
            type: "core::starknet::contract_address::ContractAddress"
          },
          {
            name: "amount",
            type: "core::integer::u256"
          }
        ],
        outputs: [
          {
            type: "core::bool"
          }
        ],
        state_mutability: "external"
      },
      {
        name: "transfer_from",
        type: "function",
        inputs: [
          {
            name: "sender",
            type: "core::starknet::contract_address::ContractAddress"
          },
          {
            name: "recipient",
            type: "core::starknet::contract_address::ContractAddress"
          },
          {
            name: "amount",
            type: "core::integer::u256"
          }
        ],
        outputs: [
          {
            type: "core::bool"
          }
        ],
        state_mutability: "external"
      },
      {
        name: "approve",
        type: "function",
        inputs: [
          {
            name: "spender",
            type: "core::starknet::contract_address::ContractAddress"
          },
          {
            name: "amount",
            type: "core::integer::u256"
          }
        ],
        outputs: [
          {
            type: "core::bool"
          }
        ],
        state_mutability: "external"
      }
    ]
  },
  {
    name: "ERC20CamelOnlyImpl",
    type: "impl",
    interface_name: "openzeppelin_token::erc20::interface::IERC20CamelOnly"
  },
  {
    name: "openzeppelin_token::erc20::interface::IERC20CamelOnly",
    type: "interface",
    items: [
      {
        name: "totalSupply",
        type: "function",
        inputs: [],
        outputs: [
          {
            type: "core::integer::u256"
          }
        ],
        state_mutability: "view"
      },
      {
        name: "balanceOf",
        type: "function",
        inputs: [
          {
            name: "account",
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        outputs: [
          {
            type: "core::integer::u256"
          }
        ],
        state_mutability: "view"
      },
      {
        name: "transferFrom",
        type: "function",
        inputs: [
          {
            name: "sender",
            type: "core::starknet::contract_address::ContractAddress"
          },
          {
            name: "recipient",
            type: "core::starknet::contract_address::ContractAddress"
          },
          {
            name: "amount",
            type: "core::integer::u256"
          }
        ],
        outputs: [
          {
            type: "core::bool"
          }
        ],
        state_mutability: "external"
      }
    ]
  },
  {
    name: "constructor",
    type: "constructor",
    inputs: [
      {
        name: "name",
        type: "core::byte_array::ByteArray"
      },
      {
        name: "symbol",
        type: "core::byte_array::ByteArray"
      },
      {
        name: "asset",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        name: "owner",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        name: "config",
        type: "lst::lst::interface::Config"
      }
    ]
  },
  {
    kind: "struct",
    name: "openzeppelin_upgrades::upgradeable::UpgradeableComponent::Upgraded",
    type: "event",
    members: [
      {
        kind: "data",
        name: "class_hash",
        type: "core::starknet::class_hash::ClassHash"
      }
    ]
  },
  {
    kind: "enum",
    name: "openzeppelin_upgrades::upgradeable::UpgradeableComponent::Event",
    type: "event",
    variants: [
      {
        kind: "nested",
        name: "Upgraded",
        type: "openzeppelin_upgrades::upgradeable::UpgradeableComponent::Upgraded"
      }
    ]
  },
  {
    kind: "struct",
    name: "openzeppelin_security::pausable::PausableComponent::Paused",
    type: "event",
    members: [
      {
        kind: "data",
        name: "account",
        type: "core::starknet::contract_address::ContractAddress"
      }
    ]
  },
  {
    kind: "struct",
    name: "openzeppelin_security::pausable::PausableComponent::Unpaused",
    type: "event",
    members: [
      {
        kind: "data",
        name: "account",
        type: "core::starknet::contract_address::ContractAddress"
      }
    ]
  },
  {
    kind: "enum",
    name: "openzeppelin_security::pausable::PausableComponent::Event",
    type: "event",
    variants: [
      {
        kind: "nested",
        name: "Paused",
        type: "openzeppelin_security::pausable::PausableComponent::Paused"
      },
      {
        kind: "nested",
        name: "Unpaused",
        type: "openzeppelin_security::pausable::PausableComponent::Unpaused"
      }
    ]
  },
  {
    kind: "enum",
    name: "openzeppelin_security::reentrancyguard::ReentrancyGuardComponent::Event",
    type: "event",
    variants: []
  },
  {
    kind: "struct",
    name: "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferred",
    type: "event",
    members: [
      {
        kind: "key",
        name: "previous_owner",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        kind: "key",
        name: "new_owner",
        type: "core::starknet::contract_address::ContractAddress"
      }
    ]
  },
  {
    kind: "struct",
    name: "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferStarted",
    type: "event",
    members: [
      {
        kind: "key",
        name: "previous_owner",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        kind: "key",
        name: "new_owner",
        type: "core::starknet::contract_address::ContractAddress"
      }
    ]
  },
  {
    kind: "enum",
    name: "openzeppelin_access::ownable::ownable::OwnableComponent::Event",
    type: "event",
    variants: [
      {
        kind: "nested",
        name: "OwnershipTransferred",
        type: "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferred"
      },
      {
        kind: "nested",
        name: "OwnershipTransferStarted",
        type: "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferStarted"
      }
    ]
  },
  {
    kind: "enum",
    name: "lst::utils::common::CommonComp::Event",
    type: "event",
    variants: []
  },
  {
    kind: "struct",
    name: "lst::lst::erc4626::ERC4626Component::Deposit",
    type: "event",
    members: [
      {
        kind: "key",
        name: "sender",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        kind: "key",
        name: "owner",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        kind: "data",
        name: "assets",
        type: "core::integer::u256"
      },
      {
        kind: "data",
        name: "shares",
        type: "core::integer::u256"
      }
    ]
  },
  {
    kind: "struct",
    name: "lst::lst::erc4626::ERC4626Component::Withdraw",
    type: "event",
    members: [
      {
        kind: "key",
        name: "sender",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        kind: "key",
        name: "receiver",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        kind: "key",
        name: "owner",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        kind: "data",
        name: "assets",
        type: "core::integer::u256"
      },
      {
        kind: "data",
        name: "shares",
        type: "core::integer::u256"
      }
    ]
  },
  {
    kind: "enum",
    name: "lst::lst::erc4626::ERC4626Component::Event",
    type: "event",
    variants: [
      {
        kind: "nested",
        name: "Deposit",
        type: "lst::lst::erc4626::ERC4626Component::Deposit"
      },
      {
        kind: "nested",
        name: "Withdraw",
        type: "lst::lst::erc4626::ERC4626Component::Withdraw"
      }
    ]
  },
  {
    kind: "struct",
    name: "openzeppelin_token::erc20::erc20::ERC20Component::Transfer",
    type: "event",
    members: [
      {
        kind: "key",
        name: "from",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        kind: "key",
        name: "to",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        kind: "data",
        name: "value",
        type: "core::integer::u256"
      }
    ]
  },
  {
    kind: "struct",
    name: "openzeppelin_token::erc20::erc20::ERC20Component::Approval",
    type: "event",
    members: [
      {
        kind: "key",
        name: "owner",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        kind: "key",
        name: "spender",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        kind: "data",
        name: "value",
        type: "core::integer::u256"
      }
    ]
  },
  {
    kind: "enum",
    name: "openzeppelin_token::erc20::erc20::ERC20Component::Event",
    type: "event",
    variants: [
      {
        kind: "nested",
        name: "Transfer",
        type: "openzeppelin_token::erc20::erc20::ERC20Component::Transfer"
      },
      {
        kind: "nested",
        name: "Approval",
        type: "openzeppelin_token::erc20::erc20::ERC20Component::Approval"
      }
    ]
  },
  {
    kind: "enum",
    name: "lst::utils::access_control::MyAccessControlComp::Event",
    type: "event",
    variants: []
  },
  {
    kind: "struct",
    name: "openzeppelin_access::accesscontrol::accesscontrol::AccessControlComponent::RoleGranted",
    type: "event",
    members: [
      {
        kind: "data",
        name: "role",
        type: "core::felt252"
      },
      {
        kind: "data",
        name: "account",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        kind: "data",
        name: "sender",
        type: "core::starknet::contract_address::ContractAddress"
      }
    ]
  },
  {
    kind: "struct",
    name: "openzeppelin_access::accesscontrol::accesscontrol::AccessControlComponent::RoleRevoked",
    type: "event",
    members: [
      {
        kind: "data",
        name: "role",
        type: "core::felt252"
      },
      {
        kind: "data",
        name: "account",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        kind: "data",
        name: "sender",
        type: "core::starknet::contract_address::ContractAddress"
      }
    ]
  },
  {
    kind: "struct",
    name: "openzeppelin_access::accesscontrol::accesscontrol::AccessControlComponent::RoleAdminChanged",
    type: "event",
    members: [
      {
        kind: "data",
        name: "role",
        type: "core::felt252"
      },
      {
        kind: "data",
        name: "previous_admin_role",
        type: "core::felt252"
      },
      {
        kind: "data",
        name: "new_admin_role",
        type: "core::felt252"
      }
    ]
  },
  {
    kind: "enum",
    name: "openzeppelin_access::accesscontrol::accesscontrol::AccessControlComponent::Event",
    type: "event",
    variants: [
      {
        kind: "nested",
        name: "RoleGranted",
        type: "openzeppelin_access::accesscontrol::accesscontrol::AccessControlComponent::RoleGranted"
      },
      {
        kind: "nested",
        name: "RoleRevoked",
        type: "openzeppelin_access::accesscontrol::accesscontrol::AccessControlComponent::RoleRevoked"
      },
      {
        kind: "nested",
        name: "RoleAdminChanged",
        type: "openzeppelin_access::accesscontrol::accesscontrol::AccessControlComponent::RoleAdminChanged"
      }
    ]
  },
  {
    kind: "enum",
    name: "openzeppelin_introspection::src5::SRC5Component::Event",
    type: "event",
    variants: []
  },
  {
    kind: "struct",
    name: "lst::lst::interface::DispatchToStake",
    type: "event",
    members: [
      {
        kind: "key",
        name: "delegator",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        kind: "data",
        name: "amount",
        type: "core::integer::u256"
      }
    ]
  },
  {
    kind: "struct",
    name: "lst::lst::interface::DispatchToWithdrawQueue",
    type: "event",
    members: [
      {
        kind: "data",
        name: "amount",
        type: "core::integer::u256"
      }
    ]
  },
  {
    kind: "struct",
    name: "lst::lst::lst::LST::DelegatorUpdate",
    type: "event",
    members: [
      {
        kind: "key",
        name: "delegator",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        kind: "data",
        name: "info",
        type: "lst::lst::interface::DelegatorInfo"
      }
    ]
  },
  {
    kind: "struct",
    name: "lst::lst::interface::Fee",
    type: "event",
    members: [
      {
        kind: "data",
        name: "amount",
        type: "core::integer::u256"
      },
      {
        kind: "key",
        name: "token",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        kind: "key",
        name: "receiver",
        type: "core::starknet::contract_address::ContractAddress"
      }
    ]
  },
  {
    kind: "struct",
    name: "lst::lst::lst::LST::Referral",
    type: "event",
    members: [
      {
        kind: "key",
        name: "referrer",
        type: "core::byte_array::ByteArray"
      },
      {
        kind: "key",
        name: "referee",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        kind: "data",
        name: "assets",
        type: "core::integer::u256"
      }
    ]
  },
  {
    kind: "enum",
    name: "lst::lst::lst::LST::Event",
    type: "event",
    variants: [
      {
        kind: "flat",
        name: "UpgradeableEvent",
        type: "openzeppelin_upgrades::upgradeable::UpgradeableComponent::Event"
      },
      {
        kind: "flat",
        name: "PausableEvent",
        type: "openzeppelin_security::pausable::PausableComponent::Event"
      },
      {
        kind: "flat",
        name: "ReentrancyGuardEvent",
        type: "openzeppelin_security::reentrancyguard::ReentrancyGuardComponent::Event"
      },
      {
        kind: "flat",
        name: "OwnableEvent",
        type: "openzeppelin_access::ownable::ownable::OwnableComponent::Event"
      },
      {
        kind: "flat",
        name: "CommonCompEvent",
        type: "lst::utils::common::CommonComp::Event"
      },
      {
        kind: "flat",
        name: "ERC4626Event",
        type: "lst::lst::erc4626::ERC4626Component::Event"
      },
      {
        kind: "flat",
        name: "ERC20Event",
        type: "openzeppelin_token::erc20::erc20::ERC20Component::Event"
      },
      {
        kind: "flat",
        name: "MyAccessControlCompEvent",
        type: "lst::utils::access_control::MyAccessControlComp::Event"
      },
      {
        kind: "flat",
        name: "AccessControlComponentEvent",
        type: "openzeppelin_access::accesscontrol::accesscontrol::AccessControlComponent::Event"
      },
      {
        kind: "flat",
        name: "SRC5Event",
        type: "openzeppelin_introspection::src5::SRC5Component::Event"
      },
      {
        kind: "nested",
        name: "DispatchToStake",
        type: "lst::lst::interface::DispatchToStake"
      },
      {
        kind: "nested",
        name: "DispatchToWithdrawQueue",
        type: "lst::lst::interface::DispatchToWithdrawQueue"
      },
      {
        kind: "nested",
        name: "DelegatorUpdate",
        type: "lst::lst::lst::LST::DelegatorUpdate"
      },
      {
        kind: "nested",
        name: "Fee",
        type: "lst::lst::interface::Fee"
      },
      {
        kind: "nested",
        name: "Referral",
        type: "lst::lst::lst::LST::Referral"
      }
    ]
  }
];

// src/strategies/ekubo-cl-vault.ts
var EkuboCLVault = class _EkuboCLVault extends BaseStrategy {
  /**
   * Creates a new VesuRebalance strategy instance.
   * @param config - Configuration object containing provider and other settings
   * @param pricer - Pricer instance for token price calculations
   * @param metadata - Strategy metadata including deposit tokens and address
   * @throws {Error} If more than one deposit token is specified
   */
  constructor(config, pricer, metadata) {
    super(config);
    this.BASE_WEIGHT = 1e4;
    this.pricer = pricer;
    assert(metadata.depositTokens.length === 2, "EkuboCL only supports 2 deposit token");
    this.metadata = metadata;
    this.address = metadata.address;
    this.contract = new import_starknet8.Contract(cl_vault_abi_default, this.address.address, this.config.provider);
    this.lstContract = new import_starknet8.Contract(erc4626_abi_default, this.metadata.additionalInfo.lstContract.address, this.config.provider);
    const EKUBO_POSITION = "0x02e0af29598b407c8716b17f6d2795eca1b471413fa03fb145a5e33722184067";
    this.ekuboPositionsContract = new import_starknet8.Contract(ekubo_positions_abi_default, EKUBO_POSITION, this.config.provider);
    const EKUBO_MATH = "0x04a72e9e166f6c0e9d800af4dc40f6b6fb4404b735d3f528d9250808b2481995";
    this.ekuboMathContract = new import_starknet8.Contract(ekubo_math_abi_default, EKUBO_MATH, this.config.provider);
    this.avnu = new AvnuWrapper();
  }
  depositCall(amountInfo, receiver) {
    return [];
  }
  withdrawCall(amountInfo, receiver, owner) {
    return [];
  }
  rebalanceCall(newBounds, swapParams) {
    return [this.contract.populate("rebalance", [
      {
        lower: _EkuboCLVault.tickToi129(Number(newBounds.lowerTick)),
        upper: _EkuboCLVault.tickToi129(Number(newBounds.upperTick))
      },
      swapParams
    ])];
  }
  handleUnusedCall(swapParams) {
    return [this.contract.populate("handle_unused", [
      swapParams
    ])];
  }
  handleFeesCall() {
    return [this.contract.populate("handle_fees", [])];
  }
  async getUserTVL(user) {
    throw new Error("Not implemented");
  }
  async getTVL() {
    const result = await this.contract.call("total_liquidity", []);
    const bounds = await this.getCurrentBounds();
    const { amount0, amount1 } = await this.getLiquidityToAmounts(Web3Number.fromWei(result.toString(), 18), bounds);
    const poolKey = await this.getPoolKey();
    const token0Info = await Global.getTokenInfoFromAddr(poolKey.token0);
    const token1Info = await Global.getTokenInfoFromAddr(poolKey.token1);
    const P0 = await this.pricer.getPrice(token0Info.symbol);
    const P1 = await this.pricer.getPrice(token1Info.symbol);
    const token0Usd = Number(amount0.toFixed(13)) * P0.price;
    const token1Usd = Number(amount1.toFixed(13)) * P1.price;
    return {
      netUsdValue: token0Usd + token1Usd,
      token0: {
        tokenInfo: token0Info,
        amount: amount0,
        usdValue: token0Usd
      },
      token1: {
        tokenInfo: token1Info,
        amount: amount1,
        usdValue: token1Usd
      }
    };
  }
  async getUncollectedFees() {
    const nftID = await this.getCurrentNFTID();
    const poolKey = await this.getPoolKey();
    const currentBounds = await this.getCurrentBounds();
    const result = await this.ekuboPositionsContract.call("get_token_info", [
      nftID,
      {
        token0: poolKey.token0.address,
        token1: poolKey.token1.address,
        fee: poolKey.fee,
        tick_spacing: poolKey.tick_spacing,
        extension: poolKey.extension
      },
      {
        lower: _EkuboCLVault.tickToi129(Number(currentBounds.lowerTick)),
        upper: _EkuboCLVault.tickToi129(Number(currentBounds.upperTick))
      }
    ]);
    const token0Info = await Global.getTokenInfoFromAddr(poolKey.token0);
    const token1Info = await Global.getTokenInfoFromAddr(poolKey.token1);
    const P0 = await this.pricer.getPrice(token0Info.symbol);
    const P1 = await this.pricer.getPrice(token1Info.symbol);
    const token0Web3 = Web3Number.fromWei(result.fees0.toString(), token0Info.decimals);
    const token1Web3 = Web3Number.fromWei(result.fees1.toString(), token1Info.decimals);
    const token0Usd = Number(token0Web3.toFixed(13)) * P0.price;
    const token1Usd = Number(token1Web3.toFixed(13)) * P1.price;
    return {
      netUsdValue: token0Usd + token1Usd,
      token0: {
        tokenInfo: token0Info,
        amount: token0Web3,
        usdValue: token0Usd
      },
      token1: {
        tokenInfo: token1Info,
        amount: token1Web3,
        usdValue: token1Usd
      }
    };
  }
  async getCurrentNFTID() {
    const result = await this.contract.call("get_position_key", []);
    return Number(result.salt.toString());
  }
  async truePrice() {
    const result = await this.lstContract.call("convert_to_assets", [import_starknet8.uint256.bnToUint256(BigInt(1e18).toString())]);
    const truePrice = Number(BigInt(result.toString()) * BigInt(1e9) / BigInt(1e18)) / 1e9;
    return truePrice;
  }
  async getCurrentPrice() {
    const poolKey = await this.getPoolKey();
    return this._getCurrentPrice(poolKey);
  }
  async _getCurrentPrice(poolKey) {
    const priceInfo = await this.ekuboPositionsContract.call("get_pool_price", [
      {
        token0: poolKey.token0.address,
        token1: poolKey.token1.address,
        fee: poolKey.fee,
        tick_spacing: poolKey.tick_spacing,
        extension: poolKey.extension
      }
    ]);
    const sqrtRatio = _EkuboCLVault.div2Power128(BigInt(priceInfo.sqrt_ratio.toString()));
    const price = sqrtRatio * sqrtRatio;
    const tick = _EkuboCLVault.priceToTick(price, true, Number(poolKey.tick_spacing));
    return {
      price,
      tick: tick.mag * (tick.sign == 0 ? 1 : -1)
    };
  }
  async getCurrentBounds() {
    const result = await this.contract.call("get_position_key", []);
    return {
      lowerTick: _EkuboCLVault.i129ToNumber(result.bounds.lower),
      upperTick: _EkuboCLVault.i129ToNumber(result.bounds.upper)
    };
  }
  static div2Power128(num3) {
    return Number(BigInt(num3.toString()) * 1000000n / BigInt(2 ** 128)) / 1e6;
  }
  static priceToTick(price, isRoundDown, tickSpacing) {
    const value = isRoundDown ? Math.floor(Math.log(price) / Math.log(1.000001)) : Math.ceil(Math.log(price) / Math.log(1.000001));
    const tick = Math.floor(value / tickSpacing) * tickSpacing;
    return this.tickToi129(tick);
  }
  async getPoolKey() {
    if (this.poolKey) {
      return this.poolKey;
    }
    const result = await this.contract.call("get_settings", []);
    const poolKey = {
      token0: ContractAddr.from(result.pool_key.token0.toString()),
      token1: ContractAddr.from(result.pool_key.token1.toString()),
      fee: result.pool_key.fee.toString(),
      tick_spacing: result.pool_key.tick_spacing.toString(),
      extension: result.pool_key.extension.toString()
    };
    const token0Info = await Global.getTokenInfoFromAddr(poolKey.token0);
    const token1Info = await Global.getTokenInfoFromAddr(poolKey.token1);
    assert(token0Info.decimals == token1Info.decimals, "Tested only for equal decimals");
    this.poolKey = poolKey;
    return poolKey;
  }
  async getNewBounds() {
    const poolKey = await this.getPoolKey();
    const currentPrice = await this._getCurrentPrice(poolKey);
    const newLower = currentPrice.tick + Number(this.metadata.additionalInfo.newBounds.lower) * Number(poolKey.tick_spacing);
    const newUpper = currentPrice.tick + Number(this.metadata.additionalInfo.newBounds.upper) * Number(poolKey.tick_spacing);
    return {
      lowerTick: BigInt(newLower),
      upperTick: BigInt(newUpper)
    };
  }
  /**
   * Computes the expected amounts to fully utilize amount in
   * to add liquidity to the pool
   * @param amount0: amount of token0
   * @param amount1: amount of token1
   * @returns {amount0, amount1}
   */
  async _getExpectedAmountsForLiquidity(amount0, amount1, bounds) {
    assert(amount0.greaterThan(0) || amount1.greaterThan(0), "Amount is 0");
    const poolKey = await this.getPoolKey();
    const sampleLiq = 1e18;
    const { amount0: sampleAmount0, amount1: sampleAmount1 } = await this.getLiquidityToAmounts(Web3Number.fromWei(sampleLiq.toString(), 18), bounds);
    logger.verbose(`${_EkuboCLVault.name}: _getExpectedAmountsForLiquidity => sampleAmount0: ${sampleAmount0.toString()}, sampleAmount1: ${sampleAmount1.toString()}`);
    assert(!sampleAmount0.eq(0) && !sampleAmount1.eq(0), "Sample amount is 0");
    const price = await (await this.getCurrentPrice()).price;
    logger.verbose(`${_EkuboCLVault.name}: _getExpectedAmountsForLiquidity => price: ${price}`);
    if (amount1.eq(0) && amount0.greaterThan(0)) {
      if (sampleAmount1.eq(0)) {
        return {
          amount0,
          amount1: Web3Number.fromWei("0", 18),
          ratio: Infinity
        };
      } else if (sampleAmount0.eq(0)) {
        return {
          amount0: Web3Number.fromWei("0", 18),
          amount1: amount0.multipliedBy(price),
          ratio: 0
        };
      }
    } else if (amount0.eq(0) && amount1.greaterThan(0)) {
      if (sampleAmount0.eq(0)) {
        return {
          amount0: Web3Number.fromWei("0", 18),
          amount1,
          ratio: 0
        };
      } else if (sampleAmount1.eq(0)) {
        return {
          amount0: amount1.dividedBy(price),
          amount1: Web3Number.fromWei("0", 18),
          ratio: Infinity
        };
      }
    }
    const ratio = sampleAmount0.multipliedBy(1e18).dividedBy(sampleAmount1.toString()).dividedBy(1e18);
    logger.verbose(`${_EkuboCLVault.name}: ${this.metadata.name} => ratio: ${ratio.toString()}`);
    return this._solveExpectedAmountsEq(amount0, amount1, ratio, price);
  }
  _solveExpectedAmountsEq(availableAmount0, availableAmount1, ratio, price) {
    const y = ratio.multipliedBy(availableAmount1).minus(availableAmount0).dividedBy(ratio.plus(1 / price));
    const x = y.dividedBy(price);
    return {
      amount0: availableAmount0.plus(x),
      amount1: availableAmount1.minus(y),
      ratio: Number(ratio.toString())
    };
  }
  async getSwapInfoToHandleUnused(considerRebalance = true) {
    const poolKey = await this.getPoolKey();
    const erc20Mod = new ERC20(this.config);
    const token0Bal1 = await erc20Mod.balanceOf(poolKey.token0, this.address.address, 18);
    const token1Bal1 = await erc20Mod.balanceOf(poolKey.token1, this.address.address, 18);
    const token0Info = await Global.getTokenInfoFromAddr(poolKey.token0);
    const token1Info = await Global.getTokenInfoFromAddr(poolKey.token1);
    const token0Price = await this.pricer.getPrice(token0Info.symbol);
    const token1Price = await this.pricer.getPrice(token1Info.symbol);
    const token0PriceUsd = token0Price.price * Number(token0Bal1.toFixed(13));
    const token1PriceUsd = token1Price.price * Number(token1Bal1.toFixed(13));
    if (token0PriceUsd > 1 && token1PriceUsd > 1) {
      throw new Error("Both tokens are non-zero and above $1, call handle_fees first");
    }
    let token0Bal = token0Bal1;
    let token1Bal = token1Bal1;
    if (considerRebalance) {
      const tvl = await this.getTVL();
      token0Bal = token0Bal.plus(tvl.token0.amount.toString());
      token1Bal = token1Bal.plus(tvl.token1.amount.toString());
    } else {
      logger.verbose(`${_EkuboCLVault.name}: getSwapInfoToHandleUnused => considerRebalance: false`);
    }
    logger.verbose(`${_EkuboCLVault.name}: getSwapInfoToHandleUnused => token0Bal: ${token0Bal.toString()}, token1Bal: ${token1Bal.toString()}`);
    const newBounds = await this.getNewBounds();
    logger.verbose(`${_EkuboCLVault.name}: getSwapInfoToHandleUnused => newBounds: ${newBounds.lowerTick}, ${newBounds.upperTick}`);
    let expectedAmounts = await this._getExpectedAmountsForLiquidity(token0Bal, token1Bal, newBounds);
    logger.verbose(`${_EkuboCLVault.name}: getSwapInfoToHandleUnused => expectedAmounts: ${expectedAmounts.amount0.toString()}, ${expectedAmounts.amount1.toString()}`);
    let retry = 0;
    const maxRetry = 10;
    while (retry < maxRetry) {
      retry++;
      if (expectedAmounts.amount0.lessThan(token0Bal) && expectedAmounts.amount1.lessThan(token1Bal)) {
        throw new Error("Both tokens are decreased, something is wrong");
      }
      if (expectedAmounts.amount0.greaterThan(token0Bal) && expectedAmounts.amount1.greaterThan(token1Bal)) {
        throw new Error("Both tokens are increased, something is wrong");
      }
      const tokenToSell = expectedAmounts.amount0.lessThan(token0Bal) ? poolKey.token0 : poolKey.token1;
      const tokenToBuy = tokenToSell == poolKey.token0 ? poolKey.token1 : poolKey.token0;
      let amountToSell = tokenToSell == poolKey.token0 ? token0Bal.minus(expectedAmounts.amount0) : token1Bal.minus(expectedAmounts.amount1);
      const remainingSellAmount = tokenToSell == poolKey.token0 ? expectedAmounts.amount0 : expectedAmounts.amount1;
      const tokenToBuyInfo = await Global.getTokenInfoFromAddr(tokenToBuy);
      const expectedRatio = expectedAmounts.ratio;
      logger.verbose(`${_EkuboCLVault.name}: getSwapInfoToHandleUnused => tokenToSell: ${tokenToSell.address}, tokenToBuy: ${tokenToBuy.address}, amountToSell: ${amountToSell.toWei()}`);
      logger.verbose(`${_EkuboCLVault.name}: getSwapInfoToHandleUnused => remainingSellAmount: ${remainingSellAmount.toString()}`);
      logger.verbose(`${_EkuboCLVault.name}: getSwapInfoToHandleUnused => expectedRatio: ${expectedRatio}`);
      const quote = await this.avnu.getQuotes(tokenToSell.address, tokenToBuy.address, amountToSell.toWei(), this.address.address);
      if (remainingSellAmount.eq(0)) {
        const minAmountOut = Web3Number.fromWei(quote.buyAmount.toString(), tokenToBuyInfo.decimals).multipliedBy(0.9999);
        return await this.avnu.getSwapInfo(quote, this.address.address, 0, this.address.address, minAmountOut.toWei());
      }
      const amountOut = Web3Number.fromWei(quote.buyAmount.toString(), tokenToBuyInfo.decimals);
      const swapPrice = tokenToSell == poolKey.token0 ? amountOut.dividedBy(amountToSell) : amountToSell.dividedBy(amountOut);
      const newRatio = tokenToSell == poolKey.token0 ? remainingSellAmount.dividedBy(token1Bal.plus(amountOut)) : token0Bal.plus(amountOut).dividedBy(remainingSellAmount);
      logger.verbose(`${_EkuboCLVault.name}: getSwapInfoToHandleUnused => amountOut: ${amountOut.toString()}`);
      logger.verbose(`${_EkuboCLVault.name}: getSwapInfoToHandleUnused => swapPrice: ${swapPrice.toString()}`);
      logger.verbose(`${_EkuboCLVault.name}: getSwapInfoToHandleUnused => newRatio: ${newRatio.toString()}`);
      if (Number(newRatio.toString()) > expectedRatio * 1.0000001 || Number(newRatio.toString()) < expectedRatio * 0.9999999) {
        expectedAmounts = await this._solveExpectedAmountsEq(token0Bal, token1Bal, new Web3Number(Number(expectedRatio).toFixed(13), 18), Number(swapPrice.toString()));
        logger.verbose(`${_EkuboCLVault.name}: getSwapInfoToHandleUnused => expectedAmounts: ${expectedAmounts.amount0.toString()}, ${expectedAmounts.amount1.toString()}`);
      } else {
        const minAmountOut = Web3Number.fromWei(quote.buyAmount.toString(), tokenToBuyInfo.decimals).multipliedBy(0.9999);
        return await this.avnu.getSwapInfo(quote, this.address.address, 0, this.address.address, minAmountOut.toWei());
      }
      retry++;
    }
    throw new Error("Failed to get swap info");
  }
  static tickToi129(tick) {
    if (tick < 0) {
      return {
        mag: -tick,
        sign: 1
      };
    } else {
      return {
        mag: tick,
        sign: 0
      };
    }
  }
  static priceToSqrtRatio(price) {
    return BigInt(Math.floor(Math.sqrt(price) * 10 ** 9)) * BigInt(2 ** 128) / BigInt(1e9);
  }
  static i129ToNumber(i129) {
    return i129.mag * (i129.sign.toString() == "false" ? 1n : -1n);
  }
  static tickToPrice(tick) {
    return Math.pow(1.000001, Number(tick));
  }
  async getLiquidityToAmounts(liquidity, bounds) {
    const currentPrice = await this.getCurrentPrice();
    const lowerPrice = await _EkuboCLVault.tickToPrice(bounds.lowerTick);
    const upperPrice = await _EkuboCLVault.tickToPrice(bounds.upperTick);
    logger.verbose(`${_EkuboCLVault.name}: getLiquidityToAmounts => currentPrice: ${currentPrice.price}, lowerPrice: ${lowerPrice}, upperPrice: ${upperPrice}`);
    const result = await this.ekuboMathContract.call("liquidity_delta_to_amount_delta", [
      import_starknet8.uint256.bnToUint256(_EkuboCLVault.priceToSqrtRatio(currentPrice.price).toString()),
      {
        mag: liquidity.toWei(),
        sign: 0
      },
      import_starknet8.uint256.bnToUint256(_EkuboCLVault.priceToSqrtRatio(lowerPrice).toString()),
      import_starknet8.uint256.bnToUint256(_EkuboCLVault.priceToSqrtRatio(upperPrice).toString())
    ]);
    const poolKey = await this.getPoolKey();
    const token0Info = await Global.getTokenInfoFromAddr(poolKey.token0);
    const token1Info = await Global.getTokenInfoFromAddr(poolKey.token1);
    const amount0 = Web3Number.fromWei(_EkuboCLVault.i129ToNumber(result.amount0).toString(), token0Info.decimals);
    const amount1 = Web3Number.fromWei(_EkuboCLVault.i129ToNumber(result.amount1).toString(), token1Info.decimals);
    return {
      amount0,
      amount1
    };
  }
};
var _description2 = "Automatically rebalances liquidity near current price to maximize yield while reducing the necessity to manually rebalance positions frequently. Fees earn and Defi spring rewards are automatically re-invested.";
var _protocol2 = { name: "Ekubo", logo: "https://app.ekubo.org/favicon.ico" };
var _riskFactor2 = [
  { type: "Smart Contract Risk" /* SMART_CONTRACT_RISK */, value: 0.5, weight: 25 },
  { type: "Impermanent Loss Risk" /* IMPERMANENT_LOSS */, value: 1, weight: 75 }
];
var EkuboCLVaultStrategies = [{
  name: "Ekubo xSTRK/STRK",
  description: _description2,
  address: ContractAddr.from("0x01f083b98674bc21effee29ef443a00c7b9a500fd92cf30341a3da12c73f2324"),
  type: "Other",
  depositTokens: [Global.getDefaultTokens().find((t) => t.symbol === "STRK"), Global.getDefaultTokens().find((t) => t.symbol === "xSTRK")],
  protocols: [_protocol2],
  maxTVL: Web3Number.fromWei("0", 18),
  risk: {
    riskFactor: _riskFactor2,
    netRisk: _riskFactor2.reduce((acc, curr) => acc + curr.value * curr.weight, 0) / _riskFactor2.reduce((acc, curr) => acc + curr.weight, 0)
  },
  additionalInfo: {
    newBounds: {
      lower: -1,
      upper: 1
    },
    lstContract: ContractAddr.from("0x028d709c875c0ceac3dce7065bec5328186dc89fe254527084d1689910954b0a")
  }
}];

// src/notifs/telegram.ts
var import_node_telegram_bot_api = __toESM(require("node-telegram-bot-api"));
var TelegramNotif = class {
  constructor(token, shouldPoll) {
    this.subscribers = [
      // '6820228303',
      "1505578076",
      // '5434736198', // maaza
      "1356705582",
      // langs
      "1388729514",
      // hwashere
      "6020162572",
      //minato
      "985902592"
    ];
    this.bot = new import_node_telegram_bot_api.default(token, { polling: shouldPoll });
  }
  // listen to start msgs, register chatId and send registered msg
  activateChatBot() {
    this.bot.on("message", (msg) => {
      const chatId = msg.chat.id;
      let text = msg.text.toLowerCase().trim();
      logger.verbose(`Tg: IncomingMsg: ID: ${chatId}, msg: ${text}`);
      if (text == "start") {
        this.bot.sendMessage(chatId, "Registered");
        this.subscribers.push(chatId);
        logger.verbose(`Tg: New subscriber: ${chatId}`);
      } else {
        this.bot.sendMessage(chatId, "Unrecognized command. Supported commands: start");
      }
    });
  }
  // send a given msg to all registered users
  sendMessage(msg) {
    logger.verbose(`Tg: Sending message: ${msg}`);
    for (let chatId of this.subscribers) {
      this.bot.sendMessage(chatId, msg).catch((err) => {
        logger.error(`Tg: Error sending msg to ${chatId}`);
        logger.error(`Tg: Error sending message: ${err.message}`);
      }).then(() => {
        logger.verbose(`Tg: Message sent to ${chatId}`);
      });
    }
  }
};

// src/node/pricer-redis.ts
var import_redis = require("redis");
var PricerRedis = class extends Pricer {
  constructor(config, tokens2) {
    super(config, tokens2);
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
  async close() {
    if (this.redisClient) {
      await this.redisClient.disconnect();
    }
  }
  async initRedis(redisUrl) {
    logger.info(`Initialising Redis Client`);
    this.redisClient = await (0, import_redis.createClient)({
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

// src/utils/store.ts
var import_fs = __toESM(require("fs"));
var import_starknet9 = require("starknet");
var crypto2 = __toESM(require("crypto"));

// src/utils/encrypt.ts
var crypto = __toESM(require("crypto"));
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
  getAccount(accountKey, txVersion = import_starknet9.constants.TRANSACTION_VERSION.V2) {
    const accounts = this.loadAccounts();
    logger.verbose(`nAccounts loaded for network: ${Object.keys(accounts).length}`);
    const data = accounts[accountKey];
    if (!data) {
      throw new Error(`Account not found: ${accountKey}`);
    }
    logger.verbose(`Account loaded: ${accountKey} from network: ${this.config.network}`);
    logger.verbose(`Address: ${data.address}`);
    const acc = new import_starknet9.Account(this.config.provider, data.address, data.pk, void 0, txVersion);
    return acc;
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
    (0, import_fs.writeFileSync)(this.getAccountFilePath(), encryptedData);
    logger.verbose(`Account added: ${accountKey} to network: ${this.config.network}`);
  }
  getAccountFilePath() {
    const path = `${this.storeConfig.SECRET_FILE_FOLDER}/${this.storeConfig.ACCOUNTS_FILE_NAME}`;
    logger.verbose(`Path: ${path}`);
    return path;
  }
  getAllAccounts() {
    const PATH = this.getAccountFilePath();
    if (!import_fs.default.existsSync(PATH)) {
      logger.verbose(`Accounts: files doesnt exist`);
      return {};
    }
    let encryptedData = (0, import_fs.readFileSync)(PATH, {
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
    if (!import_fs.default.existsSync(folder)) {
      import_fs.default.mkdirSync(folder, { recursive: true });
    }
    if (!import_fs.default.existsSync(`${folder}`)) {
      throw new Error(`Store folder not found: ${folder}`);
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AutoCompounderSTRK,
  AvnuWrapper,
  ContractAddr,
  ERC20,
  EkuboCLVault,
  EkuboCLVaultStrategies,
  FatalError,
  FlowChartColors,
  Global,
  ILending,
  Initializable,
  MarginType,
  Network,
  PasswordJsonCryptoUtil,
  Pragma,
  Pricer,
  PricerFromApi,
  PricerRedis,
  RiskType,
  Store,
  TelegramNotif,
  VesuRebalance,
  VesuRebalanceStrategies,
  Web3Number,
  ZkLend,
  assert,
  getAPIUsingHeadlessBrowser,
  getDefaultStoreConfig,
  getMainnetConfig,
  getNoRiskTags,
  getRiskColor,
  getRiskExplaination,
  logger
});
