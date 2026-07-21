type Props = {
  title: string;
  content: string;
  description: string;
};

function Card(props: Props) {
  const { title, content, description } = props;
  return (
    <>
      <div className="p-3 rounded-[15px] flex flex-col gap-2 w-full bg-[linear-gradient(135deg,rgba(51,51,51,0.2)_0%,rgba(215,255,0,0.2)_100%)]">
        <span className="pb text-accent-bg uppercase overflow-hidden text-ellipsis">
          {title}
        </span>
        <span className="text-light h3b overflow-hidden text-ellipsis">
          {content}
        </span>
        <p className="text-accent-bg pb">{description}</p>
      </div>
    </>
  );
}

export default Card;
