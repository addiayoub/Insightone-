import ReactECharts from "echarts-for-react";
import React, { memo, useMemo } from "react";
import { transformData } from "../../utils/dataTransformation";
import { formatNumberWithSpaces } from "../../utils/formatNumberWithSpaces";
import { formatDate } from "../../utils/FormatDate";
import useChartTheme from "../../hooks/useChartTheme";

function VolumeEchange({ chartData }) {
  const data = useMemo(() => transformData(chartData), [chartData]);
  console.log("VolumeEchange");
  const theme = useChartTheme();
  const options = useMemo(() => {
    return {
      grid: {
        top: "10%",
        left: "3%",
        right: "3%",
        bottom: "20%",
        containLabel: true,
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          crossStyle: {
            color: "#999",
          },
        },
      },
      toolbox: {
        feature: {
          dataView: { show: false, readOnly: false },
          magicType: { show: false, type: ["line", "bar"] },
          restore: { show: true },
          dataZoom: {
            yAxisIndex: false,
          },
          saveAsImage: { show: true },
        },
      },
      title: {
        text: "Volume échangé hebdomadaire",
        left: "center",
        ...theme.title,
      },
      legend: {
        data: [
          "Volume Marché de blocs",
          "Volume Marché central",
          "Volume moyen YTD",
          "Volume moyen 1AN",
        ],
        ...theme.legend,
        orient: "horizontal",
        bottom: "10%",
      },
      xAxis: [
        {
          type: "category",
          data: data.seance.map((item) => formatDate(item)),
          axisPointer: {
            type: "shadow",
          },
        },
      ],
      dataZoom: [
        {
          type: "slider",
          xAxisIndex: 0,
          start: chartData.length > 5 ? 99.9 : 0,
          end: 100,
        },
      ],
      yAxis: {
        type: "value",
        axisLabel: {
          formatter: function (value) {
            const val = (value / 1e6).toFixed(2);
            return formatNumberWithSpaces(val) + " MMAD";
          },
        },
      },
      series: [
        {
          name: "Volume Marché de blocs",
          type: "bar",
          data: data.Volume_MB,
          tooltip: {
            valueFormatter: function (value) {
              const val = (value / 1e6).toFixed(2);
              return formatNumberWithSpaces(val);
            },
          },
        },
        {
          name: "Volume Marché central",
          type: "bar",
          data: data.Volume_MC,
          tooltip: {
            valueFormatter: function (value) {
              const val = (value / 1e6).toFixed(2);
              return formatNumberWithSpaces(val);
            },
          },
        },
        {
          name: "Volume moyen YTD",
          type: "line",
          data: data.moyen_volume_ytd,
          tooltip: {
            valueFormatter: function (value) {
              const val = (value / 1e6).toFixed(2);
              return formatNumberWithSpaces(val);
            },
          },
        },
        {
          name: "Volume moyen 1AN",
          type: "line",
          data: data.moyen_volume_1an,
          tooltip: {
            valueFormatter: function (value) {
              const val = (value / 1e6).toFixed(2);
              return formatNumberWithSpaces(val);
            },
          },
        },
      ],
    };
  }, [data, theme]);
  return (
    <ReactECharts option={options} style={{ height: "500px", width: "100%" }} />
  );
}

export default memo(VolumeEchange);
