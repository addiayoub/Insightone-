import React, { memo, useMemo } from "react";
import ReactECharts from "echarts-for-react";
import useChartTheme from "../../../hooks/useChartTheme";
import { useSelector } from "react-redux";

const ContribChart = ({ data }) => {
  console.log("ContribChart rendered", data);
  const { selectedPtf } = useSelector((state) => state.backtest);
  console.log("selectedPtf", selectedPtf);

  const titles = useMemo(() => data.map((item) => item.titre), [data]);
  const seriesData = useMemo(() => {
    const values = data.map((item) => item[selectedPtf] * 100);
    values.sort((a, b) => a - b);
    return values.map((value) => ({
      value,
      itemStyle: {
        color: value < 0 ? "#ee4658" : "#21cc6d",
      },
    }));
  }, [data, selectedPtf]);
  const theme = useChartTheme();
  const options = useMemo(() => {
    return {
      title: {
        text: "Contribution",
        left: "center",
        ...theme.title,
      },
      grid: {
        right: "100px",
        top: "10%",
        bottom: "15%",
        containLabel: true,
      },
      tooltip: {
        confine: true,
        valueFormatter: (value) => value?.toFixed(2) + "%",
      },
      xAxis: {
        type: "value",
        axisLabel: {
          hideOverlap: true,
          ...theme.yAxis.nameTextStyle,
        },
        ...theme.yAxis,
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
      yAxis: {
        type: "category",
        data: titles,
        axisLabel: {
          ...theme.yAxis.nameTextStyle,
        },
        ...theme.yAxis,
      },
      series: [
        {
          type: "bar",
          show: true,
          position: "insideRight",
          data: seriesData,
        },
      ],
    };
  }, [seriesData, theme]);

  return (
    <ReactECharts
      option={options}
      style={{
        height: "500px",
      }}
      className="my-[15px]"
    />
  );
};

export default memo(ContribChart);
