import React, { memo } from "react";
import { ArrowUp, ArrowDown, ArrowRight } from "react-feather";

const TextColor = ({ value }) => {
  let className = "";
  let arrow = "";
  if (value > 0) {
    className = "text-[var(--text-success)] font-semibold";
    arrow = <ArrowUp size={18} />;
  } else if (value < 0) {
    className = "text-[var(--text-warning)] font-semibold";
    arrow = <ArrowDown size={18} />;
  } else {
    arrow = <ArrowRight size={18} />;
  }
  return (
    <span className={`${className} min-w-[90px] text-right`}>
      {value + "%"} {arrow}
    </span>
  );
};
export default memo(TextColor);
