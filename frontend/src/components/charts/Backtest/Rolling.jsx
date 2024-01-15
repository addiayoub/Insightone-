import React, { memo, useMemo } from "react";
import ReactECharts from "echarts-for-react";
import useChartTheme from "../../../hooks/useChartTheme";
import { defaultOptions } from "../../../utils/chart/defaultOptions";
import moment from "moment";
import SaveToExcel from "../../SaveToExcel";

const Rolling = ({ data, title }) => {
  const theme = useChartTheme();
  console.log("Render Rolling ", title);
  const seriesNames = useMemo(
    () => Object.keys(data[0]).filter((key) => key !== "seance"),
    [data]
  );

  const options = useMemo(() => {
    return {
      title: {
        text: title,
        left: "center",
        ...theme.title,
      },
      grid: {
        right: "100px",
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
        data: data.map((item) => moment(item.seance).format("DD/MM/YYYY")),
        axisLabel: {
          ...theme.xAxis.nameTextStyle,
        },
        ...theme.yAxis,
      },
      legend: {
        data: seriesNames,
        orient: "horizontal",
        zLevel: 23,
        width: "60%",
        left: "center",
        bottom: "9%",
        type: "scroll",
        ...theme.legend,
      },
      yAxis: {
        type: "value",
        axisLabel: {
          ...theme.yAxis.nameTextStyle,
        },
        ...theme.xAxis,
      },
      series: seriesNames.map((serieName) => ({
        name: serieName,
        type: "line",
        symbol: "none",
        data: data.map((item) =>
          item[serieName] === 0 ? null : item[serieName]
        ),
      })),
      ...defaultOptions,
    };
  }, [defaultOptions, theme, seriesNames, data]);

  return (
    <div className="relative">
      <SaveToExcel data={data} fileName={title} />
      <ReactECharts
        option={options}
        style={{
          minHeight: 500,
          margin: "15px 0",
        }}
      />
    </div>
  );
};

export default memo(Rolling);
