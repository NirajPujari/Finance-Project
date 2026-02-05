export type Category = "Income" | "Food & Drink" | "Transport" | "Utilities" | "Shopping"; 

export type Transaction = {
  id: number;
  description: string;
  category: Category;
  amount: string;
  date: string;
  isExpense: boolean;
};

export type Filter = "all" | "income" | "expense";

export type BudgetCategory = {
    name: Category;
    spent: number;
    limit: number;
  };