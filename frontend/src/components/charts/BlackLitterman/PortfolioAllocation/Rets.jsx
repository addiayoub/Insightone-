import React, { memo, useMemo } from "react";
import BarChart from "../../Default/BarChart";

const getSeries = (data, seriesNames) => {
  return seriesNames.map((key) => ({
    name: key,
    type: "bar",
    data: data.map((item) => item[key] * 100),
  }));
};

const seriesNames = ["Prior", "Posterior", "Views", "rdt", "rdt_annualisé"];

const Rets = ({ data }) => {
  console.log("render Rets");
  const xAxisData = useMemo(() => data.map((item) => item.Symbol), [data]);
  const series = useMemo(
    () => getSeries(data, seriesNames),
    [data, seriesNames]
  );

  const options = useMemo(() => {
    return {
      title: {
        text: "Rets",
        left: "center",
      },
      tooltip: {
        valueFormatter: (value) => value?.toFixed(2),
      },
      legend: {
        data: seriesNames,
        left: "center",
        bottom: "9%",
      },
      grid: {
        right: "5%",
        bottom: "15%",
      },
      showDataZoom: true,
      xAxis: {
        type: "category",
        data: xAxisData,
        axisTick: {
          show: true,
        },
        axisLine: {
          show: true,
        },
      },
      seriesNames: { seriesList: seriesNames },
      series: series,
    };
  }, [series, seriesNames]);
  return (
    <>
      <BarChart
        options={options}
        style={{
          minHeight: 500,
          margin: "15px 0",
        }}
        saveToExcel={{
          show: true,
          data,
          fileName: options.title.text,
        }}
        showSeriesSelector
      />
    </>
  );
};

export default memo(Rets);
