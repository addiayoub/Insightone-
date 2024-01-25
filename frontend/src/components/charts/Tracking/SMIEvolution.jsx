import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { extractKeys } from "../../../utils/extractKeys";
import useChartTheme from "../../../hooks/useChartTheme";
import ReactECharts from "echarts-for-react";
import { defaultOptions } from "../../../utils/chart/defaultOptions";
import useSeriesSelector from "../../../hooks/useSeriesSelector";

const regex = /^SIM\d+$/;

const SMIEvolution = ({ SIM }) => {
  const {
    generationPtfAlea: { df_b100: data },
  } = useSelector((state) => state.tracking);
  const smiKeys = Object.keys(data[0]).filter(
    (key) => regex.test(key) && key !== SIM
  );
  const seriesNames = extractKeys(data, ["seance", ...smiKeys]);
  const theme = useChartTheme();
  console.log("seriesNames", seriesNames);
  const { SeriesSelector, selectedLegend } = useSeriesSelector(seriesNames);
  const options = useMemo(() => {
    const seriesData = seriesNames
      .map((seriesName) => data.map((item) => item[seriesName]))
      .flat()
      .filter((value) => value !== undefined);
    const minYAxisValue = Math.min(...seriesData);
    console.log("minYAxisValue", minYAxisValue);

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
        // data: data.map((item) => moment(item.seance).format("DD/MM/YYYY")),
        data: data.map((item) => item.seance),
        axisLabel: {
          ...theme.xAxis.nameTextStyle,
        },
        ...theme.xAxis,
      },
      legend: {
        // data: seriesNames,
        selected: selectedLegend,
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
        min: Math.trunc(minYAxisValue),
        axisLabel: {
          ...theme.yAxis.nameTextStyle,
        },
        ...theme.yAxis,
      },
      series: seriesNames.map((seriesName) => ({
        name: seriesName,
        type: "line",
        itemStyle: {
          color: regex.test(seriesName) ? "#ccc" : undefined,
        },
        data: data.map((item) => item[seriesName]),
      })),
      ...defaultOptions,
    };
  }, [seriesNames, data, selectedLegend, theme]);
  return (
    <>
      <SeriesSelector />
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

export default SMIEvolution;
