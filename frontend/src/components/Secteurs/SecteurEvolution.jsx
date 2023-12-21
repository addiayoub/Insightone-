import React from "react";
import ReactECharts from "echarts-for-react";
import groupBy from "../../utils/groupBy";
import { formatDate } from "../../utils/FormatDate";
import { useSelector } from "react-redux";
function SecteurEvolution({ data, height }) {
  console.log("data is", data);
  const groupedData = groupBy(data, "nom_indice");
  const { darkTheme } = useSelector((state) => state.theme);
  const key = Object.keys(groupedData)[0];
  const categories = groupedData[key].map((item) => formatDate(item.seance));
  console.log("grouped dat", categories);
  const seriesData = [];
  for (const key in groupedData) {
    seriesData.push({
      name: key,
      data: groupedData[key].map((item) => item.VL_B100),
      type: "line",
    });
  }
  console.log("seriesData", seriesData);
  const options = {
    title: {
      text: "Evolution Secteur",
      textStyle: {
        color: darkTheme ? "white" : "black",
      },
    },
    tooltip: {
      trigger: "item",
      axisPointer: {
        type: "shadow",
      },
      valueFormatter: function (value) {
        return value.toFixed(2);
      },
    },
    legend: {
      data: seriesData.map((item) => item.name),
      textStyle: { color: darkTheme ? "white" : "black" },
      orient: "horizontal",
      zLevel: 5,
      top: "10%",
      type: "scroll",
    },
    grid: {
      left: "10%",
      top: "30%",
      right: "10%",
      bottom: "15%",
    },
    toolbox: {
      feature: {
        saveAsImage: { show: true },
      },
    },
    dataZoom: {
      start: 0,
      end: 50,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: categories,
    },
    yAxis: {
      type: "value",
    },
    series: seriesData,
  };
  return <ReactECharts option={options} style={{ height }} />;
}

export default SecteurEvolution;
