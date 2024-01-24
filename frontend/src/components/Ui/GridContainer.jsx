import { Box } from "@mui/material";
import React from "react";

export const GridItem = ({ cols = 6, extraCss = "", children }) => {
  return (
    <Box
      className={`md:col-span-${cols} lg:col-span-${cols} xl:col-span-${cols} ${extraCss}`}
    >
      {children}
    </Box>
  );
};

const GridContainer = ({
  children,
  cols = 12,
  xGap = 4,
  yGap = 4,
  extraCss,
}) => {
  return (
    <Box
      className={`grid grid-cols-1 md:grid-cols-${cols} lg:grid-cols-${cols}
        xl:grid-cols-${cols} gap-y-${yGap} gap-x-${xGap} ${extraCss}`}
    >
      {children}
    </Box>
  );
};

export default GridContainer;
