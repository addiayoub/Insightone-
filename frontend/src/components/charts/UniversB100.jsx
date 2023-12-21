import moment from "moment";
import React, { useEffect, useState } from "react";
import DarkChart from "./DarkChart";
import { formatDate } from "../../utils/FormatDate";

const UniversB100 = ({ data, dateDebut, dateFin }) => {
  console.log("UniversB100", data);
  const getFirstCoursAjusteValues = (data) => {
    const firstCoursAjusteValues = {};
    Object.keys(data).forEach((key) => {
      console.log("Key", key);
      const valuesForKey = data[key];
      const cle = data[key][0]["CLE_TITRE"];
      console.log("data[key]", data[key][0]["CLE_TITRE"]);

      valuesForKey.sort((a, b) => new Date(a.SEANCE) - new Date(b.SEANCE));
      const firstValue = valuesForKey[0]?.Cours_Ajuste;
      firstCoursAjusteValues[cle] = firstValue;
    });
    // for (const key in data) {
    //   const firstItem = data[key][0];
    //   if (firstItem) {
    //     const cleTitre = firstItem.CLE_TITRE;
    //     firstCoursAjusteValues[cleTitre] = firstItem.Cours_Ajuste;
    //   }
    // }
    return firstCoursAjusteValues;
  };
  const firstCoursAjusteValues = getFirstCoursAjusteValues(data);
  console.log("firstCoursAjusteValues", firstCoursAjusteValues);
  const seriesData = [];
  for (const key in data) {
    seriesData.push({
      name: key,
      data: data[key].map((item) => [
        moment(item.SEANCE).valueOf(),
        (item.Cours_Ajuste / firstCoursAjusteValues[item.CLE_TITRE]) * 100,
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
      text: `Comparaison en base 100 des titres sélectionnés entre le ${formatDate(
        dateDebut["$d"]
      )} et ${formatDate(dateFin["$d"])}`,
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
  return <DarkChart options={options} />;
};

export default UniversB100;
