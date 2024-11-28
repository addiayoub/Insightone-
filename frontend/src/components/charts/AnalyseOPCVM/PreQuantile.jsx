import React, { memo, useMemo, useRef, useEffect } from "react";
import ReactECharts from "echarts-for-react";
import moment from "moment";
import { Box } from "@mui/material";
import useChartTheme from "../../../hooks/useChartTheme";
import useSeriesSelector from "../../../hooks/useSeriesSelector";
import {
  defaultOptions,
  getExportToExcelFeature,
  getFullscreenFeature,
} from "../../../utils/chart/defaultOptions";

const series = [
  { name: "DENOMINATION_OPCVM", data: "opc_b100" },
  { name: "Nom_Benchmark", data: "benc_b100" },
];

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

const initSaveToExcel = {
  show: false,
  data: [],
  fileName: new Date().getTime(),
};

const PreQuantile = ({ data, style, showSeriesSelector, saveToExcel = initSaveToExcel }) => {
  const chart = useRef(null);
  const theme = useChartTheme();
  
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

  const legendData = useMemo(
    () => series.map((serie) => data[0][serie.name]),
    [series, data]
  );

  const baseSeries = series.map((serie) => ({
    name: serie.name === "ajust_b100" ? "Perf ajustée de la classe" : data[0][serie.name],
    type: "line",
    symbol: "none",
    itemStyle: {
      color: serie.name === "DENOMINATION_OPCVM" ? "red" : "yellow"
    },
    data: data.map((item) => item[serie.data]),
  }));

  const q_05 = useMemo(() => ({
    name: "q_05",
    stack: "q_05",
    type: "line",
    symbol: "none",
    tooltip: { show: false },
    lineStyle: { opacity: 1 },
    emphasis: { disabled: true },
    symbolSize: 0,
    data: rangeValues.q_05,
  }), [data]);

  const quart1 = useMemo(() => ({
    name: "quart1",
    stack: "q_05",
    symbol: "none",
    type: "line",
    data: rangeValues.quart1,
    ...rangeOpts,
    areaStyle: {
      ...rangeOpts.areaStyle,
      opacity: 0.4,
    },
  }), [data]);

  const quart2 = useMemo(() => ({
    name: "quart2",
    stack: "q_05",
    symbol: "none",
    type: "line",
    data: rangeValues.quart2,
    ...rangeOpts,
    areaStyle: {
      ...rangeOpts.areaStyle,
      opacity: 0.6,
    },
  }), [data]);

  const quart3 = useMemo(() => ({
    name: "quart3",
    stack: "q_05",
    symbol: "none",
    type: "line",
    data: rangeValues.quart3,
    ...rangeOpts,
    areaStyle: {
      ...rangeOpts.areaStyle,
      opacity: 0.8,
    },
  }), [data]);

  const q_95 = useMemo(() => ({
    name: "quart4",
    stack: "q_05",
    symbol: "none",
    type: "line",
    data: rangeValues.q_95,
    showInLegend: false,
    ...rangeOpts,
  }), [data]);

  const seriesData = baseSeries.concat([q_05, quart1, quart2, quart3, q_95]);
  const serieafficher = baseSeries.concat([quart1, quart2, quart3, q_95]);

  const myFullscreen = getFullscreenFeature(chart);
  const myExportToExcel = getExportToExcelFeature(saveToExcel);
  
  const {
    dataZoom: zoom,
    toolbox: {
      feature: { saveAsImage, dataZoom, restore, dataView },
    },
  } = defaultOptions;

  const { SeriesSelector, selectedLegend } = useSeriesSelector(
    serieafficher.map(s => s.name),
    serieafficher.map(s => s.name)
  );

  const options = useMemo(() => ({
    title: {
      text: "",
      left: "center",
      ...theme.title,
    },
    legend: {
      orient: "horizontal",
      zLevel: 23,
      width: "70%",
      bottom: "9%",
      type: "scroll",
      textStyle: {
        width: 150,
        rich: {
          fw600: {
            fontWeight: 600,
          },
        },
      },
      selected: selectedLegend,
      ...theme.legend,
    },
    grid: {
      right: "100px",
      top: "10%",
      bottom: "15%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: data.map((item) => moment(item.Date_VL).format("DD/MM/YYYY")),
      axisLabel: {
        hideOverlap: true,
        ...theme.xAxis.nameTextStyle,
      },
      ...theme.xAxis,
    },
    yAxis: {
      type: "value",
      min: yMin,
      axisLabel: {
        hideOverlap: true,
        ...theme.yAxis.nameTextStyle,
      },
      min: function (value) {
        return value?.min?.toFixed(2);
      },
      max: function (value) {
        return value?.max?.toFixed(2);
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
    toolbox: {
      feature: {
        myFullscreen,
        myExportToExcel,
        saveAsImage,
        dataView,
        dataZoom,
        restore,
      },
      top: "20px",
    },
    dataZoom: zoom,
    series: seriesData,
  }), [data, allValues, seriesData, selectedLegend, theme]);

  useEffect(() => {
    const chartInstance = chart.current.getEchartsInstance();
    chartInstance.dispatchAction({
      type: "showDataView",
    });
  }, []);

  return (
    <Box className="relative">
      {showSeriesSelector && <SeriesSelector />}
      <ReactECharts
        option={options}
        key={JSON.stringify(options)}
        style={{
          minHeight: 500,
          ...style,
        }}
        ref={chart}
      />
    </Box>
  );
};

export default memo(PreQuantile);
/////////