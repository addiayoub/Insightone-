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
const HeatMapChart = ({
  options,
  style,
  showSeriesSelector,
  saveToExcel = initSaveToExcel,
  ...restProps
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
    visualMap,
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
      feature: { saveAsImage, dataView },
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
          rotate: 90,
          interval: 0,
          fontSize: 12,
          ...xAxis?.axisLabel,
          ...theme.xAxis.nameTextStyle,
        },
        splitArea: {
          show: true,
        },
        type: "category",
        ...theme.xAxis,
      },
      yAxis: Array.isArray(yAxis)
        ? yAxis.map((yAxisConfig) => ({
            ...yAxisConfig,
            type: "category",
            axisLabel: {
              interval: 0,
              margin: 10,
              fontWeight: "bold",
              hideOverlap: true,
              ...yAxisConfig?.axisLabel,
              ...theme.yAxis.nameTextStyle,
            },
            splitArea: {
              show: true,
            },
            ...theme.yAxis,
          }))
        : [
            {
              ...yAxis,
              type: "category",
              axisLabel: {
                interval: 0,
                margin: 10,
                fontWeight: "bold",
                hideOverlap: true,
                ...yAxis?.axisLabel,
                ...theme.yAxis.nameTextStyle,
              },
              splitArea: {
                show: true,
              },
              ...theme.yAxis,
            },
          ],
      visualMap: {
        min: -1,
        max: 1,
        calculable: true,
        orient: "vertical",
        right: "0",
        top: "30%",
        inRange: {
          color: [
            "#fae8d8",
            "#f6bb97",
            "#f5966c",
            "#f16445",
            "#ba1656",
            "#541e4e",
            "#0e0b22",
          ],
        },
        ...(visualMap ?? {}),
      },
      grid: {
        bottom: "5%",
        top: "5%",
        left: "5%",
        containLabel: true,
        ...(grid ?? {}),
      },
      tooltip: {
        // trigger: "item",
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
          saveAsImage,
          // dataView,
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
        {...restProps}
      />
    </Box>
  );
};

export default memo(HeatMapChart);
