import React, { useEffect, useState, memo, useReducer } from "react";
import SelectIndices from "../components/Markowitz/SelectIndices";
import { Box, IconButton } from "@mui/material";
import { ChevronDown, ChevronUp } from "react-feather";

const useSeriesSelector = (seriesNames, init = [seriesNames[0]]) => {
  console.log("render useSeriesSelector", init);
  const [selectedSeries, setSelectedSeries] = useState(init);
  const [isHide, setIsHide] = useState(true);
  const selectedLegend = Object.fromEntries(
    seriesNames.map((seriesName) => [
      seriesName,
      selectedSeries.includes(seriesName),
    ])
  );
  const SeriesSelector = () => {
    return (
      <Box className="my-1">
        <IconButton
          className="bg-primary mb-1"
          onClick={() => setIsHide(!isHide)}
          title="gérer les légendes"
        >
          {isHide ? (
            <ChevronDown color="white" size={18} />
          ) : (
            <ChevronUp color="white" size={18} />
          )}
        </IconButton>
        {!isHide && (
          <SelectIndices
            indices={seriesNames}
            setSelectedIndices={setSelectedSeries}
            selectedIndices={selectedSeries}
          />
        )}
      </Box>
    );
  };
  return { SeriesSelector, selectedLegend };
};

// Helper function to check if arrays are equal
const arraysAreEqual = (array1, array2) => {
  return JSON.stringify(array1) === JSON.stringify(array2);
};

export default useSeriesSelector;
