import React, { memo, useMemo, useRef } from "react";
import ReactECharts from "echarts-for-react";
import { getFullscreenFeature } from "../../../utils/chart/defaultOptions";
import useChartTheme from "../../../hooks/useChartTheme";
import useSeriesSelector from "../../../hooks/useSeriesSelector";
import { Box } from "@mui/material";
import SaveToExcel from "../../SaveToExcel";

const initSaveToExcel = {
  show: false,
  data: [],
  fileName: new Date().getTime(),
};

const PieChart = ({
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
  console.log("render LineChart");
  const {
    title,
    grid,
    tooltip,
    series,
    legend,
    seriesNames: { seriesList = [], init = [] } = {},
    ...rest
  } = options;
  const { SeriesSelector, selectedLegend } = useSeriesSelector(
    seriesList,
    init
  );
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
        type: "scroll",
        left: "center",
        bottom: "0",
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
        bottom: "10%",
        containLabel: true,
        ...(grid ?? {}),
      },
      tooltip: {
        trigger: "item",
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
          restore: { iconStyle: { borderColor: "blue" } },
          saveAsImage: { iconStyle: { borderColor: "blue" } },
          dataView: { iconStyle: { borderColor: "blue" } },
        },
        top: "20px",
      },
      series,
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
        style={style}
        ref={chart}
      />
    </Box>
  );
};

export default memo(PieChart);
