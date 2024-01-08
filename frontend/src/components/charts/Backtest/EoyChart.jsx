import React, { memo } from "react";
import ReactECharts from "echarts-for-react";
import useChartTheme from "../../../hooks/useChartTheme";

const EoyChart = ({ data }) => {
  const theme = useChartTheme();

  const years = data.map((item) => item.Year);
  const seriesName = Object.keys(data[0]).filter(
    (key) => key !== "Year" && key !== "Won"
  );
  const series = seriesName.map((key) => ({
    name: key,
    type: "bar",
    data: data.map((item) => item[key]),
  }));
  const options = {
    title: {
      text: "EOY Returns vs Benchmark vs Bench_cat",
      left: "center",
      ...theme.title,
    },
    tooltip: {
      trigger: "axis",
      confine: true,
      valueFormatter: (value) => value?.toFixed(2),
    },
    legend: {
      data: seriesName,
      orient: "vertical",
      zLevel: 23,
      height: "50%",
      top: "center",
      right: 0,
      type: "scroll",
      ...theme.legend,
    },
    grid: {
      right: "18%",
      top: "10%",
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
    xAxis: {
      type: "category",
      data: years,
      axisLabel: {
        ...theme.xAxis.nameTextStyle,
      },
      ...theme.xAxis,
    },
    yAxis: {
      type: "value",
      axisLabel: {
        ...theme.yAxis.nameTextStyle,
      },
      ...theme.yAxis,
    },
    series: series,
  };
  return (
    <ReactECharts
      option={options}
      style={{
        minHeight: 500,
      }}
    />
  );
};

export default memo(EoyChart);
