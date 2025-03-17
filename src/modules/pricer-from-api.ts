import { logger } from "@/global";
import { PriceInfo } from "./pricer";
import axios from "axios";
import { IConfig, TokenInfo } from "@/interfaces";
import { PricerBase } from "./pricerBase";

export class PricerFromApi extends PricerBase {
    constructor(config: IConfig, tokens: TokenInfo[]) {
        super(config, tokens);
    }

    async getPrice(tokenSymbol: string): Promise<PriceInfo> {
        try {
            return await this.getPriceFromMyAPI(tokenSymbol);
        } catch (e) {
            logger.warn('getPriceFromMyAPI error', e);
        }
        logger.log('getPrice coinbase', tokenSymbol);
        let retry = 0;
        const MAX_RETRIES = 5;
        for (retry = 1; retry < MAX_RETRIES + 1; retry++) {
            try {
                const priceInfo = await axios.get(
                    `https://api.coinbase.com/v2/prices/${tokenSymbol}-USDT/spot`,
                );
                if (!priceInfo) {
                    throw new Error('Failed to fetch price');
                }
                const data = await priceInfo.data;
                const price = Number(data.data.amount);
                return {
                    price,
                    timestamp: new Date()
                }
            } catch (e) {
                logger.warn('getPrice coinbase error', e, retry);
                await new Promise((resolve) => setTimeout(resolve, retry * 1000));
            }
        }
        throw new Error(`Failed to fetch price for ${tokenSymbol}`);
    }

    async getPriceFromMyAPI(tokenSymbol: string) {
        logger.verbose(`getPrice from redis: ${tokenSymbol}`);
        const endpoint = 'https://app.strkfarm.com'
        const url = `${endpoint}/api/price/${tokenSymbol}`;
        const priceInfoRes = await fetch(url);
        const priceInfo = await priceInfoRes.json();
        const now = new Date();
        const priceTime = new Date(priceInfo.timestamp);
        if (now.getTime() - priceTime.getTime() > 900000) {
          // 15 mins
          throw new Error('Price is stale');
        }
        const price = Number(priceInfo.price);
        return {
            price,
            timestamp: new Date(priceInfo.timestamp)
        }
      }
}