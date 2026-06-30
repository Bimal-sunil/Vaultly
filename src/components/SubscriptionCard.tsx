import React from "react";
import type { Subscription } from "../types";
import { daysBetween, nextMonthSameDay } from "../helper";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { categories } from "../data";

function SubscriptionCard(props: Subscription) {
  const {
    subscriptionName,
    categoryName,
    amount,
    expiryDate,
    dayofPayment,
    frequency = "Monthly",
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

  return (
    <div
      className={`flex items-center justify-between gap-[1rem] p-[2rem_2rem] bg-text rounded-[1rem] ${priorityBorder} shadow-[14px_14px_28px_#f5f0e9] w-full`}
    >
      <div className="flex items-center gap-[4rem]">
        <div
          className="text-2xl p-[1rem] rounded-[15px]"
          style={{ backgroundColor: selectedCategory?.color || "#ccc" }}
        >
          {selectedCategory?.icon}
        </div>
        <div className="flex flex-col gap-[0.25rem]">
          <h3 className="font-semibold font-primary text-3xl text-dark">
            {subscriptionName}
          </h3>
          <div className="w-full flex items-center gap-[1rem] flex-wrap">
            <p
              className={`text-dark w-fit p-[0.2rem_0.5rem] rounded-[5px]`}
              style={{ backgroundColor: selectedCategory?.color || "#ccc" }}
            >
              {categoryName}
            </p>
            <p className="text-text-secondary">
              Renews in{" "}
              {daysBetween(new Date(), nextMonthSameDay(dayofPayment))}d
            </p>
            {expiryDateObj && daysBetween(new Date(), expiryDateObj) <= 30 && (
              <p className="text-accent bg-accent-bg p-[0.2rem_0.5rem] rounded-[5px] w-fit">
                Cancel by {customDate(expiryDateObj)}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between gap-[4rem]">
        <div className="text-right">
          <p className="font-semibold font-primary text-3xl">₹{amount}</p>
          <p className="text-text-secondary">{frequency}</p>
        </div>
        <div className="flex gap-[1rem]">
          <FaPencilAlt className="text-dark cursor-pointer" />
          <FaTrashAlt className="text-accent cursor-pointer" />
        </div>
      </div>
    </div>
  );
}

export default SubscriptionCard;
