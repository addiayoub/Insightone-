import React, { memo, useMemo, useState } from "react";
import ReactECharts from "echarts-for-react";
import useChartTheme from "../../hooks/useChartTheme";
import { generateRandomColorsArray } from "../../utils/generateRandomColorsArray";
import useSeriesSelector from "../../hooks/useSeriesSelector";

const getSeriesData = (data) => {
  const colors = generateRandomColorsArray(data.length);
  // return data.map((item, index) => ({
  //   value: [item.Volatilite * 100, item.Performance * 100, item.NOM_INDICE],
  //   name: item.NOM_INDICE,
  //   itemStyle: {
  //     color: colors[index],
  //   },
  // }));
  data = formatData(data);
  return data.map(([x, y, name], index) => ({
    name,
    type: "effectScatter",
    symbol: "circle",
    symbolSize: 20,
    data: [[x, y]],
    label: {
      show: true,
      position: "top",
      formatter: (params) => params.name,
      fontSize: 9,
    },
    itemStyle: {
      color: colors[index],
    },
  }));
};

const formatData = (data) => {
  return data.map((item) => [
    item.Volatilite * 100,
    item.Performance * 100,
    item.NOM_INDICE,
  ]);
};

function RendementRisqueScatter({ data }) {
  const theme = useChartTheme();
  console.log("RendementRisqueScatter", data);
  const min = useMemo(
    () => Math.min(...data.map((item) => Math.trunc(item.Performance * 100))),
    [data]
  );
  const seriesData = useMemo(() => getSeriesData(data), [data]);
  const seriesNames = useMemo(
    () => seriesData.map((serie) => serie.name),
    [seriesData]
  );
  const { selectedLegend, SeriesSelector } = useSeriesSelector(
    seriesNames,
    seriesNames
  );
  const options = useMemo(() => {
    return {
      title: {
        text: "Analyse Rendement/Risque Période Annualisée",
        left: "center",
        top: 0,
        ...theme.title,
      },
      legend: {
        // data: seriesNames,
        orient: "horizontal",
        zLevel: 5,
        left: "center",
        bottom: 0,
        width: "60%",
        selected: selectedLegend,
        type: "scroll",
        ...theme.legend,
      },
      grid: {
        bottom: "80",
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
        axisLabel: {
          ...theme.xAxis.nameTextStyle,
        },
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
        min: min,
        axisLabel: {
          ...theme.yAxis.nameTextStyle,
        },
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
          const { name, seriesName, value } = params;
          const res = name !== "" ? name : seriesName;
          return `<strong>${res}</strong> <br /> Rendement: ${value[1].toFixed(
            2
          )}% <br /> Risque: ${value[0].toFixed(2)}%`;
        },
      },
      series: seriesData,
    };
  }, [seriesData, selectedLegend, theme]);

  return (
    <div>
      <SeriesSelector />
      <ReactECharts
        option={options}
        style={{
          height: "500px",
          minWidth: "600px",
          width: "100%",
          margin: "auto",
        }}
      />
    </div>
  );
}

export default memo(RendementRisqueScatter);
