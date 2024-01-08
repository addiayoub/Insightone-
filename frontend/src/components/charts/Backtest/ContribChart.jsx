import React, { memo, useMemo } from "react";
import ReactECharts from "echarts-for-react";
import moment from "moment/moment";
import useChartTheme from "../../../hooks/useChartTheme";

const ContribChart = ({ data }) => {
  const titles = data.map((item) => item.titre);
  const values = data.map((item) => item["ptf-min-var"]).sort();
  const seriesData = values.map((value) => ({
    value,
    itemStyle: {
      color: value < 0 ? "#ee4658" : "#21cc6d",
    },
  }));
  const theme = useChartTheme();
  const options = {
    title: {
      text: "Contrib",
      left: "center",
      ...theme.title,
    },
    grid: {
      right: "20%",
      top: "10%",
      bottom: "15%",
      containLabel: true,
    },
    tooltip: {
      confine: true,
      valueFormatter: (value) => value?.toFixed(2),
    },
    xAxis: {
      type: "value",
      axisLabel: {
        ...theme.yAxis.nameTextStyle,
      },
      ...theme.yAxis,
    },
    yAxis: {
      type: "category",
      data: titles,
      axisLabel: {
        ...theme.yAxis.nameTextStyle,
      },
      ...theme.yAxis,
    },
    series: [
      {
        type: "bar",
        show: true,
        position: "insideRight",
        data: seriesData,
      },
    ],
  };

  return (
    <ReactECharts
      option={options}
      style={{
        height: "500px",
      }}
    />
  );
};

export default ContribChart;
