import React, { memo, useMemo } from "react";
import moment from "moment";
import LineChart from "../Default/LineChart";

const series = [
  { name: "ajust_b100", data: "ajust_b100" },
  { name: "DENOMINATION_OPCVM", data: "opc_b100" },
  { name: "Nom_Benchmark", data: "benc_b100" },
];

const AnalyseQuatile = ({ data }) => {
  const allValues = useMemo(
    () => series.map((serie) => data.map((item) => item[serie.data])).flat(),
    [data]
  );
  const options = useMemo(() => {
    return {
      title: {
        text: "",
        left: "center",
      },
      grid: {
        right: "80px",
      },
      xAxis: {
        type: "category",
        data: data.map((item) => moment(item.Date_VL).format("DD/MM/YYYY")),
      },
      yAxis: {
        min: Math.trunc(Math.min(...allValues)),
      },
      series: series.map((serie) => ({
        name:
          serie.name === "ajust_b100"
            ? "Perf ajustée de la classe"
            : data[0][serie.name],
        type: "line",
        data: data.map((item) => item[serie.data]),
      })),
    };
  }, [data, series, allValues]);
  return (
    <>
      <LineChart
        options={options}
        style={{
          height: "500px",
          maxHeight: "600px",
        }}
      />
    </>
  );
};

export default memo(AnalyseQuatile);
