import React, { useRef, useEffect } from "react";
import Chip from "./Chip";
import { twMerge } from "tailwind-merge";

type Props = {
  label?: string;
  options: string[];
  value?: string;
  onChange?: (selectedItem: string) => void;
  className?: string;
};

function ChipContainer(props: Props) {
  const { options, value, onChange, className, label } = props;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const selectedChip = containerRef.current.querySelector(
        '[data-selected="true"]',
      );
      if (selectedChip) {
        selectedChip.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [value, options]);

  return (
    <div className="w-full flex flex-col gap-2">
      {label && <span className="text-accent-bg p">{label}</span>}
      <div
        ref={containerRef}
        className={twMerge(
          className,
          "w-full flex items-center justify-between gap-2 overflow-x-scroll pb-2",
        )}
      >
        {options.map((option, index) => (
          <Chip
            key={index}
            label={option}
            onClick={() => onChange?.(option)}
            selected={value === option}
          />
        ))}
      </div>
    </div>
  );
}

export default ChipContainer;
