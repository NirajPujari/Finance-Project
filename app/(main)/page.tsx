import Charts from "@/components/Charts";
import SummaryCards from "@Components/SummaryCards";
import RecentTransactions from "./../../components/RecentTransactions";
import BudgetStatus from "@/components/BudgetStatus";
import SavingsGoals from "@/components/SavingsGoals";

export default function Home() {
  return (
    <div className="min-h-screen w-full p-6 space-y-6">
      <SummaryCards />
      <Charts />
      <section className="flex gap-6 flex-col md:flex-col">
        <RecentTransactions className="w-full"/>
        <div className="flex gap-6 flex-col">
          <BudgetStatus />
          <SavingsGoals />
        </div>
      </section>
    </div>
  );
}
