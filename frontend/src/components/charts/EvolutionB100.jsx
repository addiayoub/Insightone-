import ReactECharts from "echarts-for-react";
import moment from "moment/moment";
import React, { memo, useMemo } from "react";
import useChartTheme from "../../hooks/useChartTheme";
import { defaultOptions } from "../../utils/chart/defaultOptions";

function EvolutionB100({ data, isGrid }) {
  console.log("EvolutionB100", data);
  const theme = useChartTheme();
  const seriesNames = Object.keys(data[0]).filter((key) => key !== "seance");
  const legend = isGrid
    ? {
        type: "scroll",
        orient: "horizontal",
        zLevel: 23,
        width: "60%",
        left: "center",
        bottom: "9%",
      }
    : {
        orient: "vertical",
        zLevel: 23,
        height: "50%",
        top: "center",
        right: 0,
        type: "scroll",
        textStyle: {
          width: 150,
          rich: {
            fw600: {
              fontWeight: 600,
            },
          },
        },
      };
  console.log("seriesNames EvolutionB100", seriesNames);
  const options = useMemo(() => {
    const seriesData = seriesNames
      .map((seriesName) => data.map((item) => item[seriesName]))
      .flat()
      .filter((value) => value !== undefined);
    const minYAxisValue = Math.min(...seriesData);
    console.log("minYAxisValue", minYAxisValue);

    return {
      title: {
        text: "Evolution base 100 des Portefeuilles simulés",
        left: "center",
        ...theme.title,
      },
      grid: {
        right: isGrid ? "100px" : "20%",
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
          ...theme.yAxis.nameTextStyle,
        },
        ...theme.yAxis,
      },
      legend: {
        data: seriesNames,
        ...legend,
        formatter: function (name) {
          if (name.length > 25 && !isGrid) {
            const newName = name.split(" ");
            return newName.join(" \n");
          }
          return name;
        },
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
        symbol: "none",
        data: data.map((item) => item[seriesName]),
      })),
      ...defaultOptions,
    };
  }, [seriesNames, data, theme]);
  return (
    <ReactECharts
      option={options}
      style={{
        height: "500px",
        maxHeight: "600px",
      }}
    />
  );
}

export default memo(EvolutionB100);
