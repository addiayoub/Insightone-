import ReactECharts from "echarts-for-react";
import React from "react";
import { useSelector } from "react-redux";

function PortefeuilleDonut({ data, field }) {
  const { darkTheme } = useSelector((state) => state.theme);
  let seriesData = [];
  data.forEach((item) => {
    seriesData.push({
      value: item[field].toFixed(2),
      name: item.titre,
    });
  });
  const options = {
    tooltip: {
      trigger: "item",
      formatter: function (params) {
        return `${params.name}: ${params.value} %`;
      },
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: false },
        dataView: { show: false, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    legend: {
      textStyle: { color: darkTheme ? "white" : "black" },
      orient: "horizontal",
      zLevel: 5,
      bottom: "0%",
      type: "scroll",
    },
    grid: {
      left: "10%",
      top: "30%",
      right: "10%",
      bottom: "15%",
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: ["0%", "80%"],
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
  return (
    <ReactECharts
      option={options}
      style={{
        height: data.length < 8 ? "300px" : "500px",
        maxHeight: "600px",
        maxWidth: "500px",
      }}
    />
  );
}

export default PortefeuilleDonut;
