import React, { memo, useMemo } from "react";
import { useSelector } from "react-redux";
import LineChart from "../Default/LineChart";

const WorstDrawDowns = ({ data, evolution }) => {
  console.log("WorstDrawDowns", data);
  console.log("Evolu", evolution);
  const { selectedPtf } = useSelector((state) => state.backtest);
  const lineData = useMemo(
    () => evolution.map((item) => item[selectedPtf] * 100),
    [evolution, selectedPtf]
  );
  const xAxisData = useMemo(
    () => evolution.map((item) => item.seance),
    [evolution]
  );
  const marksArea = useMemo(() => {
    return data.map((item) => [
      {
        xAxis: item.Started,
      },
      {
        xAxis: item.Recovered,
      },
    ]);
  }, [data]);
  console.log("marks", marksArea);
  const options = useMemo(() => {
    return {
      title: {
        text: "Worst 5 Drawdowns Periods",
        left: "center",
      },
      grid: {
        right: "100px",
      },
      xAxis: {
        type: "category",
        boundaryGap: true,
        data: xAxisData,
      },
      visualMap: {
        show: false,
        min: 0,
        max: 1,
        inRange: {
          color: ["red", "green"],
        },
      },
      yAxis: {
        axisPointer: {
          snap: true,
        },
      },
      series: [
        {
          name: "",
          type: "line",
          smooth: true,
          data: lineData,
          markArea: {
            itemStyle: {
              color: "rgba(255, 173, 177, 0.4)",
            },
            data: marksArea,
          },
        },
      ],
    };
  }, [lineData, xAxisData, marksArea]);
  return (
    <LineChart
      options={options}
      style={{ minHeight: 500 }}
      saveToExcel={{
        show: true,
        fileName: "Worst 5 Drawdowns Periods",
        data,
      }}
    />
  );
};

export default memo(WorstDrawDowns);
