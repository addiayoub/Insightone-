import React, { memo, useMemo } from "react";
import groupBy from "../../utils/groupBy";
import { formatDate } from "../../utils/FormatDate";
import LineChart from "../charts/Default/LineChart";

const getSeriesData = (data) => {
  const result = [];
  for (const key in data) {
    result.push({
      name: key,
      data: data[key].map((item) => item.VL_B100),
      type: "line",
      symbol: "none",
    });
  }
  return result;
};

function SecteurEvolution({ data, height }) {
  console.log("data is", data);
  const groupedData = useMemo(() => groupBy(data, "nom_indice"), [data]);
  const key = Object.keys(groupedData)[0];
  const categories = groupedData[key].map((item) => formatDate(item.seance));
  console.log("grouped dat", categories);
  const seriesData = useMemo(() => getSeriesData(groupedData), [groupedData]);
  const seriesNames = Object.keys(groupedData);
  console.log("seriesData", seriesData, "seriesNames", seriesNames);
  const options = useMemo(() => {
    return {
      title: {
        text: "Evolution Secteur",
      },
      tooltip: {
        // trigger: "item",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "10%",
        right: "10%",
      },
      seriesNames: { seriesList: seriesNames, init: seriesNames },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: categories,
      },
      series: seriesData,
    };
  }, [seriesData, categories, seriesNames]);
  return (
    <>
      <LineChart options={options} style={{ height }} showSeriesSelector />
    </>
  );
}

export default memo(SecteurEvolution);
