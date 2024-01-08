import ReactECharts from "echarts-for-react";
import React from "react";
import useChartTheme from "../../hooks/useChartTheme";

const calculateChartHeight = (array) => {
  let height = "300px";
  if (array.length > 30) {
    height = "1200px";
  } else if (array.length > 10) {
    height = "500px";
  }
  return height;
};
const transformCorrelationDataForHeatmap = (data, companies) => {
  const heatmapData = companies
    .map((company1, rowIndex) => {
      return companies.map((company2, colIndex) => {
        return [colIndex, rowIndex, +data[rowIndex][company2].toFixed(2)];
      });
    })
    .flat();

  return heatmapData;
};
function Heatmap({ data }) {
  const companies = data.map((item) => item.index);
  const theme = useChartTheme();

  const correlationHeatmapData = transformCorrelationDataForHeatmap(
    data,
    companies
  );
  console.log("correlationHeatmapData", correlationHeatmapData);
  const option = {
    title: {
      text: "",
    },
    tooltip: {
      position: "top",
      formatter: (params) => {
        const xAxisName = companies[params.data[0]];
        const yAxisName = companies[params.data[1]];
        const value = params.data[2];
        return `${xAxisName} - ${yAxisName}<br/>Valeur: ${value}`;
      },
    },
    animation: true,
    grid: {
      height: "100%",
      bottom: "5%",
      top: "0%",
      left: "5%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: companies,
      axisLabel: {
        rotate: 90,
        interval: 0,
        fontSize: 12,
        ...theme.xAxis.nameTextStyle,
      },
      splitArea: {
        show: true,
      },
    },
    yAxis: {
      type: "category",
      data: companies,
      splitArea: {
        show: true,
      },
      axisLabel: {
        interval: 0,
        margin: 10,
        fontWeight: "bold",
        ...theme.yAxis.nameTextStyle,
      },
    },
    visualMap: {
      min: -1,
      max: 1,
      calculable: true,
      orient: "vertical",
      right: "0",
      top: "30%",
      inRange: {
        color: [
          "#fae8d8",
          "#f6bb97",
          "#f5966c",
          "#f16445",
          "#ba1656",
          "#541e4e",
          "#0e0b22",
        ],
      },
    },
    series: [
      {
        name: "Correlation",
        type: "heatmap",
        data: correlationHeatmapData,
        label: {
          show: false,
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };
  return (
    <>
      <ReactECharts
        option={option}
        notMerge={true}
        lazyUpdate={true}
        style={{
          minHeight: calculateChartHeight(companies),
          height: "100%",
          width: "100%",
        }}
        opts={{ renderer: "svg" }}
      />
    </>
  );
}

export default Heatmap;
