import React, { useState } from "react";
import ReactECharts from "echarts-for-react";
import { useRef } from "react";
import { useEffect } from "react";

function Scatter() {
  const chart = useRef(null);
  const data = [
    {
      NOM_INDICE: "EQUIPEMENTS ELECTRONIQUES & ELECTRIQUES",
      Performance: -0.3386536567336329,
      Volatilite: 2.1532766239355174,
    },
    {
      NOM_INDICE: "MASI",
      Performance: 0.013588632857169047,
      Volatilite: 0.1325461761626168,
    },
    {
      NOM_INDICE: "SOCIETES DE PLACEMENT IMMOBILIER",
      Performance: 0.010320963830867003,
      Volatilite: 0.139186479898235,
    },
  ];
  const series = data.map((item) => ({
    value: [item.Performance, item.Volatilite],
    name: "MASI",
    itemStyle: {
      color: "blue",
    },
  }));
  console.log("series", series);
  const options = {
    title: {
      text: "Scatter",
      left: "center",
      top: 0,
    },
    legend: {
      data: data.map((item) => item.NOM_INDICE),
      orient: "verticaly",
      zLevel: 5,
      right: 0,
      bottom: "0",
      type: "scroll",
    },
    grid: {
      bottom: "50",
      left: "50",
      right: "200",
    },
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: "none",
        },
        restore: {},
        saveAsImage: {},
      },
      left: 0,
      top: 15,
    },
    xAxis: {
      type: "value",
      name: "Performance",
      nameLocation: "middle",
      nameGap: 30,
      nameTextStyle: {
        fontSize: 19,
      },
    },

    yAxis: {
      type: "value",
      name: "Volatilité",
      nameLocation: "middle",
      nameGap: 30,
      nameTextStyle: {
        fontSize: 19,
      },
    },
    tooltip: {
      trigger: "item",
      axisPointer: {
        type: "cross",
      },
      formatter: function (params) {
        const { name, seriesName } = params;
        const res = name !== "" ? name : seriesName;
        return `<strong>${res}</strong> <br /> Volatilité: ${params.value[0].toFixed(
          2
        )}% <br /> Performance: ${params.value[1].toFixed(2)}%`;
      },
    },

    series: [
      {
        type: "effectScatter",
        symbol: "circle",
        symbolSize: 20,
        data: series,
        color: "red",
        label: {
          show: true,
          position: "top",
          formatter: (params) => params.name,
          fontSize: 9,
        },
      },
    ],
  };

  return (
    <ReactECharts option={options} style={{ height: "500px", width: "100%" }} />
  );
}

export default Scatter;
