import React, { memo, useMemo, useState } from "react";
import ReactECharts from "echarts-for-react";
import useChartTheme from "../../hooks/useChartTheme";
import { generateRandomColorsArray } from "../../utils/generateRandomColorsArray";

function RendementRisqueScatter({ data }) {
  const theme = useChartTheme();
  const colors = useMemo(() => generateRandomColorsArray(data.length), [data]);
  console.log("RendementRisqueScatter", data);
  const series = useMemo(() => {
    return data.map((item, index) => ({
      value: [item.Volatilite * 100, item.Performance * 100],
      name: item.NOM_INDICE,
      itemStyle: {
        color: colors[index],
      },
    }));
  }, [data]);
  const options = useMemo(() => {
    return {
      title: {
        text: "Analyse Rendement/Risque Période Annualisée",
        left: "center",
        top: 0,
        ...theme.title,
      },
      legend: {
        data: ["MASI"],
        orient: "verticaly",
        zLevel: 5,
        right: 0,
        bottom: "0",
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
        },
        right: 0,
        top: 15,
      },
      xAxis: {
        type: "value",
        name: "Risque",
        nameLocation: "middle",
        nameGap: 30,
        nameTextStyle: {
          fontSize: 16,
          ...theme.xAxis.nameTextStyle,
        },
        // min: Math.min(...data.map((item) => Math.trunc(item.Volatilite * 100))),
      },

      yAxis: {
        type: "value",
        name: "Rendement",
        nameLocation: "middle",
        nameGap: 30,
        min: Math.min(
          ...data.map((item) => Math.trunc(item.Performance * 100))
        ),
        nameTextStyle: {
          fontSize: 16,
          ...theme.yAxis.nameTextStyle,
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
          return `<strong>${res}</strong> <br /> Rendement: ${params.value[1].toFixed(
            2
          )}% <br /> Risque: ${params.value[0].toFixed(2)}%`;
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
  }, [series, theme]);

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
}

export default memo(RendementRisqueScatter);
