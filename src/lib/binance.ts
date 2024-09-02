import axios from 'axios';
import crypto, { sign } from 'crypto';

import type { AnyDataType, TradingPairType } from '@/lib/types';

const API_KEY = '6efff946387c66fa996904ccbb7cca0a6ef2417b729f8027c89594a60cff70fb';
const API_SECRET = 'c26eca0c083b9a7289c1fb3df07304c2117b92eb6fa48c96523f977ac64f843c';
const BASE_URL = 'https://testnet.binancefuture.com';

function createSignature(params: Record<string, any>, secret: string): string {
    const queryString = new URLSearchParams(params).toString();
    return crypto.createHmac('sha256', secret).update(queryString).digest('hex');
}

async function makeRequest(method: 'POST'|'GET'|'PATCH'|'PUT', url:string, data:AnyDataType, signed: boolean = true) {
    try {
        
        let queryString = new URLSearchParams(data).toString();
        if(signed){
            data.timestamp = Date.now();
            queryString = new URLSearchParams(data).toString();
            let signature = createSignature(data, API_SECRET);
            queryString = `${queryString}&signature=${signature}`;
        }
        const response = await axios({
            method: method,
            url: `${BASE_URL}/${url}?${queryString}`,
            headers: {
                'X-MBX-APIKEY': API_KEY
            },
            data: null
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function getAllTradingPairs():Promise<TradingPairType|false>{
    const url = "fapi/v1/exchangeInfo";
    const response = await makeRequest('GET', url, {});
    return response??false;
}

// export async function getTradingPairs(baseAsset: string):Promise<SymbolType[]|false>{
//     let response:ExchangeInfoType|false = await getAllTradingPairs();
//     if(!response) return false;
//     // console.log(response);
//     const usdtPairs:SymbolType[] = response.symbols.filter(
//         (symbolInfo) => symbolInfo.quoteAsset === baseAsset && symbolInfo.status === "TRADING"
//     );
//     return usdtPairs;
// }

// export async function createNewOrder(item:CreateNewOrderType){
//     const url = "fapi/v1/order";
//     let postData:CreateNewOrderType = {
//         symbol : item.symbol,
//         side : item.side,
//         type : item.side == "BUY"?"LIMIT":"TAKE_PROFIT_MARKET",
//         timeInForce : item.timeInForce??item.side=="BUY"?"GTC":"GTE_GTC",
//         quantity : item.quantity,
//     }
//     if(item.side == "BUY"){
//         postData.price = item.price;
//     }else if(item.side == "SELL"){
//         postData.reduceOnly = true;
//         postData.stopPrice = item.price;
//     }
//     const response = await makeRequest('POST', url, postData);
//     return response??false;
// }


// export async function getAccountInfo(){
//     const url = "fapi/v3/account";
//     const response = await makeRequest('GET', url, {});
//     return response??false;
// }

// export async function getBalanceInfo():Promise<BalanceType[]|false>{
//     const url = "fapi/v3/balance";
//     const response = await makeRequest('GET', url, {});
//     return response??false;
// }

// export async function getAllOrderList(symbol: string):Promise<AnyDataType[]|false>{
//     const url = "fapi/v1/allOrders";
//     const response = await makeRequest('GET', url, {
//         symbol: symbol
//     });
//     return response??false;
// }

// export async function getPositionDetails(symbol: string):Promise<AnyDataType[]|false>{
//     const url = "fapi/v3/positionRisk";
//     const response = await makeRequest('GET', url, {
//         symbol: symbol
//     });
//     return response??false;
// }

// export async function getPriceDetails(symbol: string):Promise<SymbolType|false>{
//     const url = "fapi/v1/ticker/24hr";
//     const response = await makeRequest('GET', url, {
//         symbol: symbol
//     });
//     return response??false;
// }

