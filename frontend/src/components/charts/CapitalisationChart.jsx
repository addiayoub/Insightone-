import ReactECharts from "echarts-for-react";
import React from "react";
import { useSelector } from "react-redux";
import { formatDate } from "../../utils/FormatDate";
import { formatNumberWithSpaces } from "../../utils/formatNumberWithSpaces";

export default function CapitalisationChart({ data }) {
  const { darkTheme } = useSelector((state) => state.theme);
  const options = {
    tooltip: {
      trigger: "axis",
      position: function (pt) {
        return [pt[0], "10%"];
      },
    },
    title: {
      left: "center",
      text: "",
    },
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: "none",
        },
        restore: {},
        saveAsImage: {},
      },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: data.map((item) => formatDate(item.SEANCE)),
    },
    yAxis: {
      type: "value",
      boundaryGap: [0, "100%"],
      axisLabel: {
        formatter: function (value) {
          const val = value / 1000000000;
          return val + "M";
        },
      },
    },
    dataZoom: [
      {
        type: "inside",
        start: 0,
        end: 100,
      },
      {
        start: 0,
        end: 100,
      },
    ],
    series: [
      {
        name: "MASI",
        type: "line",
        symbol: "none",
        sampling: "lttb",
        itemStyle: {
          color: darkTheme ? "white" : "black",
        },
        areaStyle: {
          color: darkTheme ? "white" : "black",
        },
        tooltip: {
          valueFormatter: function (value) {
            return formatNumberWithSpaces(value.toFixed(2));
          },
        },
        data: data.map((item) => item.Capitalisation),
      },
    ],
  };

  return <ReactECharts option={options} style={{ height: "450px" }} />;
}
