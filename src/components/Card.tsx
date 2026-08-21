type Props = {
  title: string;
  content: string;
  description: string;
  highlight?: boolean;
};

function Card(props: Props) {
  const { title, content, description, highlight } = props;
  return (
    <>
      <div
        className={`p-4 rounded-[20px] flex flex-col gap-2 w-full h-full ${
          highlight ? "bg-accent text-dark" : "bg-dark-accent text-light"
        }`}
      >
        <span
          className={`pb uppercase overflow-hidden text-ellipsis ${
            highlight ? "text-dark/80" : "text-accent-bg"
          }`}
        >
          {title}
        </span>
        <span className="h3b overflow-hidden text-ellipsis">{content}</span>
        <p
          className={`pb ${
            highlight ? "text-dark/80" : "text-accent-bg"
          }`}
        >
          {description}
        </p>
      </div>
    </>
  );
}

export default Card;
