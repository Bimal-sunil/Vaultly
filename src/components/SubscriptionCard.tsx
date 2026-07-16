import React from "react";
import type { Subscription } from "../types";
import { nextGivenDay } from "../helper";
import { categories } from "../data";
import { differenceInCalendarDays, isPast, startOfDay } from "date-fns";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Delete02Icon,
  Edit03Icon,
  EllipsisVerticalIcon,
} from "@hugeicons/core-free-icons";
import { DropdownMenu } from "radix-ui";
import MenuButton from "./MenuButton";

type Props = Subscription & {
  id: string;
  onEdit?: (subscriptionId: string) => void;
  onDelete?: (subscriptionId: string) => void;
};

function SubscriptionCard(props: Props) {
  const {
    id,
    subscriptionName,
    categoryName,
    amount,
    expiryDate,
    renewalDayOfMonth,
    renewalDate,
    frequency = "Monthly",
    onEdit,
    onDelete,
  } = props;

  const customDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-UK", {
      day: "2-digit",
      month: "short",
    }).format(date);
  };

  const selectedCategory = categories.find(
    (cat) => cat.categoryname === categoryName,
  );

  let expiryDateObj: Date | null = expiryDate ? new Date(expiryDate) : null;
  // Normalize invalid dates to null but don't early-return so hooks remain stable
  if (expiryDateObj && isNaN(expiryDateObj.getTime())) {
    console.error("Invalid date string received");
    expiryDateObj = null;
  }

  const renewalDateObj: Date | null = renewalDate
    ? new Date(renewalDate)
    : renewalDayOfMonth
      ? nextGivenDay(renewalDayOfMonth)
      : null;

  const now = startOfDay(new Date());
  const isCanceled = expiryDateObj ? isPast(expiryDateObj) : false;
  const toRenewal: number | null = renewalDateObj
    ? differenceInCalendarDays(renewalDateObj, now)
    : null;
  const toExpire: number | null = expiryDateObj
    ? differenceInCalendarDays(expiryDateObj, now)
    : null;
  const dueNext =
    toExpire !== null && toExpire >= 0 && toExpire <= 7
      ? toExpire
      : toRenewal !== null && toRenewal >= 0 && toRenewal <= 7
        ? toRenewal
        : undefined;

  return (
    <div
      className={`flex items-center justify-between bg-[linear-gradient(135deg,rgba(51,51,51,0.2)_0%,rgba(215,255,0,0.2)_100%)] gap-4 p-3 bg-text rounded-[25px] w-full ${isCanceled ? "opacity-50" : ""}`}
    >
      <div className="flex items-center gap-2 w-[60%]">
        {selectedCategory?.icon && (
          <HugeiconsIcon
            icon={selectedCategory?.icon}
            className="w-12 h-12 p-2 bg-accent-bg text-dark rounded-[10px]"
          />
        )}
        <div className="flex flex-col">
          <h3 className="h4 text-light">{subscriptionName}</h3>
          {dueNext && (
            <div className="w-full flex items-center gap-1 flex-wrap">
              <span className="w-2 h-2 bg-[#EA2B1F] block rounded-[50%]"></span>
              <p className="text-accent-bg small">Renews in {dueNext}d</p>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between gap-2">
        <div className="text-right">
          <p className="font-bold font-primary text-3xl text-light">
            ₹{amount}
          </p>
          <p className="text-accent-bg">{frequency}</p>
        </div>
        <MenuButton
          trigger={
            <HugeiconsIcon
              icon={EllipsisVerticalIcon}
              className="text-accent"
            />
          }
        >
          <DropdownMenu.Item
            className="flex items-center gap-2 text-dark py-2"
            onClick={() => onEdit?.(id)}
          >
            <HugeiconsIcon icon={Edit03Icon} className="w-5 h-5" />
            Edit
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className="flex items-center gap-2 text-[#EA2B1F]"
            onClick={() => onDelete?.(id)}
          >
            <HugeiconsIcon icon={Delete02Icon} className="w-5 h-5" />
            Delete
          </DropdownMenu.Item>
        </MenuButton>
      </div>
    </div>
  );
}

export default SubscriptionCard;
