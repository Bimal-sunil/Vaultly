type Props = {
  label: string;
  onClick?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
};

function Button(props: Props) {
  const { label, onClick, isLoading = false, disabled = false, className = "" } = props;
  
  const isDisabled = disabled || isLoading;

  return (
    <button
      type="button"
      className={`bg-accent text-dark p-[1rem_2rem] rounded-[999px] h5 transition-all duration-300 flex items-center justify-center gap-2 ${
        isDisabled ? "opacity-70 cursor-not-allowed" : "cursor-pointer hover:bg-accent-bg"
      } ${className}`}
      onClick={onClick}
      disabled={isDisabled}
    >
      {isLoading && (
        <span className="w-5 h-5 border-2 border-dark border-t-transparent rounded-full animate-spin inline-block" />
      )}
      <span>{isLoading ? "Processing..." : label}</span>
    </button>
  );
}

export default Button;
