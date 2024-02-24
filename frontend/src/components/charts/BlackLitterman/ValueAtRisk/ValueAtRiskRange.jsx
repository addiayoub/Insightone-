import React, { memo, useMemo } from "react";
import LineChart from "../../Default/LineChart";
import { formatNumberWithSpaces } from "../../../../utils/formatNumberWithSpaces";

const getSeries = (data, seriesNames) => {
  return seriesNames.map((serieName) => ({
    name: serieName,
    type: "line",
    // symbol: "none",
    itemStyle: { color: "rgba(204,204,204,0.7)" },
    lineStyle: { color: "rgba(204,204,204,0.7)" },
    data: data.map((item) => item[serieName]),
  }));
};
const ValueAtRiskRange = ({ data }) => {
  const seriesNames = Object.keys(data[0]).filter(
    (seriesName) => seriesName !== "days"
  );
  const xAxisData = useMemo(() => data.map((item) => item.days));
  const series = useMemo(
    () => getSeries(data, seriesNames),
    [data, seriesNames]
  );

  const options = useMemo(() => {
    return {
      xAxis: {
        type: "category",
        data: xAxisData,
      },
      tooltip: {
        trigger: "item",
        valueFormatter: (value) => formatNumberWithSpaces(value),
      },
      seriesNames: { seriesList: seriesNames },
      series,
    };
  }, [series, xAxisData]);
  return (
    <LineChart
      options={options}
      showSeriesSelector
      style={{
        minHeight: 500,
      }}
      saveToExcel={{
        show: true,
        data,
      }}
    />
  );
};

export default memo(ValueAtRiskRange);
