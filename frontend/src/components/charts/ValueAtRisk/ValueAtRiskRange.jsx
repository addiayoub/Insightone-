import React, { memo, useMemo } from "react";
import LineChart from "../Default/LineChart";
import { formatNumberWithSpaces } from "../../../utils/formatNumberWithSpaces";
import moment from "moment";

const getSeries = (data) => {
  const seriesNames = Object.keys(data[0]).filter(
    (seriesName) => seriesName !== "seance"
  );
  const series = seriesNames.map((serieName) => ({
    name: serieName,
    type: "line",
    symbolSize: 0,
    // symbol: "none",
    itemStyle: { color: "rgba(204,204,204,0.25)" },
    lineStyle: { color: "rgba(204,204,204,0.25)" },
    data: data.map((item) => item[serieName]),
  }));

  const xAxisData = data.map((item) =>
    moment(item.seance).format("DD/MM/YYYY")
  );

  return { series, seriesNames, xAxisData };
};
const ValueAtRiskRange = ({ data }) => {
  const { series, xAxisData, seriesNames } = useMemo(
    () => getSeries(data),
    [data]
  );

  const options = useMemo(() => {
    return {
      xAxis: {
        type: "category",
        data: xAxisData,
      },
      yAxis: { min: "dataMin", max: "dataMax" },
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
        height: 500,
      }}
      saveToExcel={{
        show: true,
        data,
      }}
    />
  );
};

export default memo(ValueAtRiskRange);
