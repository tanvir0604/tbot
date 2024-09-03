'use server';

import TradingPair from "./models/TradingPair";

export async function createNewTrade(){

}
export async function getTradingPairs(){
    const tradingPair = new TradingPair();
    return await tradingPair.getItems();
}