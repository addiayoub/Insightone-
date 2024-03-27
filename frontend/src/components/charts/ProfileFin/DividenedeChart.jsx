import React, { memo, useMemo } from "react";
import BarChart from "../Default/BarChart";

const getSeries = (data) => {
  const seriesNames = ["montant_dividende"];
  return seriesNames.map((key) => ({
    name: "Montant dividende",
    type: "bar",
    data: data.map((item) => ({ value: item[key] })),
  }));
};

const DividenedeChart = ({ data }) => {
  console.log("data", data);
  const sortedData = [...data].sort((a, b) => a.annee - b.annee);
  const xData = sortedData.map((item) => item.annee);
  const series = useMemo(() => getSeries(sortedData), [sortedData]);
  console.log("series", series);
  const options = useMemo(() => {
    return {
      title: {
        text: "Dividende",
        x: "center",
      },
      tooltip: {
        valueFormatter: (value) => value?.toFixed(2),
      },
      legend: {
        left: "center",
        bottom: "10%",
      },
      grid: {
        right: "5%",
        top: "50px",
        bottom: "16%",
      },
      showDataZoom: true,
      xAxis: {
        type: "category",
        data: xData,
        axisTick: {
          show: true,
        },
        axisLine: {
          show: true,
        },
      },
      yAxis: {
        min: function (value) {
          console.log("min", value);
          return value.min.toFixed(2);
        },
      },
      series: series,
    };
  }, [series]);
  return (
    <>
      <BarChart
        options={options}
        style={{
          minHeight: "500px",
          height: "100%",
          margin: "15px 0",
        }}
        saveToExcel={{
          show: true,
          data,
          fileName: options.title.text,
        }}
      />
    </>
  );
};

export default memo(DividenedeChart);
