import PairCards from "@/components/_trade/PairCards";
import Trade from "@/lib/models/Trade";
import { TradeType } from "@/lib/types";

export default async function TradeList() {

  const trade = new Trade();
  const tradeList:TradeType[]|false = await trade.getItems({status: {in: [0, 1]}}, false, false, {createdAt:'desc'});
  if(!tradeList) return <></>;

  return (
    <div className="grid grid-cols-2 gap-4 justify-center">
      {tradeList.map((item:TradeType, index: number) => (
          <PairCards key={index} symbol={item.symbol}/>
      ))}
    </div>
  );
}
