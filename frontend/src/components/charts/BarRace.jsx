import React, { useEffect, useRef, useState } from "react";
import ReactECharts from "echarts-for-react";

const BarRace = () => {
  const updateFrequency = 1000;
  const dimension = 0;

  const data = [
    ["Income", "Life Expectancy", "Population", "Country", "Year"],
    [815, 34.05, 351014, "Australia", 1800],
    [1314, 39, 645526, "Canada", 1800],
    [985, 32, 321675013, "China", 1800],
    [864, 32.2, 345043, "Cuba", 1800],
    [1244, 36.5731262, 977662, "Finland", 1800],
    [1803, 33.96717024, 29355111, "France", 1800],
    [1639, 38.37, 22886919, "Germany", 1800],
    [926, 42.84559912, 61428, "Iceland", 1800],
    [1052, 25.4424, 168574895, "India", 1800],
    [1050, 36.4, 30294378, "Japan", 1800],
    [579, 26, 4345000, "North Korea", 1800],
    [576, 25.8, 9395000, "South Korea", 1800],
    [658, 34.05, 100000, "New Zealand", 1800],
    [1278, 37.91620899, 868570, "Norway", 1800],
    [1213, 35.9, 9508747, "Poland", 1800],
    [1430, 29.5734572, 31088398, "Russia", 1800],
    [1221, 35, 9773456, "Turkey", 1800],
    [3431, 38.6497603, 12327466, "United Kingdom", 1800],
    [2128, 39.41, 6801854, "United States", 1800],
    [834, 34.05, 342440, "Australia", 1810],
    [1400, 39.01496774, 727603, "Canada", 1810],
    [985, 32, 350542958, "China", 1810],
    [970, 33.64, 470176, "Cuba", 1810],
    [1267, 36.9473378, 1070625, "Finland", 1810],
  ];
  const years = [];
  for (let i = 1; i < data.length; ++i) {
    if (years.length === 0 || years[years.length - 1] !== data[i][4]) {
      years.push(data[i][4]);
    }
  }
  let startIndex = 0;
  let startYear = years[startIndex];
  const options = {
    grid: {
      top: 10,
      bottom: 30,
      left: 150,
      right: 80,
    },
    xAxis: {
      max: "dataMax",
      axisLabel: {
        formatter: function (n) {
          return Math.round(n) + "";
        },
      },
    },
    dataset: {
      source: data.slice(1).filter(function (d) {
        return d[4];
      }),
    },
    yAxis: {
      type: "category",
      inverse: true,
      max: 10,
      axisLabel: {
        show: true,
        fontSize: 14,
        rich: {
          flag: {
            fontSize: 25,
            padding: 5,
          },
        },
      },
      animationDuration: 300,
      animationDurationUpdate: 300,
    },
    series: [
      {
        realtimeSort: true,
        seriesLayoutBy: "column",
        type: "bar",
        itemStyle: {
          color: function (param) {
            return "#5470c6";
          },
        },
        encode: {
          x: dimension,
          y: 3,
        },
        label: {
          show: true,
          precision: 1,
          position: "right",
          valueAnimation: true,
          fontFamily: "monospace",
        },
      },
    ],
    // Disable init animation.
    animationDuration: 0,
    animationDurationUpdate: updateFrequency,
    animationEasing: "linear",
    animationEasingUpdate: "linear",
    graphic: {
      elements: [
        {
          type: "text",
          right: 160,
          bottom: 60,
          style: {
            // text: 2000,
            text: startYear,
            font: "bolder 80px monospace",
            fill: "rgba(100, 100, 100, 0.25)",
          },
          z: 100,
        },
      ],
    },
  };
  const [opts, setOpts] = useState(options);
  // useEffect(() => {
  //   console.log("years", years);
  //   for (let i = startIndex; i < years.length - 1; ++i) {
  //     (function (i) {
  //       setTimeout(function () {
  //         updateYear(years[i + 1]);
  //       }, (i - startIndex) * updateFrequency);
  //     })(i);
  //   }
  // }, []);

  useEffect(() => {
    console.log("Options", opts);
  }, [opts]);
  for (let i = startIndex; i < years.length - 1; ++i) {
    (function (i) {
      console.log("i for i in", years.length - 1);
      setTimeout(function () {
        updateYear(years[i + 1]);
      }, (i - startIndex) * updateFrequency);
    })(i);
  }
  function updateYear(year) {
    let source = data.slice(1).filter(function (d) {
      return d[4];
    });
    options.series[0].data = source;
    options.graphic.elements[0].style.text = year;
    console.log(
      "year",
      year,
      " options.series[0].data = source",
      options.series[0].data,
      source
    );
    setOpts(options);
  }
  return (
    <ReactECharts
      option={opts}
      style={{
        height: "500px",
        maxHeight: "600px",
      }}
    />
  );
};

export default BarRace;
