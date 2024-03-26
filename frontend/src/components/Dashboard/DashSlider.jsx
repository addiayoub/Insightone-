import React, { memo } from "react";
import Slider, { SliderItem } from "../Slider";

function DashSlider({ data }) {
  console.log("DashSlider ", data);
  return (
    <Slider>
      {data.map((item) => (
        <SliderItem
          key={item.TICKER}
          name={item.TICKER}
          left={item.Cours_Cloture}
          middle={item.Evolution}
          right={item.Volume / 1e6}
          rightSuffix="MAD"
        />
      ))}
    </Slider>
  );
}

export default memo(DashSlider);
