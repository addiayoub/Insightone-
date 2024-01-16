import ReactECharts from "echarts-for-react";
import React, { memo, useMemo } from "react";
import { useSelector } from "react-redux";
import { formatDate } from "../../utils/FormatDate";
import { formatNumberWithSpaces } from "../../utils/formatNumberWithSpaces";
import { defaultOptions } from "../../utils/chart/defaultOptions";
import useChartTheme from "../../hooks/useChartTheme";

const CapitalisationChart = ({ data }) => {
  const { darkTheme } = useSelector((state) => state.theme);
  const theme = useChartTheme();
  const options = useMemo(() => {
    return {
      tooltip: {
        trigger: "axis",
        position: function (pt) {
          return [pt[0], "10%"];
        },
      },
      title: {
        left: "center",
        text: "",
      },
      toolbox: {
        feature: {
          dataZoom: {
            yAxisIndex: "none",
          },
          restore: {},
          saveAsImage: {},
        },
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: data.map((item) => formatDate(item.SEANCE)),
        axisLabel: {
          ...theme.xAxis.nameTextStyle,
        },
        ...theme.xAxis,
      },
      yAxis: {
        type: "value",
        boundaryGap: [0, "100%"],
        axisLabel: {
          formatter: function (value) {
            const val = value / 1000000000;
            return val + "M";
          },
          ...theme.yAxis.nameTextStyle,
        },
        ...theme.yAxis,
      },
      series: [
        {
          name: "MASI",
          type: "line",
          symbol: "none",
          sampling: "lttb",
          itemStyle: {
            color: darkTheme ? "white" : "black",
          },
          areaStyle: {
            color: darkTheme ? "white" : "black",
          },
          tooltip: {
            valueFormatter: function (value) {
              return formatNumberWithSpaces(value.toFixed(2));
            },
          },
          data: data.map((item) => item.Capitalisation),
        },
      ],
      ...defaultOptions,
    };
  }, [data, theme]);

  return <ReactECharts option={options} style={{ height: "450px" }} />;
};
export default memo(CapitalisationChart);
