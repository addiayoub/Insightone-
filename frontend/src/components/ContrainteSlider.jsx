import React, { useEffect, useState } from "react";
import { Box, Typography, Slider, Input, FormControl } from "@mui/material";
import { formatNumberWithSpaces } from "../utils/formatNumberWithSpaces";

function ContrainteSlider({
  label,
  min,
  minLabel,
  max,
  maxLabel,
  step,
  percentage = true,
  int = false,
  onValuesChange,
  values,
}) {
  const [value, setValue] = useState(values);
  // const [value, setValue] = useState([min, max]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    onValuesChange(label, newValue);
  };
  const handleMinInputChange = (event) => {
    const newMin = event.target.value;
    setValue([newMin, value[1]]);
    onValuesChange(label, [newMin, value[1]]);
  };
  const handleMinBlur = () => {
    if (value[0] < min || value[0] > max) {
      handleChange(event, [min, value[1]]);
    }
  };
  const handleMaxBlur = () => {
    onValuesChange(label, [min, value[1]]);
    if (value[1] < min || value[1] > max) {
      handleChange(event, [value[0], max]);
    }
  };
  const handleMaxInputChange = (event) => {
    const newMax = event.target.value;
    setValue([value[0], newMax]);
    onValuesChange(label, [value[0], newMax]);
  };
  useEffect(() => {
    setValue(values);
  }, [values]);
  return (
    <Box className="flex items-center gap-6">
      <FormControl>
        <Input
          value={value[0]}
          onChange={handleMinInputChange}
          onBlur={handleMinBlur}
          size="small"
          inputProps={{
            step,
            min,
            max,
            type: "number",
          }}
        />
        <Typography fontSize={"small"}>{`${minLabel}${
          percentage ? " (%)" : ""
        }`}</Typography>
      </FormControl>
      <Box className="w-[240px] max-w-[240px]">
        <Slider
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => {
            const res = `${formatNumberWithSpaces(value)}${
              percentage ? " %" : ""
            }`;
            return int ? Math.trunc(res) : res;
          }}
          step={step}
          min={min}
          max={max}
        />
      </Box>
      <FormControl>
        <Input
          size="small"
          value={value[1]}
          onChange={handleMaxInputChange}
          onBlur={handleMaxBlur}
          inputProps={{
            step,
            min,
            max,
            type: "number",
          }}
        />
        <Typography fontSize={"small"}>{`${maxLabel}${
          percentage ? " (%)" : ""
        }`}</Typography>
      </FormControl>
    </Box>
  );
}

export default ContrainteSlider;
