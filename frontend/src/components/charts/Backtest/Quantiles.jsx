import React, { memo, useMemo, useRef } from "react";
import ReactECharts from "echarts-for-react";
import useChartTheme from "../../../hooks/useChartTheme";
import { useSelector } from "react-redux";
import {
  defaultOptions,
  getFullscreenFeature,
} from "../../../utils/chart/defaultOptions";
import moment from "moment";

const xAxisLabels = ["Weekly", "Quarterly", "Monthly", "Yearly"];

const Quantiles = ({ data }) => {
  const theme = useChartTheme();
  const chartRef = useRef(null);
  const myFullscreen = getFullscreenFeature(chartRef);
  const yearly = data
    .map((item) => item.Yearly * 100)
    .filter((item) => item !== 0);
  const monthly = data
    .map((item) => item.Monthly * 100)
    .filter((item) => item !== 0);
  const quarterly = data
    .map((item) => item.Quarterly * 100)
    .filter((item) => item !== 0);
  const weekly = data
    .map((item) => item.Weekly * 100)
    .filter((item) => item !== 0);
  const dataset = [weekly, quarterly, monthly, yearly];
  const options = {
    title: {
      text: "Return Quantiles",
      left: "center",
      ...theme.title,
    },
    dataset: [
      {
        source: dataset,
      },
      {
        transform: {
          type: "boxplot",

          config: { itemNameFormatter: ({ value }) => xAxisLabels[value] },
        },
      },
      {
        fromDatasetIndex: 1,
        fromTransformResult: 1,
      },
    ],
    toolbox: {
      feature: {
        myFullscreen,
        dataZoom: {
          yAxisIndex: true,
        },
        dataView: {},
        restore: {},
        saveAsImage: {},
      },
      top: "20px",
    },
    tooltip: {
      trigger: "item",
      axisPointer: {
        type: "shadow",
      },
      confine: true,
      valueFormatter: (value) => value?.toFixed(2) + "%",
    },
    grid: {
      right: "100px",
      top: "10%",
      bottom: "15%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      boundaryGap: true,
      nameGap: 30,
      splitArea: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      axisLabel: {
        ...theme.xAxis.nameTextStyle,
      },
      ...theme.xAxis,
    },
    yAxis: {
      type: "value",
      splitArea: {
        show: true,
      },
      axisLabel: {
        formatter: "{value} %",
        ...theme.xAxis.nameTextStyle,
      },
      ...theme.yAxis,
    },
    series: [
      {
        name: " ",
        type: "boxplot",
        datasetIndex: 1,
      },
      {
        name: "outlier",
        type: "scatter",
        datasetIndex: 2,
      },
    ],
  };
  return (
    <ReactECharts option={options} style={{ minHeight: 500 }} ref={chartRef} />
  );
};

export default memo(Quantiles);
