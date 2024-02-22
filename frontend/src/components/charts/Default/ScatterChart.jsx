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
const initSaveToExcel = {
  show: false,
  data: [],
  fileName: new Date().getTime(),
};
const ScatterChart = ({
  options,
  style,
  onEvents,
  showSeriesSelector,
  saveToExcel = initSaveToExcel,
}) => {
  console.log("options", options);
  const chart = useRef(null);
  const myFullscreen = getFullscreenFeature(chart);
  const myExportToExcel = getExportToExcelFeature(saveToExcel);
  const theme = useChartTheme();
  const {
    title,
    grid,
    tooltip,
    xAxis,
    series,
    yAxis,
    legend,
    toolbox,
    seriesNames: { seriesList = [], init = seriesList } = {},
    ...rest
  } = options;
  const { SeriesSelector, selectedLegend } = useSeriesSelector(
    seriesList,
    init
  );
  const {
    toolbox: {
      feature: { saveAsImage, dataZoom, restore, dataView },
    },
  } = defaultOptions;
  const baseOptions = useMemo(() => {
    return {
      title: {
        ...(title ?? {}),
        ...theme.title,
      },
      legend: {
        orient: "vertical",
        zLevel: 23,
        height: 200,
        type: "scroll",
        right: 0,
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
      xAxis: {
        ...(xAxis ?? {}),
        axisLabel: {
          hideOverlap: true,
          ...xAxis?.axisLabel,
          ...theme.xAxis.nameTextStyle,
        },
        type: "value",
        nameLocation: "middle",
        nameGap: 30,
        nameTextStyle: {
          fontSize: 14,
          ...theme.xAxis.nameTextStyle,
        },
        ...theme.xAxis,
      },
      yAxis: Array.isArray(yAxis)
        ? yAxis.map((yAxisConfig) => ({
            ...yAxisConfig,
            type: "value",
            nameLocation: "middle",
            nameGap: 50,
            axisLabel: {
              hideOverlap: true,
              ...yAxisConfig?.axisLabel,
              ...theme.yAxis.nameTextStyle,
            },
            nameTextStyle: {
              fontSize: 14,
              ...theme.yAxis.nameTextStyle,
            },
            ...theme.yAxis,
          }))
        : [
            {
              ...yAxis,
              type: "value",
              nameLocation: "middle",
              nameGap: 50,
              axisLabel: {
                hideOverlap: true,
                ...yAxis?.axisLabel,
                ...theme.yAxis.nameTextStyle,
              },
              nameTextStyle: {
                fontSize: 14,
                ...theme.yAxis.nameTextStyle,
              },
              ...theme.yAxis,
            },
          ],
      grid: {
        bottom: "50",
        top: "10%",
        containLabel: true,
        ...(grid ?? {}),
      },
      tooltip: {
        trigger: "item",
        axisPointer: {
          type: "cross",
        },
        textStyle: {
          overflow: "breakAll",
          width: 40,
        },
        confine: true,
        valueFormatter: (value) => value?.toFixed(2) + "%",
        ...(tooltip ?? {}),
      },
      toolbox: {
        feature: {
          myFullscreen,
          myExportToExcel,
          dataZoom,
          restore,
          saveAsImage,
          dataView,
        },
        right: 0,
        top: "10px",
        ...(toolbox ?? {}),
      },
      series,
      ...rest,
    };
  }, [series, selectedLegend, options, theme]);
  return (
    <Box className="relative w-full">
      {showSeriesSelector && <SeriesSelector />}
      <ReactECharts
        option={baseOptions}
        key={JSON.stringify(baseOptions)}
        style={{
          minHeight: 400,
          ...style,
        }}
        ref={chart}
        onEvents={onEvents}
      />
    </Box>
  );
};

export default memo(ScatterChart);
