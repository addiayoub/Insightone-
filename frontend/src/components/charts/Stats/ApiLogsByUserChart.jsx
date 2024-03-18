import React from "react";
import BarChart from "../Default/BarChart";

const ApiLogsByUserChart = ({ data }) => {
  const xValues = data.map((item) => item.username); // Assuming x values are stored in the "x" property of each item
  const yValues = data.map((item) => item.count);
  const option = {
    title: {
      text: "Nombre d'appels API",
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

export default ApiLogsByUserChart;
