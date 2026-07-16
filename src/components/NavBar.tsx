import { HugeiconsIcon } from "@hugeicons/react";
import React from "react";
import { NavLink } from "react-router-dom";
import { navlinks } from "../data";

function NavBar() {
  const iconClass = (isActive: boolean) =>
    `flex items-center justify-center w-12 h-12 p-3 rounded-[50%] ${isActive ? "bg-accent text-dark" : "bg-transparent text-accent"}`;
  return (
    <div className="flex items-center gap-2 rounded-[999px] p-2 fixed bottom-8 backdrop-blur-md bg-[linear-gradient(135deg,rgba(51,51,51,0.2)_0%,rgba(215,255,0,0.2)_100%)]">
      {navlinks.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) => iconClass(isActive)}
        >
          <HugeiconsIcon icon={link.icon} />
        </NavLink>
      ))}
    </div>
  );
}

export default NavBar;
