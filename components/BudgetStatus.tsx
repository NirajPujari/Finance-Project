"use client";
import { BudgetCategory } from "@Types/transaction";
import { AlertCircle, Ban } from "lucide-react";
import { useState } from "react";
// Static

const BUDGET_CATEGORIES: BudgetCategory[] = [
  {
    name: "Income",
    spent: 40,
    limit: 500,
  },
  {
    name: "Food & Drink",
    spent: 100,
    limit: 200,
  },
  {
    name: "Transport",
    spent: 245,
    limit: 300,
  },
  {
    name: "Utilities",
    spent: 150,
    limit: 150,
  },
  {
    name: "Shopping",
    spent: 200,
    limit: 100,
  },
];

const getPercentageUsed = (spent: number, limit: number) =>
  limit === 0 ? 0 : Math.round((spent / limit) * 100);

export default function BudgetStatus() {
  const [budgetCategories] =
    useState<BudgetCategory[]>(BUDGET_CATEGORIES);

  return (
    <div className="shadow-lg border border-black/10 rounded-xl p-6">
      <h3 className="text-black font-bold text-xl">Budget Status</h3>
      <p className="text-gray-500 font-medium text-sm mt-1">
        Monthly budget overview
      </p>

      <div className="mt-4 space-y-6">
        {budgetCategories.map((category) => {
          const percentageUsed = getPercentageUsed(
            category.spent,
            category.limit
          );

          return (
            <div key={category.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-sm text-gray-800">
                    {category.name}
                  </span>
                  {percentageUsed >= 100 && (
                    <Ban className="h-4 w-4 text-red-500" />
                  )}
                  {percentageUsed > 75 && percentageUsed < 100 && (
                    <AlertCircle className="h-4 w-4 text-yellow-600" />
                  )}
                  <span className="text-xs text-gray-500 font-medium">
                    {percentageUsed}%
                  </span>
                </div>
                <span className="text-xs font-medium text-gray-500">
                  {category.spent} / {category.limit}
                </span>
              </div>

              <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
                <div
                  className={`h-full ${
                    percentageUsed >= 100
                      ? "bg-red-500"
                      : percentageUsed > 76
                      ? "bg-yellow-600"
                      : "bg-green-700"
                  }`}
                  style={{ width: `${Math.min(percentageUsed, 100)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
