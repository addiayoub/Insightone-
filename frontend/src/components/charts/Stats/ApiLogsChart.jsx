import React from "react";
import BarChart from "../Default/BarChart";

const data = [
  { x: 5, y: 15 },
  { x: 10, y: 12 },
  { x: 20, y: 8 },
  // Add more data as needed
];
const ApiLogsChart = () => {
  const xValues = data.map((item) => item.x); // Assuming x values are stored in the "x" property of each item
  const yValues = data.map((item) => item.y);
  const option = {
    title: {
      text: "API LOGS",
      x: "center",
    },
    tooltip: {
      trigger: "axis",
      valueFormatter: (val) => val,
    },
    grid: {
      bottom: "50px",
    },
    xAxis: {
      type: "category",
      data: xValues,
    },
    yAxis: {
      type: "value",
      // min: "dataMin",
    },
    toolbox: {
      top: "20px",
    },
    showDataZoom: true,
    series: [
      {
        data: yValues, // Set y values
        type: "bar",
      },
    ],
  };

  return (
    <BarChart options={option} style={{ height: "400px", width: "100%" }} />
  );
};

export default ApiLogsChart;
