import React from "react";
import DarkChart from "./DarkChart";

function VolatiliteChart({ data }) {
  const seriesData = [];
  for (const key in data) {
    seriesData.push({
      name: key,
      data: data[key].map((item) => [item.ANNEE, item.Volatilite * 100]),
      marker: { enabled: false },
      showInLegend: true,
    });
  }

  const options = {
    chart: {
      type: "column",
      height: 550,
    },
    title: {
      text: "Volatilité",
    },
    xAxis: {
      type: "date",
    },
    yAxis: {
      title: {
        text: "Volatilité",
      },
      labels: {
        format: "{value}%",
      },
    },
    series: seriesData,
    tooltip: {
      crosshairs: true,
      shared: true,
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
  return (
    // <div style={{ maxWidth: "550px", width: "100%" }}>
    <DarkChart options={options} />
    // </div>
  );
}

export default VolatiliteChart;
