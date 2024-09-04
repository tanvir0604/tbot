import PairCards from "@/components/_trade/PairCards";
import Trade from "@/lib/models/Trade";
import { TradeType } from "@/lib/types";

export default async function TradeList() {

  const trade = new Trade();
  const tradeList:TradeType[]|false = await trade.getItems({status: {in: [0, 1]}}, false, false, {createdAt:'desc'});
  if(!tradeList) return <></>;

  return (
    <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4">
      {tradeList.map((item:TradeType, index: number) => (
          <PairCards key={index} item={item}/>
      ))}
    </div>
  );
}
