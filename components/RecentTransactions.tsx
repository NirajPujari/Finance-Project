"use client";
import { cn } from "@Lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
// Static

export default function RecentTransactions({
  className,
}: {
  className?: string;
}) {
  const [filter, setFilter] = useState<"all" | "income" | "expense">("all");
  return (
    <div
      className={cn(
        "shadow-lg border border-black/10 rounded-xl p-6",
        className,
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
    </div>
  );
}
