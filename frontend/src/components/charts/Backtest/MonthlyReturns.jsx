import React, { memo, useMemo } from "react";
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

const MonthlyReturns = ({ data, title }) => {
  const theme = useChartTheme();
  const years = useMemo(() => data.map((item) => item.index), [data]);
  const months = useMemo(() => Object.keys(data[0]).slice(1), [data]);
  const heatmapData = useMemo(
    () => transformData(data, months),
    [data, months]
  );
  console.log("heatmapData", heatmapData);
  console.log("MonthlyReturns rendred");
  const values = useMemo(
    () => heatmapData.map((item) => +item[2]),
    [heatmapData]
  );
  console.log(
    "MonthlyReturns values",
    Math.min(...values),
    Math.max(...values)
  );

  const options = useMemo(() => {
    return {
      title: {
        text: title,
        left: "center",
        ...theme.title,
      },
      tooltip: {
        // position: "top",
        formatter: function (params) {
          return `${params.value[0]} - ${params.value[1]} : <strong>${params.value[2]}%</strong>`;
        },
      },
      animation: false,
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
        min: Math.min(...values),
        max: Math.max(...values),
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
  }, [heatmapData, theme, months, years, title, values]);
  return (
    <ReactECharts
      option={options}
      style={{
        height: 500,
      }}
    />
  );
};

export default memo(MonthlyReturns);
