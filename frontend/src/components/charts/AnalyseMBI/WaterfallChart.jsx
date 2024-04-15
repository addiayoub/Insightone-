import React, { memo, useMemo } from "react";
import BarChart from "../Default/BarChart";
import { downColor, upColor } from "../../../utils/generateRandomColorsArray";
import { formatNumberWithSpaces } from "../../../utils/formatNumberWithSpaces";

const getPlaceholder = (data) => {
  let seriesData = [0];
  let sum = 0;
  data.map((value) => {
    sum += value;
    seriesData.push(parseFloat(sum.toFixed(3)));
  });
  return seriesData;
};

const WaterfallChart = ({ data }) => {
  const xData = useMemo(() => Object.keys(data[0]), [data]);
  const yData = useMemo(() => Object.values(data[0]), [data]);
  const placeholder = useMemo(() => getPlaceholder(yData), [yData]);
  console.log("WaterfallChart data", data);
  console.log("yData data", yData);
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
        axisLabel: {
          hideOverlap: false,
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
          name: "",
          type: "bar",
          stack: "Total",
          itemStyle: {
            borderColor: "transparent",
            color: "transparent",
          },
          tooltip: { show: false },
          emphasis: {
            itemStyle: {
              borderColor: "transparent",
              color: "transparent",
            },
          },
          data: placeholder,
          stackStrategy: "all",
        },
        {
          type: "bar",
          stack: "Total",
          stackStrategy: "all",
          data: yData,
          label: {
            show: true,
            formatter: ({ value }) => {
              return value + "%";
            },
          },
          emphasis: {
            focus: "series",
          },
          itemStyle: {
            color: ({ value }) => {
              return value > 0 ? upColor : downColor;
            },
          },
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
