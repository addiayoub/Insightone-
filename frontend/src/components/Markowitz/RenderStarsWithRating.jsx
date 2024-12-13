import React, { memo } from "react";
import { Square } from "react-feather";

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
  ratingIcon = "square",
  starsNumber = 5,
  className = "",
}) => {
  const rating = getStarRating(ratingBy);
  const stars = Array.from({ length: starsNumber }, (_, index) => {
    const color = getColorFromRating(index + 1, rating);
    return index < rating ? (
      <RatingIconFilled key={index} ratingIcon={ratingIcon} color={color} />
    ) : (
      <RatingIconEmpty key={index} ratingIcon={ratingIcon} />
    );
  });
  return <div className={className}>{stars}</div>;
};

const getColorFromRating = (starIndex, rating) => {
  // Déterminer si la note est excellente (4 ou 5 étoiles)
  const isExcellentRating = rating >= 4;

  if (isExcellentRating) {
    // Pour les excellentes notes, on inverse les couleurs rouge et vert
    const greenValue = Math.max(0, 240 - (rating - starIndex) * 51);
    const redValue = Math.max(0, 51 * (rating - starIndex));
    const blueValue = 0;
    return `rgb(${redValue}, ${greenValue}, ${blueValue})`;
  } else {
    // Pour les notes moyennes ou basses, on garde la logique originale
    const redValue = Math.max(0, 240 - (rating - starIndex) * 51);
    const greenValue = Math.max(0, 51 * (rating - starIndex));
    const blueValue = 0;
    return `rgb(${redValue}, ${greenValue}, ${blueValue})`;
  }
};

const defaultGetStarRating = (value) => {
  if (value >= 0 && value < 2) {
    return 1;
  } else if (value >= 2 && value < 4) {
    return 2;
  } else if (value >= 4 && value < 6) {
    return 3;
  } else if (value >= 6 && value < 8) {
    return 4;
  } else {
    return 5;
  }
};

export default memo(RenderStarsWithRating);