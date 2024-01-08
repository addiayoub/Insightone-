import React, { useMemo } from "react";
import ReactECharts from "echarts-for-react";
import useChartTheme from "../../../hooks/useChartTheme";

function transformData(data, months) {
  const heatmapData = [];
  data.forEach((item) => {
    months.forEach((month) => {
      heatmapData.push([month, item.index, item[month]?.toFixed(2)]);
    });
  });
  return heatmapData;
}

const MonthlyReturns = ({ data }) => {
  const theme = useChartTheme();
  const years = useMemo(() => data.map((item) => item.index), [data]);
  const months = useMemo(() => Object.keys(data[0]).slice(1), [data]);
  const heatmapData = useMemo(
    () => transformData(data, months),
    [data, months]
  );
  console.log("heatmapData", heatmapData);

  const options = useMemo(() => {
    return {
      title: {
        text: "Monthly Returns (%)",
        left: "center",
        ...theme.title,
      },
      tooltip: {
        // position: "top",
        formatter: function (params) {
          return (
            params.value[0] + " - " + params.value[1] + " : " + params.value[2]
          );
        },
      },
      animation: false,
      // grid: {
      //   height: "50%",
      //   top: "10%",
      // },
      xAxis: {
        type: "category",
        data: months,
        splitArea: {
          show: true,
        },
        axisLabel: {
          ...theme.xAxis.nameTextStyle,
        },
        ...theme.xAxis,
      },
      yAxis: {
        type: "category",
        data: years,
        splitArea: {
          show: true,
        },
        axisLabel: {
          ...theme.xAxis.nameTextStyle,
        },
        ...theme.yAxis,
      },
      visualMap: {
        min: -10,
        max: 10,
        calculable: true,
        calculable: true,
        orient: "vertical",
        right: "0",
        top: "20%",
        inRange: {
          color: [
            "#a50026",
            "#fecc7b",
            "#feea9b",
            "#fffebe",
            "#e8f59f",
            "#9bd469",
            "#0e8245",
          ],
        },
        ...theme.title,
      },
      series: [
        {
          name: "Heatmap Data",
          type: "heatmap",
          data: heatmapData,
          label: {
            show: true,
          },
        },
      ],
    };
  }, [heatmapData, theme, months, years]);
  return (
    <ReactECharts
      option={options}
      style={{
        height: 500,
      }}
    />
  );
};

export default MonthlyReturns;
