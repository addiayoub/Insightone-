import React, { memo, useMemo } from "react";
import moment from "moment";
import BarChart from "../Default/BarChart";

const getSeries = (data, seriesNames) => {
  return seriesNames.map((key) => ({
    name: key,
    type: "bar",
    data: data.map((item) => ({
      value: item[key] * 100,
      itemStyle: {
        color: item[key] < 0 ? "#ee4658" : "#21cc6d",
      },
    })),
  }));
};

const DailyReturns = ({ data }) => {
  console.log("render DailyReturns");
  const seriesName = useMemo(
    () => Object.keys(data[0]).filter((key) => key !== "seance"),
    [data]
  );
  const series = useMemo(() => getSeries(data, seriesName), [seriesName, data]);
  const options = useMemo(() => {
    return {
      title: {
        text: "Returns",
        left: "center",
      },
      tooltip: {
        axisPointer: {
          // type: "cross",
          crossStyle: {
            color: "#999",
          },
        },
      },
      legend: {
        show: false,
      },
      grid: {
        right: "100px",
        top: "10%",
        bottom: "15%",
      },
      xAxis: {
        type: "category",
        data: data.map((item) => moment(item.seance).format("DD/MM/YYYY")),
        axisPointer: {
          type: "shadow",
        },
      },
      dataZoom: true,
      yAxis: {
        axisLabel: {
          formatter: "{value} %",
        },
      },
      series: series,
    };
  }, [series, seriesName]);
  return (
    <>
      <BarChart
        options={options}
        style={{
          minHeight: 500,
        }}
      />
    </>
  );
};

export default memo(DailyReturns);
