import React, { memo } from "react";
import { ArrowUp, ArrowDown, ArrowRight } from "react-feather";
import { formatNumberWithSpaces } from "../../utils/formatNumberWithSpaces";

const TextColor = ({ value }) => {
  value = +value;
  let className = "";
  let arrow = <ArrowRight size={18} />;
  if (value > 0) {
    className = "text-success";
    arrow = <ArrowUp size={18} />;
  } else if (value < 0) {
    className = "text-warning";
    arrow = <ArrowDown size={18} />;
  }
  return (
    <span className={`${className} font-semibold`}>
      <span>{formatNumberWithSpaces(value)}%</span>
      <span>{arrow}</span>
    </span>
  );
};
export default memo(TextColor);
