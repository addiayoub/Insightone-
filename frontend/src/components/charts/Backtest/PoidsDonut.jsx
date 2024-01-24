import React, { useMemo } from "react";
import ReactECharts from "echarts-for-react";
import useChartTheme from "../../../hooks/useChartTheme";

const PoidsDonut = ({ data, title, field }) => {
  const seriesData = data.map((item) => ({
    name: item.titre,
    value: item[field],
  }));
  const theme = useChartTheme();
  const options = useMemo(() => {
    return {
      title: {
        text: title,
        left: "center",
        ...theme.title,
      },
      tooltip: {
        trigger: "item",
        confine: true,
        valueFormatter: (value) => value?.toFixed(2) + "%",
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
        bottom: "10%",
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
  }, [seriesData, theme]);
  return (
    <ReactECharts
      option={options}
      style={{
        // height: "500px",
        // maxHeight: "600px",
        // margin: "15px 0 40px",
        width: "400px",
      }}
    />
  );
};

export default PoidsDonut;
