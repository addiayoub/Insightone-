import React, { useMemo } from "react";
import { generateRandomColorsArray } from "../../../utils/generateRandomColorsArray";
import useChartTheme from "../../../hooks/useChartTheme";
import ReactECharts from "echarts-for-react";

const Scatter = ({ data }) => {
  const theme = useChartTheme();
  const colors = useMemo(() => generateRandomColorsArray(data.length), [data]);
  console.log("Scatter", data);
  const formatedData = useMemo(() => {
    return data.map((item) => [
      item["Perf relative"] * 100,
      item.TE * 100,
      item.SIM,
    ]);
  }, [data]);
  const seriesData = useMemo(
    () =>
      formatedData.map(([x, y, name], index) => ({
        type: "effectScatter",
        symbol: "circle",
        symbolSize: 20,
        data: [[x, y]],
        itemStyle: {
          color: colors[index],
        },
        name,
      })),
    [formatedData, colors]
  );

  const xMin = useMemo(
    () =>
      Math.min(...data.map((item) => Math.trunc(item["Perf relative"] * 100))),
    [data]
  );
  const yMin = useMemo(
    () => Math.min(...data.map((item) => Math.trunc(item.TE * 100))),
    [data]
  );
  console.log("min", xMin, yMin);
  const options = useMemo(() => {
    return {
      title: {
        text: "Perf relative / TE",
        left: "center",
        top: 0,
        ...theme.title,
      },
      legend: {
        orient: "vertical",
        zLevel: 5,
        right: 0,
        top: "20%",
        height: 200,
        type: "scroll",
        ...theme.legend,
      },
      grid: {
        bottom: "50",
      },
      toolbox: {
        feature: {
          dataZoom: {
            yAxisIndex: "none",
          },
          restore: {},
          saveAsImage: {},
          dataView: {},
        },
        right: 0,
        top: 15,
      },
      xAxis: {
        type: "value",
        name: "Performance relative",
        nameLocation: "middle",
        nameGap: 30,
        // min: xMin,
        axisLabel: {
          ...theme.xAxis.nameTextStyle,
        },
        nameTextStyle: {
          fontSize: 14,
          ...theme.xAxis.nameTextStyle,
        },
      },

      yAxis: {
        type: "value",
        name: "TE",
        // min: yMin,
        nameLocation: "middle",
        nameGap: 30,
        axisLabel: {
          ...theme.yAxis.nameTextStyle,
        },
        nameTextStyle: {
          fontSize: 14,
          ...theme.yAxis.nameTextStyle,
        },
      },
      tooltip: {
        trigger: "item",
        axisPointer: {
          type: "cross",
        },
        formatter: function (params) {
          const { seriesName, value } = params;
          return `<strong>${seriesName}</strong> <br /> TE: ${value[1].toFixed(
            2
          )}% <br /> Performance relative: ${value[0].toFixed(2)}%`;
        },
      },

      series: seriesData,
    };
  }, [seriesData, data, theme]);
  console.log("options", options.series);

  return (
    <ReactECharts
      option={options}
      style={{
        height: "500px",
        minWidth: "600px",
        width: "100%",
        margin: "auto",
      }}
    />
  );
};

export default Scatter;
