import React, { memo, useMemo } from "react";
import useChartTheme from "../../hooks/useChartTheme";
import { Box } from "@mui/material";
import BarChart from "./Default/BarChart";

const getSeries = (data) => {
  return Object.entries(data).map(([key, items]) => ({
    name: key,
    type: "bar",
    data: items.map((item) => item.Performance * 100),
  }));
};

const PerformanceChartV2 = ({ data }) => {
  console.log("data", data);
  const series = useMemo(() => getSeries(data), [data]);
  console.log("series", series);
  const seriesNames = Object.keys(data);
  const years = data[seriesNames[0]].map((item) => item.ANNEE);
  const options = useMemo(() => {
    return {
      title: {
        text: "Performance",
        left: "center",
      },
      grid: {
        right: "5%",
      },
      xAxis: {
        type: "category",
        data: years,
      },
      seriesNames: { seriesList: seriesNames, init: seriesNames },
      yAxis: {
        axisLabel: {
          formatter: "{value}%",
        },
      },
      series: series,
    };
  }, [series, years, seriesNames]);
  return (
    <Box>
      <BarChart
        options={options}
        style={{
          minHeight: 500,
          margin: "15px 0",
        }}
        saveToExcel={{
          show: true,
          data,
          fileName: options.title.text,
        }}
        showSeriesSelector
      />
    </Box>
  );
};

export default memo(PerformanceChartV2);
