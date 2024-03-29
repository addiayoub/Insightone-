import React, { useMemo } from "react";
import moment from "moment";
import LineChart from "../Default/LineChart";

const getSeries = (data, seriesNames, percentage) => {
  return seriesNames.map((serieName) => ({
    name: serieName,
    type: "line",
    symbol: "none",
    data: data.map((item) =>
      !percentage ? item[serieName] : item[serieName] * 100
    ),
  }));
};

const Evol = ({ data, title = "", fields, percentage = false }) => {
  const xData = useMemo(
    () => data.map((item) => moment(item.SEANCE).format("DD/MM/YYYY")),
    [data]
  );
  const series = useMemo(
    () => getSeries(data, fields, percentage),
    [data, fields]
  );
  const options = useMemo(() => {
    return {
      title: { text: title, x: "center" },
      xAxis: {
        type: "category",
        data: xData,
      },
      tooltip: {
        valueFormatter: (value) =>
          `${value?.toFixed(2)}${percentage ? "%" : ""}`,
      },
      yAxis: {
        type: "value",
        min: function (value) {
          return value.min?.toFixed(2);
        },
        axisLabel: {
          formatter: (value) => `${value}${percentage ? "%" : ""}`,
        },
      },
      series,
    };
  }, [series, xData]);
  return (
    <LineChart
      options={options}
      saveToExcel={{ show: true, fileName: options.title.text, data }}
    />
  );
};

export default Evol;
