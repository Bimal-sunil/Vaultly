import { Calendar03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  DatePicker as AriaDatePicker,
  Button,
  DateInput,
  DateSegment,
  Dialog,
  Group,
  Label,
  Popover,
  type DatePickerProps,
  type DateValue,
} from "react-aria-components";
import Calendar from "./Calendar";

type Props<T extends DateValue> = DatePickerProps<T> & {
  label?: string;
};

function DatePicker<T extends DateValue = DateValue>(props: Props<T>) {
  const { label, className, ...restProps } = props;
  return (
    <AriaDatePicker
      className={`relative w-full border bg-dark-accent p-[0.75rem_1rem] rounded-[15px] flex flex-col gap-2 ${className || ""}`}
      {...restProps}
    >
      {label && <Label className="text-accent-bg">{label}</Label>}
      <Group className="flex items-center justify-between h-12 text-accent-bg">
        <DateInput className="h4 flex items-center">
          {(segment) => (
            <DateSegment
              className="outline-0 focus:bg-accent focus:text-dark px-0.5 rounded"
              segment={segment}
            />
          )}
        </DateInput>
        <Button className="field-Button" aria-label="Open calendar">
          <HugeiconsIcon icon={Calendar03Icon} />
        </Button>
      </Group>
      <Popover
        className="bg-accent-bg p-4 rounded-[15px] z-50 shadow-lg"
        placement="bottom end"
      >
        <Dialog className="outline-none">
          <Calendar />
        </Dialog>
      </Popover>
    </AriaDatePicker>
  );
}

export default DatePicker;
