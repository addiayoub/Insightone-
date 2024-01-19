import React, { memo, useMemo } from "react";
import ReactECharts from "echarts-for-react";
import useChartTheme from "../../../hooks/useChartTheme";
import echarts from "echarts/lib/echarts";

// const lineData = data.map((item) => item.Frequency * 100);
// const barData = data.map((item) => item.KDE);
// const xAxisData = data.map((item) => item.Returns * 100);
const DistrubitionMonthly = ({ data }) => {
  console.log("Render DistrubitionMonthly");
  const theme = useChartTheme();
  const xAxisData = useMemo(
    () => data.map((item) => (item.Returns * 100).toFixed(2)),
    [data]
  );
  const min = Math.min(...xAxisData);
  const max = Math.max(...xAxisData);
  console.log("Min DistrubitionMonthly", min, max);
  const options = useMemo(() => {
    return {
      title: {
        text: "Distribution of Weekly Returns",
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
          magicType: { show: true, type: ["line", "bar"] },
          restore: { show: true },
          saveAsImage: { show: true },
          dataView: {},
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
          data: [...xAxisData, max + 1],
          boundaryGap: true,
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
          type: "line",
          smooth: true,
          symbol: "none",
          sampling: "lttb",
          itemStyle: {
            color: "#30c63f",
          },
          areaStyle: {
            color: "rgba(48, 198, 63, 0.25)",
          },
          data: data.map((item) => item.KDE),
        },
        {
          name: "Frequency",
          type: "bar",
          yAxisIndex: 1,
          data: data.map((item) => item.Frequency),
        },
        {
          name: "Norm Value",
          type: "line",
          symbol: "none",
          sampling: "lttb",
          itemStyle: {
            color: "#df289e",
          },
          areaStyle: {
            color: "rgba(223, 40, 158, 0.25)",
          },
          smooth: true,
          data: data.map((item) => item.norm_values),
        },
      ],
    };
  }, [theme, data, xAxisData]);
  return (
    <ReactECharts
      option={options}
      style={{
        minHeight: 500,
      }}
    />
  );
};

export default memo(DistrubitionMonthly);
