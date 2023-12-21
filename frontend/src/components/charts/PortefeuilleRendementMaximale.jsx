import React from "react";
import ReactECharts from "echarts-for-react";

function PortefeuilleRendementMaximale({ data }) {
  console.log("data", data);
  const options = {
    title: {
      text: "Portefeuille Rendement Maximale",
      left: "center",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      valueFormatter: (value) => value.toFixed(2),
    },
    xAxis: {
      type: "category",
      data: data.map((item) => item.titre),
      axisLabel: {
        rotate: 45, // Rotate the labels for better visibility
      },
    },
    grid: {
      left: "10%",
      top: "10%",
      right: "10%",
      bottom: "33%",
    },
    dataZoom: [
      {
        type: "slider", // Enable slider data zoom
        show: true,
        xAxisIndex: [0],
        start: 0,
        end: 100,
      },
      {
        type: "inside", // Enable inside data zoom (can zoom with mouse wheel)
        xAxisIndex: [0],
        start: 0,
        end: 100,
      },
    ],
    yAxis: {
      type: "value",
      name: "PTF_Max_Rdt",
    },
    series: [
      {
        name: "PTF_Max_Rdt",
        type: "bar",
        data: data.map((item) => item.PTF_Max_Rdt),
      },
    ],
  };
  return (
    <ReactECharts
      option={options}
      className="my-8"
      style={{
        height: "500px",
      }}
    />
  );
}

export default PortefeuilleRendementMaximale;
