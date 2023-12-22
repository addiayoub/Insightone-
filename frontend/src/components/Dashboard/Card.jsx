import { ArrowDown, ArrowRight, ArrowUp } from "iconsax-react";
import React from "react";
import { useSelector } from "react-redux";
import { formatNumberWithSpaces } from "../../utils/formatNumberWithSpaces";

function Card({ title, value, variation = false, cours }) {
  const { darkTheme } = useSelector((state) => state.theme);
  const determineClassName = (value) => {
    if (!variation) {
      if (value > 0) {
        return "text-[var(--text-success)]";
      } else if (value < 0) {
        return "text-[var(--text-warning)]";
      } else {
        return darkTheme
          ? "text-[var(--heading-color)]"
          : "text-[var(--bg-color)]";
      }
    } else {
      if (value > 0.5) {
        return "text-[var(--text-success)]";
      } else if (value >= -0.5 && value <= 0.5) {
        return darkTheme
          ? "text-[var(--heading-color)]"
          : "text-[var(--bg-color)]";
      } else {
        return "text-[var(--text-warning)]";
      }
    }
  };
  const determineArrow = (value) => {
    if (!variation) {
      if (value > 0) {
        return <ArrowUp size={20} color="var(--text-success)" />;
      } else if (value < 0) {
        return <ArrowDown size={20} color="var(--text-warning)" />;
      } else {
        return (
          <ArrowRight
            size={20}
            color={darkTheme ? "var(--heading-color)" : "var(--bg-color)"}
          />
        );
      }
    } else {
      if (value > 0.5) {
        return <ArrowUp size={20} color="var(--text-success)" />;
      } else if (value >= -0.5 && value <= 0.5) {
        return (
          <ArrowRight
            size={20}
            color={darkTheme ? "var(--heading-color)" : "var(--bg-color)"}
          />
        );
      } else {
        return <ArrowDown size={20} color="var(--text-warning)" />;
      }
    }
  };
  return (
    <div className="card">
      <h3>{title}</h3>
      {cours && <span>{formatNumberWithSpaces(cours)}</span>}
      <p className="flex items-center gap-2">
        <span className={determineClassName(value)}>
          {variation ? `${value}%` : value}
        </span>
        {determineArrow(value)}
      </p>
    </div>
  );
}

export default Card;
