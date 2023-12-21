import ReactECharts from "echarts-for-react";

import React from "react";
import { useSelector } from "react-redux";

function Donut({ data }) {
  const { darkTheme } = useSelector((state) => state.theme);
  let seriesData = [];
  data.forEach((item) => {
    if (item.marche !== "Marché globale") {
      seriesData.push({
        value: (item.perf * 100).toFixed(2),
        name: item.marche,
      });
    }
  });
  const options = {
    tooltip: {
      trigger: "item",
      formatter: function (params) {
        return `${params.name}: ${params.value} %`;
      },
    },
    legend: {
      top: "0%",
      left: "center",
      textStyle: { color: darkTheme ? "white" : "black" },
      padding: 10,
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 18,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: seriesData,
      },
    ],
  };
  return <ReactECharts option={options} />;
}

export default Donut;
