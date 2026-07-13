import { format, getDate } from "date-fns";
import React from "react";

type Props = {
  date: Date;
  isSelected?: boolean;
};

function CalendarDate({ date, isSelected }: Props) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-light p">{format(date, "eee")}</span>
      <div
        className={`text-lg border-2 border-accent rounded-[50%] w-[10vw] h-[10vw] flex items-center justify-center ${isSelected ? "bg-accent text-dark" : "text-accent bg-transparent"}`}
      >
        {getDate(date)}
      </div>
    </div>
  );
}

export default CalendarDate;
