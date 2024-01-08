import React, { memo, useMemo } from "react";
import ReactECharts from "echarts-for-react";
import useChartTheme from "../../../hooks/useChartTheme";

const getOptions = (data, seriesNames, title, theme) => {
  return {
    title: {
      text: title,
      left: "center",
      ...theme.title,
    },
    grid: {
      right: "20%",
      top: "10%",
      // right: "3%",
      bottom: "15%",
      containLabel: true,
    },
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: true,
        },
        restore: {},
        saveAsImage: {},
      },
      top: "20px",
    },
    tooltip: {
      trigger: "axis",
      textStyle: {
        overflow: "breakAll",
        width: 40,
      },
      confine: true,
      valueFormatter: (value) => value?.toFixed(2),
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
        type: "inside",
        xAxisIndex: [0],
        start: 0,
        end: 100,
      },
    ],
    xAxis: {
      type: "category",
      data: data.map((item) => item.seance),
      axisLabel: {
        ...theme.xAxis.nameTextStyle,
      },
      ...theme.yAxis,
    },
    legend: {
      // data: seriesNames,
      orient: "vertical",
      zLevel: 23,
      height: "50%",
      top: "center",
      right: 0,
      type: "scroll",
      ...theme.legend,
    },
    yAxis: {
      type: "value",
      axisLabel: {
        ...theme.yAxis.nameTextStyle,
      },
    },
    series: seriesNames.map((seriesName) => ({
      name: seriesName === "returns_mv_cum" ? "ptf-min-var" : seriesName,
      type: "line",
      symbol: "none",
      data: data.map((item) => item[seriesName] * 100),
    })),
  };
};

const Cumualative = ({ data }) => {
  const theme = useChartTheme();
  const seriesNames = Object.keys(data[0]).filter(
    (key) => key !== "seance" && key !== "returns_mv_cum"
  );
  const seriesNames2 = Object.keys(data[0]).filter(
    (key) => key !== "seance" && key !== "ptf-min-var"
  );
  const options = getOptions(
    data,
    seriesNames,
    "Cumulative Returns vs Benchmark",
    theme
  );
  const options2 = getOptions(
    data,
    seriesNames2,
    "Cumulative Returns vs Benchmark (Log Scaled)",
    theme
  );
  return (
    <>
      <ReactECharts
        option={options}
        style={{
          minHeight: 500,
          margin: "15px 0",
        }}
      />
      <ReactECharts
        option={options2}
        style={{
          minHeight: 500,
          margin: "15px 0",
        }}
      />
    </>
  );
};

export default Cumualative;
