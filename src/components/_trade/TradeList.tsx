import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
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
        <Suspense fallback={
          <><Skeleton className="h-[300px] w-full"></Skeleton><Skeleton className="h-[300px] w-full"></Skeleton><Skeleton className="h-[300px] w-full"></Skeleton><Skeleton className="h-[300px] w-full"></Skeleton></>
        }>
          <PairCards key={index} item={item}/>
        </Suspense>
      ))}
    </div>
  );
}
