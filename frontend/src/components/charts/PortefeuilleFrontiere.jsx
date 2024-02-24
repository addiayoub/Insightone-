import moment from "moment";
import React, { memo, useMemo } from "react";
import LineChart from "./Default/LineChart";

const getSeries = (data, seriesNames) => {
  return seriesNames.map((name) => {
    return {
      name: name,
      itemStyle: {
        color: name.startsWith("ptf") ? "#ccc" : "",
      },
      type: "line",
      symbol: "none",
      data: data.map((item) => item[name]).filter((item) => item !== undefined),
    };
  });
};

// Evolution base 100 des Portefeuille simulé
function PortefeuilleFrontiere({ data }) {
  console.log("PortefeuilleFrontiere({ data })", data);
  const all = [
    ...data["df_vl_ptf"],
    ...data["Evolution base 100 des Portefeuille simulé"],
  ];
  console.log(all, "df_vl_ptf");
  const names = [
    ...new Set(
      all.flatMap((obj) => Object.keys(obj).filter((key) => key !== "seance"))
    ),
  ];
  const series = useMemo(() => getSeries(all, names), [all, names]);
  // const minYAxisValue = useMemo(() => {
  //   const seriesData = series.map((s) => s.data).flat();
  //   return Math.min(...seriesData);
  // }, [series]);
  // console.log("min y val", minYAxisValue);
  const options = useMemo(() => {
    return {
      title: {
        text: "Evolution B100 Portefeuille Frontiere Efficiente",
        left: "center",
      },
      grid: {
        right: "19%",
      },
      legend: {
        orient: "vertical",
        height: "50%",
        top: "center",
        right: 0,
      },
      xAxis: {
        type: "category",
        data: data["Evolution base 100 des Portefeuille simulé"].map((item) =>
          moment(item.seance).format("DD/MM/YYYY")
        ),
      },
      yAxis: {
        type: "value",
      },
      series: series,
    };
  }, [series, data]);
  return (
    <LineChart
      options={options}
      style={{
        height: "500px",
        maxHeight: "600px",
      }}
      saveToExcel={{
        show: true,
        data,
        fileName: options.title.text,
      }}
    />
  );
}

export default memo(PortefeuilleFrontiere);
