import moment from "moment";
import React from "react";
import useChartTheme from "../../hooks/useChartTheme";
import ReactECharts from "echarts-for-react";
import { formatDate } from "../../utils/FormatDate";

const UniversChart = ({ data }) => {
  const seriesData = [];
  for (const key in data) {
    seriesData.push({
      name: key,
      type: "line",
      data: data[key].map((item) => [
        moment(item.Date_VL).valueOf(),
        item.VL_AJUSTE,
      ]),
      showSymbol: false,
    });
  }
  console.log("series Data", seriesData);
  const ss = Object.entries(data).map(([seriesName, dataPoints]) => ({
    name: seriesName,
    type: "line",
    data: dataPoints.map((entry) => ({
      name: new Date(entry.Date_VL),
      value: [new Date(entry.Date_VL), entry.VL_AJUSTE],
    })),
  }));
  const theme = useChartTheme();
  const options = {
    title: {
      text: " ",
      left: "center",
      ...theme.title,
    },
    grid: {
      right: "19%",
      top: "10%",
      // right: "3%",
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
      },
      top: "20px",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        label: {
          formatter: function (params) {
            console.log(params);
            let oT = new Date(params.value);
            return moment(params.value).format("DD-MM-YYYY");
          },
        },
      },
      valueFormatter: (value) => value.toFixed(2),
    },
    dataZoom: [
      {
        type: "slider", // Enable slider data zoom
        show: true,
        xAxisIndex: [0, 1],
        start: 0,
        end: 100,
        // margin: [10, 100, 10, 100],
      },
      {
        type: "inside",
        xAxisIndex: [0, 1],
        start: 0,
        end: 100,
      },
    ],
    xAxis: [
      {
        type: "time",
        axisLabel: {
          formatter: function (value) {
            return moment(value).format("DD-MM-YYYY");
          },
        },
      },
    ],
    legend: {
      orient: "verticaly",
      zLevel: 5,
      top: "center",
      right: "0",
      type: "scroll",
      ...theme.legend,
    },
    yAxis: {
      type: "value",
    },
    series: seriesData,
  };
  return (
    <ReactECharts
      option={options}
      style={{
        height: "500px",
        maxHeight: "600px",
        width: "500px",
      }}
    />
  );
};

export default UniversChart;
