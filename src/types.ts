export type CategoryName =
  | "All"
  | "Entertainment"
  | "Productivity"
  | "Communication"
  | "Health"
  | "Shopping"
  | "Finance"
  | "Education"
  | "Other";

export type Subscription = {
  subscriptionName: string;
  categoryName: `${CategoryName}`;
  amount: number;
  expiryDate?: string;
  // Which day of month
  dayofPayment: number;
  frequency?: "Monthly" | "Yearly" | "Weekly" | "Daily";
  priority?: "High" | "Medium" | "Low" | "None";
};
