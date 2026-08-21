import React, { useRef, useEffect, useState } from "react";
import Chip from "./Chip";
import { twMerge } from "tailwind-merge";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft02Icon, ArrowRight02Icon } from "@hugeicons/core-free-icons";

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
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [options]);

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
        // Check scroll after animation
        setTimeout(checkScroll, 300);
      }
    }
  }, [value, options]);

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = direction === "left" ? -200 : 200;
      containerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <div className="w-full flex flex-col gap-2 relative">
      {label && <span className="text-accent-bg p">{label}</span>}
      <div className="relative w-full group">
        {/* Left Scroll Button */}
        {canScrollLeft && (
          <div className="hidden md:flex absolute left-0 top-0 bottom-2 w-16 bg-gradient-to-r from-dark from-50% to-transparent z-10 items-center justify-start -ml-2">
            <button
              onClick={() => scroll("left")}
              className="w-8 h-8 rounded-full bg-dark-accent text-light flex items-center justify-center shadow-lg border border-white/5 hover:bg-accent hover:text-dark transition-colors"
            >
              <HugeiconsIcon icon={ArrowLeft02Icon} size={18} />
            </button>
          </div>
        )}

        <div
          ref={containerRef}
          onScroll={checkScroll}
          className={twMerge(
            className,
            "w-full flex items-center justify-start gap-2 overflow-x-auto pb-2 no-scrollbar scroll-smooth snap-x snap-mandatory",
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

        {/* Right Scroll Button */}
        {canScrollRight && (
          <div className="hidden md:flex absolute right-0 top-0 bottom-2 w-16 bg-gradient-to-l from-dark from-50% to-transparent z-10 items-center justify-end -mr-2">
            <button
              onClick={() => scroll("right")}
              className="w-8 h-8 rounded-full bg-dark-accent text-light flex items-center justify-center shadow-lg border border-white/5 hover:bg-accent hover:text-dark transition-colors"
            >
              <HugeiconsIcon icon={ArrowRight02Icon} size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChipContainer;
