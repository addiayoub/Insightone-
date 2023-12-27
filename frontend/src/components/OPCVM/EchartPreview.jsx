import React, { useMemo } from "react";
import ReactECharts from "echarts-for-react";
import moment from "moment";
import { formatNumberWithSpaces } from "../../utils/formatNumberWithSpaces";
import useChartTheme from "../../hooks/useChartTheme";

const EChartsPreview = ({ data }) => {
  const theme = useChartTheme();
  const seriesData = useMemo(
    () =>
      Object.entries(data).map(([key, items]) => ({
        name: key,
        type: "line",
        data: items.map((item) => [
          moment(item.Date_VL).valueOf(),
          item.VL_AJUSTE,
        ]),
        showSymbol: false,
      })),
    [data]
  );
  const options = useMemo(() => {
    return {
      title: {
        text: "Evolution du volume des titres sélectionnés",
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
      yAxis: {
        type: "value",
        nameLocation: "middle",
        nameGap: 50,
        name: "Volume Ajuste",
        ...theme.yAxis,
      },
      legend: {
        bottom: "0%",
        orient: "horizontal",
        type: "scroll",
        width: "80%",
        ...theme.legend,
      },
      series: seriesData,
      tooltip: {
        trigger: "axis",
        valueFormatter: (value) => formatNumberWithSpaces(value),
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
  }, [seriesData, theme]);

  return (
    <ReactECharts
      option={options}
      style={{ minHeight: 500 }}
      key={JSON.stringify(options)}
    />
  );
};

export default EChartsPreview;
