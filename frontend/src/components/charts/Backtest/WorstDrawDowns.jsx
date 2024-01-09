import React, { memo, useMemo } from "react";
import ReactECharts from "echarts-for-react";
import useChartTheme from "../../../hooks/useChartTheme";
import { useSelector } from "react-redux";
import { defaultOptions } from "../../../utils/chart/defaultOptions";

const WorstDrawDowns = ({ data, evolution }) => {
  console.log("WorstDrawDowns", data);
  console.log("Evolu", evolution);
  const { selectedPtf } = useSelector((state) => state.backtest);
  const theme = useChartTheme();
  const lineData = useMemo(
    () => evolution.map((item) => item[selectedPtf] * 100),
    [evolution, selectedPtf]
  );
  const xAxisData = useMemo(
    () => evolution.map((item) => item.seance),
    [evolution]
  );
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
      grid: {
        right: "100px",
        top: "10%",
        bottom: "15%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        boundaryGap: true,
        data: xAxisData,
        axisLabel: {
          ...theme.xAxis.nameTextStyle,
        },
        ...theme.yAxis,
      },
      visualMap: {
        show: false,
        min: 0,
        max: 1,
        inRange: {
          color: ["red", "green"],
        },
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
          data: lineData,
          markArea: {
            itemStyle: {
              color: "rgba(255, 173, 177, 0.4)",
            },
            data: marksArea,
          },
        },
      ],
      ...defaultOptions,
    };
  }, [theme, lineData, xAxisData, marksArea]);
  return <ReactECharts option={options} style={{ minHeight: 500 }} />;
};

export default memo(WorstDrawDowns);
