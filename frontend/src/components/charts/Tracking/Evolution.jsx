import ReactECharts from "echarts-for-react";
import React, { memo, useMemo, useState } from "react";
import { defaultOptions } from "../../../utils/chart/defaultOptions";
import { extractKeys } from "../../../utils/extractKeys";
import useChartTheme from "../../../hooks/useChartTheme";
import { Box } from "@mui/material";
import SaveToExcel from "../../SaveToExcel";
import useSeriesSelector from "../../../hooks/useSeriesSelector";

function transformData(data) {
  return data.map((item) => {
    const simKeys = Object.keys(item).filter((key) => key.startsWith("SIM"));
    const simValues = simKeys.map((simKey) => item[simKey]);

    // Create a new object without individual SIM keys
    const newObj = { ...item };
    simKeys.forEach((simKey) => delete newObj[simKey]);

    return {
      ...newObj,
      SMI: { min: Math.min(...simValues), max: Math.max(...simValues) },
    };
  });
}

function Evolution({
  data,
  isGrid,
  title = "Evolution base 100 des Portefeuilles simulés",
}) {
  console.log("Evolution", data);
  const excludeSeance = extractKeys(data, ["seance"]);
  const seriesData = excludeSeance
    .map((seriesName) => data.map((item) => item[seriesName]))
    .flat()
    .filter((value) => value !== undefined);
  const minYAxisValue = Math.min(...seriesData);
  const theme = useChartTheme();
  data = transformData(data);
  const minValues = useMemo(() => data.map((item) => item.SMI.min), [data]);
  const maxValues = useMemo(() => data.map((item) => item.SMI.max), [data]);
  const rangeValues = Array.from({ length: minValues.length }, (_, index) =>
    Math.abs(maxValues[index] - minValues[index])
  );
  console.log("min values", rangeValues);
  const seriesNames = Object.keys(data[0]).filter(
    (key) => key !== "seance" && key !== "SMI"
  );
  const rangeSeries = useMemo(() => {
    return {
      z: -1,
      name: "Range",
      stack: "SMI",
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
  const smiSerie = useMemo(() => {
    return {
      name: "SMI",
      stack: "SMI",
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
    .map((key) => ({
      name: key,
      type: "line",
      data: data.map((item) => item[key]),
    }))
    .concat(smiSerie)
    .concat(rangeSeries);
  // const [selectedLegend, setSelectedLegend] = useState([]);
  const { SeriesSelector, selectedLegend } = useSeriesSelector(seriesNames);
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
        min: Math.trunc(minYAxisValue),
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
