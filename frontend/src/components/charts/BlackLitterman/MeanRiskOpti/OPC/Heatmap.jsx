import React, { memo, useMemo } from "react";
import HeatMapChart from "../../../Default/HeatMapChart";
import { calculateChartHeight } from "../../../../../utils/chart/heatmap";

const getSeries = (data) => {
  const seriesData = [];
  let min = 0;
  let max = 0;
  data.forEach((item) => {
    Object.entries(item).forEach(([key, value]) => {
      value = parseFloat((value * 100).toFixed(2));
      if (key !== "index") {
        seriesData.push([key, item.index, value == 0 ? "-" : value]);
        if (value > max) {
          max = value; // Update maximum value
        }
        if (value < min) {
          min = value;
        }
      }
    });
  });
  return { seriesData, max, min };
};
// # Mesures de risque disponibles :
const ref = {
  MV: "Écart-type",
  MAD: "Écart moyen absolu",
  MSV: "Écart semi-standard",
  FLPM: "Premier moment partiel inférieur (rapport oméga)",
  SLPM: "Deuxième moment partiel inférieur (ratio de Sortino)",
  CVaR: "Valeur à risque conditionnelle",
  EVaR: "Valeur à risque entropique",
  WR: "Pire réalisation (Minimax)",
  MDD: "Maximum Drawdown of uncompounded cumulative returns (Calmar Ratio)",
  ADD: "Écart moyen des rendements cumulatifs non composés",
  CDaR: "Drawdown conditionnel à risque des rendements cumulés non calculés",
  EDaR: "Drawdown entropique à risque des rendements cumulés non composés",
  UCI: "Ulcer Index (indice d'ulcère) des rendements cumulés non composés",
};

function Heatmap({ data, title }) {
  const y = useMemo(() => data.map((item) => item.index), [data]);
  const x = useMemo(
    () => Object.keys(data[0]).filter((key) => key !== "index"),
    [data]
  );
  const { seriesData, max, min } = getSeries(data);
  console.log("heat series", seriesData, min, max);
  const option = useMemo(() => {
    return {
      title: {
        text: title,
        left: "center",
      },
      tooltip: {
        position: "top",
        formatter: ({ data }) => {
          const xAxisName = data[0];
          const yAxisName = data[1];
          const value = data[2];
          return `${yAxisName} - ${xAxisName}<br/>Valeur: ${value}%`;
        },
      },
      visualMap: {
        max,
        min,
        inRange: {
          color: [
            "#a50026",
            "#fecc7b",
            "#feea9b",
            "#fffebe",
            "#e8f59f",
            "#9bd469",
            "#0e8245",
          ],
        },
      },
      grid: { top: "50px" },
      animation: true,
      xAxis: {
        type: "category",
        data: x,
        axisPointer: {
          type: "shadow",
          label: {
            show: true,
            formatter: function ({ value }) {
              return ref[value];
            },
          },
        },
      },
      yAxis: {
        type: "category",
        data: y,
      },
      series: [
        {
          name: "Heatmap",
          type: "heatmap",
          data: seriesData,
          label: {
            show: true,
            formatter: function ({ value }) {
              return value[2] + "%";
            },
          },
        },
      ],
    };
  }, [seriesData, x, y]);
  return (
    <>
      <HeatMapChart
        options={option}
        notMerge={true}
        lazyUpdate={true}
        style={{
          minHeight: calculateChartHeight(y),
          height: "100%",
          width: "100%",
        }}
        opts={{ renderer: "svg" }}
        saveToExcel={{
          show: true,
          data,
          fileName: title,
        }}
      />
    </>
  );
}

export default memo(Heatmap);
