import React, { memo, useMemo } from "react";
import ReactECharts from "echarts-for-react";
import useChartTheme from "../../../hooks/useChartTheme";
import { defaultOptions } from "../../../utils/chart/defaultOptions";
import useSeriesSelector from "../../../hooks/useSeriesSelector";

const PoidsChart = ({ data }) => {
  const theme = useChartTheme();
  console.log("render PoidsChart");
  const legendData = useMemo(() => data.map((item) => item.titre), [data]);
  const seriesName = useMemo(
    () => Object.keys(data[0]).filter((key) => key !== "titre"),
    [data]
  );
  const { SeriesSelector, selectedLegend } = useSeriesSelector(seriesName);
  const series = useMemo(
    () =>
      seriesName.map((key) => ({
        name: key,
        type: "bar",
        data: data.map((item) => item[key] * 100),
      })),
    [data, seriesName]
  );
  const options = useMemo(() => {
    return {
      title: {
        text: "Poids",
        left: "center",
        ...theme.title,
      },
      tooltip: {
        trigger: "axis",
        confine: true,
        valueFormatter: (value) => value?.toFixed(2) + "%",
      },
      legend: {
        data: seriesName,
        selected: selectedLegend,
        orient: "horizontal",
        zLevel: 23,
        width: "60%",
        left: "center",
        bottom: "9%",
        type: "scroll",
        ...theme.legend,
      },
      grid: {
        right: "5%",
        top: "10%",
        bottom: "15%",
        containLabel: true,
      },
      toolbox: {
        feature: {
          dataZoom: {
            yAxisIndex: true,
          },
          restore: {},
          saveAsImage: {},
          dataView: {},
        },
        top: "20px",
      },
      xAxis: {
        type: "category",
        data: legendData,
        axisLabel: {
          ...theme.xAxis.nameTextStyle,
        },
        ...theme.xAxis,
      },
      yAxis: {
        type: "value",
        axisLabel: {
          ...theme.yAxis.nameTextStyle,
        },
        ...theme.yAxis,
      },
      series: series,
    };
  }, [series, seriesName, legendData, selectedLegend, theme]);
  return (
    <>
      <SeriesSelector />
      <ReactECharts
        option={options}
        style={{
          minHeight: 500,
          margin: "15px 0",
        }}
      />
    </>
  );
};

export default memo(PoidsChart);
