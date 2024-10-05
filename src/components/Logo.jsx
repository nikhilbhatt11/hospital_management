import React from "react";
import logo from "../images/logo.png";

function Logo({ width = "100px" }) {
  return (
    <div className="w-28 h-12 pt-4">
      <img src={logo} />
    </div>
  );
}

export default Logo;
