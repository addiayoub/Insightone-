import React, { useMemo, useRef } from "react";
import useChartTheme from "../../../hooks/useChartTheme";
import PieChart from "../Default/PieChart";

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
  const seriesNames = seriesData.map((item) => item.name);
  console.log("PtfPoids", data, sorted);
  const theme = useChartTheme();
  const options = useMemo(() => {
    return {
      title: {
        text: title,
        left: "center",
      },
      seriesNames: { seriesList: seriesNames, init: seriesNames },
      series: [
        {
          name: "",
          type: "pie",
          data: seriesData,
          radius: ["30%", "70%"],
          // radius: "50%",
          avoidLabelOverlap: false,
          label: {
            // alignTo: "edge",
            show: true,
            formatter: function (params) {
              let name = params.name;
              const { value } = params;
              if (name.length > 5) {
                const newName = name.split(" ");

                name = newName.join(" \n");
              }
              return `${name}:${value.toFixed(2)}%`;
            },
            fontSize: 9,
            minMargin: 6,
            edgeDistance: 10,
            lineHeight: 15,
          },
          labelLine: {
            length: 10,
            length2: 0,
            maxSurfaceAngle: 500,
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };
  }, [seriesData, title]);
  return (
    <>
      <PieChart
        options={options}
        style={{
          maxHeight: "500px",
          height: "500px",
        }}
        showSeriesSelector
      />
    </>
  );
};

export default PtfPoids;
