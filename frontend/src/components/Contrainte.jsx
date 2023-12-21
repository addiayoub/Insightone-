import React from "react";
import { FormControl, Typography } from "@mui/material";

const Contrainte = (props) => {
  return (
    <FormControl className="flex flex-row gap-2.5 items-center mb-4">
      <Typography
        variant="caption"
        gutterBottom
        className="min-w-[100px] font-semibold"
        sx={{ lineHeight: "0" }}
      >
        {props.label}
      </Typography>
      {props.children}
    </FormControl>
  );
};
export default Contrainte;
