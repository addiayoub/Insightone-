import React, { memo } from "react";
import { ArrowUp, ArrowDown, ArrowRight } from "react-feather";

const TextColor = ({ value, percentage, textAlign = "right" }) => {
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
  value = percentage ? value * 100 : value;
  return (
    <span className={`${className} min-w-[90px] text-${textAlign}`}>
      {`${value.toFixed(2)} ${percentage ? "%" : ""}`} {arrow}
    </span>
  );
};
export default memo(TextColor);
