import {
  differenceInCalendarDays,
  getDaysInMonth,
  isAfter,
  isSameDay,
  startOfDay,
} from "date-fns";
import type { DayOfMonth, Subscription } from "./types";
import { supabase } from "../utils/supabase";

export function formatDate(date: Date, monthOnly: boolean = false): string {
  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    year: "numeric",
  };

  if (!monthOnly) {
    options.day = "numeric";
  }

  return new Intl.DateTimeFormat("en-US", options).format(date);
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isSubActive(sub: any): boolean {
  if (!sub) return false;
  return sub.is_active !== false && sub.isActive !== false;
}

export function getDaysUntil(dateObj: Date | null): number | null {
  if (!dateObj) return null;
  const now = startOfDay(new Date());
  return differenceInCalendarDays(startOfDay(dateObj), now);
}

// Sync and update subscriptions whose expiry date has passed today
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function syncExpiredSubscriptions(subscriptions: any[]) {
  if (!subscriptions || subscriptions.length === 0) return subscriptions;

  const expiredIdsToUpdate: string[] = [];

  const updatedSubscriptions = subscriptions.map((sub) => {
    const expiry = sub.expiry_date || sub.expiryDate;
    const isCurrentlyActive = isSubActive(sub);

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
    if (!isSubActive(sub)) continue;
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

// Reusable helper to safely get a valid Date object for a subscription's expiry date
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getExpiryDateObj(sub: any): Date | null {
  if (!sub) return null;
  const expiry =
    typeof sub === "string" ? sub : (sub.expiry_date ?? sub.expiryDate);
  if (!expiry) return null;
  const dateObj = new Date(expiry);
  if (isNaN(dateObj.getTime())) {
    return null;
  }
  return dateObj;
}

// Reusable helper to safely get a valid Date object for a subscription's renewal date
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getRenewalDateObj(sub: any): Date | null {
  if (!sub) return null;
  const renewalDate = sub.renewal_date ?? sub.renewalDate;
  const renewalDay = sub.renewal_day_of_month ?? sub.renewalDayOfMonth;

  if (renewalDate) {
    const dateObj = new Date(renewalDate);
    if (!isNaN(dateObj.getTime())) {
      return dateObj;
    }
  }

  if (renewalDay) {
    const dateObj = nextGivenDay(renewalDay as DayOfMonth);
    if (dateObj && !isNaN(dateObj.getTime())) {
      return dateObj;
    }
  }

  return null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function findRenewingSoonCount(subscriptions: any[]): number {
  return subscriptions.filter((sub) => {
    if (!isSubActive(sub)) return false;
    const days = getDaysUntil(getRenewalDateObj(sub));
    return days !== null && days >= 0 && days <= 7;
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getDaysLeft(sub: any): number {
  let minDays = Infinity;

  const expiryDays = getDaysUntil(getExpiryDateObj(sub));
  if (expiryDays !== null && expiryDays >= 0 && expiryDays < minDays) {
    minDays = expiryDays;
  }

  const renewalDays = getDaysUntil(getRenewalDateObj(sub));
  if (renewalDays !== null && renewalDays >= 0 && renewalDays < minDays) {
    minDays = renewalDays;
  }

  return minDays;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function sortByUrgencyAndPriority(subscriptions: any[]): any[] {
  const priorityWeight: Record<string, number> = {
    high: 3,
    medium: 2,
    low: 1,
  };

  const getUrgencyGroup = (sub: any): number => {
    const renewalDays = getDaysUntil(getRenewalDateObj(sub));
    if (renewalDays !== null && renewalDays >= 0 && renewalDays <= 7) return 1;

    const expiryDays = getDaysUntil(getExpiryDateObj(sub));
    if (expiryDays !== null && expiryDays >= 0 && expiryDays <= 7) return 2;

    return 3;
  };

  return [...subscriptions].sort((a, b) => {
    const activeA = isSubActive(a) ? 1 : 0;
    const activeB = isSubActive(b) ? 1 : 0;
    if (activeA !== activeB) return activeB - activeA;

    const groupA = getUrgencyGroup(a);
    const groupB = getUrgencyGroup(b);
    if (groupA !== groupB) return groupA - groupB;

    const pA = priorityWeight[a.priority?.toLowerCase()] || 0;
    const pB = priorityWeight[b.priority?.toLowerCase()] || 0;
    if (pA !== pB) return pB - pA;

    return getDaysLeft(a) - getDaysLeft(b);
  });
}