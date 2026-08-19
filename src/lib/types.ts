export interface Expense {
  id: number;
  amount: number;
  category: string;
  description: string;
  date: string;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}

export interface ExpenseFormData {
  amount: number;
  category: string;
  description: string;
  date: string;
  paymentMethod: string;
}

export interface DashboardStats {
  totalExpenses: number;
  currentMonthExpenses: number;
  numberOfExpenses: number;
  highestExpense: number;
  averageExpense: number;
  expensesByCategory: { category: string; total: number }[];
  monthlyExpenses: { month: string; total: number }[];
  recentExpenses: Expense[];
}

export interface ValidationError {
  field: string;
  message: string;
}

export const CATEGORIES = [
  'Food',
  'Travel',
  'Shopping',
  'Bills',
  'Entertainment',
  'Healthcare',
  'Education',
  'Other',
] as const;

export const PAYMENT_METHODS = [
  'Cash',
  'Credit Card',
  'Debit Card',
  'UPI',
  'Bank Transfer',
] as const;

export const CATEGORY_COLORS: Record<string, string> = {
  Food: '#f97316',
  Travel: '#3b82f6',
  Shopping: '#8b5cf6',
  Bills: '#ef4444',
  Entertainment: '#ec4899',
  Healthcare: '#10b981',
  Education: '#6366f1',
  Other: '#6b7280',
};
