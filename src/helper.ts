import {
  differenceInCalendarDays,
  getDaysInMonth,
  isAfter,
  isSameDay,
  startOfDay,
} from "date-fns";
import type { DayOfMonth } from "./types";
import { supabase } from "../utils/supabase";

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

// Check if today is after the expiry date of a subscription
export function isSubscriptionExpired(expiryDateStr?: string | null): boolean {
  if (!expiryDateStr) return false;
  const expiryDate = startOfDay(new Date(expiryDateStr));
  const today = startOfDay(new Date());
  return isAfter(today, expiryDate);
}

// Sync and update subscriptions whose expiry date has passed today
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function syncExpiredSubscriptions(subscriptions: any[]) {
  if (!subscriptions || subscriptions.length === 0) return subscriptions;

  const expiredIdsToUpdate: string[] = [];

  const updatedSubscriptions = subscriptions.map((sub) => {
    const expiry = sub.expiry_date || sub.expiryDate;
    const isCurrentlyActive = sub.is_active ?? sub.isActive ?? true;

    if (expiry && isCurrentlyActive) {
      if (isSubscriptionExpired(expiry)) {
        if (sub.id) expiredIdsToUpdate.push(sub.id);
        return { ...sub, is_active: false, isActive: false };
      }
    }
    return sub;
  });

  if (expiredIdsToUpdate.length > 0) {
    const { error } = await supabase
      .from("Subscriptions")
      .update({ is_active: false })
      .in("id", expiredIdsToUpdate);

    if (error) {
      console.error("Error updating expired subscriptions status:", error);
    }
  }

  return updatedSubscriptions;
}

export function getDaysInYear(year: number) {
  const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  return isLeapYear ? 366 : 365;
}

export function findTotalAmount(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  subscriptions: any[],
  estimate: "Monthly" | "Yearly" = "Monthly",
) {
  if (!subscriptions || subscriptions.length === 0) return 0;

  const now = new Date();
  const currentMonth = now.getMonth(); // 0-indexed (0 = Jan, 6 = July, etc.)

  const daysInMonth = getDaysInMonth(now);
  const daysInYear = getDaysInYear(now.getFullYear());

  let monthlyTotal = 0;
  let yearlyTotal = 0;

  for (const sub of subscriptions) {
    if (sub.is_active === false || sub.isActive === false) continue;
    const freq = sub.frequency ?? sub["frequency"];
    const amount = Number(sub.amount) || 0;

    if (freq === "Daily") {
      monthlyTotal += amount * daysInMonth;
      yearlyTotal += amount * daysInYear;
    } else if (freq === "Monthly") {
      monthlyTotal += amount;
      yearlyTotal += amount * 12;
    } else if (freq === "Yearly") {
      yearlyTotal += amount;

      const renewalDateStr = sub.renewal_date ?? sub.renewalDate;
      if (renewalDateStr) {
        const renewalMonth = new Date(renewalDateStr).getMonth();
        if (renewalMonth === currentMonth) {
          monthlyTotal += amount; // Only add to monthlyTotal if it's a Yearly sub renewing this month
        }
      }
    }
  }

  if (estimate === "Monthly") return monthlyTotal.toFixed(1);
  return yearlyTotal.toFixed(1);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function findRenewingSoonCount(subscriptions: any[]): number {
  const handleRenewSoon = (startDate: Date, endDate: Date): boolean => {
    const diffInDays = differenceInCalendarDays(endDate, startDate);
    return diffInDays >= 0 && diffInDays <= 7;
  };
  return subscriptions.filter((sub) => {
    if (sub.is_active === false || sub.isActive === false) return false;
    const renewalDateObj: Date | null =
      (sub["renewal_date"] ?? sub["renewalDate"])
        ? new Date(sub["renewal_date"] ?? sub["renewalDate"])
        : (sub["renewal_day_of_month"] ?? sub["renewalDayOfMonth"])
          ? nextGivenDay(
              sub["renewal_day_of_month"] ??
                (sub["renewalDayOfMonth"] as DayOfMonth),
            )
          : null;
    return renewalDateObj ? handleRenewSoon(new Date(), renewalDateObj) : false;
  }).length;
}

export const formatAmount = (amount: number) => {
  if (amount < 10_000) {
    return amount.toLocaleString("en-IN");
  }

  if (amount < 1_00_000) {
    return `${(amount / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  }

  if (amount < 1_00_00_000) {
    return `${(amount / 1_00_000).toFixed(1).replace(/\.0$/, "")}L`;
  }

  return `${(amount / 1_00_00_000).toFixed(1).replace(/\.0$/, "")}Cr`;
};
