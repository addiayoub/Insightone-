import React from "react";
import DarkChart from "./DarkChart";

function PerformanceChart({ data }) {
  console.log("Performance dta", data);
  const seriesData = [];
  for (const key in data) {
    seriesData.push({
      name: key,
      data: data[key].map((item) => [item.ANNEE, item.Performance * 100]),
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
      text: "Performance",
    },
    xAxis: {
      type: "date",
    },
    yAxis: {
      title: {
        text: "Performance",
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

export default PerformanceChart;
