import React, { memo } from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

function ToggleButtons({ onButtonsChange, label, init, buttons }) {
  const handleChange = (event, newValue) => {
    onButtonsChange(label, newValue);
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={init}
      exclusive
      size="small"
      onChange={handleChange}
      aria-label="Platform"
    >
      {buttons.map(({ value, text }, index) => {
        return (
          <ToggleButton key={index} value={value}>
            {text}
          </ToggleButton>
        );
      })}
    </ToggleButtonGroup>
  );
}
export default memo(ToggleButtons);
