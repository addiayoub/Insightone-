import React, { memo, useMemo } from "react";
import ReactECharts from "echarts-for-react";
import useChartTheme from "../../../hooks/useChartTheme";

const WorstDrawDowns = ({ data }) => {
  console.log("WorstDrawDowns", data);
  const theme = useChartTheme();
  const seriesData = useMemo(() => data.map((item) => item.Drawdown), [data]);
  const started = useMemo(() => data.map((item) => item.Started), [data]);
  const recovered = useMemo(() => data.map((item) => item.Recovered), [data]);
  const xAxisData = [...started, ...recovered].sort();
  const marksArea = useMemo(() => {
    return data.map((item) => [
      {
        xAxis: item.Started,
      },
      {
        xAxis: item.Recovered,
      },
    ]);
  }, [data]);
  console.log("marks", marksArea);
  const options = useMemo(() => {
    return {
      title: {
        text: "Worst 5 Drawdowns Periods",
        left: "center",
        ...theme.title,
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
        },
        confine: true,
        valueFormatter: (value) => value?.toFixed(2),
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
        // boundaryGap: false,
        data: xAxisData,
        axisLabel: {
          ...theme.xAxis.nameTextStyle,
        },
        ...theme.yAxis,
      },
      yAxis: {
        type: "value",
        axisPointer: {
          snap: true,
        },
        axisLabel: {
          ...theme.xAxis.nameTextStyle,
        },
        ...theme.yAxis,
      },
      series: [
        {
          name: "",
          type: "line",
          smooth: true,
          data: seriesData,
          markArea: {
            itemStyle: {
              color: "rgba(255, 173, 177, 0.4)",
            },
            data: marksArea,
          },
        },
      ],
    };
  }, [theme, seriesData, xAxisData]);
  return <ReactECharts option={options} style={{ minHeight: 500 }} />;
};

export default WorstDrawDowns;
