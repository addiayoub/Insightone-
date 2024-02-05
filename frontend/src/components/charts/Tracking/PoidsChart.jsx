import React, { memo, useMemo } from "react";
import BarChart from "../Default/BarChart";

const getSeries = (data, seriesNames) => {
  return seriesNames.map((key) => ({
    name: key,
    type: "bar",
    data: data.map((item) => item[key] * 100),
  }));
};

const PoidsChart = ({ data }) => {
  console.log("render PoidsChart");
  const legendData = useMemo(() => data.map((item) => item.titre), [data]);
  const seriesNames = useMemo(
    () => Object.keys(data[0]).filter((key) => key !== "titre"),
    [data]
  );
  const series = useMemo(
    () => getSeries(data, seriesNames),
    [data, seriesNames]
  );
  const options = useMemo(() => {
    return {
      title: {
        text: "Poids",
        left: "center",
      },
      grid: {
        right: "5%",
        bottom: "15%",
      },

      xAxis: {
        type: "category",
        data: legendData,
      },
      series: series,
    };
  }, [series, seriesNames, legendData]);
  return (
    <>
      <BarChart
        options={options}
        style={{
          minHeight: 500,
          margin: "15px 0",
        }}
      />
    </>
  );
};

export default memo(PoidsChart);
