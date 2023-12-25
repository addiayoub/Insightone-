import { Box } from "@mui/material";
import React, { memo, useMemo } from "react";

function ChartContainer({ height, width, children }) {
  const style = useMemo(() => {
    return {
      display: "grid",
      gridTemplateColumns: `repeat(auto-fit, minmax(${width}px, 1fr))`,
      gap: "20px",
      margin: "20px",
      alignItems: "center",
    };
  }, [width]);
  return (
    <Box sx={style} className="my-12">
      {children}
    </Box>
  );
}

export default memo(ChartContainer);
