import React, { useRef } from "react";
import ErrorMessage from "./ErrorMessage";
import { HugeiconsIcon } from "@hugeicons/react";
import { Calendar03Icon } from "@hugeicons/core-free-icons";

type Props = {
  label?: string;
  name?: string;
  type?: React.HTMLInputTypeAttribute;
  value?: React.InputHTMLAttributes<HTMLInputElement>["value"];
  mode?: "single" | "multiline";
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  error?: string;
  //Number input props
  min?: number;
  max?: number;
};

function InputField(props: Props) {
  const {
    label,
    name,
    mode = "single",
    type = "text",
    value = "",
    onChange,
    error,
    min,
    max,
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <label
      htmlFor=""
      className={`relative w-full border bg-dark-accent p-[0.75rem_1rem] rounded-[15px] text-accent-bg flex flex-col gap-2 ${error ? "border-accent" : "border-transparent"} `}
    >
      {label}
      {mode === "multiline" ? (
        <textarea />
      ) : (
        <div className="relative h-12 flex items-center justify-between">
          <input
            ref={inputRef}
            type={type}
            value={value}
            className={`outline-0 w-full h-full text-light h4 [&::-webkit-calendar-picker-indicator]:hidden`}
            name={name}
            onChange={onChange}
            min={min}
            max={max}
          />
          {type === "date" && (
            <HugeiconsIcon
              icon={Calendar03Icon}
              onClick={() => inputRef.current?.showPicker()}
            />
          )}
        </div>
      )}
      {error && <ErrorMessage message={error} />}
    </label>
  );
}

export default InputField;
