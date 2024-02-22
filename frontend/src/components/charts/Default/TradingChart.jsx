import React, { memo, useMemo, useRef } from "react";
import ReactECharts from "echarts-for-react";
import {
  defaultOptions,
  getFullscreenFeature,
  getExportToExcelFeature,
} from "../../../utils/chart/defaultOptions";
import useChartTheme from "../../../hooks/useChartTheme";
import useSeriesSelector from "../../../hooks/useSeriesSelector";
import { Box } from "@mui/material";
import SaveToExcel from "../../SaveToExcel";

const initSaveToExcel = {
  show: false,
  data: [],
  fileName: new Date().getTime(),
};

const TradingChart = ({
  options,
  style,
  showSeriesSelector,
  saveToExcel = initSaveToExcel,
}) => {
  console.log("options", options, saveToExcel);
  const chart = useRef(null);
  const myFullscreen = getFullscreenFeature(chart);
  const myExportToExcel = getExportToExcelFeature(saveToExcel);
  const theme = useChartTheme();
  const { show, data, fileName } = saveToExcel;
  console.log("render TradingChart");
  const {
    title,
    grid,
    tooltip,
    xAxis,
    series,
    yAxis,
    legend,
    seriesNames: { seriesList = [], init = seriesList } = {},
    ...rest
  } = options;
  const { SeriesSelector, selectedLegend } = useSeriesSelector(
    seriesList,
    init
  );
  const {
    dataZoom: zoom,
    toolbox: {
      feature: { saveAsImage, dataZoom, restore },
    },
  } = defaultOptions;
  const baseOptions = useMemo(() => {
    return {
      title: {
        ...(title ?? {}),
        ...theme.title,
      },
      xAxis: {
        ...(xAxis ?? {}),
        axisLabel: {
          hideOverlap: true,
          ...xAxis?.axisLabel,
          ...theme.xAxis.nameTextStyle,
        },
        min: "dataMin",
        max: "dataMax",
        boundaryGap: false,
        axisLine: { onZero: false },
        splitLine: { show: false },
        ...theme.xAxis,
      },
      yAxis: {
        ...(yAxis ?? {}),
        axisLabel: {
          hideOverlap: true,
          ...yAxis?.axisLabel,
          ...theme.yAxis.nameTextStyle,
        },
        scale: true,
        splitArea: {
          show: true,
        },
        ...theme.yAxis,
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
        ...(legend ?? {}),
        ...theme.legend,
      },
      grid: {
        right: "100px",
        top: "10%",
        bottom: "15%",
        containLabel: true,
        ...(grid ?? {}),
      },
      tooltip: {
        axisPointer: {
          type: "cross",
        },
        trigger: "axis",
        textStyle: {
          overflow: "breakAll",
          width: 40,
        },
        confine: true,
        // valueFormatter: (value) => value?.toFixed(2),
        ...(tooltip ?? {}),
      },
      toolbox: {
        feature: {
          myFullscreen,
          myExportToExcel,
          saveAsImage,
          dataZoom,
          restore,
        },
        top: "20px",
      },
      zoom,
      series,
      ...rest,
    };
  }, [series, selectedLegend, options, theme]);

  return (
    <Box className="relative">
      {show && <SaveToExcel data={data} fileName={fileName} />}
      {showSeriesSelector && <SeriesSelector />}
      <ReactECharts
        option={baseOptions}
        key={JSON.stringify(baseOptions)}
        style={style}
        ref={chart}
      />
    </Box>
  );
};

export default memo(TradingChart);
