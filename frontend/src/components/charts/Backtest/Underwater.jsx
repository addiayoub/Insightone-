import React, { memo, useMemo } from "react";
import ReactECharts from "echarts-for-react";
import useChartTheme from "../../../hooks/useChartTheme";
import { defaultOptions } from "../../../utils/chart/defaultOptions";
import { useSelector } from "react-redux";
import moment from "moment";

const Underwater = ({ data }) => {
  console.log("Underwater data", data);
  const { selectedPtf } = useSelector((state) => state.backtest);
  const theme = useChartTheme();
  const seances = useMemo(
    () => data.map((item) => moment(item.seance).format("DD/MM/YYYY")),
    [data]
  );
  const seriesData = useMemo(
    () => data.map((item) => item[selectedPtf] * 100),
    [data, selectedPtf]
  );
  const average = useMemo(() => data.map((item) => item.Average * 100), [data]);
  const options = useMemo(() => {
    return {
      tooltip: {
        trigger: "axis",
        confine: true,
        valueFormatter: (value) => value?.toFixed(2) + "%",
      },
      title: {
        left: "center",
        text: "Underwater Plot",
        ...theme.title,
      },
      toolbox: {
        feature: {
          dataZoom: {
            yAxisIndex: true,
          },
          restore: {},
          saveAsImage: {},
        },
        top: "20px",
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: seances,
        axisLabel: {
          ...theme.xAxis.nameTextStyle,
        },
        ...theme.xAxis,
      },
      yAxis: {
        type: "value",
        boundaryGap: [0, "100%"],
        axisLabel: {
          formatter: "{value}%",
          ...theme.yAxis.nameTextStyle,
        },
        ...theme.yAxis,
      },
      series: [
        {
          name: selectedPtf,
          type: "line",
          symbol: "none",
          sampling: "lttb",
          itemStyle: {
            color: "rgb(255, 70, 131)",
          },
          areaStyle: {
            color: "rgb(255, 158, 68)",
          },
          data: seriesData,
        },
        {
          name: "Average",
          type: "line",
          symbol: "none",
          itemStyle: {
            color: "blue",
          },
          // lineStyle: {
          //   type: "dashed", // Set to 'dashed' for a dashed line
          // },
          data: average,
        },
      ],
      ...defaultOptions,
    };
  }, [selectedPtf, seriesData, average, theme, seances, defaultOptions]);
  return (
    <ReactECharts
      option={options}
      style={{
        minHeight: 500,
        margin: "15px 0",
      }}
    />
  );
};

export default memo(Underwater);