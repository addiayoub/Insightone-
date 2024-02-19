import React, { memo, useMemo, useRef } from "react";
import ReactECharts from "echarts-for-react";
import {
  defaultOptions,
  getFullscreenFeature,
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

const zoomOpts = [
  {
    type: "inside",
    start: 0,
    end: 100,
  },
  {
    show: true,
    type: "slider",
    start: 0,
    end: 100,
  },
];

const BarChart = ({
  options,
  style,
  showSeriesSelector,
  saveToExcel = initSaveToExcel,
}) => {
  console.log("options", options, saveToExcel);
  const chart = useRef(null);
  const myFullscreen = getFullscreenFeature(chart);
  const theme = useChartTheme();
  const { show, data, fileName } = saveToExcel;
  console.log("render BarChart");
  const {
    title,
    grid,
    tooltip,
    xAxis,
    series,
    yAxis,
    showDataZoom = false,
    legend,
    dataZoom,
    toolbox,
    seriesNames: { seriesList = [], init = [] } = {},
    ...rest
  } = options;
  const { SeriesSelector, selectedLegend } = useSeriesSelector(
    seriesList,
    init
  );
  console.log(showDataZoom, "dataZoom", dataZoom);
  const dataZoomChoice = dataZoom ?? zoomOpts;
  const zoom = showDataZoom ? dataZoomChoice : [];
  console.log("zoom is", zoom);

  const {
    toolbox: {
      feature: {
        saveAsImage,
        magicType,
        dataZoom: zoomFeat,
        restore,
        dataView,
      },
    },
  } = defaultOptions;
  const baseOptions = useMemo(() => {
    return {
      title: {
        ...(title ?? {}),
        ...theme.title,
      },
      legend: {
        orient: "horizontal",
        zLevel: 23,
        width: "70%",
        bottom: "0%",
        type: "scroll",
        left: "center",
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
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        ...(xAxis ?? {}),
        axisLabel: {
          hideOverlap: true,
          ...xAxis?.axisLabel,
          ...theme.xAxis.nameTextStyle,
        },

        ...theme.xAxis,
      },
      yAxis: Array.isArray(yAxis)
        ? yAxis.map((yAxisConfig) => ({
            type: "value",
            ...yAxisConfig,
            axisLabel: {
              hideOverlap: true,
              ...yAxisConfig?.axisLabel,
              ...theme.yAxis.nameTextStyle,
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            ...theme.yAxis,
          }))
        : [
            {
              type: "value",
              ...yAxis,
              axisLabel: {
                hideOverlap: true,
                ...yAxis?.axisLabel,
                ...theme.yAxis.nameTextStyle,
              },
              axisTick: {
                show: false,
              },
              axisLine: {
                show: false,
              },
              ...theme.yAxis,
            },
          ],
      grid: {
        bottom: "7%",
        top: "10%",
        containLabel: true,
        ...(grid ?? {}),
      },
      tooltip: {
        trigger: "axis",
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
          magicType,
          dataZoom: zoomFeat,
          restore,
          saveAsImage,
          dataView,
        },
        top: "20px",
        ...toolbox,
      },
      series,
      dataZoom: zoom,
      ...rest,
    };
  }, [series, selectedLegend, options, theme]);

  return (
    <Box className="relative w-full">
      {show && <SaveToExcel data={data} fileName={fileName} />}
      {showSeriesSelector && <SeriesSelector />}
      <ReactECharts
        option={baseOptions}
        key={JSON.stringify(baseOptions)}
        style={{
          minHeight: "400px",
          ...style,
        }}
        ref={chart}
      />
    </Box>
  );
};

export default memo(BarChart);
