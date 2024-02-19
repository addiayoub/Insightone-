import React, { memo, useMemo } from "react";
import moment from "moment";
import LineChart from "../Default/LineChart";

const series = [
  { name: "DENOMINATION_OPCVM", data: "opc_b100" },
  { name: "Nom_Benchmark", data: "benc_b100" },
];

const objh = {
  f_vl: 207004.72550979865,
  rang_perf_1M: 1,
  rang_perf_3M: 1,
  DENOMINATION_OPCVM: "RMA EXPANSION",
  Nom_Benchmark: "MASI RENTABILITE BRUT",
  Nb: 89,
  ajust_b100: 100,
  q_95: 0,
  encours_OPC: 828053029.75,
  ord: 1,
  quart1: 0,
  quart2: 0,
  quartile: 1,
  mini: 99.99999999999999,
  quartile_graph_3M: 4,
  quart3: 1.4210854715202004e-14,
  q_05: 99.99999999999999,
  Rang: 3,
  quartile_perf_1S: 1,
  cat_b100: 100,
  rang_perf_1S: 3,
  VL: 207004.72550979865,
  maxi: 100.00000000000001,
  Date_VL: "2019-01-03T23:00:00.000+00:00",
  opc_b100: 100,
  benc_b100: 100,
  quartile_perf_3M: 1,
  quartile_perf_1M: 1,
};

const rangeOpts = {
  z: -1,
  tooltip: {
    show: false,
  },
  lineStyle: {
    opacity: 0,
  },
  areaStyle: {
    color: "#1338be",
    origin: "start",
  },
  emphasis: {
    disabled: true,
  },
  symbolSize: 0,
};

const PreQuantile = ({ data }) => {
  const allValues = useMemo(
    () => series.map((serie) => data.map((item) => item[serie.data])).flat(),
    [data]
  );

  const rangeValues = {
    q_05: data.map((item) => item.q_05),
    quart1: data.map((item) => item.quart1),
    quart2: data.map((item) => item.quart2),
    quart3: data.map((item) => item.quart3),
    q_95: data.map((item) => item.q_95),
  };
  const yMin = Math.trunc(Math.min(...allValues, ...rangeValues.q_05));

  console.log("allValues", allValues, yMin);
  const legendData = useMemo(
    () => series.map((serie) => data[0][serie.name]),
    [series, data]
  );
  const baseSeries = series.map((serie) => ({
    name:
      serie.name === "ajust_b100"
        ? "Perf ajustée de la classe"
        : data[0][serie.name],
    type: "line",
    symbol: "none",
    data: data.map((item) => item[serie.data]),
  }));
  const q_05 = useMemo(() => {
    return {
      name: "q_05",
      stack: "q_05",
      type: "line",
      symbol: "none",
      tooltip: {
        show: false,
      },
      lineStyle: {
        opacity: 0,
      },
      emphasis: {
        disabled: true,
      },
      symbolSize: 0,
      data: rangeValues.q_05,
    };
  }, [data]);
  const quart1 = useMemo(() => {
    return {
      name: "quart1",
      stack: "q_05",
      type: "line",
      data: rangeValues.quart1,
      // areaStyle: {
      //   color: "#8b8bc6",
      //   opacity: 1,
      //   origin: "start",
      // },
      ...rangeOpts,
      areaStyle: {
        ...rangeOpts.areaStyle,
        opacity: 0.4,
      },
    };
  }, [data]);
  const quart2 = useMemo(() => {
    return {
      name: "quart2",
      stack: "q_05",
      type: "line",
      data: rangeValues.quart2,
      // areaStyle: {
      //   color: "#4a4ac8",
      //   opacity: 1,
      //   origin: "start",
      // },
      ...rangeOpts,
      areaStyle: {
        ...rangeOpts.areaStyle,
        opacity: 0.6,
      },
    };
  }, [data]);
  const quart3 = useMemo(() => {
    return {
      name: "quart3",
      stack: "q_05",
      type: "line",
      data: rangeValues.quart3,
      // areaStyle: {
      //   color: "#5a5ad6",
      //   opacity: 1,
      //   origin: "start",
      // },
      ...rangeOpts,
      areaStyle: {
        ...rangeOpts.areaStyle,
        opacity: 0.8,
      },
    };
  }, [data]);
  const q_95 = useMemo(() => {
    return {
      name: "q_95",
      stack: "q_05",
      type: "line",
      data: rangeValues.q_95,
      showInLegend: false,
      // areaStyle: {
      //   color: "#5500ff",
      //   opacity: 0.5,
      //   origin: "start",
      // },
      ...rangeOpts,
    };
  }, [data]);
  const seriesData = baseSeries.concat([q_05, quart1, quart2, quart3, q_95]);
  const options = useMemo(() => {
    return {
      title: {
        text: "",
        left: "center",
      },
      legend: { data: legendData },
      grid: {
        right: "80px",
      },
      xAxis: {
        type: "category",
        data: data.map((item) => moment(item.Date_VL).format("DD/MM/YYYY")),
      },
      yAxis: {
        type: "value",
        min: yMin,
      },
      series: seriesData,
    };
  }, [data, allValues, seriesData]);
  return (
    <>
      <LineChart
        options={options}
        style={{
          height: "500px",
          maxHeight: "600px",
        }}
        saveToExcel={{
          show: true,
          data,
        }}
      />
    </>
  );
};

export default memo(PreQuantile);
