import ReactECharts from "echarts-for-react";
import moment from "moment/moment";
import React from "react";
import { useSelector } from "react-redux";

function EvolutionB100Simule({ data }) {
  const options = {
    title: {
      text: "Evolution base 100 des Portefeuille simulé",
      left: "left",
    },
    // grid: {
    //   left: "3%",
    //   right: "4%",
    //   bottom: "3%",
    //   containLabel: true,
    // },
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
      valueFormatter: (value) => value.toFixed(2),
    },
    dataZoom: [
      {
        type: "slider",
        show: true,
        xAxisIndex: [0],
        start: 0,
        end: 100,
      },
      {
        type: "inside",
        xAxisIndex: [0],
        start: 0,
        end: 100,
      },
    ],
    xAxis: {
      type: "category",
      data: data.map((item) => moment(item.seance).format("DD/MM/YYYY")),
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: data.map((item) => item["VL_b100_PTF"]),
        type: "line",
      },
    ],
  };
  return (
    <ReactECharts
      option={options}
      style={{
        height: "500px",
        maxHeight: "600px",
      }}
    />
  );
}

export default EvolutionB100Simule;
