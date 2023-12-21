import moment from "moment";
import React from "react";
import DarkChart from "../charts/DarkChart";

const ChartPreview = ({ data }) => {
  const seriesData = [];
  for (const key in data) {
    seriesData.push({
      name: key,
      data: data[key].map((item) => [
        moment(item.Date_VL).valueOf(),
        item.VL_AJUSTE,
      ]),
      marker: { enabled: false },
      showInLegend: true,
    });
  }
  const options = {
    chart: {
      type: "line",
      height: 500,
    },
    title: {
      text: "Evolution du volume des titres sélectionnés",
    },
    xAxis: {
      type: "datetime",
      labels: {
        formatter: function () {
          return moment(this.value).format("DD-MM-YYYY");
        },
      },
    },
    yAxis: {
      title: {
        text: "Volume Ajuste",
      },
    },
    series: seriesData,
    tooltip: {
      shared: true,
      crosshairs: true,
      xDateFormat: "%d/%m/%Y",
    },
    accessibility: { enabled: false },
    navigator: {
      enabled: true,
      height: 15,
      xAxis: {
        labels: {
          enabled: false,
        },
      },
    },
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom",
            },
          },
        },
      ],
    },
  };
  return <DarkChart options={options} />;
};

export default ChartPreview;
