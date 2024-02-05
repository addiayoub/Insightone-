import React, { memo, useMemo } from "react";
import moment from "moment";
import { generateRandomColorsArray } from "../../../utils/generateRandomColorsArray";
import LineChart from "../Default/LineChart";

const getSeries = (data, seriesNames) => {
  return seriesNames.map((serieName) => {
    return {
      name: serieName,
      type: "line",
      stack: "Total",
      smooth: true,
      lineStyle: {
        width: 0,
      },
      showSymbol: true,
      areaStyle: {
        opacity: 0.8,
      },
      emphasis: {
        focus: "series",
      },
      data: data.map((item) => item[serieName]),
    };
  });
};

const Poids = ({ data }) => {
  const seriesNames = useMemo(
    () =>
      Object.keys(data[0]).filter((key) => {
        console.log(key !== "seance");
        return !["PTF", "seance"].includes(key);
      }),
    [data]
  );

  console.log("seriesname", seriesNames);
  const colors = useMemo(
    () => generateRandomColorsArray(seriesNames.length),
    [seriesNames.length]
  );
  const series = useMemo(
    () => getSeries(data, seriesNames),
    [data, seriesNames]
  );
  console.log("colors", colors);
  const options = useMemo(() => {
    return {
      color: colors,
      title: {
        text: "",
      },
      grid: {
        right: "100px",
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: data.map((item) => moment(item.seance).format("DD/MM/YYYY")),
      },
      seriesNames: { seriesList: seriesNames, init: seriesNames },
      series,
    };
  }, [seriesNames, series, colors]);
  return (
    <LineChart
      options={options}
      style={{
        height: "500px",
        maxHeight: "600px",
        margin: "15px 0 40px",
      }}
      showSeriesSelector
      saveToExcel={{ show: true, data, fileName: "Poids" }}
    />
  );
};

export default memo(Poids);
