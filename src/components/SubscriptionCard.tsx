import React from "react";
import type { Subscription } from "../types";
import { nextMonthSameDay } from "../helper";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { categories } from "../data";
import { differenceInCalendarDays, isPast } from "date-fns";

type Props = Subscription & {
  id: string;
  onEdit?: (subscriptionId: string) => void;
  onDelete?: (subscription: string) => void;
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

  const priorityBorder = {
    High: "border-l-4 border-accent-bg",
    Medium: "border-l-4 border-yellow-500",
    Low: "border-l-4 border-green-500",
    None: "border-l-4 border-text-accent",
  }[props.priority || "None"];

  const customDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-UK", {
      day: "2-digit",
      month: "short",
    }).format(date);
  };

  const selectedCategory = categories.find(
    (cat) => cat.categoryname === categoryName,
  );

  const expiryDateObj = expiryDate && new Date(expiryDate);

  // 2. Validate that the string was actually a valid date
  if (expiryDateObj && isNaN(expiryDateObj.getTime())) {
    console.error("Invalid date string received");
    return;
  }

  const renewalDateObj = renewalDate
    ? new Date(renewalDate)
    : renewalDayOfMonth
      ? nextMonthSameDay(renewalDayOfMonth)
      : null;

  const isCanceled = expiryDateObj && isPast(expiryDateObj);
  const isExpiringSoon =
    expiryDateObj &&
    differenceInCalendarDays(expiryDateObj, new Date()) <= 30 &&
    differenceInCalendarDays(expiryDateObj, new Date()) >= 0;

  return (
    <div
      className={`flex items-center justify-between gap-4 p-[2rem_2rem] bg-text rounded-2xl ${priorityBorder} shadow-[14px_14px_28px_#f5f0e9] w-full ${isCanceled ? "opacity-50" : ""}`}
    >
      <div className="flex items-center gap-16">
        <div
          className="text-2xl p-4 rounded-[15px]"
          style={{ backgroundColor: selectedCategory?.color || "#ccc" }}
        >
          {selectedCategory?.icon}
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold font-primary text-3xl text-dark">
            {subscriptionName}
          </h3>
          <div className="w-full flex items-center gap-4 flex-wrap">
            <p
              className={`text-dark w-fit p-[0.2rem_0.5rem] rounded-[5px]`}
              style={{ backgroundColor: selectedCategory?.color || "#ccc" }}
            >
              {categoryName}
            </p>
            {renewalDateObj && (
              <p className="text-text-secondary">
                Renews in {differenceInCalendarDays(renewalDateObj, new Date())}
                d
              </p>
            )}
            {isExpiringSoon && (
              <p className="text-accent bg-accent-bg p-[0.2rem_0.5rem] rounded-[5px] w-fit">
                Cancel by {customDate(expiryDateObj)}
              </p>
            )}
            {isCanceled && (
              <p className="text-accent bg-accent-bg p-[0.2rem_0.5rem] rounded-[5px] w-fit">
                Canceled on {customDate(expiryDateObj)}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between gap-16">
        <div className="text-right">
          <p className="font-semibold font-primary text-3xl">₹{amount}</p>
          <p className="text-text-secondary">{frequency}</p>
        </div>
        <div className="flex gap-4">
          <FaPencilAlt
            className="text-dark cursor-pointer"
            onClick={() => onEdit?.(id)}
          />
          <FaTrashAlt
            className="text-accent cursor-pointer"
            onClick={() => onDelete?.(id)}
          />
        </div>
      </div>
    </div>
  );
}

export default SubscriptionCard;
