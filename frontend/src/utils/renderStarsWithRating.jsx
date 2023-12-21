import { StarOutline } from "@mui/icons-material";
import StarIcon from "@mui/icons-material/Star";
import { Typography } from "@mui/material";
import { formatNumberWithSpaces } from "./formatNumberWithSpaces";
const getStarRating = (value) => {
  if (value >= 0 && value < 1) {
    return 0;
  } else if (value >= 1 && value < 50) {
    return 1;
  } else if (value >= 50 && value < 200) {
    return 2;
  } else if (value >= 200 && value < 600) {
    return 3;
  } else if (value >= 600 && value < 1000) {
    return 4;
  } else {
    return 5;
  }
};

export const renderStarsWithRating = (value) => {
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
