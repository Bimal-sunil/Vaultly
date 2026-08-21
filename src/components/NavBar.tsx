import { HugeiconsIcon } from "@hugeicons/react";
import { NavLink, useLocation } from "react-router-dom";
import { navlinks } from "../data";
import type { NavLink as NavLinkType } from "../types";
import { useEffect, useState } from "react";

function NavBar() {
  const location = useLocation();
  const iconClass = (isActive: boolean) =>
    `flex items-center justify-center w-12 h-12 p-3 rounded-[50%] bg-transparent transition-all duration-300 ease-in-out z-100 ${isActive ? "text-dark" : "text-accent"}`;

  const findActiveLinkIndex = () => {
    const index = navlinks.findIndex((nav) => nav.to === location.pathname);
    return index !== -1 ? index : 0;
  };

  const activeIndex = findActiveLinkIndex();

  const [leftPosition, setLeftPosition] = useState<number>(3.5 * activeIndex);

  useEffect(() => {
    setLeftPosition(3.5 * activeIndex);
  }, [activeIndex]);

  const findNavHighlightPosition = (index: number) => {
    const leftPosition = index * 3.5;
    setLeftPosition(leftPosition);
  };
  return (
    <div className="flex items-center gap-2 rounded-[999px] p-2 fixed bottom-8 left-1/2 -translate-x-1/2 bg-accent/[0.02] border border-accent/15 backdrop-blur-xl shadow-lg z-50">
      <div
        className="absolute w-12 h-12 p-3 rounded-[50%] bg-accent transition-transform duration-300 ease-in-out"
        style={{
          transform: `translateX(${leftPosition}rem)`,
        }}
      ></div>
      {navlinks.map((link, index) => {
        const isCurrentActive = index === activeIndex;
        return (
          <NavLink
            key={link.to}
            to={link.to}
            className={() => iconClass(isCurrentActive)}
            onClick={() => {
              findNavHighlightPosition(index);
            }}
          >
            <HugeiconsIcon icon={link.icon} />
          </NavLink>
        );
      })}
    </div>
  );
}

export default NavBar;
