import React from "react";
import Hourglass from "../assets/images/hourglass.svg";

function HourglassIcon({ size = 18 }) {
  return <img src={Hourglass} alt="hourglass" height={size} width={size} />;
}

export default HourglassIcon;
