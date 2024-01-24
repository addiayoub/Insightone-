import React, { useMemo } from "react";
import ReactECharts from "echarts-for-react";
import { gradientPalette } from "../../../utils/generateRandomColorsArray";
import useChartTheme from "../../../hooks/useChartTheme";

const colors = {
  venteF: "red",
  vente: "rgba(244, 62, 62, 0.55)",
  neutre: "var(--text-muted)",
  achat: "#c2f2c2",
  achatF: "#0ea600",
};

const axisLabelFormatter = (value) => {
  switch (value) {
    case 0.1:
      return "Q1";
    case 0.4:
      return "Q2";
    case 0.6:
      return "Q3";
    case 0.9:
      return "Q4";
    default:
      return "";
  }
};

const icon =
  "path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z";

const Guage = ({ value, title }) => {
  const theme = useChartTheme();
  const options = useMemo(() => {
    return {
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
              width: 15,
              color: [
                [0.25, gradientPalette[3]],
                [0.5, gradientPalette[2]],
                [0.75, gradientPalette[1]],
                [1, gradientPalette[0]],
              ],
            },
          },
          pointer: {
            icon,
            length: "50%",
            width: 9,
            offsetCenter: [0, "5%"],
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
            fontSize: 14,
            distance: -40,
            rotate: "tangential",
            formatter: axisLabelFormatter,
            ...theme.xAxis.nameTextStyle,
          },
          title: {
            offsetCenter: [0, "30%"],
            fontSize: 16,
            backgroundColor: gradientPalette[3],
            padding: 10,
            borderRadius: 10,
            color: "white",
          },
          detail: {
            fontSize: 20,
            offsetCenter: [0, "-20%"],
            valueAnimation: true,
            formatter: function (value) {
              return (value * 100).toFixed(2) + "%";
            },
            color: "inherit",
          },
          data: [
            {
              value: Math.abs(value) / 100,
              name: title,
            },
          ],
        },
      ],
    };
  }, [gradientPalette, theme]);
  return (
    <ReactECharts
      option={options}
      opts={{ renderer: "svg" }}
      style={{ width: "383px", height: "260px" }}
    />
  );
};

export default Guage;
