import React, { memo, useMemo, useRef } from "react";
import ReactECharts from "echarts-for-react";
import useChartTheme from "../../../hooks/useChartTheme";
import {
  defaultOptions,
  getFullscreenFeature,
} from "../../../utils/chart/defaultOptions";
import { graphic } from "echarts";
import moment from "moment";

const QuatileSemaine = ({ data }) => {
  const theme = useChartTheme();
  const chartRef = useRef(null);
  const myFullscreen = getFullscreenFeature(chartRef);
  const seriesData = data.map((item) => item.quartile_perf_1S);
  console.log("seriesData", seriesData);
  const seances = data.map((item) => moment(item.Date_VL).format("DD/MM/YYYY"));
  const options = useMemo(() => {
    return {
      title: {
        text: "Quartile par semaine",
        left: "center",
        ...theme.title,
      },
      grid: {
        right: "100px",
        // right: "3%",
        bottom: "15%",
        containLabel: true,
      },
      xAxis: {
        data: seances,
        type: "category",
        axisTick: {
          show: false,
        },
        axisLabel: {
          ...theme.xAxis.nameTextStyle,
        },
        axisLine: {
          show: false,
        },
        z: 10,
        ...theme.xAxis.nameTextStyle,
      },
      yAxis: {
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          ...theme.yAxis.nameTextStyle,
        },
        ...theme.yAxis.nameTextStyle,
      },
      tooltip: {
        trigger: "item",
        confine: true,
        // valueFormatter: (value) => value?.toFixed(2),
      },
      toolbox: {
        feature: {
          myFullscreen,
          dataZoom: {
            yAxisIndex: true,
          },
          restore: {},
          saveAsImage: {},
          dataView: {},
        },
        top: "20px",
      },
      series: [
        {
          type: "bar",
          showBackground: true,
          itemStyle: {
            color: new graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#83bff6" },
              { offset: 0.5, color: "#188df0" },
              { offset: 1, color: "#188df0" },
            ]),
          },
          emphasis: {
            itemStyle: {
              color: new graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#2378f7" },
                { offset: 0.7, color: "#2378f7" },
                { offset: 1, color: "#83bff6" },
              ]),
            },
          },
          data: seriesData,
        },
      ],
      ...defaultOptions,
    };
  }, [data, theme, seances, defaultOptions]);
  return (
    <ReactECharts
      option={options}
      ref={chartRef}
      style={{
        height: "500px",
        minWidth: "600px",
        width: "100%",
        margin: "15px auto",
      }}
    />
  );
};

export default QuatileSemaine;
