import React from "react";
import {
  Slider as AriaSlider,
  SliderTrack,
  SliderThumb,
  SliderOutput,
  SliderFill,
  Label,
  Text,
  type SliderProps,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";

type Props = SliderProps & {
  label?: string;
  description?: string;
  showOutput?: boolean;
  formatOutput?: (value: number) => string;
  className?: string;
};

function Slider(props: Props) {
  const {
    label,
    description,
    showOutput = true,
    formatOutput,
    className,
    ...restProps
  } = props;

  return (
    <AriaSlider
      className={twMerge("flex flex-col gap-4 w-full", className)}
      {...restProps}
    >
      {(label || showOutput) && (
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-0.5">
            {label && (
              <Label className="p font-medium text-light">{label}</Label>
            )}
            {description && (
              <Text
                slot="description"
                className="small text-accent-bg opacity-75"
              >
                {description}
              </Text>
            )}
          </div>
          {showOutput && (
            <SliderOutput className="p tabular-nums font-medium text-accent">
              {({ state }) =>
                formatOutput
                  ? formatOutput(state.values[0])
                  : state.values.join(" – ")
              }
            </SliderOutput>
          )}
        </div>
      )}
      <SliderTrack className="relative h-2 w-full rounded-full bg-dark-accent cursor-pointer group">
        <SliderFill className="absolute h-full rounded-full bg-accent" />
        <SliderThumb
          className={({ isFocusVisible, isDragging }) =>
            twMerge(
              "top-1/2 h-5 w-5 rounded-full border-2 border-accent bg-dark shadow-md transition-transform duration-150 outline-none cursor-grab",
              isDragging &&
                "scale-110 cursor-grabbing shadow-lg shadow-accent/20",
              isFocusVisible &&
                "ring-2 ring-accent ring-offset-2 ring-offset-dark",
            )
          }
        />
      </SliderTrack>
    </AriaSlider>
  );
}

export default Slider;
