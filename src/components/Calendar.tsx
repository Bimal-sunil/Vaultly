import { ArrowLeft02Icon, ArrowRight02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { isToday } from "date-fns";
import { useContext } from "react";
import {
  Calendar as AriaCalendar,
  Button,
  CalendarCell,
  CalendarGrid,
  CalendarStateContext,
  type CalendarProps,
  type DateValue,
} from "react-aria-components";
import { DateFormatter, getLocalTimeZone } from "@internationalized/date";
import Select, { SelectItem } from "./Select";

function CalendarHeader() {
  const state = useContext(CalendarStateContext);
  if (!state) return null;

  const { focusedDate } = state;
  const currentYear = new Date().getFullYear();

  const activeYear = String(focusedDate.year);
  const activeMonth = String(focusedDate.month);

  const minYear = state.minValue ? state.minValue.year : currentYear - 50;
  const maxYear = state.maxValue ? state.maxValue.year : currentYear + 50;

  const years = Array.from({ length: maxYear - minYear + 1 }, (_, i) => ({
    id: String(minYear + i),
    name: String(minYear + i),
  }));

  const formatter = new DateFormatter(navigator.language || "en-US", {
    month: "short",
  });
  const months = Array.from(
    { length: focusedDate.calendar.getMonthsInYear(focusedDate) },
    (_, i) => {
      const month = i + 1;
      return {
        id: String(month),
        name: formatter.format(
          focusedDate.set({ month }).toDate(getLocalTimeZone()),
        ),
      };
    },
  );

  return (
    <header className="w-full flex items-center justify-between h5">
      <Button slot="previous">
        <HugeiconsIcon icon={ArrowLeft02Icon} size={32} />
      </Button>
      <div className="flex items-center gap-2">
        <Select
          aria-label="Select month"
          value={activeMonth}
          onChange={(key) =>
            key && state.setFocusedDate(focusedDate.set({ month: Number(key) }))
          }
          items={months}
        >
          {(item: any) => (
            <SelectItem
              id={item.id}
              textValue={item.name}
              className="px-2 py-1 cursor-pointer rounded hover:bg-accent text-dark caption outline-none data-[selected=true]:bg-accent data-[selected=true]:font-bold data-[focused=true]:bg-accent/50"
            >
              {item.name}
            </SelectItem>
          )}
        </Select>
        <Select
          aria-label="Select year"
          value={activeYear}
          onChange={(key) =>
            key && state.setFocusedDate(focusedDate.set({ year: Number(key) }))
          }
          items={years}
        >
          {(item: any) => (
            <SelectItem
              id={item.id}
              textValue={item.name}
              className="px-2 py-1 cursor-pointer rounded hover:bg-accent text-dark caption outline-none data-[selected=true]:bg-accent data-[selected=true]:font-bold data-[focused=true]:bg-accent/50"
            >
              {item.name}
            </SelectItem>
          )}
        </Select>
      </div>
      <Button slot="next">
        <HugeiconsIcon icon={ArrowRight02Icon} size={32} />
      </Button>
    </header>
  );
}

function Calendar<T extends DateValue = DateValue>(props: CalendarProps<T>) {
  const { className, ...restProps } = props;
  return (
    <AriaCalendar
      className={`w-full max-w-80 flex flex-col items-center gap-4 ${className || ""}`}
      {...restProps}
    >
      <CalendarHeader />
      <CalendarGrid className="w-full text-center border-collapse table-fixed">
        {(date) => (
          <CalendarCell
            className={`flex items-center justify-center p-1 bg-transparent border aspect-square rounded-[50%] text-dark ${isToday(date.toDate(getLocalTimeZone())) ? "border-dark" : "border-transparent"} data-[outside-month=true]:opacity-35 data-[selected=true]:bg-accent`}
            date={date}
          />
        )}
      </CalendarGrid>
    </AriaCalendar>
  );
}

export default Calendar;
