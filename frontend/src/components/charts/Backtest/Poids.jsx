import React, { memo, useMemo } from "react";
import ReactECharts from "echarts-for-react";
import useChartTheme from "../../../hooks/useChartTheme";
import moment from "moment";
import { generateRandomColorsArray } from "../../../utils/generateRandomColorsArray";
import SaveToExcel from "../../SaveToExcel";
import { defaultOptions } from "../../../utils/chart/defaultOptions";
import useSeriesSelector from "../../../hooks/useSeriesSelector";

const Poids = ({ data }) => {
  const seriesNames = useMemo(
    () =>
      Object.keys(data[0]).filter((key) => {
        console.log(key !== "seance");
        return !["PTF", "seance"].includes(key);
      }),
    [data]
  );

  const theme = useChartTheme();
  console.log("seriesname", seriesNames);
  const colors = useMemo(
    () => generateRandomColorsArray(seriesNames.length),
    [seriesNames.length]
  );
  const { selectedLegend, SeriesSelector } = useSeriesSelector(seriesNames);
  const options = useMemo(() => {
    return {
      color: colors,
      title: {
        text: "",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#6a7985",
          },
        },
        confine: true,
        valueFormatter: (value) => value?.toFixed(2),
      },
      legend: {
        type: "scroll",
        orient: "horizontal",
        zLevel: 23,
        width: "60%",
        left: "center",
        bottom: "9%",
        selected: selectedLegend,
        ...theme.legend,
      },
      toolbox: {
        feature: {
          dataZoom: {
            yAxisIndex: true,
          },
          restore: {},
          saveAsImage: {},
          dataView: {},
        },
        top: "20px",
      },
      grid: {
        right: "100px",
        top: "10%",
        // right: "3%",
        bottom: "15%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          data: data.map((item) => moment(item.seance).format("DD/MM/YYYY")),
          axisLabel: {
            ...theme.yAxis.nameTextStyle,
          },
          ...theme.yAxis,
        },
      ],
      yAxis: [
        {
          type: "value",
          axisLabel: {
            ...theme.yAxis.nameTextStyle,
          },
          ...theme.yAxis,
        },
      ],
      series: seriesNames.map((serieName) => {
        return {
          name: serieName,
          type: "line",
          stack: "Total",
          smooth: true,
          lineStyle: {
            width: 0,
          },
          showSymbol: true,
          areaStyle: {
            opacity: 0.8,
          },
          emphasis: {
            focus: "series",
          },
          data: data.map((item) => item[serieName]),
        };
      }),
      ...defaultOptions,
    };
  }, [theme, seriesNames, selectedLegend, data, defaultOptions, colors]);
  return (
    <div className="relative">
      <SaveToExcel data={data} fileName="Poids" />
      <SeriesSelector />
      <ReactECharts
        option={options}
        style={{
          height: "500px",
          maxHeight: "600px",
          margin: "15px 0 40px",
        }}
      />
    </div>
  );
};

export default memo(Poids);
