import React, { memo, useMemo } from "react";
import BarChart from "../Default/BarChart";
import { downColor, upColor } from "../../../utils/generateRandomColorsArray";
import { formatNumberWithSpaces } from "../../../utils/formatNumberWithSpaces";

const getPlaceholder = (data) => {
  let cumulativeSum = 0;
  const seriesData = data.map((value) => {
    cumulativeSum += value;
    return cumulativeSum;
  });
  return seriesData;
};

const WaterfallChart = ({ data }) => {
  const xData = useMemo(() => Object.keys(data[0]), [data]);
  const yData = useMemo(() => Object.values(data[0]), [data]);
  const placeholder = useMemo(() => getPlaceholder(yData), [yData]);
  console.log("WaterfallChart data", data);
  console.log("placeholder", placeholder);
  const options = useMemo(() => {
    return {
      title: {
        text: "Attribution de performance",
        x: "center",
      },
      tooltip: {
        valueFormatter: (value) => formatNumberWithSpaces(value) + "%",
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
      series: [
        {
          type: "bar",
          stack: "total",
          itemStyle: {
            borderColor: "transparent",
            color: "transparent",
          },
          emphasis: {
            itemStyle: {
              borderColor: "transparent",
              color: "transparent",
            },
          },
          data: placeholder,
          tooltip: {
            show: false,
          },
        },
        {
          type: "bar",
          stack: "total",
          label: {
            show: true,
            formatter: ({ value }, index) => {
              console.log("param", index);
              return value + "%";
            },
          },
          emphasis: {
            focus: "series",
          },
          data: yData.map((value, index) => ({
            value,
            itemStyle: {
              color: value > 0 ? upColor : downColor,
            },
          })),
        },
      ],
    };
  }, [yData, xData, placeholder]);
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

export default memo(WaterfallChart);
