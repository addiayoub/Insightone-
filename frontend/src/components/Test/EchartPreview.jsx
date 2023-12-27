import React, { memo, useEffect, useMemo, useState } from "react";
import ReactECharts from "echarts-for-react";
import moment from "moment";
import useChartTheme from "../../hooks/useChartTheme";
import { formatNumberWithSpaces } from "../../utils/formatNumberWithSpaces";

const formatData = (data) => {
  const seriesData = [];
  for (const key in data) {
    seriesData.push({
      name: key,
      type: "line",
      data: data[key].map((item) => ({
        // name: moment(item.SEANCE).format("DD-MM-YYYY"),
        value: [moment(item.SEANCE).valueOf(), item.Cours_Ajuste],
      })),
      showSymbol: false,
    });
  }
  return seriesData;
};

const EChartsPreview = ({ data }) => {
  const seriesData = useMemo(() => formatData(data), [data]);
  const theme = useChartTheme();
  console.log("e preview data", data);

  const options = useMemo(() => {
    return {
      title: {
        text: "Evolution du cours des titres sélectionnés",
        ...theme.title,
        left: "left",
      },
      xAxis: {
        type: "time",
        axisLabel: {
          formatter: function (value) {
            return moment(value).format("DD-MM-YYYY");
          },
          hideOverlap: true,
        },
      },
      legend: {
        bottom: "0%",
        orient: "horizontal",
        type: "scroll",
        width: "80%",
        ...theme.legend,
      },
      yAxis: {
        type: "value",
        name: "Valeur Ajuste",
        nameLocation: "middle",
        nameGap: 50,
        ...theme.yAxis,
      },
      series: seriesData,
      tooltip: {
        valueFormatter: (value) => formatNumberWithSpaces(value),
        trigger: "axis",
        axisPointer: {
          type: "line",
          label: {
            show: false,
            formatter: function (params) {
              return moment(params.value).format("DD-MM-YYYY");
            },
          },
        },
      },
      dataZoom: [
        {
          type: "inside",
          start: 0,
          end: 100,
        },
        {
          show: true,
          type: "slider",
          top: "85%",
          start: 0,
          end: 100,
        },
      ],
      grid: {
        left: "50px",
        right: "80px",
        bottom: "15%",
        top: "10%",
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
    };
  }, [theme, seriesData]);
  return (
    <ReactECharts
      option={options}
      style={{
        minHeight: 500,
      }}
      key={JSON.stringify(options)}
    />
  );
};

export default memo(EChartsPreview);
