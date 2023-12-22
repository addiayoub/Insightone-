import React from "react";
import { FormControl, Typography } from "@mui/material";

const Contrainte = ({ label, children, width = 100 }) => {
  return (
    <FormControl className="flex flex-row gap-2.5 items-center mb-4">
      <Typography
        variant="caption"
        gutterBottom
        className={`min-w-[${width}px] font-semibold`}
        sx={{ lineHeight: "0" }}
      >
        {label}
      </Typography>
      {children}
    </FormControl>
  );
};
export default Contrainte;
