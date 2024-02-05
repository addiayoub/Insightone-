import React, { memo, useMemo } from "react";
import { extractKeys } from "../../../utils/extractKeys";
import { Box } from "@mui/material";
import filterData from "../../../utils/filterData";
import { useSelector } from "react-redux";
import LineChart from "../Default/LineChart";

function transformData(data) {
  return data.map((item) => {
    const simKeys = Object.keys(item).filter(
      (key) => key.startsWith("SIM") && key !== "SIM optimal"
    );
    const simValues = simKeys.map((simKey) => item[simKey]);

    // Create a new object without individual SIM keys
    const newObj = { ...item };
    simKeys.forEach((simKey) => delete newObj[simKey]);

    return {
      ...newObj,
      SIM: { min: Math.min(...simValues), max: Math.max(...simValues) },
    };
  });
}

function Evolution({ data }) {
  console.log("Evolution", data);
  const originalData = data;
  const { selectedPtf } = useSelector((state) => state.backtest);
  console.log("selectedPtf ", selectedPtf);
  const excludeSeance = extractKeys(data, ["seance"]);
  const seriesData = excludeSeance
    .map((seriesName) => data.map((item) => item[seriesName]))
    .flat()
    .filter((value) => value !== undefined);
  // const minYAxisValue = Math.min(...seriesData);
  console.log("excludeSeance", excludeSeance);

  data = transformData(data);
  console.log("data, before", data);
  data = filterData(data, [/SIM/]);
  const minValues = useMemo(() => data.map((item) => item.SIM.min), [data]);
  const maxValues = useMemo(() => data.map((item) => item.SIM.max), [data]);
  const rangeValues = Array.from({ length: minValues.length }, (_, index) =>
    Math.abs(maxValues[index] - minValues[index])
  );
  console.log("min values", rangeValues);
  const seriesNames = Object.keys(data[0])
    .filter((key) => key !== "seance")
    .reverse()
    .concat(selectedPtf);
  const rangeSeries = useMemo(() => {
    return {
      z: -1,
      name: "Range",
      stack: "SIM",
      tooltip: {
        show: false,
      },
      type: "line",
      areaStyle: {
        color: "rgba(204,204,204,0.5)",
        opacity: 1,
        origin: "start",
      },
      lineStyle: {
        opacity: 0,
      },
      emphasis: {
        disabled: true,
      },
      symbolSize: 0,
      data: rangeValues,
    };
  }, [rangeValues]);
  const SIMSerie = useMemo(() => {
    return {
      name: "SIM",
      stack: "SIM",
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
      data: minValues,
    };
  }, [minValues]);
  console.log("seriesNames", seriesNames);
  const series = seriesNames
    .reverse()
    .map((key) => ({
      name: key,
      type: "line",
      data: originalData.map((item) => item[key]),
    }))
    .concat(SIMSerie)
    .concat(rangeSeries);
  const forMinVal = useMemo(
    () =>
      seriesNames
        .map((serie) => originalData.map((item) => item[serie]))
        .flat()
        .concat(minValues)
        .filter((num) => num !== undefined),
    [originalData, seriesNames]
  );

  const minYAxisValue = Math.min(...forMinVal);

  const options = useMemo(() => {
    return {
      title: {
        text: "Pré-selection quantitative",
        left: "center",
      },
      legend: {
        data: seriesNames,
        left: "center",
      },
      grid: {
        right: "20%",
      },
      seriesNames: {
        seriesList: seriesNames,
        init: ["SIM optimal", selectedPtf, "SIM"],
      },
      xAxis: {
        type: "category",
        data: data.map((item) => item.seance),
      },
      yAxis: {
        type: "value",
        min: Math.trunc(minYAxisValue),
      },
      series,
    };
  }, [minYAxisValue, data, series, seriesNames]);
  return (
    <Box className="relative">
      <LineChart
        showSeriesSelector
        options={options}
        style={{
          height: "500px",
          maxHeight: "600px",
        }}
      />
    </Box>
  );
}

export default memo(Evolution);
