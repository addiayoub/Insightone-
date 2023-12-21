import ReactECharts from "echarts-for-react";
import React from "react";
import { transformData } from "../../utils/dataTransformation";
import { formatNumberWithSpaces } from "../../utils/formatNumberWithSpaces";
import { formatDate } from "../../utils/FormatDate";
import useChartTheme from "../../hooks/useChartTheme";

function VolumeEchange({ chartData }) {
  console.log("VolumeEchange", chartData);
  // chartData.sort((a, b) => new Date(a.seance) - new Date(b.seance));
  console.log(chartData.map((item) => item.seance));
  const data = transformData(chartData);
  console.log("VolumeEchange dqtq", data);

  const theme = useChartTheme();
  const options = {
    grid: {
      top: "10%", // Adjust the top value based on your needs
      left: "3%",
      right: "3%",
      bottom: "20%", // Adjust the bottom value based on your needs
      containLabel: true,
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        crossStyle: {
          color: "#999",
        },
      },
    },
    toolbox: {
      feature: {
        dataView: { show: false, readOnly: false },
        magicType: { show: false, type: ["line", "bar"] },
        restore: { show: true },
        dataZoom: {
          yAxisIndex: false,
        },
        saveAsImage: { show: true },
      },
    },
    title: {
      text: "Volume échangé hebdomadaire",
      left: "center",
      ...theme.title,
    },
    legend: {
      data: [
        "Volume Marché de blocs",
        "Volume Marché central",
        "Volume moyen YTD",
        "Volume moyen 1AN",
      ],
      ...theme.legend,
      orient: "horizontal",
      bottom: "10%",
    },
    xAxis: [
      {
        type: "category",
        data: data.seance.map((item) => formatDate(item)),
        axisPointer: {
          type: "shadow",
        },
      },
    ],
    dataZoom: [
      {
        type: "slider",
        xAxisIndex: 0,
        start: 99.9,
        end: 100,
      },
    ],
    yAxis: {
      type: "value",
      axisLabel: {
        formatter: function (value) {
          const val = (value / 1e6).toFixed(2);
          return formatNumberWithSpaces(val) + " MMAD";
        },
      },
    },
    series: [
      {
        name: "Volume Marché de blocs",
        type: "bar",
        data: data.Volume_MB,
        tooltip: {
          valueFormatter: function (value) {
            const val = (value / 1e6).toFixed(2);
            return formatNumberWithSpaces(val);
          },
        },
      },
      {
        name: "Volume Marché central",
        type: "bar",
        data: data.Volume_MC,
        tooltip: {
          valueFormatter: function (value) {
            const val = (value / 1e6).toFixed(2);
            return formatNumberWithSpaces(val);
          },
        },
      },
      {
        name: "Volume moyen YTD",
        type: "line",
        data: data.moyen_volume_ytd,
        tooltip: {
          valueFormatter: function (value) {
            const val = (value / 1e6).toFixed(2);
            return formatNumberWithSpaces(val);
          },
        },
      },
      {
        name: "Volume moyen 1AN",
        type: "line",
        data: data.moyen_volume_1an,
        tooltip: {
          valueFormatter: function (value) {
            const val = (value / 1e6).toFixed(2);
            return formatNumberWithSpaces(val);
          },
        },
      },
    ],
  };
  return (
    <ReactECharts option={options} style={{ height: "500px", width: "100%" }} />
  );
}

export default VolumeEchange;
