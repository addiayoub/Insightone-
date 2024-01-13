import React, { memo, useMemo } from "react";
import ReactECharts from "echarts-for-react";
import useChartTheme from "../../../hooks/useChartTheme";
import { useSelector } from "react-redux";

const ContribChart = ({ data }) => {
  console.log("ContribChart rendered", data);
  const { selectedPtf } = useSelector((state) => state.backtest);
  console.log("selectedPtf", selectedPtf);

  const titles = useMemo(() => data.map((item) => item.titre), [data]);
  console.log(
    "negative values",
    data.map((item) => item[selectedPtf] * 100)
  );
  const seriesData = useMemo(() => {
    const values = data
      .map((item) => ({
        name: item.titre,
        value: item.contrib_ptf,
      }))
      .filter((ele) => Math.abs(ele.value) > 0.01);
    values.sort((a, b) => a.value - b.value);
    return values.map(({ name, value }) => ({
      name,
      value,
      itemStyle: {
        color: value < 0 ? "#ee4658" : "#21cc6d",
      },
    }));
  }, [data, selectedPtf]);
  console.log("seriesData", seriesData);
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
        top: "50px",
        containLabel: true,
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // type: "cross",
          crossStyle: {
            color: "#999",
          },
        },
        confine: true,
        valueFormatter: (value) => value?.toFixed(2) + "%",
      },
      xAxis: {
        type: "value",
        axisPointer: {
          type: "shadow",
        },
        axisLabel: {
          hideOverlap: true,
          ...theme.yAxis.nameTextStyle,
        },
        ...theme.yAxis,
      },
      toolbox: {
        feature: {
          dataZoom: {
            yAxisIndex: false,
          },
          restore: {},
          saveAsImage: {},
        },
        top: "20px",
      },
      yAxis: {
        type: "category",
        data: seriesData.map((item) => item.name),
        splitArea: {
          show: true,
        },
        axisPointer: {
          type: "shadow",
        },
        axisLabel: {
          // hideOverlap: true,
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
  const chartHeight = seriesData.length * 15 + 200;
  return (
    <ReactECharts
      option={options}
      style={{
        height: chartHeight,
      }}
      className="my-[15px]"
    />
  );
};

export default memo(ContribChart);
