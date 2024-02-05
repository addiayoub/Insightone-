import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { extractKeys } from "../../../utils/extractKeys";
import filterData from "../../../utils/filterData";
import LineChart from "../Default/LineChart";

const regex = /^SIM\d+$/;
const getSeries = (data, seriesNames) => {
  return seriesNames.map((serieName) => ({
    name: serieName,
    type: "line",
    symbol: "none",
    itemStyle: {
      color: regex.test(serieName) ? "#ccc" : undefined,
    },
    data: data.map((item) => item[serieName]),
  }));
};

const SIMEvolution = ({ SIM }) => {
  const {
    generationPtfAlea: { df_b100: data },
  } = useSelector((state) => state.tracking);
  const { selectedPtf } = useSelector((state) => state.backtest);
  const smiKeys = Object.keys(data[0]).filter(
    (key) => regex.test(key) && key !== SIM
  );
  console.log("smiKeys", smiKeys);
  const filteredData = filterData(data, [/SIM/, new RegExp(selectedPtf)]);
  const seriesNames = extractKeys(filteredData, ["seance", ...smiKeys]);
  console.log("seriesNames", seriesNames);
  const series = useMemo(
    () => getSeries(data, seriesNames),
    [data, seriesNames]
  );
  const options = useMemo(() => {
    const seriesData = seriesNames
      .map((seriesName) => data.map((item) => item[seriesName]))
      .flat()
      .filter((value) => value !== undefined);
    const minYAxisValue = Math.min(...seriesData);
    console.log("minYAxisValue", minYAxisValue);

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
        // data: data.map((item) => moment(item.seance).format("DD/MM/YYYY")),
        data: data.map((item) => item.seance),
      },
      yAxis: {
        type: "value",
        min: Math.trunc(minYAxisValue),
      },
      seriesNames: { seriesList: seriesNames, init: seriesNames },
      series,
    };
  }, [series, seriesNames, data]);
  console.log(options, "options SIM_EVO");
  return (
    <>
      <LineChart
        options={options}
        style={{
          height: "500px",
          minHeight: "600px",
        }}
        showSeriesSelector
      />
    </>
  );
};

export default SIMEvolution;
