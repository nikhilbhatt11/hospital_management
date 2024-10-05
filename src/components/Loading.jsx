import React from "react";
import { GiShipWheel } from "react-icons/gi";
function Loading() {
  return (
    <div className="text-9xl w-80 h-80 flex justify-center text-red-400 items-center animate-spin 2s">
      <GiShipWheel />
    </div>
  );
}

export default Loading;
