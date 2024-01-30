import React, { memo, useMemo } from "react";
import ReactECharts from "echarts-for-react";
import groupBy from "../../utils/groupBy";
import { formatDate } from "../../utils/FormatDate";
import useChartTheme from "../../hooks/useChartTheme";
import { defaultOptions } from "../../utils/chart/defaultOptions";

const getSeriesData = (data) => {
  const result = [];
  for (const key in data) {
    result.push({
      name: key,
      data: data[key].map((item) => item.VL_B100),
      type: "line",
    });
  }
  return result;
};

function SecteurEvolution({ data, height }) {
  console.log("data is", data);
  const theme = useChartTheme();
  const groupedData = useMemo(() => groupBy(data, "nom_indice"), [data]);
  const key = Object.keys(groupedData)[0];
  const categories = groupedData[key].map((item) => formatDate(item.seance));
  console.log("grouped dat", categories);
  const seriesData = useMemo(() => getSeriesData(groupedData), [groupedData]);

  console.log("seriesData", seriesData);
  const options = useMemo(() => {
    return {
      title: {
        text: "Evolution Secteur",
        ...theme.title,
      },
      tooltip: {
        trigger: "item",
        axisPointer: {
          type: "shadow",
        },
        confine: true,
        valueFormatter: (value) => value?.toFixed(2),
      },
      legend: {
        orient: "horizontal",
        zLevel: 5,
        top: "10%",
        type: "scroll",
        ...theme.legend,
      },
      grid: {
        left: "10%",
        top: "30%",
        right: "10%",
        bottom: "15%",
      },
      toolbox: {
        feature: {
          dataZoom: {},
          saveAsImage: { show: true },
          dataView: {},
        },
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        axisLabel: {
          ...theme.xAxis.nameTextStyle,
        },
        data: categories,
        ...theme.xAxis,
      },
      yAxis: {
        type: "value",
        axisLabel: {
          ...theme.yAxis.nameTextStyle,
        },
        ...theme.yAxis,
      },
      series: seriesData,
      ...defaultOptions,
    };
  }, [seriesData, defaultOptions, theme, categories]);
  return <ReactECharts option={options} style={{ height }} />;
}

export default memo(SecteurEvolution);
