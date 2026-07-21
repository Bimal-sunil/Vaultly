type Props = {
  label: string;
  selected?: boolean;
  onClick?: () => void;
};

function Chip(props: Props) {
  const { label, selected, onClick } = props;
  return (
    <button
      className={`cursor-pointer p-[0.5rem_1rem] border rounded-[50px] border-accent ${selected ? "bg-accent text-dark" : "bg-transparent text-accent"}`}
      onClick={(e) => {
        e.preventDefault();
        onClick?.();
      }}
    >
      {label}
    </button>
  );
}

export default Chip;
