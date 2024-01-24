import React from "react";
import ReactECharts from "echarts-for-react";
import { useSelector } from "react-redux";
const colors = {
  venteF: "red",
  vente: "rgba(244, 62, 62, 0.55)",
  neutre: "var(--text-muted)",
  achat: "#c2f2c2",
  achatF: "#0ea600",
};

function Gauge({ value, title }) {
  console.log("Gauge({ value, title })", value, title);
  const { darkTheme } = useSelector((state) => state.theme);

  const options = {
    series: [
      {
        type: "gauge",
        startAngle: 180,
        endAngle: 0,
        center: ["50%", "75%"],
        radius: "90%",
        min: 0,
        max: 1,
        splitNumber: 10,
        axisLine: {
          lineStyle: {
            width: 6,
            color: [
              [0.2, colors.venteF],
              [0.4, colors.vente],
              [0.6, colors.neutre],
              [0.8, colors.achat],
              [1, colors.achatF],
            ],
          },
        },
        pointer: {
          icon: "path://M12.8,0.7l12,40.1H0.7L12.8,0.7z",
          length: "12%",
          width: 15,
          offsetCenter: [0, "-60%"],
          itemStyle: {
            color: "auto",
          },
        },
        axisTick: {
          length: 2,
          lineStyle: {
            color: "auto",
            width: 1,
          },
        },
        splitLine: {
          length: 10,
          lineStyle: {
            color: "auto",
            width: 5,
          },
        },
        axisLabel: {
          color: darkTheme ? "white" : "black",
          fontSize: 14,
          distance: -40,
          rotate: "tangential",
          formatter: function (value) {
            if (value === 0.1) {
              return "Vente Forte";
            } else if (value === 0.3) {
              return "Vente";
            } else if (value === 0.5) {
              return "Neutre";
            } else if (value === 0.7) {
              return "Achat";
            } else if (value === 0.9) {
              return "Achat Fort";
            }
            return "";
          },
        },
        title: {
          offsetCenter: [0, "-10%"],
          fontSize: 16,
          backgroundColor:
            title === "Achat Fort"
              ? colors.achatF
              : title === "Achat"
              ? colors.achat
              : title === "Vente Forte"
              ? colors.venteF
              : title === "Vente"
              ? colors.vente
              : colors.neutre,
          padding: 13,
          borderRadius: 50,
          color: "white",
        },
        detail: {
          fontSize: 30,
          offsetCenter: [0, "-35%"],
          valueAnimation: true,
          formatter: function (value) {
            return "";
          },
          color: "inherit",
        },
        data: [
          {
            value: value / 100,
            name: title,
          },
        ],
      },
    ],
  };

  return (
    <ReactECharts
      option={options}
      opts={{ renderer: "svg" }}
      style={{ width: "383px", height: "260px" }}
    />
  );
}

export default Gauge;
