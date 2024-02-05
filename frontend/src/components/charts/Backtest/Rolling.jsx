import React, { memo, useMemo } from "react";
import moment from "moment";
import LineChart from "../Default/LineChart";

const getSeries = (data, seriesNames) => {
  return seriesNames.map((serieName) => ({
    name: serieName,
    type: "line",
    symbol: "none",
    data: data.map((item) => (item[serieName] === 0 ? null : item[serieName])),
  }));
};

const Rolling = ({ data, title, allSeries, forSIM }) => {
  console.log("Render Rolling ", title);
  const seriesNames = useMemo(
    () =>
      Object.keys(data[0]).filter(
        (key) => !["seance", "benchmark"].includes(key)
      ),
    [data]
  );
  const initSeries =
    allSeries || !forSIM ? seriesNames : [seriesNames[0], "SIM optimal"];
  const series = useMemo(
    () => getSeries(data, seriesNames),
    [data, seriesNames]
  );
  const options = useMemo(() => {
    return {
      title: {
        text: title,
        left: "center",
      },
      grid: {
        right: "100px",
      },
      xAxis: {
        type: "category",
        data: data.map((item) => moment(item.seance).format("DD/MM/YYYY")),
      },
      legend: {
        left: "center",
      },
      seriesNames: { seriesList: seriesNames, init: initSeries },
      series,
    };
  }, [seriesNames, series, data]);

  return (
    <div>
      <LineChart
        options={options}
        style={{
          minHeight: 500,
          margin: "15px 0",
        }}
        showSeriesSelector
        saveToExcel={{ show: true, data, fileName: title }}
      />
    </div>
  );
};

export default memo(Rolling);
