import React, { memo, useMemo } from "react";
import { generateRandomColorsArray } from "../../utils/generateRandomColorsArray";
import ScatterChart from "./Default/ScatterChart";

const getSeriesData = (data) => {
  const colors = generateRandomColorsArray(data.length);
  // return data.map((item, index) => ({
  //   value: [item.Volatilite * 100, item.Performance * 100, item.NOM_INDICE],
  //   name: item.NOM_INDICE,
  //   itemStyle: {
  //     color: colors[index],
  //   },
  // }));
  data = formatData(data);
  return data.map(([x, y, name], index) => ({
    name,
    type: "effectScatter",
    symbol: "circle",
    symbolSize: 20,
    data: [[x, y]],
    label: {
      show: true,
      position: "top",
      formatter: (params) => params.name,
      fontSize: 9,
    },
    itemStyle: {
      color: colors[index],
    },
  }));
};

const formatData = (data) => {
  return data.map((item) => [
    item.Volatilite * 100,
    item.Performance * 100,
    item.NOM_INDICE,
  ]);
};

function RendementRisqueScatter({ data }) {
  console.log("RendementRisqueScatter", data);
  const min = useMemo(
    () => Math.min(...data.map((item) => Math.trunc(item.Performance * 100))),
    [data]
  );
  const seriesData = useMemo(() => getSeriesData(data), [data]);
  const seriesNames = useMemo(
    () => seriesData.map((serie) => serie.name),
    [seriesData]
  );
  const options = useMemo(() => {
    return {
      title: {
        text: "Analyse Rendement/Risque Période Annualisée",
        left: "center",
      },
      legend: {
        orient: "horizontal",
        left: "center",
        bottom: 0,
        width: "60%",
      },
      grid: {
        bottom: "80",
      },
      xAxis: {
        name: "Risque",
        // min: Math.min(...data.map((item) => Math.trunc(item.Volatilite * 100))),
      },
      yAxis: {
        name: "Rendement",
        min,
      },
      tooltip: {
        formatter: function (params) {
          const { name, seriesName, value } = params;
          const res = name !== "" ? name : seriesName;
          return `<strong>${res}</strong> <br /> Rendement: ${value[1].toFixed(
            2
          )}% <br /> Risque: ${value[0].toFixed(2)}%`;
        },
      },
      seriesNames: { seriesList: seriesNames },
      series: seriesData,
    };
  }, [seriesData, seriesNames]);

  return (
    <>
      <ScatterChart
        options={options}
        style={{
          height: "500px",
          minWidth: "600px",
          width: "100%",
          margin: "auto",
        }}
        showSeriesSelector
      />
    </>
  );
}

export default memo(RendementRisqueScatter);
