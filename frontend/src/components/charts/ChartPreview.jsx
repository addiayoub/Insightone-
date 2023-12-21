import moment from "moment";
import React from "react";
import DarkChart from "./DarkChart";

const ChartPreview = ({ data }) => {
  const seriesData = [];
  for (const key in data) {
    seriesData.push({
      name: key,
      data: data[key].map((item) => [
        moment(item.SEANCE).valueOf(),
        item.Cours_Ajuste,
      ]),
      marker: { enabled: false },
      showInLegend: true,
    });
  }
  const options = {
    chart: {
      type: "line",
    },
    title: {
      text: "Evolution du cours des titres sélectionnés",
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
        text: "Cours_Ajuste",
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
  return (
    <DarkChart options={options} />
  );
};

export default ChartPreview;
