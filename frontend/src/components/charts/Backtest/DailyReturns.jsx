import React, { memo } from "react";
import ReactECharts from "echarts-for-react";
import useChartTheme from "../../../hooks/useChartTheme";

const DailyReturns = ({ data }) => {
  const theme = useChartTheme();
  const seriesName = Object.keys(data[0]).filter((key) => key !== "seance");
  const series = seriesName.map((key) => ({
    name: key,
    type: "bar",
    data: data.map((item) => ({
      value: item[key],
      itemStyle: {
        color: item[key] < 0 ? "#ee4658" : "#21cc6d",
      },
    })),
  }));
  const options = {
    title: {
      text: "Returns",
      left: "center",
      ...theme.title,
    },
    tooltip: {
      trigger: "axis",
      confine: true,
      valueFormatter: (value) => value?.toFixed(2),
    },
    legend: {
      show: false,
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
      data: data.map((item) => item.seance),
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

export default DailyReturns;
