import React, { useRef, useEffect } from "react";
import Chip from "./Chip";
import { twMerge } from "tailwind-merge";

type Props = {
  options: string[];
  value?: string;
  onChange?: (selectedItem: string) => void;
  className?: string;
};

function ChipContainer(props: Props) {
  const { options, value, onChange, className } = props;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const selectedChip = containerRef.current.querySelector('[data-selected="true"]');
      if (selectedChip) {
        selectedChip.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [value, options]);

  return (
    <div
      ref={containerRef}
      className={twMerge(
        className,
        "w-full flex items-center justify-between gap-2 overflow-x-scroll",
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
  );
}

export default ChipContainer;
