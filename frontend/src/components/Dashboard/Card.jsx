import { ArrowDown, ArrowRight, ArrowUp } from "iconsax-react";
import React from "react";
import { useSelector } from "react-redux";
import { formatNumberWithSpaces } from "../../utils/formatNumberWithSpaces";

const determineClassName = (value, variation, darkTheme) => {
  if (!variation) {
    if (value > 0) {
      return "text-success";
    } else if (value < 0) {
      return "text-error";
    } else {
      return darkTheme ? "text-headingColor" : "text-bgColor";
    }
  } else {
    if (value > 0.5) {
      return "text-success";
    } else if (value >= -0.5 && value <= 0.5) {
      return darkTheme ? "text-headingColor" : "text-bgColor";
    } else {
      return "text-error";
    }
  }
};
const determineArrow = (value, variation, darkTheme) => {
  if (!variation) {
    if (value > 0) {
      return <ArrowUp size={20} color="var(--success-color)" />;
    } else if (value < 0) {
      return <ArrowDown size={20} color="var(--error-color)" />;
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
      return <ArrowUp size={20} color="var(--success-color)" />;
    } else if (value >= -0.5 && value <= 0.5) {
      return (
        <ArrowRight
          size={20}
          color={darkTheme ? "var(--heading-color)" : "var(--bg-color)"}
        />
      );
    } else {
      return <ArrowDown size={20} color="var(--error-color)" />;
    }
  }
};

function Card({ title, value, variation = false, cours }) {
  const { darkTheme } = useSelector((state) => state.theme);

  return (
    <div className="card">
      <h3>{title}</h3>
      {cours && <span>{formatNumberWithSpaces(cours)}</span>}
      <p className="flex items-center gap-2">
        <span className={determineClassName(value, variation, darkTheme)}>
          {variation ? `${value}%` : value}
        </span>
        {determineArrow(value, variation, darkTheme)}
      </p>
    </div>
  );
}

export default Card;
