type Props = {
  label: string;
  onClick: () => void;
};

function Button(props: Props) {
  const { label, onClick } = props;
  return (
    <button
      type="button"
      className="bg-accent text-dark p-[1rem_2rem] rounded-[999px] h5 cursor-pointer hover:bg-accent-bg transition-all duration-300"
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default Button;
