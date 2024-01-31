import React, { memo, useMemo } from "react";
import ReactECharts from "echarts-for-react";
import useChartTheme from "../../hooks/useChartTheme";
import useSeriesSelector from "../../hooks/useSeriesSelector";
import { Box } from "@mui/material";

const generateSeriesData = (data) => {
  return Object.entries(data).map(([key, items]) => ({
    name: key,
    type: "bar",
    data: items.map((item) => item.Volatilite * 100),
  }));
};

const VolatiliteChartV2 = ({ data }) => {
  const theme = useChartTheme();

  console.log("data", data);
  const series = useMemo(() => generateSeriesData(data), [data]);
  console.log("series", series);
  const seriesNames = Object.keys(data);
  const years = data[seriesNames[0]].map((item) => item.ANNEE);
  const { SeriesSelector, selectedLegend } = useSeriesSelector(
    seriesNames,
    seriesNames
  );
  const options = useMemo(() => {
    return {
      title: {
        text: "Volatilité",
        left: "center",
        ...theme.title,
      },
      tooltip: {
        trigger: "axis",
        confine: true,
        valueFormatter: (value) => value?.toFixed(2) + "%",
      },
      legend: {
        // data: seriesNames,
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
        data: years,
        axisLabel: {
          ...theme.xAxis.nameTextStyle,
        },
        ...theme.xAxis,
      },
      yAxis: {
        type: "value",
        axisLabel: {
          formatter: "{value}%",
          ...theme.yAxis.nameTextStyle,
        },
        ...theme.yAxis,
      },
      series: series,
    };
  }, [series, seriesNames, selectedLegend, theme]);
  return (
    <Box>
      <SeriesSelector />
      <ReactECharts
        option={options}
        style={{
          minHeight: 500,
          margin: "15px 0",
        }}
      />
    </Box>
  );
};

export default memo(VolatiliteChartV2);
