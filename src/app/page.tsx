import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import TradeList from "@/components/_trade/TradeList";

export default async function Home() {
  return (
    <Suspense fallback={
      <><Skeleton className="h-[300px] w-full"></Skeleton><Skeleton className="h-[300px] w-full"></Skeleton><Skeleton className="h-[300px] w-full"></Skeleton><Skeleton className="h-[300px] w-full"></Skeleton></>
    }>
      <TradeList />
    </Suspense>
  );
}