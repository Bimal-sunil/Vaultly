import { eachDayOfInterval, endOfWeek, isToday, startOfWeek } from "date-fns";
import React from "react";
import CalendarDate from "./CalendarDate";

type Props = {
  date: Date;
};

function CalendarStrip({ date }: Props) {
  const weekDays = eachDayOfInterval({
    start: startOfWeek(date, { weekStartsOn: 0 }),
    end: endOfWeek(date, { weekStartsOn: 0 }),
  });
  return (
    <div className="flex items-center justify-between w-full">
      {weekDays.map((day) => (
        <CalendarDate date={day} isSelected={isToday(day)} />
      ))}
    </div>
  );
}

export default CalendarStrip;
