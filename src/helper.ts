import { differenceInCalendarDays } from "date-fns";
import type { Subscription } from "./types";

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(date);
}

export function nextMonthSameDay(day: number) {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  const nextYear = month === 12 ? year + 1 : year;
  const nextMonth = month === 12 ? 0 : month;

  return new Date(nextYear, nextMonth, day);
}

export function findTotalAmount(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  subscriptions: any[],
  estimate: Subscription["frequency"] = "Monthly",
) {
  if (!subscriptions || subscriptions.length === 0) return 0;

  let totalAmount = 0;

  for (const sub of subscriptions) {
    const freq = sub.frequency ?? sub["frequency"];
    const amount = Number(sub.amount) || 0;

    if (freq === "Daily") {
      totalAmount += amount * 365; // Assuming 30 days in a month for daily subscriptions
    } else if (freq === "Monthly") {
      totalAmount += amount * 12; // Assuming 12 months in a year for monthly subscriptions
    } else {
      totalAmount += amount; // For yearly subscriptions, just add the amount
    }
  }

  if (estimate === "Daily") return (totalAmount / 365).toFixed(2);
  if (estimate === "Monthly") return (totalAmount / 12).toFixed(2);
  // estimate === "Yearly"
  return totalAmount.toFixed(2);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function findRenewingSoonCount(subscriptions: any[]): number {
  const handleRenewSoon = (startDate: Date, endDate: Date): boolean => {
    const diffInDays = differenceInCalendarDays(endDate, startDate);
    return diffInDays >= 0 && diffInDays <= 7;
  };
  return subscriptions.filter((sub) =>
    handleRenewSoon(new Date(), new Date(sub["expiry_date"])),
  ).length;
}
