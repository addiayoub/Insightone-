import React, { memo, useMemo } from "react";
import BarChart from "../Default/BarChart";

const getSeries = (data, seriesNames) => {
  return seriesNames.map((key) => ({
    name: key,
    type: "bar",
    data: data.map((item) => item[key] * 100),
  }));
};

const EoyChart = ({ data, forSIM }) => {
  console.log("render EoyChart");
  const years = useMemo(() => data.map((item) => item.Year), [data]);
  const seriesName = useMemo(
    () => Object.keys(data[0]).filter((key) => key !== "Year" && key !== "Won"),
    [data]
  );
  const series = useMemo(() => getSeries(data, seriesName), [data, seriesName]);
  const init = forSIM ? [seriesName[0], "SIM optimal"] : seriesName;

  const options = useMemo(() => {
    return {
      title: {
        text: "EOY Returns vs Benchmark vs Bench_cat",
        left: "center",
      },
      tooltip: {
        valueFormatter: (value) => value?.toFixed(2),
      },
      legend: {
        data: seriesName,
        left: "center",
        bottom: "9%",
      },
      grid: {
        right: "5%",
        bottom: "15%",
      },
      showDataZoom: true,
      xAxis: {
        type: "category",
        data: years,
      },
      seriesNames: { seriesList: seriesName, init },
      series: series,
    };
  }, [series, seriesName, years]);
  return (
    <>
      <BarChart
        options={options}
        style={{
          minHeight: 500,
          margin: "15px 0",
        }}
        saveToExcel={{
          show: true,
          data,
          fileName: options.title.text,
        }}
        showSeriesSelector
      />
    </>
  );
};

export default memo(EoyChart);
