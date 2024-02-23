import React, { memo, useMemo } from "react";
import PieChart, { pieWithLabels } from "../../Default/PieChart";

const getSeries = (data, seriesNames) => {
  return seriesNames
    .map((seriesName) => ({
      name: seriesName,
      value: data.map((item) => item[seriesName] * 100)[0],
    }))
    .filter((item) => item.value > 0.01 * 100)
    .sort((a, b) => b.value - a.value);
};

const SharpeMeanVar = ({ data, title }) => {
  const seriesNames = useMemo(() => Object.keys(data[0]), [data]);
  const series = useMemo(() => getSeries(data, seriesNames), [data]);
  console.log("Series", series);
  const options = useMemo(() => {
    return {
      title: {
        text: title,
        left: "center",
      },
      grid: {
        top: "0%",
      },
      seriesNames: { seriesList: seriesNames },
      series: [
        {
          name: "",
          type: "pie",
          data: series,
          ...pieWithLabels,
        },
      ],
    };
  }, [seriesNames, series, title]);
  return (
    <>
      <PieChart
        options={options}
        style={{
          height: 600,
          width: "100%",
          // maxWidth: 800,
          margin: "25px 0 35px",
        }}
        saveToExcel={{
          show: true,
          fileName: title,
          data,
        }}
        showSeriesSelector
      />
    </>
  );
};

export default memo(SharpeMeanVar);
