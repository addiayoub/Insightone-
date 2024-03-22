import React, { memo, useMemo } from "react";
import ScatterChart from "../../../Default/ScatterChart";
const pl = {
  index: 0,
  X1: 0.02424048515979054,
  Y1: 0.04677348282756002,
  color: 1.9171845167789368,
};

const getSeriesData = (data) => {
  const xData = data.map((item) => item.X1 * 100);
  const yData = data.map((item) => item.Y1 * 100);
  const colorData = data.map((item) => item.color);
  return {
    type: "scatter",
    symbol: "circle",
    symbolSize: 20,
    data: xData.map((xValue, index) => {
      return [xValue, yData[index], colorData[index]];
    }),
  };
};

const PlotEff = ({ data }) => {
  const series = useMemo(() => getSeriesData(data), [data]);
  const yData = useMemo(() => data.map((item) => item.Y1 * 100), [data]);
  console.log("Plot ser", series, data);
  const options = useMemo(() => {
    return {
      title: {
        text: "Portfolio Returns Vs. Risk",
        left: "center",
        top: 0,
      },
      tooltip: {
        formatter: function (params) {
          const { value } = params;
          return `
          <strong>${value[2]}</strong>
          <br />
          Y: ${value[1].toFixed(2)} %<br /> X: ${value[0].toFixed(2)} %
          `;
        },
      },
      xAxis: {
        name: "",
        min: "dataMin",
        max: "dataMax",
        axisLabel: {
          formatter: (value) => value?.toFixed(2) + "%",
        },
      },
      yAxis: {
        name: "",
        min: "dataMin",
        axisLabel: {
          formatter: (value) => value?.toFixed(2) + "%",
        },
      },
      visualMap: {
        min: Math.min(...yData),
        max: Math.max(...yData),
        // min: 0,
        // max: 10,
        dimension: 1,
        orient: "vertical",
        right: 0,
        top: "center",
        calculable: true,
        inRange: {
          // color: ["#f2c31a", "#24b7f2"],
          color: ["#ee4658", "#444ce7"],
        },
        label: {
          show: false,
        },
      },
      series: [series],
    };
  }, [yData]);
  return <ScatterChart options={options} style={{ minHeight: 500 }} />;
};

export default memo(PlotEff);
