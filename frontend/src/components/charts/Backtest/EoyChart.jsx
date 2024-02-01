import React, { memo, useMemo, useRef } from "react";
import ReactECharts from "echarts-for-react";
import useChartTheme from "../../../hooks/useChartTheme";
import useSeriesSelector from "../../../hooks/useSeriesSelector";
import { getFullscreenFeature } from "../../../utils/chart/defaultOptions";

const EoyChart = ({ data, forSIM }) => {
  const theme = useChartTheme();
  console.log("render EoyChart");
  const years = useMemo(() => data.map((item) => item.Year), [data]);
  const seriesName = useMemo(
    () => Object.keys(data[0]).filter((key) => key !== "Year" && key !== "Won"),
    [data]
  );
  const chartRef = useRef(null);
  const myFullscreen = getFullscreenFeature(chartRef);
  const series = useMemo(
    () =>
      seriesName.map((key) => ({
        name: key,
        type: "bar",
        data: data.map((item) => item[key] * 100),
      })),
    [data, seriesName]
  );
  const init = forSIM ? [seriesName[0], "SIM optimal"] : seriesName;
  const { SeriesSelector, selectedLegend } = useSeriesSelector(
    seriesName,
    init
  );

  const options = useMemo(() => {
    return {
      title: {
        text: "EOY Returns vs Benchmark vs Bench_cat",
        left: "center",
        ...theme.title,
      },
      tooltip: {
        trigger: "axis",
        confine: true,
        valueFormatter: (value) => value?.toFixed(2),
      },
      legend: {
        data: seriesName,
        orient: "horizontal",
        zLevel: 23,
        width: "60%",
        left: "center",
        bottom: "9%",
        type: "scroll",
        selected: selectedLegend,
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
          myFullscreen,
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
        data: years,
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
  }, [series, seriesName, selectedLegend, years, theme]);
  return (
    <>
      <SeriesSelector />
      <ReactECharts
        ref={chartRef}
        option={options}
        style={{
          minHeight: 500,
          margin: "15px 0",
        }}
      />
    </>
  );
};

export default memo(EoyChart);
