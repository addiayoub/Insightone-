import React, { useState } from "react";
import { Box, Rating, Typography } from "@mui/material";

export default function BasicRating({ value, onValuesChange }) {
  const [stars, setStars] = useState(value);

  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
      }}
      className="flex items-center gap-6"
    >
      <Box>
        <Typography fontSize={"small"}>{"minLabel"}</Typography>
      </Box>
      <Rating
        name="simple-controlled"
        value={stars}
        onChange={(event, newValue) => {
          setStars(newValue);
          onValuesChange("vqm", newValue !== null ? newValue : 0);
        }}
      />
      <Box>
        <Typography fontSize={"small"}>{"max label"}</Typography>
      </Box>
    </Box>
  );
}
