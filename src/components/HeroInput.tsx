import React, { useMemo, useState } from "react";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import { NumberField, Label, Group, Input } from "react-aria-components";
import { twMerge } from "tailwind-merge";

type Props = {
  icon?: IconSvgElement;
  label?: string;
  value: number;
  onChange: (value: number) => void;
  className?: string;
  autoFocus?: boolean;
};

function HeroInput({ icon, value, label, onChange, className, autoFocus }: Props) {
  const [inputText, setInputText] = useState<string>("");

  const formattedCurrency = useMemo(() => {
    try {
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }).format(value || 0);
    } catch {
      return `₹${value || 0}`;
    }
  }, [value]);

  const charLength = Math.max(
    String(value ?? 0).length,
    formattedCurrency.length,
    inputText.length,
  );

  // Available limit threshold before font resizing (6 characters)
  const limit = 6;
  const fontSizeStyle =
    charLength > limit
      ? { fontSize: `${Math.max(1.0, 2.986 * (limit / charLength))}rem` }
      : undefined;

  return (
    <div
      className={twMerge(
        className,
        "w-full bg-accent rounded-xl p-6 flex items-center justify-between",
      )}
    >
      {icon && (
        <div className="text-accent bg-dark p-4 rounded-md">
          <HugeiconsIcon icon={icon} />
        </div>
      )}
      <NumberField
        defaultValue={0}
        className="flex flex-col gap-2 items-end"
        formatOptions={{
          style: "currency",
          currency: "INR",
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        }}
        value={value}
        onChange={onChange}
        minValue={0}
        maxValue={9999999}
        aria-label={!label ? "Amount" : undefined}
      >
        {label && <Label className="pb">{label}</Label>}
        <Group className="h1 input-group flex-1 flex items-center focus-within:ring-0 rounded-md">
          <Input
            className="react-aria-Input outline-0 field-sizing-content"
            style={fontSizeStyle}
            onInput={(e) => setInputText(e.currentTarget.value)}
            autoFocus={autoFocus}
          />
        </Group>
      </NumberField>
    </div>
  );
}

export default HeroInput;
