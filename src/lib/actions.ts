'use server';

import TradingPair from "./models/TradingPair";
import Trade from "./models/Trade";
import { NotificationType } from "@/lib/types";

export async function createNewTrade(){

}
export async function getTradingPairs(){
    const tradingPair = new TradingPair();
    return await tradingPair.getItems();
}

export async function checkTrade(symbol: string):Promise<NotificationType|true>{
    const trade = new Trade();
    const check = await trade.getItemCount({
        status: {in: [0, 1]}
    });
    if(check == 1){
        return {type: 'error', msg: 'This trade is already active'};
    }
    return true;
}