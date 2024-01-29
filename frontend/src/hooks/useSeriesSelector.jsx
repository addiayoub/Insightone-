import React, { useState } from "react";
import SelectIndices from "../components/Markowitz/SelectIndices";
import { Box, IconButton } from "@mui/material";
import { OpenInBrowser } from "@mui/icons-material";
import { ArrowDown, ArrowUp, ChevronDown, ChevronUp } from "react-feather";

const useSeriesSelector = (seriesNames, init = [seriesNames[0]]) => {
  const [selectedSeries, setSelectedSeries] = useState(init);
  const [isHide, seIsHide] = useState(true);
  const selectedLegend = Object.fromEntries(
    seriesNames.map((seriesName) => [
      seriesName,
      selectedSeries.includes(seriesName),
    ])
  );
  const SeriesSelector = () => (
    <Box className="my-1">
      <IconButton
        className="bg-primary mb-1"
        onClick={() => seIsHide(!isHide)}
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

  return { SeriesSelector, selectedLegend };
};

export default useSeriesSelector;
