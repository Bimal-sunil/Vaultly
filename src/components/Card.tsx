import React from "react";

type Props = {
  title: string;
  content: string;
  description: string;
};

function Card(props: Props) {
  const { title, content, description } = props;
  return (
    <div className="bg-text p-3 rounded-[15px] border border-accent flex flex-col gap-2 w-full">
      <span className="pb text-accent-bg uppercase overflow-hidden text-ellipsis">
        {title}
      </span>
      <span className="text-light h3b overflow-hidden text-ellipsis">
        {content}
      </span>
      <p className="text-accent-bg pb">{description}</p>
    </div>
  );
}

export default Card;
