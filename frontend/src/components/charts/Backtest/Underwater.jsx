import React, { memo, useMemo } from "react";
import ReactECharts from "echarts-for-react";
import useChartTheme from "../../../hooks/useChartTheme";
import { defaultOptions } from "../../../utils/chart/defaultOptions";
import { useSelector } from "react-redux";
import moment from "moment";
import SaveToExcel from "../../SaveToExcel";

const Underwater = ({ data }) => {
  console.log("Underwater data", data);
  const { selectedPtf } = useSelector((state) => state.backtest);
  const theme = useChartTheme();
  const seances = useMemo(
    () => data.map((item) => moment(item.seance).format("DD/MM/YYYY")),
    [data]
  );
  const seriesData = useMemo(
    () => data.map((item) => item[selectedPtf] * 100),
    [data, selectedPtf]
  );
  const average = useMemo(() => data.map((item) => item.Average * 100), [data]);
  const options = useMemo(() => {
    return {
      tooltip: {
        trigger: "axis",
        confine: true,
        valueFormatter: (value) => value?.toFixed(2) + "%",
      },
      title: {
        left: "center",
        text: "Underwater Plot",
        ...theme.title,
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
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: seances,
        axisLabel: {
          ...theme.xAxis.nameTextStyle,
        },
        ...theme.xAxis,
      },
      yAxis: {
        type: "value",
        boundaryGap: [0, "100%"],
        axisLabel: {
          formatter: "{value}%",
          ...theme.yAxis.nameTextStyle,
        },
        ...theme.yAxis,
      },
      series: [
        {
          name: selectedPtf,
          type: "line",
          symbol: "none",
          sampling: "lttb",
          itemStyle: {
            color: "red",
          },
          areaStyle: {
            color: "rgba(237, 45, 45, 0.2)",
          },
          data: seriesData,
        },
        {
          name: "Average",
          type: "line",
          symbol: "none",
          itemStyle: {
            color: "blue",
          },
          // lineStyle: {
          //   type: "dashed", // Set to 'dashed' for a dashed line
          // },
          data: average,
        },
      ],
      ...defaultOptions,
    };
  }, [selectedPtf, seriesData, average, theme, seances, defaultOptions]);
  return (
    <div className="relative">
      <SaveToExcel data={data} fileName={"Underwater Plot"} />
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

export default memo(Underwater);
