import ReactECharts from "echarts-for-react";
import React, { memo, useMemo, useState } from "react";
import { defaultOptions } from "../../../utils/chart/defaultOptions";
import { extractKeys } from "../../../utils/extractKeys";
import useChartTheme from "../../../hooks/useChartTheme";
import { Box } from "@mui/material";
import SaveToExcel from "../../SaveToExcel";
import useSeriesSelector from "../../../hooks/useSeriesSelector";
import filterData from "../../../utils/filterData";
import { useSelector } from "react-redux";

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

function Evolution({
  data,
  isGrid,
  title = "Evolution base 100 des Portefeuilles simulés",
}) {
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
  const theme = useChartTheme();
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
  // const [selectedLegend, setSelectedLegend] = useState([]);
  console.log("series evo", series);
  const { SeriesSelector, selectedLegend } = useSeriesSelector(seriesNames, [
    "SIM optimal",
    selectedPtf,
    "SIM",
  ]);
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
        text: "",
        left: "center",
        ...theme.title,
      },
      legend: {
        data: seriesNames,
        type: "scroll",
        orient: "horizontal",
        zLevel: 23,
        width: "60%",
        left: "center",
        bottom: "9%",
        selected: selectedLegend,
        ...theme.legend,
      },
      grid: {
        right: isGrid ? "100px" : "20%",
        top: "10%",
        bottom: "15%",
        containLabel: true,
      },
      toolbox: {
        feature: {
          dataZoom: {
            yAxisIndex: true,
          },
          restore: {},
          saveAsImage: {},
          dataView: {},
        },
        top: "20px",
      },
      xAxis: {
        type: "category",

        data: data.map((item) => item.seance),
        axisLabel: {
          ...theme.xAxis.nameTextStyle,
        },
        ...theme.xAxis,
      },
      yAxis: {
        type: "value",
        max: 110,
        min: Math.trunc(minYAxisValue),
        show: true,
        axisLabel: {
          ...theme.yAxis.nameTextStyle,
        },
        ...theme.yAxis,
      },
      tooltip: {
        trigger: "axis",
        textStyle: {
          overflow: "breakAll",
          width: 40,
        },
        confine: true,
        valueFormatter: (value) => value?.toFixed(2),
      },
      series,
      ...defaultOptions,
    };
  }, [
    defaultOptions,
    minYAxisValue,
    data,
    series,
    seriesNames,
    selectedLegend,
  ]);
  return (
    <Box className="relative">
      <SaveToExcel data={data} fileName={"Evolution B100"} />
      <SeriesSelector />
      <ReactECharts
        option={options}
        style={{
          height: "500px",
          maxHeight: "600px",
        }}
      />
    </Box>
  );
}

export default memo(Evolution);
