import React, { memo } from "react";
import Slider from "./Slider";
import { ArrowUp, ArrowDown, ArrowRight } from "react-feather";
import { formatNumberWithSpaces } from "../../utils/formatNumberWithSpaces";

const textColor = (value) => {
  let className = "";
  let arrow = "";
  if (value > 0) {
    className = "text-[var(--text-success)]";
    arrow = <ArrowUp size={18} />;
  } else if (value < 0) {
    className = "text-[var(--text-warning)]";
    arrow = <ArrowDown size={18} />;
  } else {
    arrow = <ArrowRight size={18} />;
  }
  return (
    <div className={`py-1 px-[11px] flex items-center gap-2 ${className}`}>
      <p className="text-[12px] leading-[21px]">
        <span>{value}</span>
      </p>
      {arrow}
    </div>
  );
};

function DashSlider({ data }) {
  console.log("DashSlider ", data);
  return (
    <>
      <Slider>
        <div className="slide">
          {data.map((item) => {
            return (
              <div className="w-auto" key={item.TICKER}>
                <div className="inline-flex flex-col px-4 pt-[15px]">
                  <p className="text-md text-center leading-[21px] space-nowrap mb-[3px]">
                    {item.TICKER}
                  </p>
                  <div className="inline-flex items-center justify-start">
                    <p className="text-[12px] leading-[21px] text-gray-500 mr[18px] whitespace-nowrap">
                      <span>{formatNumberWithSpaces(item.Cours_Cloture)}</span>
                    </p>
                    {textColor(item.Evolution)}
                    <p className="text-[12px] leading-[21px] text-gray-500 mr[18px] whitespace-nowrap">
                      <span>
                        {formatNumberWithSpaces(item.Volume / 1e6)} MMAD
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Slider>
    </>
  );
}

export default memo(DashSlider);
