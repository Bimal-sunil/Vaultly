import type { IconSvgElement } from "@hugeicons/react";

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

export type DayOfMonth =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31;

export interface CategoryItem {
  categoryname: CategoryName;
  color?: string;
  icon?: IconSvgElement;
}

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

export type NavLink = { icon: IconSvgElement; to: string };
