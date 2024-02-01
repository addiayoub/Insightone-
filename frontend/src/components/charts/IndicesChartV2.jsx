import ReactECharts from "echarts-for-react";
import moment from "moment/moment";
import React, { memo, useMemo, useRef } from "react";
import useChartTheme from "../../hooks/useChartTheme";
import {
  defaultOptions,
  getFullscreenFeature,
} from "../../utils/chart/defaultOptions";
import { Box } from "@mui/material";
import useSeriesSelector from "../../hooks/useSeriesSelector";
import { formatNumberWithSpaces } from "../../utils/formatNumberWithSpaces";
import generateXYChartSeries from "../../utils/chart/generateXYChartSeries";
const IndicesChartV2 = ({ data }) => {
  const theme = useChartTheme();
  console.log("EChartsPreview", data);
  const chartRef = useRef(null);
  const myFullscreen = getFullscreenFeature(chartRef);
  const seriesData = useMemo(
    () => generateXYChartSeries(data, "VALEUR"),
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
    console.log("memo run");
    return {
      ...defaultOptions,
      title: {
        text: "Evolution du volume des titres sélectionnés",
        ...theme.title,
        left: "center",
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
  }, [seriesData, selectedLegend]);
  return (
    <Box>
      <SeriesSelector />
      <ReactECharts
        ref={chartRef}
        option={options}
        style={{ minHeight: 500, height: 600, maxHeight: 750 }}
        key={JSON.stringify(options)}
      />
    </Box>
  );
};

export default memo(IndicesChartV2);
