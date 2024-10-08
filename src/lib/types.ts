import type { User, Trade, TradingPair, BinanceSettings, TradeSettings  } from "@prisma/client";

export type UserType = User;
export type TradeType = Trade;
export type TradingPairType = TradingPair;
export type BinanceSettingsType = BinanceSettings;
export type TradeSettingsType = TradeSettings;

export type QueryType = {where?:{}, select?:{}, include?:{}, skip?: number, take?: number, orderBy?: {}};

export type NotificationType = {
    type?: 'error'|'success'|'warning'|'info'|'loading'|'';
    msg?: string;
    data?: any;
}

export type AnyDataType = Record<string, any>;

export type ApiResponseDataType = {
    status: Boolean;
    msg?: string;
    data?: {}
}

export type WSDataTypeMain = {
    [key:string]: WSDataType
}

export type WSDataType = {
    volume?: number,
    price?: number,
    changeAmount?: number,
    changePercentage?: number,
}

export type TradeDCAAndClose = {
    className?: string;
}

export type TakeProfitParams = {
    symbol: string;
    amount: number;
    percentage: number;
    itemType: string;
};