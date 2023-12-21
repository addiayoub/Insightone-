import React from "react";
import "./Slider.css";
import { Box } from "@mui/material";

function Slider({ children }) {
  return <Box className="slider-container">{children}</Box>;
}

export default Slider;
