import React from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  label?: string;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
  value: string;
  className?: string;
};

function ToggleGroup(props: Props) {
  const { label, options, onChange, value, className } = props;

  const activeIndex = Math.max(
    0,
    options.findIndex((opt) => opt.value === value),
  );

  return (
    <div className={twMerge("w-full flex flex-col gap-2", className)}>
      <span className="p text-accent-bg">{label}</span>
      <div className="relative bg-dark-accent p-2 rounded-[999px] flex items-center justify-between w-full">
        <div
          className="absolute bg-accent h-[calc(100%-16px)] rounded-full top-2 z-0 transition-all duration-200"
          style={{
            width: `calc((100% - 16px) / ${options.length})`,
            transform: `translateX(${activeIndex * 100}%)`,
          }}
        />
        {options.map((option) => {
          const isActive = option.value === value;
          return (
            <button
              className={twMerge(
                "w-full flex items-center justify-center p-2 z-10 transition-all duration-200",
                isActive ? "text-dark" : "text-accent",
              )}
              key={option.value}
              value={option.value}
              onClick={(e) => {
                e.preventDefault();
                onChange(option.value);
              }}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default ToggleGroup;
