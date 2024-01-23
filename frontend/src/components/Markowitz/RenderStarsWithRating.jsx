import React, { memo } from "react";
import StarIcon from "@mui/icons-material/Star";
import { StarOutline } from "@mui/icons-material";
import { Square } from "react-feather";

const defaultGetStarRating = (value) => {
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

const RatingIconFilled = ({ ratingIcon, color }) => {
  return ratingIcon === "star" ? (
    <StarIcon sx={{ color }} fontSize="small" />
  ) : (
    <Square color={color} style={{ fill: color }} size={15} />
  );
};
const RatingIconEmpty = ({ ratingIcon }) => {
  return ratingIcon === "star" ? (
    <StarOutline fontSize="small" />
  ) : (
    <Square size={15} />
  );
};

const RenderStarsWithRating = ({
  value,
  getStarRating = defaultGetStarRating,
  ratingBy = value,
  ratingIcon = "star",
  starsNumber = 5,
  color = "#faaf00",
}) => {
  const rating = getStarRating(ratingBy);

  const stars = Array.from({ length: starsNumber }, (_, index) =>
    index < rating ? (
      <RatingIconFilled key={index} ratingIcon={ratingIcon} color={color} />
    ) : (
      <RatingIconEmpty key={index} ratingIcon={ratingIcon} />
    )
  );

  return <div>{stars}</div>;
};
export default memo(RenderStarsWithRating);
