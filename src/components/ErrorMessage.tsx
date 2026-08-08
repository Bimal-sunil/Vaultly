import { FaExclamationCircle } from "react-icons/fa";

type Props = {
  message: string;
  mode?: "error" | "warning" | "info";
};

function ErrorMessage(props: Props) {
  const { message, mode = "error" } = props;
  const modeColor =
    mode === "error"
      ? "text-accent"
      : mode === "warning"
        ? "text-[#ffba08]"
        : "text-[#3f88c5]";
  return (
    <span className={`mt-2 flex p gap-2 ${modeColor}`}>
      <FaExclamationCircle className="mt-1" />
      {message}
    </span>
  );
}

export default ErrorMessage;
