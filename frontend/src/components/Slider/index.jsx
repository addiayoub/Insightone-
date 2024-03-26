import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { formatNumberWithSpaces } from "../../utils/formatNumberWithSpaces";
import { ArrowUp, ArrowDown, ArrowRight } from "react-feather";
import "./Slider.css";

const textColor = (value) => {
  let className = "";
  let arrow = "";
  if (value > 0) {
    className = "text-success";
    arrow = <ArrowUp size={18} />;
  } else if (value < 0) {
    className = "text-error";
    arrow = <ArrowDown size={18} />;
  } else {
    arrow = <ArrowRight size={18} />;
  }
  return (
    <div className={`py-1 px-[5px] flex items-center gap-1 ${className}`}>
      <p className="text-[12px] leading-[21px]">
        <span>{value.toFixed(2)}</span>
      </p>
      {arrow}
    </div>
  );
};

function Slider({ children }) {
  useEffect(() => {
    const copy = document.querySelector(".slide").cloneNode(true);
    document.querySelector(".slider-container").appendChild(copy);
  }, []);
  return (
    <Box className="slider-container">
      <Box className="slide">{children}</Box>
    </Box>
  );
}
export const SliderItem = (props) => {
  const {
    name,
    left = 0,
    middle,
    right,
    leftSuffix,
    leftPrefix,
    middlePrefix,
    middleSuffix,
    rightSuffix,
    rightPrefix,
  } = props;
  return (
    <div className="w-auto">
      <div className="inline-flex flex-col px-4 pt-[15px]">
        <p className="text-md text-center leading-[21px] space-nowrap mb-[3px]">
          {name}
        </p>
        <div className="inline-flex items-center justify-start">
          {/* LEFT */}
          <p className="text-[12px] leading-[21px] text-gray-500 mr[18px] whitespace-nowrap">
            <span>
              <span className="font-semibold">{leftPrefix}</span>
              {formatNumberWithSpaces(left)}
              {leftSuffix}
            </span>
          </p>
          {/* MIDDLE */}
          <div className="text-[12px] leading-[21px] flex items-center gap-0 mx-[6px] text-gray-500">
            <span className="font-semibold">{middlePrefix}</span>
            {textColor(middle)}
            {middleSuffix}
          </div>
          {/* RIGHT */}
          <p className="text-[12px] leading-[21px] text-gray-500 mr[18px] whitespace-nowrap">
            <span>
              <span className="font-semibold">{rightPrefix} </span>
              {formatNumberWithSpaces(right)} {rightSuffix}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Slider;
