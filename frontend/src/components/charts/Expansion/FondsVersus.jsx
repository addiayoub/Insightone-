import React, { memo, useMemo } from "react";
import ReactECharts from "echarts-for-react";
import useChartTheme from "../../../hooks/useChartTheme";
import { generateRandomColorsArray } from "../../../utils/generateRandomColorsArray";
const dd = [
  {
    encours_OPC: 25974765.79,
    denomination_OPCVM: "SG EXPANSION",
    CLASSIFICATION: "ACTIONS",
    perf_bench_3A: 0.0321378548863267,
    perf_opc_3A: 0.044103850088007324,
    Perf_BenchClasse_3A: 0.03213785488632648,
    vol_bench: 0.12615415935877597,
    vol_opc: 0.11597066174690975,
    Nom_Gerant: "SOGECAPITAL GESTION",
  },
];
const FondsVersus = ({ data }) => {
  const theme = useChartTheme();
  const societeGes = useMemo(
    () => [...new Set(data.map((item) => item.Nom_Gerant))],
    [data]
  );
  console.log("Nom_Gerant", societeGes);
  const colors = useMemo(
    () => generateRandomColorsArray(societeGes.length),
    [societeGes]
  );

  console.log(colors.length);
  const formatedData = useMemo(() => {
    return data.map((item) => [
      item.perf_opc_3A * 100,
      item.vol_opc * 100,
      item.encours_OPC,
      item.denomination_OPCVM,
      item.Nom_Gerant,
    ]);
  }, [data]);
  const seriesData = useMemo(
    () =>
      formatedData.map(([x, y, z, name, sg]) => ({
        name,
        type: "effectScatter",
        symbol: "circle",
        symbolSize: function () {
          console.log(sg, societeGes.indexOf(sg));
          return Math.sqrt(z) / 10e2;
        },
        data: [[x, y, sg]],
        itemStyle: {
          color: colors[societeGes.indexOf(sg)],
        },
      })),
    [formatedData, colors]
  );
  const xValues = useMemo(
    () => data.map((item) => item.perf_opc_3A * 100),
    [data]
  );
  const yValues = useMemo(() => data.map((item) => item.vol_opc * 100), [data]);
  const axisValues = {
    x: [Math.min(...xValues), Math.max(...xValues)],
    y: [Math.min(...yValues), Math.max(...yValues)],
  };
  const options = useMemo(() => {
    return {
      title: {
        text: "Fonds versus catégorie",
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
        width: 200,
        type: "scroll",
        formatter: function (name) {
          if (name.length > 25) {
            const newName = name.split(" ");
            return newName.join(" \n");
          }
          return name;
        },
        ...theme.legend,
      },
      grid: {
        bottom: "50",
        right: "250px",
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
        name: "Performance 3 ans",
        nameLocation: "middle",
        nameGap: 30,
        min: axisValues.x[0],
        max: axisValues.x[1],
        axisLabel: {
          formatter: (value) => parseFloat(value).toFixed(2),
          ...theme.xAxis.nameTextStyle,
        },
        nameTextStyle: {
          fontSize: 14,
          ...theme.xAxis.nameTextStyle,
        },
      },

      yAxis: {
        type: "value",
        name: "Volatilité",
        min: axisValues.y[0],
        max:
          axisValues.y[0] === axisValues.y[1]
            ? axisValues.y[0] + 1
            : axisValues.y[1],
        nameLocation: "middle",
        nameGap: 30,
        axisLabel: {
          formatter: (value) => parseFloat(value).toFixed(2),
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
          return `<strong>${seriesName} - (${
            value[2]
          })</strong> <br /> vol_opc: ${value[1].toFixed(
            2
          )}% <br /> perf_opc_3A: ${value[0].toFixed(2)}%`;
        },
      },

      series: seriesData,
    };
  }, [seriesData, data, theme]);
  return (
    <ReactECharts
      option={options}
      style={{
        height: "500px",
        minWidth: "600px",
        width: "100%",
        margin: "15px auto",
      }}
    />
  );
};

export default memo(FondsVersus);
