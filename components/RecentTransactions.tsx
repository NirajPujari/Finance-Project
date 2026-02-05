"use client";
import { cn } from "@Lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@Components/ui/select";
import { useMemo, useState } from "react";
import { Car, ShoppingBag, TrendingUp, Utensils, Zap } from "lucide-react";
import { Filter, Transaction } from "@Types/transaction";
// Static

const CATEGORY_META = {
  Income: {
    icon: TrendingUp,
    bg: "bg-green-600/20",
    text: "text-green-700",
  },
  "Food & Drink": {
    icon: Utensils,
    bg: "bg-orange-500/20",
    text: "text-orange-700",
  },
  Transport: {
    icon: Car,
    bg: "bg-blue-600/20",
    text: "text-blue-700",
  },
  Utilities: {
    icon: Zap,
    bg: "bg-yellow-500/20",
    text: "text-yellow-800",
  },
  Shopping: {
    icon: ShoppingBag,
    bg: "bg-purple-600/20",
    text: "text-purple-700",
  },
} as const;

const TRANSACTIONS: Transaction[] = [
  {
    id: 1,
    description: "Starbucks Coffee",
    category: "Food & Drink",
    amount: "-$5.40",
    date: "Today, 2:30 PM",
    isExpense: true,
  },
  {
    id: 2,
    description: "Salary Deposit",
    category: "Income",
    amount: "+$3,500.00",
    date: "Yesterday, 9:00 AM",
    isExpense: false,
  },
  {
    id: 3,
    description: "Electric Bill",
    category: "Utilities",
    amount: "-$120.50",
    date: "2 days ago",
    isExpense: true,
  },
  {
    id: 4,
    description: "Restaurant Dinner",
    category: "Food & Drink",
    amount: "-$64.75",
    date: "3 days ago",
    isExpense: true,
  },
  {
    id: 5,
    description: "Gas Station",
    category: "Transport",
    amount: "-$45.00",
    date: "4 days ago",
    isExpense: true,
  },
  {
    id: 6,
    description: "Online Shopping",
    category: "Shopping",
    amount: "-$156.20",
    date: "5 days ago",
    isExpense: true,
  },
];

export default function Transactions({
  className,
}: {
  className?: string;
}) {
  const [filter, setFilter] = useState<Filter>("all");
  const [transactions, setTransactions] = useState<Transaction[]>(TRANSACTIONS);
  const filteredTransactions = useMemo(() => {
    if (filter === "income") {
      return transactions.filter((t) => !t.isExpense);
    }

    if (filter === "expense") {
      return transactions.filter((t) => t.isExpense);
    }

    return transactions;
  }, [filter, transactions]);

  return (
    <div
      className={cn(
        "shadow-lg border border-black/10 rounded-xl p-6",
        className
      )}
    >
      <div className="flex justify-between items-center border-b border-gray-500/50 pb-4">
        <div>
          <h3 className="text-black font-bold text-xl">Recent Transactions</h3>
          <p className="text-gray-500 font-medium text-sm">
            Your latest financial activity.
          </p>
        </div>

        <button className="border border-gray-300 bg-white font-medium rounded-md px-3 py-0.5 hover:text-white hover:bg-green-700 hover:border-green-700 transition-colors duration-300">
          View All
        </button>
      </div>
      <div className="py-6 border-b border-gray-500/50">
        <Select
          value={filter}
          onValueChange={(value) =>
            setFilter(value as "all" | "income" | "expense")
          }
        >
          <SelectTrigger className="w-32 bg-white text-black font-medium shadow-lg border border-gray-500/30 rounded-md focus:ring-0 focus:outline-none">
            <SelectValue />
          </SelectTrigger>

          <SelectContent className="bg-white text-black shadow-lg border border-gray-500/30">
            <SelectGroup>
              <SelectItem
                value="all"
                className="focus:bg-green-700 focus:text-white font-medium transition-colors duration-300"
              >
                All
              </SelectItem>
              <SelectItem
                value="income"
                className="focus:bg-green-700 focus:text-white font-medium transition-colors duration-300"
              >
                Income
              </SelectItem>
              <SelectItem
                value="expense"
                className="focus:bg-green-700 focus:text-white font-medium transition-colors duration-300"
              >
                Expense
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col pt-6 justify-center items-center">
        {filteredTransactions.map((transaction) => {
          const Icon = CATEGORY_META[transaction.category].icon;
          const Colors = CATEGORY_META[transaction.category];
          return (
            <div
              key={transaction.id}
              className="flex justify-between w-full items-center px-2 py-2 hover:bg-cyan-800/20 rounded-lg"
            >
              <div className="flex gap-3 justify-start items-center">
                <Icon
                  className={cn(
                    "size-9 rounded-lg p-2",
                    transaction.isExpense
                      ? "bg-red-500/50 text-red-800"
                      : "bg-green-500/50 text-green-800"
                  )}
                />
                <div className="flex flex-col">
                  <h5 className="font-bold text-sm">
                    {transaction.description}
                  </h5>
                  <p className="font-medium text-[10px] sm:text-xs text-gray-500">
                    {transaction.date}
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-end items-end">
                <h6
                  className={cn(
                    "text-sm font-bold",
                    transaction.isExpense ? "text-red-600" : "text-green-600"
                  )}
                >
                  {transaction.amount}
                </h6>
                <div
                  className={cn(
                    "text-[10px] sm:text-xs font-medium rounded-full px-2 py-1",
                    Colors.bg,
                    Colors.text
                  )}
                >
                  {transaction.category}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
