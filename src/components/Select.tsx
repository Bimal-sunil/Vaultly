import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import ErrorMessage from "./ErrorMessage";

type Props = {
  label?: string;
  options: string[];
  value?: string;
  onChange?: (name: string, value: string) => void;
  name: string;
  error?: string;
};

function Select(props: Props) {
  const [selectOpen, setSelectOpen] = useState<boolean>(false);
  const { options, label, onChange, value, name, error } = props;
  return (
    <label htmlFor="" className="flex flex-col w-full relative min-w-[30%]">
      {label}
      <button
        className={`w-full border p-[0.75rem_1rem] rounded-xl h-12 text-left cursor-pointer ${error ? "border-accent" : "border-dark"}`}
        onClick={(e) => {
          e.preventDefault();
          setSelectOpen(!selectOpen);
        }}
      >
        {value}
        <FaChevronDown className="float-right" />
      </button>
      {selectOpen && (
        <div className="w-full flex flex-col border border-dark rounded-xl absolute bg-bg top-20 z-100">
          {options.map((option) => (
            <button
              className="w-full text-left cursor-pointer hover:bg-dark hover:text-secondary p-3"
              onClick={(e) => {
                e.preventDefault();
                onChange?.(name, option);
                setSelectOpen(false);
              }}
            >
              {option}
            </button>
          ))}
        </div>
      )}
      {error && <ErrorMessage message={error} />}
    </label>
  );
}

export default Select;
