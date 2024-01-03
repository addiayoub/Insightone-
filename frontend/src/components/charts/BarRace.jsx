import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import ReactECharts from "echarts-for-react";
import { barRaceData } from "../Backtest/BarraceData";
import moment from "moment";
import useChartTheme from "../../hooks/useChartTheme";

function removeObjectsWithZeros(data) {
  return data.filter((item) => {
    const values = Object.values(item).slice(1);
    return values.some((value) => value !== 0);
  });
}

const BarRace = ({ data, title }) => {
  // const data = [
  //   {
  //     seance: "2023-05-12",
  //     "AFRIC INDUSTRIES SA": 3.6,
  //     "AFRIQUIA GAZ": 5,
  //     AGMA: 10,
  //     AKDITAL: 20,
  //     ALLIANCES: 20,
  //     "ALUMINIUM DU MAROC": 0,
  //     "ARADEI CAPITAL": 2,
  //     ATLANTASANAD: 0,
  //     "ATTIJARIWAFA BANK": 50,
  //     "AUTO HALL": 50,
  //     "AUTO NEJMA": 5,
  //     BALIMA: 0,
  //   },
  //   {
  //     seance: "2023-05-13",
  //     "AFRIC INDUSTRIES SA": 3.6,
  //     "AFRIQUIA GAZ": 5,
  //     AGMA: 10,
  //     AKDITAL: 20,
  //     ALLIANCES: 20,
  //     "ALUMINIUM DU MAROC": 1,
  //     "ARADEI CAPITAL": 2,
  //     ATLANTASANAD: 0,
  //     "ATTIJARIWAFA BANK": 50,
  //     "AUTO HALL": 50,
  //     "AUTO NEJMA": 0,
  //     BALIMA: 9,
  //   },
  //   {
  //     seance: "2023-05-19",
  //     "AFRIC INDUSTRIES SA": 0,
  //     "AFRIQUIA GAZ": 3,
  //     AGMA: 4,
  //     AKDITAL: 4,
  //     ALLIANCES: 40,
  //     "ALUMINIUM DU MAROC": 7,
  //     "ARADEI CAPITAL": 10,
  //     ATLANTASANAD: 3,
  //     "ATTIJARIWAFA BANK": 5,
  //     "AUTO HALL": 12,
  //     "AUTO NEJMA": 10,
  //     BALIMA: 5,
  //   },
  // ];
  console.log("render");
  const theme = useChartTheme();
  data = removeObjectsWithZeros(data);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prevStep) => (prevStep + 1) % data.length);
    }, 2300);

    if (currentStep === data.length - 1) {
      console.log("end");
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [data, currentStep]);

  useEffect(() => {}, [currentStep]);

  // Check if we reached the end of the data array
  const getCurrentData = () => {
    return data[currentStep];
  };
  const nonZeroCategories = Object.keys(getCurrentData()).filter(
    (key) => key !== "seance" && getCurrentData()[key] !== 0
  );
  // nonZeroCategories.map((category) => getCurrentData()[category]);
  const currentData = getCurrentData();
  const option = {
    title: {
      text: title,
      left: "center",
      ...theme.title,
    },
    xAxis: {
      type: "value",
      axisLabel: {
        ...theme.xAxis.nameTextStyle, // Set the color to red
      },
    },
    yAxis: {
      type: "category",
      // max: 5,
      // data: Object.keys(currentData).filter((key) => key !== "seance"),
      data: nonZeroCategories,
      axisLabel: {
        ...theme.yAxis.nameTextStyle, // Set the color to red
      },
    },
    grid: {
      left: "15%",
    },
    series: [
      {
        realtimeSort: false,
        seriesLayoutBy: "column",
        type: "bar",
        // data: Object.values(currentData).slice(1),
        data: nonZeroCategories.map((category) => getCurrentData()[category]),
        label: {
          show: true,
          precision: 1,
          position: "right",
          valueAnimation: true,
          fontFamily: "monospace",
          formatter: (params) => params.value.toFixed(2),
        },
      },
    ],
    animationDuration: 0,
    animationDurationUpdate: 1200,
    animationEasing: "linear",
    animationEasingUpdate: "linear",
    graphic: {
      elements: [
        {
          type: "text",
          right: 160,
          bottom: 60,
          style: {
            text: moment(currentData.seance).format("DD/MM/YYYY"),
            font: "bolder 50px monospace",
            // fill: "rgba(100, 100, 100, 0.25)",
            fill:
              theme.title.textStyle.color === "black"
                ? "rgba(100, 100, 100, 0.25)"
                : "rgba(200,200, 200, 200.25)",
          },
          z: 100,
        },
      ],
    },
  };

  return <ReactECharts option={option} style={{ height: "500px" }} />;
};

export default memo(BarRace);
