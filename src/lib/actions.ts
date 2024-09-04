'use server';

import TradingPair from "./models/TradingPair";
import Trade from "./models/Trade";
import { NotificationType } from "@/lib/types";
import { getPositionDetails } from "@/lib/binance";

export async function createNewTrade(){

}
export async function getTradingPairs(){
    const tradingPair = new TradingPair();
    return await tradingPair.getItems();
}

export async function checkTrade(symbol: string):Promise<NotificationType|true>{
    const trade = new Trade();
    let check = await trade.getItemDetails({
        symbol: symbol,
        status: {in: [0, 1]}
    });
    if(check){
        return {type: 'error', msg: 'This trade is already active'};
    }
    check = await getPositionDetails(symbol);
    if(check.length){
        return {type: 'error', msg: 'This trade is already active on binance'};
    }
    return true;
}