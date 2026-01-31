import Charts from "@/components/Charts";
import SummaryCards from "@Components/SummaryCards";

export default function Home() {
  return (
    <div className="min-h-screen w-full p-6 space-y-6">
      <SummaryCards />
      <Charts />
    </div>
  );
}
