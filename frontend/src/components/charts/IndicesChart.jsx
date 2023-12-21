import moment from "moment";
import React from "react";
import DarkChart from "./DarkChart";

function IndicesChart({ data }) {
  const seriesData = [];
  for (const key in data) {
    seriesData.push({
      name: key,
      data: data[key].map((item) => [
        moment(item.SEANCE).valueOf(),
        item.VALEUR,
      ]),
      marker: { enabled: false },
      showInLegend: true,
    });
  }
  const options = {
    chart: {
      type: "line",
      height: 600,
    },
    title: {
      text: "",
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
        text: "VALEUR",
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
            maxHeight: 400,
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
}

export default IndicesChart;
