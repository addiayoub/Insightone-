import moment from "moment";
import React from "react";
import DarkChart from "../charts/DarkChart";
import { formatDate } from "../../utils/FormatDate";

const getFirstCoursAjusteValues = (data) => {
  console.log(data);
  const firstCoursAjusteValues = {};
  Object.keys(data).forEach((key) => {
    const valuesForKey = data[key];
    valuesForKey.sort((a, b) => new Date(a.Date_VL) - new Date(b.Date_VL));
    const firstValue = valuesForKey[0]?.VL_AJUSTE;
    firstCoursAjusteValues[key] = firstValue;
  });
  return firstCoursAjusteValues;
};

const UniversB100 = ({ data, dateDebut, dateFin }) => {
  const firstCoursAjusteValues = getFirstCoursAjusteValues(data);
  const seriesData = [];
  for (const key in data) {
    seriesData.push({
      name: key,
      data: data[key].map((item) => [
        moment(item.Date_VL).valueOf(),
        (item.VL_AJUSTE / firstCoursAjusteValues[key]) * 100,
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
