import { HugeiconsIcon } from "@hugeicons/react";
import { NavLink, useLocation } from "react-router-dom";
import { navlinks } from "../data";
import type { NavLink as NavLinkType } from "../types";
import { useState } from "react";

function NavBar() {
  const location = useLocation();
  const iconClass = (isActive: boolean) =>
    `flex items-center justify-center w-12 h-12 p-3 rounded-[50%] bg-transparent transition-all duration-300 ease-in-out z-100 ${isActive ? "text-dark" : "text-accent"}`;
  const findActiveLinkIndex = () => {
    return navlinks.findIndex((nav) => nav.to === location.pathname);
  };

  const [leftPosition, setLeftPosition] = useState<number>(
    3.5 * findActiveLinkIndex(),
  );

  const findNavHighlightPosition = (index: number) => {
    const leftPosition = index * 3.5;
    setLeftPosition(leftPosition);
  };
  return (
    <div className="flex items-center gap-2 rounded-[999px] p-2 fixed bottom-8 backdrop-blur-md bg-[linear-gradient(135deg,rgba(51,51,51,0.2)_0%,rgba(215,255,0,0.2)_100%)]">
      <div
        className="absolute w-12 h-12 p-3 rounded-[50%] bg-accent transition-transform duration-300 ease-in-out"
        style={{
          transform: `translateX(${leftPosition}rem)`,
        }}
      ></div>
      {navlinks.map((link, index) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) => iconClass(isActive)}
          onClick={() => {
            findNavHighlightPosition(index);
          }}
        >
          <HugeiconsIcon icon={link.icon} />
        </NavLink>
      ))}
    </div>
  );
}

export default NavBar;
