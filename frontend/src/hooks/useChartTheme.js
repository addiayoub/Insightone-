import React, { useMemo } from "react";
import { useSelector } from "react-redux";

function useChartTheme() {
  const { darkTheme } = useSelector((state) => state.theme);
  const theme = useMemo(() => {
    return {
      title: {
        textStyle: {
          color: darkTheme ? "white" : "black",
        },
      },
      legend: {
        textStyle: {
          color: darkTheme ? "white" : "black",
        },
      },
      xAxis: {
        nameTextStyle: {
          color: darkTheme ? "white" : "black",
        },
      },
      yAxis: {
        nameTextStyle: {
          color: darkTheme ? "white" : "black",
        },
        splitLine: {
          show: false,
          // lineStyle: {
          //   width: 2,
          //   opacity: 0.05,
          // },
        },
      },
    };
  }, [darkTheme]);
  return theme;
}

export default useChartTheme;
