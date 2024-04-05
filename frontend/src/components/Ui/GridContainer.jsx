import { Box } from "@mui/material";
import React from "react";

export const GridItem = ({ cols = 6, extraCss = "", children }) => {
  return (
    <Box
      className={`md:col-span-${cols} lg:col-span-${cols} xl:col-span-${cols} h-fit ${extraCss} `}
    >
      {/* md:col-span-3 lg:col-span-3 xl:col-span-3 */}
      {/* md:col-span-3 lg:col-span-3 xl:col-span-3 */}
      {children}
    </Box>
  );
};

const GridContainer = ({
  children,
  cols = 12,
  xGap = 4,
  yGap = 4,
  extraCss = "items-stretch my-5",
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
