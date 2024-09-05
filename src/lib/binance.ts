'use server';
import axios from 'axios';
import crypto, { sign } from 'crypto';

import type { AnyDataType, TakeProfitParams, TradingPairType } from '@/lib/types';

const API_KEY = '45bca6fc6124df9ceccaaaf045b2acec43710d3ea5aa6e7f9670a624c1123fc0';
const API_SECRET = 'c41051382f49d0c50b9f35ad62c4ae68ad33cba1efc5ccd611bf7fb9c4238aac';
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

export async function getAllTradingPairs():Promise<TradingPairType[]>{
    const url = "fapi/v1/exchangeInfo";
    const response = await makeRequest('GET', url, {});
    return response?.symbols??false;
}

export async function getPositionDetails(symbol: string):Promise<AnyDataType[]|false>{
    const url = "fapi/v3/positionRisk";
    const response = await makeRequest('GET', url, {
        symbol: symbol
    });
    return response??false;
}

export async function setTakeProfit(params: TakeProfitParams) {
    const { symbol, amount, percentage, itemType } = params;

    if (!symbol || amount <= 0 || percentage <= 0 || percentage > 100) {
        throw new Error('Invalid parameters for take profit order');
    }

    // Fetch position details for the symbol
    const positionDetails = await getPositionDetails(symbol);

    if (!positionDetails || positionDetails.length === 0) {
        throw new Error('Failed to fetch position details');
    }

    const position = positionDetails[0];
    let totalQuantity = parseFloat(position.positionAmt);

    if (totalQuantity === 0) {
        throw new Error('No open position found for the symbol.');
    }

    // For SHORT trades, positionAmt will be negative, so we use its absolute value
    totalQuantity = Math.abs(totalQuantity); // Use the absolute value

    // Calculate the quantity to sell based on the percentage
    const quantityToSell = totalQuantity * (percentage / 100);

    // Ensure quantity has valid precision for Binance
    const quantityFormatted = quantityToSell.toFixed(2); // Adjust decimal precision as needed

    let side, takeProfitType;

    // Determine the order type based on LONG or SHORT
    if (itemType === 'LONG') {
        side = 'SELL';  // For LONG positions, you sell to take profit
        takeProfitType = 'TAKE_PROFIT';  // Use TAKE_PROFIT_LIMIT
    } else if (itemType === 'SHORT') {
        side = 'BUY';   // For SHORT positions, you buy back to take profit
        takeProfitType = 'TAKE_PROFIT';  // Use TAKE_PROFIT_LIMIT
    } else {
        throw new Error('Invalid item type. Must be LONG or SHORT');
    }

    // Validate that the quantity is not zero or negative
    if (quantityFormatted <= 0) {
        throw new Error('Invalid quantity calculated for the take profit order.');
    }

    const data = {
        symbol: symbol,
        side: side,
        type: takeProfitType,
        quantity: quantityFormatted,
        price: amount.toFixed(2),
        stopPrice: amount.toFixed(2),
        timeInForce: 'GTE_GTC'  // Or 'GTE_GTC'
    };

    try {
        const response = await makeRequest('POST', 'fapi/v1/order', data);
        return response;
    } catch (error) {
        console.error('Error placing take profit order:', error);
        throw error;
    }
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

