import React from "react";

type Props = {
  label: string;
  onClick: () => void;
};

function Button(props: Props) {
  const { label, onClick } = props;
  return (
    <button
      type="button"
      className="bg-dark text-text p-[1rem_2rem] rounded-[10px] font-secondary cursor-pointer hover:bg-accent-bg hover:text-dark transition-all duration-300"
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default Button;
