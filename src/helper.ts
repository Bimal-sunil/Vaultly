import {
  differenceInCalendarDays,
  getDaysInMonth,
  isAfter,
  isSameDay,
  startOfDay,
} from "date-fns";
import type { DayOfMonth, Subscription } from "./types";

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(date);
}

function clampDay(year: number, month: number, day: number) {
  return Math.min(Math.max(1, day), getDaysInMonth(new Date(year, month, 1)));
}

export function nextGivenDay(
  day: DayOfMonth,
  referenceDate: Date = new Date(),
): Date {
  const year = referenceDate.getFullYear();
  const month = referenceDate.getMonth();

  const clampedDay = clampDay(year, month, day);
  const thisMonthDate = new Date(year, month, clampedDay);

  const refDay = startOfDay(referenceDate);
  if (isAfter(thisMonthDate, refDay) || isSameDay(thisMonthDate, refDay)) {
    return thisMonthDate;
  }

  const nextYear = month === 11 ? year + 1 : year;
  const nextMonth = month === 11 ? 0 : month + 1;

  return new Date(nextYear, nextMonth, clampDay(nextYear, nextMonth, day));
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
