import React from "react";
import {
  SwitchField,
  SwitchButton,
  Label,
  Text,
  type SwitchFieldProps,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";

type Props = SwitchFieldProps & {
  label?: string;
  description?: string;
};

function Switch(props: Props) {
  const { label, description, className, ...restProps } = props;

  return (
    <SwitchField
      className={(renderProps) =>
        twMerge(
          "flex items-center gap-3 cursor-pointer select-none",
          typeof className === "function" ? className(renderProps) : className,
        )
      }
      {...restProps}
    >
      <SwitchButton
        className={({ isSelected, isDisabled }) =>
          twMerge(
            "w-12 h-6 p-1 rounded-full transition-colors duration-200 flex items-center shrink-0 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-accent",
            isSelected ? "bg-accent" : "bg-dark-accent",
            isDisabled && "opacity-50 cursor-not-allowed",
          )
        }
      >
        {({ isSelected }) => (
          <div
            className={twMerge(
              "w-4 h-4 rounded-full transition-transform duration-200 ease-in-out shadow-sm",
              isSelected ? "bg-dark translate-x-6" : "bg-light translate-x-0",
            )}
          />
        )}
      </SwitchButton>
      {(label || description) && (
        <div className="flex flex-col gap-0.5">
          {label && <Label className="p font-medium text-light">{label}</Label>}
          {description && (
            <Text slot="description" className="small text-accent-bg opacity-75">
              {description}
            </Text>
          )}
        </div>
      )}
    </SwitchField>
  );
}

export default Switch;
