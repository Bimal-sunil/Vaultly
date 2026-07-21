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
  return (
    <div
      className={twMerge(
        className,
        "w-full flex items-center gap-2 overflow-x-scroll",
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
