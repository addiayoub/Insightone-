import React, { useState } from "react";
import SelectIndices from "../components/Markowitz/SelectIndices";

const useSeriesSelector = (seriesNames) => {
  const [selectedSeries, setSelectedSeries] = useState([seriesNames[0]]);
  const selectedLegend = Object.fromEntries(
    seriesNames.map((seriesName) => [
      seriesName,
      selectedSeries.includes(seriesName),
    ])
  );
  const SeriesSelector = () => (
    <SelectIndices
      indices={seriesNames}
      setSelectedIndices={setSelectedSeries}
      selectedIndices={selectedSeries}
    />
  );

  return { SeriesSelector, selectedLegend };
};

export default useSeriesSelector;
