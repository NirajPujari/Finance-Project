import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp, TrendingUp } from "lucide-react";
// Static

const SummaryCards = () => {
  const cards = [
    {
      title: "Total Balance",
      value: "$24,580.50",
      change: "+12.5%",
      isPositive: true,
      icon: TrendingUp,
    },
    {
      title: "Monthly Income",
      value: "$5,420.00",
      change: "+8.2%",
      isPositive: true,
      icon: ArrowUp,
    },
    {
      title: "Monthly Expenses",
      value: "$2,850.75",
      change: "+3.1%",
      isPositive: false,
      icon: ArrowDown,
    },
    {
      title: "Savings Rate",
      value: "47.3%",
      change: "+2.4%",
      isPositive: true,
      icon: TrendingUp,
    },
  ];
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        return (
          <div key={card.title} className="shadow-lg rounded-xl p-6">
            <div className="flex justify-between">
              <div className="flex flex-col gap-2">
                <p className="text-gray-700 font-medium text-sm">
                  {card.title}
                </p>
                <h3 className="font-bold text-2xl">{card.value}</h3>
                <p className={cn("text-sm font-medium", card.isPositive?"text-green-500":"text-red-500")}>{card.isPositive ? '↑' : '↓'} {card.change}</p>
              </div>
              <card.icon className={cn("rounded-xl p-2 size-10", card.isPositive?"bg-green-600/20 text-green-600":"bg-red-600/20 text-red-600")}/>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default SummaryCards;
