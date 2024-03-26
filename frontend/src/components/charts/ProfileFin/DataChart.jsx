import React, { useMemo } from "react";
import moment from "moment";
import BarChart from "../Default/BarChart";

const getSeriesNames = (type) => {
  switch (type) {
    case "bilan":
      return ["Total actifs", "Total dettes"];
    case "compte de résultat":
      return ["Chiffre d'affaires", "Résultat net part du groupe"];
    case "flux":
      return ["Trésorerie", "Variation nette de la trésorerie"];
    default:
      return ["Total actifs", "Total dettes"];
  }
};

const getSeries = (data, type) => {
  const seriesNames = getSeriesNames(type);
  return seriesNames.map((key) => ({
    name: key,
    type: "bar",
    data: data.map((item) => ({ value: item[key] })),
  }));
};

const DataChart = ({ data, type }) => {
  console.log("data", data);
  const xData = data.map((item) => moment(item.SEANCE).format("DD/MM/YYYY"));
  const series = useMemo(() => getSeries(data, type), [data]);
  console.log("series", series);
  const options = useMemo(() => {
    return {
      title: {
        text: "",
      },
      tooltip: {
        valueFormatter: (value) => value?.toFixed(2),
      },
      legend: {
        left: "center",
        bottom: "10%",
      },
      grid: {
        right: "5%",
        top: "50px",
        bottom: "16%",
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
        min: function (value) {
          console.log("min", value);
          return value.min.toFixed(2);
        },
      },
      series: series,
    };
  }, [series]);
  return (
    <>
      <BarChart
        options={options}
        style={{
          // minHeight: "510px",
          margin: "15px 0",
        }}
        saveToExcel={{
          show: true,
          data,
          fileName: type,
        }}
      />
    </>
  );
};

export default DataChart;
