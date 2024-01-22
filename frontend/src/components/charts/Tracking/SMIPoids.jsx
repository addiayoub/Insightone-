import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import ReactECharts from "echarts-for-react";
import useChartTheme from "../../../hooks/useChartTheme";

const SMIPoids = ({ SMI }) => {
  const {
    generationPtfAlea: { df_poids },
  } = useSelector((state) => state.tracking);
  console.log("df_poids", df_poids, SMI);
  const theme = useChartTheme();
  const seriesData = useMemo(
    () =>
      df_poids.map((item) => ({
        value: item[SMI],
        name: item.indice,
      })),
    [df_poids, SMI]
  );
  const options = {
    title: {
      text: SMI,
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
          height: 500,
          width: 500,
          // maxWidth: 500,
          margin: "25px auto",
        }}
      />
    </>
  );
};

export default SMIPoids;
