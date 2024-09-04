import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import PairCards from "@/components/_trade/PairCards";
import Trade from "@/lib/models/Trade";
import { TradeType } from "@/lib/types";
import { WebSocketProvider } from '@/contexts/WebSocketContext';

export default async function TradeList() {
  const trade = new Trade();
  const tradeList: TradeType[] | false = await trade.getItems({ status: { in: [0, 1] } }, false, false, { createdAt: 'desc' });
  if (!tradeList) return <></>;

  return (
    <WebSocketProvider coins={tradeList}>
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {tradeList.map((item: TradeType, index: number) => (
          <Suspense key={index} fallback={
            <>
              <Skeleton className="h-[300px] w-full" />
              <Skeleton className="h-[300px] w-full" />
              <Skeleton className="h-[300px] w-full" />
              <Skeleton className="h-[300px] w-full" />
            </>
          }>
            <PairCards item={item} />
          </Suspense>
        ))}
      </div>
    </WebSocketProvider>
  );
}
