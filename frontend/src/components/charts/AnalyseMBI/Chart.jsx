import React, { useMemo } from "react";
import BarChart from "../Default/BarChart";

const Chart = ({ data }) => {
  const xData = useMemo(() => Object.keys(data[0]), [data]);
  const yData = useMemo(() => Object.values(data[0]), [data]);
  console.log("Chart data", data);
  const options = useMemo(() => {
    return {
      title: {
        text: "Attribution de performance",
        x: "center",
      },
      tooltip: {
        valueFormatter: (value) => value?.toFixed(2) + "%",
      },
      legend: {
        left: "center",
        bottom: "10%",
      },
      grid: {
        right: "5%",
        top: "50px",
        bottom: "19%",
      },
      showDataZoom: true,
      xAxis: {
        type: "category",
        data: xData,
        axisTick: {
          show: true,
        },
        axisLine: {
          show: true,
        },
      },
      yAxis: {
        axisLabel: {
          formatter: (value) => value + "%",
        },
        min: function (value) {
          return value.min.toFixed(2);
        },
      },
      // series: {
      //   type: "bar",
      //   stack: "Total",
      //   data: yData,
      // },
      series: [
        {
          type: "bar",
          stack: "total",
          label: {
            show: true,
          },
          emphasis: {
            focus: "series",
          },
          data: yData.map((value, index) => ({
            value,
            // itemStyle: {
            //   color: value > 0 ? "#4CAF50" : "#F44336",
            // },
          })),
        },
      ],
    };
  }, [yData, xData]);
  return (
    <>
      <BarChart
        options={options}
        style={{
          minHeight: "400px",
          margin: "15px 0",
        }}
        saveToExcel={{
          show: true,
          data,
          fileName: options.title.text,
        }}
      />
    </>
  );
};

export default Chart;
