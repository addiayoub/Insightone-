import ReactECharts from "echarts-for-react";
import React, { memo, useMemo } from "react";
import { candelChartTransformData } from "../../utils/candelChartTransformData";
import { calculateMA } from "../../utils/calculateMA";
import useChartTheme from "../../hooks/useChartTheme";
import {
  upColor,
  downColor,
  downBorderColor,
  upBorderColor,
} from "../../utils/generateRandomColorsArray";

function Echart({ data }) {
  const theme = useChartTheme();
  const data0 = useMemo(
    () =>
      candelChartTransformData(
        data,
        "SEANCE",
        "COURS_OUVERTURE",
        "COURS_CLOTURE",
        "COURS_PLUS_BAS",
        "COURS_PLUS_HAUT"
      ),
    [data]
  );
  const options = useMemo(() => {
    return {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
        },
      },
      legend: {
        data: ["optimum", "MA5", "MA10", "MA20", "MA30"],
        ...theme.legend,
        padding: 10,
      },
      grid: {
        left: "10%",
        right: "10%",
        bottom: "15%",
      },
      xAxis: {
        type: "category",
        data: data0.categoryData,
        boundaryGap: false,
        axisLine: { onZero: false },
        splitLine: { show: false },
        min: "dataMin",
        max: "dataMax",
        axisLabel: {
          ...theme.xAxis.nameTextStyle,
        },
        ...theme.xAxis,
      },
      toolbox: {
        feature: {
          dataZoom: {
            yAxisIndex: "none",
          },
          restore: {},
          saveAsImage: {},
        },
      },
      yAxis: {
        scale: true,
        splitArea: {
          show: true,
        },
        axisLabel: {
          ...theme.yAxis.nameTextStyle,
        },
        ...theme.yAxis,
      },
      dataZoom: [
        {
          type: "inside",
          start: 50,
          end: 100,
        },
        {
          show: true,
          type: "slider",
          top: "90%",
          start: 50,
          end: 100,
        },
      ],
      series: [
        {
          name: "optimum",
          type: "candlestick",
          data: data0.values,
          itemStyle: {
            color: upColor,
            color0: downColor,
            borderColor: upBorderColor,
            borderColor0: downBorderColor,
          },
          markPoint: {
            label: {
              formatter: function (param) {
                return param != null ? Math.round(param.value) + "" : "";
              },
            },
            data: [
              {
                name: "Mark",
                // coord: ["2013/5/31", 2300],
                value: 2300,
                itemStyle: {
                  color: "rgb(41,60,85)",
                },
              },
              {
                name: "highest value",
                type: "max",
                valueDim: "highest",
              },
              {
                name: "lowest value",
                type: "min",
                valueDim: "lowest",
              },
              {
                name: "average value on close",
                type: "average",
                valueDim: "close",
              },
            ],
            tooltip: {
              formatter: function (param) {
                return param.name + "<br>" + (param.data.coord || "");
              },
            },
          },
          markLine: {
            symbol: ["none", "none"],
            data: [
              [
                {
                  name: "from lowest to highest",
                  type: "min",
                  valueDim: "lowest",
                  symbol: "circle",
                  symbolSize: 10,
                  label: {
                    show: false,
                  },
                  emphasis: {
                    label: {
                      show: false,
                    },
                  },
                },
                {
                  type: "max",
                  valueDim: "highest",
                  symbol: "circle",
                  symbolSize: 10,
                  label: {
                    show: false,
                  },
                  emphasis: {
                    label: {
                      show: false,
                    },
                  },
                },
              ],
              {
                name: "min line on close",
                type: "min",
                valueDim: "close",
              },
              {
                name: "max line on close",
                type: "max",
                valueDim: "close",
              },
            ],
          },
        },
        {
          name: "MA5",
          type: "line",
          data: calculateMA(5, data0),
          smooth: true,
          lineStyle: {
            opacity: 0.5,
          },
        },
        {
          name: "MA10",
          type: "line",
          data: calculateMA(10, data0),
          smooth: true,
          lineStyle: {
            opacity: 0.5,
          },
        },
        {
          name: "MA20",
          type: "line",
          data: calculateMA(20, data0),
          smooth: true,
          lineStyle: {
            opacity: 0.5,
          },
        },
        {
          name: "MA30",
          type: "line",
          data: calculateMA(30, data0),
          smooth: true,
          lineStyle: {
            opacity: 0.5,
          },
        },
      ],
    };
  }, [data0, theme]);

  return <ReactECharts option={options} style={{ height: "500px" }} />;
}

export default memo(Echart);
