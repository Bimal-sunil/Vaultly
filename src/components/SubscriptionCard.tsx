import type { DayOfMonth, Subscription } from "../types";
import { getExpiryDateObj, getRenewalDateObj } from "../helper";
import { categories } from "../data";
import { differenceInCalendarDays, isPast, startOfDay } from "date-fns";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Delete02Icon,
  Edit03Icon,
  EllipsisVerticalIcon,
} from "@hugeicons/core-free-icons";
import MenuButton from "./MenuButton";
import { MenuItem } from "react-aria-components";

type Props = Subscription & {
  id: string;
  onEdit?: (subscriptionId: string) => void;
  onDelete?: (subscriptionId: string) => void;
};

function SubscriptionCard(props: Props) {
  const {
    id,
    isActive = true,
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

  const selectedCategory = categories.find(
    (cat) => cat.categoryname === categoryName,
  );

  const expiryDateObj = getExpiryDateObj({ expiryDate });
  const renewalDateObj = getRenewalDateObj({
    renewalDate,
    renewalDayOfMonth,
  });

  const now = startOfDay(new Date());
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
      className={`flex items-center justify-between bg-dark-accent gap-4 p-4 rounded-[24px] w-full ${!isActive ? "opacity-50" : ""}`}
    >
      <div className="flex items-center gap-2 w-[60%]">
        {selectedCategory?.icon && (
          <HugeiconsIcon
            icon={selectedCategory?.icon}
            className="w-12 h-12 p-2 bg-accent-bg text-dark rounded-[10px] shrink-0"
          />
        )}
        <div className="flex flex-col min-w-0">
          <h3 className="h4 text-light truncate">{subscriptionName}</h3>
          {dueNext >= 0 && (
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
          <MenuItem
            className="flex items-center gap-2 text-dark py-2 w-full text-left"
            onAction={() => onEdit?.(id)}
          >
            <HugeiconsIcon icon={Edit03Icon} className="w-5 h-5" />
            Edit
          </MenuItem>
          <MenuItem
            className="flex items-center gap-2 text-[#EA2B1F] w-full text-left"
            onAction={() => onDelete?.(id)}
          >
            <HugeiconsIcon icon={Delete02Icon} className="w-5 h-5" />
            Delete
          </MenuItem>
        </MenuButton>
      </div>
    </div>
  );
}

export default SubscriptionCard;
