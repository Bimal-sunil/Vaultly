import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <Link to={"/"}>
      <h1 className="text-accent">Vaultly</h1>
    </Link>
  );
}

export default Header;
