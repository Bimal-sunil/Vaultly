import {
  Home03Icon,
  Chart01Icon,
  PlusSignIcon,
  Chatting01Icon,
  Settings03Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import React from "react";

function NavBar() {
  const iconClass = "text-accent bg-accent-bg w-12 h-12 p-3 rounded-[50%]";
  return (
    <div className="flex items-center gap-2 border border-accent rounded-[999px] p-2 fixed bottom-8 backdrop-blur-md">
      <HugeiconsIcon icon={Home03Icon} className={iconClass} />
      <HugeiconsIcon icon={Chart01Icon} className={iconClass} />
      <HugeiconsIcon icon={PlusSignIcon} className={iconClass} />
      <HugeiconsIcon icon={Chatting01Icon} className={iconClass} />
      <HugeiconsIcon icon={Settings03Icon} className={iconClass} />
    </div>
  );
}

export default NavBar;
