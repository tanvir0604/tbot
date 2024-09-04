import type { NextApiRequest, NextApiResponse } from 'next';
import type { ApiResponseDataType } from "@/lib/types";
import { getAllTradingPairs } from '@/lib/binance';
import TradingPair from "@/lib/models/TradingPair";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ApiResponseDataType>
) {

    const tradingPairs = await getAllTradingPairs();
    // console.log('Trading Pairs:', tradingPairs);

    const customArray = tradingPairs.symbols.map((symbolData: { symbol: string; baseAsset: string; quoteAsset: string; }, index: number) => ({
        id: index + 1, 
        symbol: symbolData.symbol,
        baseAsset: symbolData.baseAsset,
        quoteAsset: symbolData.quoteAsset,
        status: true
    }));

    const tradePair = new TradingPair();
    await tradePair.truncate();

    await tradePair.createManyItem(customArray);
    // console.log(customArray);

    // res.status(200).json({ status: true, msg: 'Successfull'});
    res.status(200).json({ status: true, msg: 'Successful', data: customArray });
}