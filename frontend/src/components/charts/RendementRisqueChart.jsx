import React from "react";
import DarkChart from "./DarkChart";

function RendementRisqueChart({ data }) {
  console.log("RendementRisqueChart", data);
  const categories = data.map(function (item) {
    return item.NOM_INDICE;
  });

  const performanceData = data.map(function (item) {
    return item.Performance * 100;
  });

  const volatiliteData = data.map(function (item) {
    return item.Volatilite * 100;
  });

  const options = {
    chart: {
      type: "column",
      height: 550,
    },
    title: {
      text: "Analyse Rendement/Risque Période Annualisée",
    },
    xAxis: {
      categories: categories,
    },
    yAxis: {
      title: {
        text: "",
      },
      labels: {
        format: "{value}%",
      },
    },
    series: [
      {
        name: "Performance",
        data: performanceData,
      },
      {
        name: "Volatilite",
        data: volatiliteData,
      },
    ],
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
  };
  return (
    <div style={{ maxWidth: "550px", width: "100%" }}>
      <DarkChart options={options} />
    </div>
  );
}

export default RendementRisqueChart;
