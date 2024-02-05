import React, { memo, useMemo } from "react";
import { generateRandomColorsArray } from "../../../utils/generateRandomColorsArray";
import { formatNumberWithSpaces } from "../../../utils/formatNumberWithSpaces";
import ScatterChart from "../Default/ScatterChart";
const FondsVersus = ({ data }) => {
  const societeGes = useMemo(
    () => [...new Set(data.map((item) => item.Nom_Gerant))],
    [data]
  );
  console.log("Nom_Gerant", societeGes);
  const colors = useMemo(
    () => generateRandomColorsArray(societeGes.length),
    [societeGes]
  );

  const formatedData = useMemo(() => {
    return data.map((item) => [
      item.vol_opc * 100,
      item.perf_opc_3A * 100,
      item.encours_OPC,
      item.denomination_OPCVM,
      item.Nom_Gerant,
    ]);
  }, [data]);
  const seriesData = useMemo(
    () =>
      formatedData.map(([x, y, z, name, sg]) => ({
        name: sg,
        type: "effectScatter",
        symbol: "circle",
        rippleEffect: {
          period: 4,
        },
        symbolSize: function () {
          return Math.sqrt(z) / 10e2;
        },
        data: [[x, y, name, z]],
        itemStyle: {
          color: colors[societeGes.indexOf(sg)],
        },
      })),
    [formatedData, societeGes, colors]
  );
  const xValues = useMemo(() => data.map((item) => item.vol_opc * 100), [data]);
  const yValues = useMemo(
    () => data.map((item) => item.perf_opc_3A * 100),
    [data]
  );
  const axisValues = {
    x: [Math.min(...xValues), Math.max(...xValues)],
    y: [Math.min(...yValues), Math.max(...yValues)],
  };
  const options = useMemo(() => {
    return {
      title: {
        text: "Fonds versus catégorie",
        left: "center",
      },
      legend: {
        right: 0,
        top: "20%",
        formatter: function (name) {
          if (name.length > 25) {
            const newName = name.split(" ");
            return newName.join(" \n");
          }
          return name;
        },
      },
      grid: {
        right: "250px",
      },
      xAxis: {
        name: "Volatilité",
        nameGap: 30,
        min: axisValues.x[0],
        max: axisValues.x[1],
        axisLabel: {
          formatter: (value) => parseFloat(value).toFixed(2),
        },
      },

      yAxis: {
        name: "Performance 3 ans",
        min: axisValues.y[0],
        max:
          axisValues.y[0] === axisValues.y[1]
            ? axisValues.y[0] + 1
            : axisValues.y[1],
        nameGap: 30,
        axisLabel: {
          formatter: (value) => parseFloat(value).toFixed(2),
        },
      },
      tooltip: {
        trigger: "item",
        formatter: function (params) {
          const { seriesName, value } = params;
          return `<strong>${seriesName} - (${
            value[2]
          })</strong> <br /> Performance 3 ans: ${value[1].toFixed(
            2
          )}% <br /> Volatilité: ${value[0].toFixed(
            2
          )}%<br /> Encours: ${formatNumberWithSpaces(value[3])}`;
        },
      },

      series: seriesData,
    };
  }, [seriesData, data, axisValues]);
  return (
    <>
      <ScatterChart
        options={options}
        style={{
          height: "500px",
          minWidth: "600px",
          width: "100%",
          margin: "15px auto",
        }}
      />
    </>
  );
};

export default memo(FondsVersus);
