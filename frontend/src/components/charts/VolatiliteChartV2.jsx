import React, { memo, useMemo } from "react";
import { Box } from "@mui/material";
import BarChart from "./Default/BarChart";

const generateSeriesData = (data) => {
  return Object.entries(data).map(([key, items]) => ({
    name: key,
    type: "bar",
    data: items.map((item) => item.Volatilite * 100),
  }));
};

const VolatiliteChartV2 = ({ data }) => {
  console.log("data", data);
  const series = useMemo(() => generateSeriesData(data), [data]);
  console.log("series", series);
  const seriesNames = Object.keys(data);
  const years = data[seriesNames[0]].map((item) => item.ANNEE);
  const options = useMemo(() => {
    return {
      title: {
        text: "Volatilité",
        left: "center",
      },
      grid: {
        right: "5%",
      },
      xAxis: {
        type: "category",
        data: years,
      },
      yAxis: {
        axisLabel: {
          formatter: "{value}%",
        },
      },
      seriesNames: { seriesList: seriesNames, init: seriesNames },
      series: series,
    };
  }, [series, seriesNames]);
  return (
    <Box>
      <BarChart
        options={options}
        style={{
          minHeight: 500,
          margin: "15px 0",
        }}
        showSeriesSelector
      />
    </Box>
  );
};

export default memo(VolatiliteChartV2);
