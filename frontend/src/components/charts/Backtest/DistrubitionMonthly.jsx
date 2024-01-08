import React, { useMemo } from "react";
import ReactECharts from "echarts-for-react";
import useChartTheme from "../../../hooks/useChartTheme";

// const lineData = data.map((item) => item.Frequency * 100);
// const barData = data.map((item) => item.KDE);
// // const xAxisData = data.map((item) => item.Returns * 100);
const DistrubitionMonthly = ({ data }) => {
  const theme = useChartTheme();
  const options = useMemo(() => {
    return {
      title: {
        text: "Distribution of Monthly Returns",
        left: "center",
        ...theme.title,
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // type: "cross",
          crossStyle: {
            color: "#999",
          },
        },
        confine: true,
        valueFormatter: (value) => value?.toFixed(2),
      },
      toolbox: {
        feature: {
          dataView: {},
          magicType: { show: true, type: ["line", "bar"] },
          restore: { show: true },
          saveAsImage: { show: true },
          dataZoom: {
            yAxisIndex: true,
          },
        },
      },
      legend: {
        show: false,
      },
      xAxis: [
        {
          type: "category",
          // data: xAxisData,
          axisPointer: {
            type: "shadow",
          },
          axisLabel: {
            ...theme.xAxis.nameTextStyle,
          },
          ...theme.xAxis,
        },
      ],
      yAxis: [
        {
          type: "value",
          name: "KDB",
          axisLabel: {
            ...theme.yAxis.nameTextStyle,
          },
          ...theme.yAxis,
        },
        {
          type: "value",
          name: "Frequency",
          axisLabel: {
            ...theme.yAxis.nameTextStyle,
          },
          ...theme.yAxis,
        },
      ],
      series: [
        {
          name: "KDE",
          type: "bar",
          data: data.map((item) => item.KDE),
        },
        {
          name: "Frequency",
          type: "line",
          yAxisIndex: 1,
          data: data.map((item) => item.Frequency * 100),
        },
      ],
    };
  }, [theme, data]);
  return (
    <ReactECharts
      option={options}
      style={{
        minHeight: 500,
      }}
    />
  );
};

export default DistrubitionMonthly;
