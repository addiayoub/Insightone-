import ReactECharts from "echarts-for-react";
import moment from "moment/moment";
import React, { memo, useMemo, useRef } from "react";
import useChartTheme from "../hooks/useChartTheme";
import {
  defaultOptions,
  getFullscreenFeature,
} from "../utils/chart/defaultOptions";
import { Box } from "@mui/material";
import useSeriesSelector from "../hooks/useSeriesSelector";
import { formatNumberWithSpaces } from "../utils/formatNumberWithSpaces";
import generateXYChartSeries from "../utils/chart/generateXYChartSeries";

const ComparaisonIndicesV2 = ({ data }) => {
  const theme = useChartTheme();
  const chartRef = useRef(null);
  const myFullscreen = getFullscreenFeature(chartRef);
  console.log("EChartsPreview", data);
  const seriesData = useMemo(
    () => generateXYChartSeries(data, "COTATION_B100"),
    [data]
  );
  const seriesNames = useMemo(
    () => seriesData.map((serie) => serie.name),
    [seriesData]
  );
  const { SeriesSelector, selectedLegend } = useSeriesSelector(
    seriesNames,
    seriesNames
  );
  const options = useMemo(() => {
    return {
      ...defaultOptions,
      title: {
        text: "Comparaison des indices",
        left: "center",
        ...theme.title,
      },
      xAxis: {
        type: "time",
        axisLabel: {
          formatter: function (value) {
            return moment(value).format("DD-MM-YYYY");
          },
          hideOverlap: true,
          ...theme.xAxis.nameTextStyle,
        },
        ...theme.xAxis,
      },
      yAxis: {
        type: "value",
        nameLocation: "middle",
        nameGap: 50,
        name: "VALEUR",
        axisLabel: {
          ...theme.yAxis.nameTextStyle,
        },
        ...theme.yAxis,
      },
      legend: {
        selected: selectedLegend,
        bottom: "9%",
        orient: "horizontal",
        type: "scroll",
        width: "80%",
        ...theme.legend,
      },
      series: seriesData,
      tooltip: {
        trigger: "axis",
        confine: true,
        valueFormatter: (value) => formatNumberWithSpaces(value),
        axisPointer: {
          type: "line",
          label: {
            show: false,
            formatter: function (params) {
              return moment(params.value).format("DD-MM-YYYY");
            },
          },
        },
      },
      grid: {
        left: "50px",
        right: "80px",
        bottom: "15%",
        top: "10%",
        containLabel: true,
      },
      toolbox: {
        feature: {
          myFullscreen,
          dataZoom: {
            yAxisIndex: true,
          },
          restore: {},
          saveAsImage: {},
        },
        top: "20px",
      },
    };
  }, [seriesData, selectedLegend, theme]);
  return (
    <Box>
      <SeriesSelector />
      <ReactECharts
        option={options}
        style={{ minHeight: 500, height: 600, maxHeight: 750 }}
        key={JSON.stringify(options)}
        ref={chartRef}
      />
    </Box>
  );
};

export default memo(ComparaisonIndicesV2);
