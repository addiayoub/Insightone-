import React, { memo, useMemo } from "react";
import ReactECharts from "echarts-for-react";
import moment from "moment";
import { defaultOptions } from "../../../utils/chart/defaultOptions";
import useChartTheme from "../../../hooks/useChartTheme";

const series = [
  { name: "ajust_b100", data: "ajust_b100" },
  { name: "DENOMINATION_OPCVM", data: "opc_b100" },
  { name: "Nom_Benchmark", data: "benc_b100" },
];

const AnalyseQuatile = ({ data }) => {
  const theme = useChartTheme();
  const allValues = useMemo(
    () => series.map((serie) => data.map((item) => item[serie.data])).flat(),
    [data]
  );
  const options = useMemo(() => {
    return {
      title: {
        text: "",
        left: "center",
        ...theme.title,
      },
      grid: {
        right: "80px",
        top: "10%",
        // right: "3%",
        bottom: "15%",
        containLabel: true,
      },
      toolbox: {
        feature: {
          dataZoom: {
            yAxisIndex: true,
          },
          restore: {},
          saveAsImage: {},
          dataView: {},
        },
        top: "20px",
      },
      tooltip: {
        trigger: "axis",
        textStyle: {
          overflow: "breakAll",
          width: 40,
        },
        confine: true,
        valueFormatter: (value) => value?.toFixed(2),
      },
      xAxis: {
        type: "category",
        data: data.map((item) => moment(item.Date_VL).format("DD/MM/YYYY")),
        axisLabel: {
          ...theme.xAxis.nameTextStyle,
        },
        ...theme.xAxis,
      },
      legend: {
        type: "scroll",
        orient: "horizontal",
        zLevel: 23,
        width: "60%",
        left: "center",
        bottom: "9%",
        ...theme.legend,
      },
      yAxis: {
        type: "value",
        min: Math.trunc(Math.min(...allValues)),
        axisLabel: {
          ...theme.yAxis.nameTextStyle,
        },
        ...theme.yAxis,
      },
      series: series.map((serie) => ({
        name:
          serie.name === "ajust_b100"
            ? "Perf ajustée de la classe"
            : data[0][serie.name],
        type: "line",
        data: data.map((item) => item[serie.data]),
      })),
      ...defaultOptions,
    };
  }, [defaultOptions, data, series, allValues, theme]);
  return (
    <>
      <ReactECharts
        option={options}
        style={{
          height: "500px",
          maxHeight: "600px",
        }}
      />
    </>
  );
};

export default memo(AnalyseQuatile);
