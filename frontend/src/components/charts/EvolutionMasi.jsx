import ReactECharts from "echarts-for-react";
import React, { memo, useCallback, useMemo } from "react";
import { formatDate } from "../../utils/FormatDate";
import useChartTheme from "../../hooks/useChartTheme";

const upColor = "#00da3c";
const downColor = "#ec0000";

function EvolutionMasi({ data }) {
  const theme = useChartTheme();
  const chartData = useMemo(() => {
    return data.map((item) => [
      item.COURS_OUVERTURE,
      item.COURS_PLUS_BAS,
      item.COURS_PLUS_HAUT,
      item.COURS_CLOTURE,
      item.VARIATION,
    ]);
  }, [data]);
  const options = useMemo(() => {
    return {
      animation: true,
      legend: {
        bottom: 10,
        left: "center",
        ...theme.legend,
      },
      title: {
        text: "Evolution MASI hebdomadaire",
        left: 0,
        ...theme.title,
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
        },
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        textStyle: {
          color: "#000",
        },
        position: function (pos, params, el, elRect, size) {
          const obj = {
            top: 10,
          };
          obj[["left", "right"][+(pos[0] < size.viewSize[0] / 2)]] = 30;
          return obj;
        },
      },
      axisPointer: {
        link: [
          {
            xAxisIndex: "all",
          },
        ],
        label: {
          backgroundColor: "#777",
        },
      },
      toolbox: {
        feature: {
          dataZoom: {
            yAxisIndex: false,
          },
          brush: {
            type: ["lineX", "clear"],
          },
        },
      },
      brush: {
        xAxisIndex: "all",
        brushLink: "all",
        outOfBrush: {
          colorAlpha: 0.1,
        },
      },
      visualMap: {
        show: false,
        seriesIndex: 5,
        dimension: 2,
        pieces: [
          {
            value: 1,
            color: downColor,
          },
          {
            value: -1,
            color: upColor,
          },
        ],
      },
      grid: [
        {
          left: "10%",
          right: "8%",
          height: "50%",
        },
        {
          left: "10%",
          right: "8%",
          top: "63%",
          height: "16%",
        },
      ],
      xAxis: [
        {
          type: "category",
          data: data.map((item) => formatDate(item.SEANCE)),
          boundaryGap: false,
          axisLine: { onZero: false },
          splitLine: { show: false },
          min: "dataMin",
          max: "dataMax",
          axisPointer: {
            z: 100,
          },
        },
        {
          type: "category",
          gridIndex: 1,
          data: data.map((item) => formatDate(item.SEANCE)),
          boundaryGap: false,
          axisLine: { onZero: false },
          axisTick: { show: false },
          splitLine: { show: false },
          axisLabel: { show: false },
          min: "dataMin",
          max: "dataMax",
        },
      ],
      yAxis: [
        {
          scale: true,
          splitArea: {
            show: true,
          },
        },
        {
          scale: true,
          gridIndex: 1,
          splitNumber: 2,
          axisLabel: { show: false },
          axisLine: { show: false },
          axisTick: { show: false },
          splitLine: { show: false },
        },
      ],
      dataZoom: [
        {
          type: "inside",
          xAxisIndex: [0, 1],
          start: 99,
          end: 100,
        },
        {
          show: true,
          xAxisIndex: [0, 1],
          type: "slider",
          top: "85%",
          start: 99,
          end: 100,
        },
      ],
      series: [
        {
          type: "candlestick",
          data: chartData,
          itemStyle: {
            color: "#ef232a",
            color0: "#14b143",
            borderColor: "#ef232a",
            borderColor0: "#14b143",
          },
          barWidth: 10,
        },
      ],
    };
  }, [data, theme]);
  return <ReactECharts option={options} style={{ height: "500px" }} />;
}

export default memo(EvolutionMasi);
