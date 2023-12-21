import React from "react";
import ReactECharts from "echarts-for-react";
import { useSelector } from "react-redux";

function SecteurPerformance({ data, height = "400px" }) {
  console.log("Last seance", data);
  const upColor = "#ec0000";
  const downColor = "#00da3c";
  const { darkTheme } = useSelector((state) => state.theme);
  const color = (dataArray) => {
    let result = [];
    const values = [];
    dataArray.map((item) => values.push((item.Rdt_cum * 100).toFixed(2)));
    values
      .sort((a, b) => a - b)
      .map((value) => {
        if (value < 0) {
          result.push({
            value,
            itemStyle: { color: upColor },
          });
        } else {
          result.push({
            value,
            itemStyle: { color: downColor },
          });
        }
      });
    console.log(result);
    return result;
  };
  const options = {
    title: {
      text: "Performance Secteur",
      textStyle: {
        color: darkTheme ? "white" : "black",
      },
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "value",
      },
    ],
    yAxis: [
      {
        type: "category",
        axisTick: {
          show: false,
        },
        data: data.map((item) => item.nom_indice),
      },
    ],
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: "none",
        },
        restore: {},
        saveAsImage: {},
      },
    },
    series: [
      {
        name: "",
        type: "bar",
        label: {
          show: false,
        },
        emphasis: {
          focus: "series",
        },
        data: color(data),
      },
    ],
  };
  return <ReactECharts option={options} style={{ height }} />;
}

export default SecteurPerformance;
