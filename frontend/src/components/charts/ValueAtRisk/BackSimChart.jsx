import React, { memo, useMemo } from "react";
import moment from "moment";
import LineChart from "../Default/LineChart";
import { rangeOpts } from "../../../utils/chart/defaultOptions";
import { getLastItemWithFilter } from "../../../utils/getLastItem";

const seriesData = (data) => {
  const seances = data.map((item) => moment(item.seance).format("DD/MM/YYYY"));
  const mean = data.map((item) => item.mean);
  const min = data.map((item) => item.min);
  const max = data.map((item) => item.max);
  const range = Array.from({ length: min.length }, (_, index) =>
    Math.abs(max[index] - min[index])
  );
  const marksArea = data.map((item) => [
    {
      xAxis: item.Started,
    },
    {
      xAxis: item.Recovered,
    },
  ]);
  return { seances, mean, min, max, range };
};

const getMarksArea = (data, forSim) => {
  const type = forSim ? "MC Simulation" : "Backtest";
  const color = forSim ? "rgba(48, 198, 63,0.11)" : "rgba(204,204,204,0.2)";
  const condition = (item) => item.label === type;
  const { seance: start } = data.find(condition);
  const { seance: end } = getLastItemWithFilter(data, condition);
  const marksArea = {
    z: -1,
    itemStyle: {
      color,
    },
    data: [
      [
        {
          name: type,
          xAxis: moment(start).format("DD/MM/YYYY"),
        },
        {
          xAxis: moment(end).format("DD/MM/YYYY"),
        },
      ],
    ],
  };
  return marksArea;
};

const BackSimChart = ({ data }) => {
  console.log("BackSimChart", data);
  console.log("getMarks", getMarksArea(data));
  const { seances, mean, max, min, range } = useMemo(
    () => seriesData(data),
    [data]
  );
  const options = useMemo(() => {
    return {
      xAxis: {
        type: "category",
        data: seances,
      },
      grid: {
        top: "15%",
      },
      yAxis: { type: "value", max: "dataMax", min: "dataMin" },
      series: [
        {
          name: "Mean",
          type: "line",
          symbol: "none",
          data: mean,
          itemStyle: { color: "red " },
          lineStyle: {
            type: "dashed",
            color: "red",
          },
          markArea: getMarksArea(data),
        },
        {
          name: "Min",
          type: "line",
          stack: "Min",
          symbol: "none",
          data: min,
          itemStyle: { color: "rgba(204,204,204,0.9)" },
          lineStyle: { color: "rgba(204,204,204,0.9)" },
          markArea: getMarksArea(data, true),
        },
        ,
        {
          name: "Max",
          type: "line",
          symbol: "none",
          data: max,
          itemStyle: { color: "rgba(204,204,204,0.9)" },
          lineStyle: { color: "rgba(204,204,204,0.9)" },
        },
        {
          ...rangeOpts,
          data: range,
        },
      ],
    };
  }, [seances, mean, min, max, range, rangeOpts]);
  return (
    <LineChart
      options={options}
      style={{
        height: 500,
      }}
      saveToExcel={{
        show: true,
        data,
      }}
    />
  );
};

export default memo(BackSimChart);
