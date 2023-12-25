import React, { memo } from "react";
import StarIcon from "@mui/icons-material/Star";
import { StarOutline } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { formatNumberWithSpaces } from "../../utils/formatNumberWithSpaces";

const getStarRating = (value) => {
  if (value >= 0 && value < 10000) {
    return 0;
  } else if (value >= 10000 && value < 50000) {
    return 1;
  } else if (value >= 50000 && value < 200000) {
    return 2;
  } else if (value >= 200000 && value < 600000) {
    return 3;
  } else if (value >= 600000 && value < 1000000) {
    return 4;
  } else {
    return 5;
  }
};

const RenderStarsWithRating = ({ value }) => {
  const rating = getStarRating(value);

  const stars = Array.from({ length: 5 }, (_, index) =>
    index < rating ? (
      <StarIcon key={index} sx={{ color: "#faaf00" }} fontSize="small" />
    ) : (
      <StarOutline key={index} fontSize="small" />
    )
  );

  return (
    <div className="flex">
      <Typography
        variant="body2"
        className="mr-3 font-semibold min-w-[90px] text-right"
      >
        {formatNumberWithSpaces(value.toFixed(2))}
      </Typography>
      <div>{stars}</div>
    </div>
  );
};
export default memo(RenderStarsWithRating);
