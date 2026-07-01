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

type BaseSubscription = {
  subscriptionName: string;
  categoryName: CategoryName;
  amount: number;
  priority?: "High" | "Medium" | "Low" | "None";
  expiryDate?: string;
};

type MonthlySubscription = BaseSubscription & {
  frequency: "Monthly";
  renewalDayOfMonth: number;
  renewalDate?: never;
};

type YearlySubscription = BaseSubscription & {
  frequency: "Yearly";
  renewalDate: string;
  renewalDayOfMonth?: never;
};

type DailySubscription = BaseSubscription & {
  frequency: "Daily";
  renewalDate?: never;
  renewalDayOfMonth?: never;
};

export type Subscription =
  | MonthlySubscription
  | YearlySubscription
  | DailySubscription;
