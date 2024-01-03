import moment from "moment";
import React, { useMemo } from "react";
import ReactECharts from "echarts-for-react";
import useChartTheme from "../../hooks/useChartTheme";

const VlChart = ({ data }) => {
  console.log("data", data);
  const theme = useChartTheme();

  const seriesNames = Object.keys(data[0]).filter((key) =>
    ["VL non rebalancé", "VL sans dividende", "VL"].includes(key)
  );
  const options = useMemo(() => {
    return {
      title: {
        text: "Titre",
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
          type: "slider",
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
        orient: "vertical",
        zLevel: 5,
        height: "300px",
        top: "center",
        right: "0",
        type: "scroll",
        ...theme.legend,
      },
      yAxis: {
        type: "value",
      },
      series: seriesNames.map((seriesName) => ({
        name: seriesName,
        type: "line",
        data: data.map((item) => item[seriesName]),
      })),
    };
  }, [theme, seriesNames, data]);
  return (
    <ReactECharts
      option={options}
      style={{
        margin: "50px 0",
        height: "500px",
        maxHeight: "600px",
      }}
    />
  );
};

export default VlChart;
