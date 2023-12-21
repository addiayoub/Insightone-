import ReactECharts from "echarts-for-react";
import moment from "moment/moment";
import React from "react";
import useChartTheme from "../../hooks/useChartTheme";
// Evolution base 100 des Portefeuille simulé
function PortefeuilleFrontiere({ data }) {
  console.log("PortefeuilleFrontiere({ data })", data);
  const theme = useChartTheme();
  const all = [
    ...data["df_vl_ptf"],
    ...data["Evolution base 100 des Portefeuille simulé"],
  ];
  console.log(all, "df_vl_ptf");
  const names = [
    ...new Set(
      all.flatMap((obj) => Object.keys(obj).filter((key) => key !== "seance"))
    ),
  ];
  const series = names.map((name) => {
    return {
      name: name,
      itemStyle: {
        color: name.startsWith("ptf") ? "#ccc" : "",
      },
      type: "line",
      data: all.map((item) => item[name]).filter((item) => item !== undefined),
    };
  });
  const options = {
    title: {
      text: "Evolution B100 Portefeuille Frontiere Efficiente",
      left: "center",
      ...theme.title,
    },
    grid: {
      top: "10%",
      bottom: "15%",
      right: "19%",
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
      valueFormatter: (value) => value.toFixed(2),
    },
    dataZoom: [
      {
        type: "slider", // Enable slider data zoom
        show: true,
        xAxisIndex: [0],
        start: 0,
        end: 100,
        // margin: [10, 100, 10, 100],
      },
      {
        type: "inside",
        xAxisIndex: [0],
        start: 0,
        end: 100,
      },
    ],
    xAxis: {
      type: "category",
      data: data["Evolution base 100 des Portefeuille simulé"].map((item) =>
        moment(item.seance).format("DD/MM/YYYY")
      ),
    },
    legend: {
      data: names.map((name) => name),
      orient: "verticaly",
      zLevel: 5,
      top: "center",
      right: "0",
      type: "scroll",
      ...theme.legend,
    },
    yAxis: {
      type: "value",
    },
    series: series,
  };
  return (
    <ReactECharts
      option={options}
      className="my-5"
      style={{
        height: "500px",
        maxHeight: "600px",
      }}
    />
  );
}

export default PortefeuilleFrontiere;
