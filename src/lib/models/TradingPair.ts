import Model from "./Model";

export default class TradingPair extends Model{
    constructor(){
        super();
        this.table = 'tradingPair';
    }
}