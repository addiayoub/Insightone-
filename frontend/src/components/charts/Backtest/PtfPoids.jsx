import React, { useMemo } from "react";
import ReactECharts from "echarts-for-react";
import useChartTheme from "../../../hooks/useChartTheme";

const PtfPoids = ({ data, field, sumOf, title }) => {
  const sorted = useMemo(
    () => [...data].sort((a, b) => b[field] - a[field]),
    [data, field]
  );
  const sumSecteur = useMemo(() => {
    return data.reduce((acc, row) => {
      const secteur = row[sumOf];
      acc[secteur] = (acc[secteur] || 0) + (row[field] || 0);
      return acc;
    }, {});
  }, [data, field, sumOf]);
  const secteurs = [...new Set(data.map((item) => item[sumOf]))];
  const poidsSecteur = secteurs
    .map((secteur) => ({
      name: secteur,
      value: sumSecteur[secteur],
    }))
    .sort((a, b) => b.value - a.value);
  console.log("poidsSecteur", sumSecteur, secteurs);
  const poidsTitre = useMemo(
    () =>
      data.map((item) => ({
        name: item.titre,
        value: item[field],
      })),
    [data, field]
  ).sort((a, b) => b.value - a.value);
  const seriesData = sumOf ? poidsSecteur : poidsTitre;
  console.log("PtfPoids", data, sorted);
  const theme = useChartTheme();
  const options = useMemo(() => {
    return {
      title: {
        text: title,
        left: "center",
        ...theme.title,
      },
      tooltip: {
        trigger: "item",
        confine: true,
        valueFormatter: (value) => value?.toFixed(2) + "%",
      },
      toolbox: {
        feature: {
          saveAsImage: {},
          dataView: {},
        },
        top: "20px",
      },
      legend: {
        type: "scroll",
        orient: "horizontal",
        zLevel: 23,
        width: "60%",
        left: "center",
        bottom: "0",
        ...theme.legend,
      },
      grid: {
        bottom: "10%",
      },
      series: [
        {
          name: "",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 15,
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: false,
          },
          data: seriesData,
        },
      ],
    };
  }, [seriesData, title, theme]);
  return (
    <ReactECharts
      option={options}
      style={{
        // height: "500px",
        // maxHeight: "600px",
        // margin: "15px 0 40px",
        // width: "500px",
        maxHeight: "500px",
        height: "500px",
      }}
    />
    // <h1>Poids</h1>
  );
};

export default PtfPoids;
