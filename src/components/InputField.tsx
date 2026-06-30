import React from "react";
import ErrorMessage from "./ErrorMessage";

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
  } = props;
  return (
    <label htmlFor="" className="min-w-[30%]">
      {label}
      {mode === "multiline" ? (
        <textarea />
      ) : (
        <input
          type={type}
          value={value}
          className={`border p-[0.75rem_1rem] rounded-xl w-full h-12 ${error ? "border-accent" : "border-dark"}`}
          name={name}
          onChange={onChange}
        />
      )}
      {error && <ErrorMessage message={error} />}
    </label>
  );
}

export default InputField;
