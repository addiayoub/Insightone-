import ReactECharts from "echarts-for-react";
import moment from "moment/moment";
import React, { memo, useMemo } from "react";
import useChartTheme from "../../hooks/useChartTheme";

function EvolutionB100({ data }) {
  console.log("EvolutionB100", data);
  const theme = useChartTheme();
  const seriesNames = Object.keys(data[0]).filter((key) => key !== "seance");
  const options = useMemo(() => {
    const seriesData = seriesNames
      .map((seriesName) => data.map((item) => item[seriesName]))
      .flat();
    const minYAxisValue = Math.min(...seriesData);
    return {
      title: {
        text: "Evolution base 100 des Portefeuille simulé",
        left: "center",
        ...theme.title,
      },
      grid: {
        right: "19%",
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
        valueFormatter: (value) => value.toFixed(2),
      },
      dataZoom: [
        {
          type: "slider", // Enable slider data zoom
          show: true,
          xAxisIndex: [0],
          start: 0,
          end: 100,
        },
        {
          type: "inside",
          xAxisIndex: [0],
          start: 0,
          end: 100,
        },
      ],
      xAxis: {
        type: "category",
        data: data.map((item) => moment(item.seance).format("DD/MM/YYYY")),
      },
      legend: {
        data: seriesNames,
        orient: "verticaly",
        zLevel: 5,
        top: "center",
        right: "0",
        type: "scroll",
        ...theme.legend,
      },
      yAxis: {
        type: "value",
        min: Math.trunc(minYAxisValue),
      },
      series: seriesNames.map((seriesName) => ({
        name: seriesName,
        type: "line",
        data: data.map((item) => item[seriesName]),
      })),
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
