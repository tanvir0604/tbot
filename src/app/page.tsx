import PairCards from "@/components/PairCards";

export default function Home() {
  return (
    <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4 justify-center">
      <PairCards symbol="BTCUSDT" />
      <PairCards symbol="SOLUSDT" />
      <PairCards symbol="ETHUSDT" />
      <PairCards symbol="NOTUSDT" />
    </div>
  );
}
