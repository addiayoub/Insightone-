import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import ReactECharts from "echarts-for-react";
import useChartTheme from "../../../hooks/useChartTheme";

const SMIPoids = ({ SIM }) => {
  const {
    generationPtfAlea: { df_poids },
  } = useSelector((state) => state.tracking);
  console.log("df_poids", df_poids, SIM);
  const theme = useChartTheme();
  const seriesData = useMemo(
    () =>
      df_poids.map((item) => ({
        value: item[SIM] * 100,
        name: item.titre,
      })),
    [df_poids, SIM]
  );
  const options = {
    title: {
      text: SIM,
      left: "center",
      ...theme.title,
    },
    tooltip: {
      trigger: "item",
      valueFormatter: (value) => value?.toFixed(2) + "%",
      confine: true,
    },
    toolbox: {
      feature: {
        restore: {},
        saveAsImage: {},
        dataView: {},
      },
      right: 0,
      top: 15,
    },
    legend: {
      type: "scroll",
      orient: "horizontal",
      zLevel: 23,
      width: "60%",
      left: "center",
      bottom: "0",
      ...theme.legend,
    },
    grid: {
      top: "0%",
    },
    series: [
      {
        name: "",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 15,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: seriesData,
      },
    ],
  };
  return (
    <>
      <ReactECharts
        option={options}
        style={{
          height: 400,
          width: 500,
          // maxWidth: 500,
        }}
      />
    </>
  );
};

export default SMIPoids;
