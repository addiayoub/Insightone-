import React, { useMemo } from "react";
import ScatterChart from "../../Default/ScatterChart";

const data = [
  {
    Returns: 0.05686491109070884,
    Volatility: 0.14246900131356208,
    "Sharpe Ratio": 0.39913883417736634,
    "Portfolio Weights": "[0.11794441 0.47568119 0.40637441]",
  },
  {
    Returns: 0.04711655742757484,
    Volatility: 0.14633939437059396,
    "Sharpe Ratio": 0.32196769455158164,
    "Portfolio Weights": "[0.47135545 0.43884419 0.08980036]",
  },
  {
    Returns: 0.05330256255030398,
    Volatility: 0.13916748741850032,
    "Sharpe Ratio": 0.3830101666635261,
    "Portfolio Weights": "[0.45968889 0.18041091 0.3599002 ]",
  },
  {
    Returns: 0.04399229864246504,
    Volatility: 0.15527907406871994,
    "Sharpe Ratio": 0.28331118604555766,
    "Portfolio Weights": "[0.6944293  0.28148083 0.02408986]",
  },
  {
    Returns: 0.054230371051375556,
    Volatility: 0.14193134556181425,
    "Sharpe Ratio": 0.3820887545081226,
    "Portfolio Weights": "[0.17154661 0.52127822 0.30717517]",
  },
  {
    Returns: 0.047379308487009934,
    Volatility: 0.1457872398980618,
    "Sharpe Ratio": 0.32498940593249975,
    "Portfolio Weights": "[0.60246851 0.25341303 0.14411847]",
  },
  {
    Returns: 0.04781782360309596,
    Volatility: 0.14410386729699098,
    "Sharpe Ratio": 0.33182887107773296,
    "Portfolio Weights": "[0.5510315  0.30217936 0.14678913]",
  },
  {
    Returns: 0.04818153606131848,
    Volatility: 0.14348620842648002,
    "Sharpe Ratio": 0.33579210566432877,
    "Portfolio Weights": "[0.46428729 0.40105932 0.13465339]",
  },
];

const formatData = (data) => {
  return data.map((item) => [
    item["Volatility"],
    item["Returns"],
    item["Sharpe Ratio"],
  ]);
};

const getSeriesData = (data) => {
  data = formatData(data);
  return data.map(([x, y, z], index) => ({
    type: "scatter",
    symbol: "circle",
    symbolSize: 6,
    data: [[x, y, z]],
    z: 0,
  }));
};

// // Max Sharpe Ratio
// const redStar = {
//   type: "effectScatter",
//   data: [
//     {
//       value: [0.145543, 0.06039],
//       symbol: "circle",
//       symbolSize: 20,
//       itemStyle: {
//         color: "red", // You can specify the color of the circle
//       },
//       zLevel: 5,
//     },
//   ],
// };
// // MIN VOLATILITY:
// const blueStar = {
//   type: "effectScatter",
//   data: [
//     {
//       value: [0.147263, 0.05367],
//       symbol: "circle",
//       symbolSize: 20,
//       itemStyle: {
//         color: "blue", // You can specify the color of the circle
//       },
//       zLevel: 5,
//     },
//   ],
// };

const starsSeries = (data, color) => {
  const key = Object.keys(data[0]).filter((key) => key !== "index")[0];
  console.log("value key", key);
  return {
    type: "effectScatter",
    data: [
      {
        value: [data[1][key], data[0][key], data[2][key]],
        symbol: "circle",
        symbolSize: 20,
        itemStyle: {
          color,
        },
      },
    ],
    z: 1,
  };
};

const ReturnsRiskScatter = ({ data, maxSharpe, minVola }) => {
  console.log(
    "MinVOla: ",
    minVola,
    "maxSharpe",
    maxSharpe,
    "keys",
    Object.keys(maxSharpe[0])
  );
  const series = useMemo(() => getSeriesData(data), [data]);
  const yMin = Math.min(...data.map((item) => +item.Returns.toFixed(3)));
  const xMin = Math.min(...data.map((item) => +item.Volatility.toFixed(3)));

  // Max Sharpe Ratio
  const blueStar = useMemo(() => starsSeries(maxSharpe, "red"), [maxSharpe]);
  // Min Volatility
  const redStar = useMemo(() => starsSeries(minVola, "blue"), [minVola]);

  const visualMap = data.map((item) => +item["Sharpe Ratio"].toFixed(3));
  const options = useMemo(() => {
    return {
      title: {
        text: "Portfolio Returns Vs. Risk",
        left: "center",
        top: 0,
      },
      tooltip: {
        formatter: function (params) {
          const { value } = params;
          return `Returns: ${value[1].toFixed(
            3
          )}<br /> Volatilité: ${value[0].toFixed(3)}
          `;
          // <br /> Sharpe Ratio: ${value[2].toFixed(3)
        },
      },
      xAxis: { min: xMin, name: "Volatilité" },
      yAxis: { min: yMin, name: "Returns" },
      visualMap: {
        min: Math.min(...visualMap),
        max: Math.max(...visualMap),
        dimension: 2,
        orient: "vertical",
        right: 0,
        top: "center",
        calculable: true,
        inRange: {
          // color: ["#f2c31a", "#24b7f2"],
          color: ["#ee4658", "#444ce7"],
        },
        label: {
          show: false,
        },
      },
      series: [...series, redStar, blueStar],
    };
  }, [series]);
  return <ScatterChart options={options} />;
};

export default ReturnsRiskScatter;
