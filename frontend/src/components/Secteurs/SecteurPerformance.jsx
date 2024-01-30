import React, { useMemo, memo } from "react";
import ReactECharts from "echarts-for-react";
import { downColor, upColor } from "../../utils/generateRandomColorsArray";
import useChartTheme from "../../hooks/useChartTheme";
import { defaultOptions } from "../../utils/chart/defaultOptions";

const color = (dataArray) => {
  let result = [];
  const values = [];
  dataArray.map((item) => values.push((item.Rdt_cum * 100).toFixed(2)));
  values
    .sort((a, b) => a - b)
    .map((value) => {
      if (value < 0) {
        result.push({
          value,
          itemStyle: { color: upColor },
        });
      } else {
        result.push({
          value,
          itemStyle: { color: downColor },
        });
      }
    });
  console.log(result);
  return result;
};

function SecteurPerformance({ data, height = "400px" }) {
  console.log("Last seance", data);

  const theme = useChartTheme();

  const yAxisValues = useMemo(
    () => data.map((item) => item.nom_indice),
    [data]
  );
  const options = useMemo(() => {
    return {
      title: {
        text: "Performance Secteur",
        left: "center",

        ...theme.title,
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
        ...defaultOptions.tooltip,
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "value",
          splitLine: {
            show: false,
          },
          axisLabel: {
            ...theme.xAxis.nameTextStyle,
          },
          ...theme.xAxis,
        },
      ],
      yAxis: [
        {
          type: "category",
          axisTick: {
            show: false,
          },
          data: yAxisValues,
          axisLabel: {
            ...theme.yAxis.nameTextStyle,
          },
          ...theme.yAxis,
        },
      ],
      toolbox: {
        feature: {
          dataZoom: {
            yAxisIndex: "none",
          },
          restore: {},
          saveAsImage: {},
        },
      },
      series: [
        {
          name: "",
          type: "bar",
          label: {
            show: false,
          },
          emphasis: {
            focus: "series",
          },
          data: color(data),
        },
      ],
    };
  }, [data, yAxisValues, theme, defaultOptions]);
  return <ReactECharts option={options} style={{ height }} />;
}

export default memo(SecteurPerformance);
