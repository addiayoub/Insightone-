import moment from "moment";
import React, { useMemo } from "react";
import LineChart from "../Default/LineChart";

const rangeOpts = {
  z: -1,
  name: "Range",
  stack: "Min",
  tooltip: {
    show: false,
  },
  type: "line",
  areaStyle: {
    color: "rgba(204,204,204,0.5)",
    opacity: 1,
    origin: "start",
  },
  lineStyle: {
    opacity: 0,
  },
  itemStyle: { color: "rgba(204,204,204,0.5)", opacity: 1 },
  emphasis: {
    disabled: true,
  },
  symbolSize: 0,
};

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

const BackSimChart = ({ data }) => {
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
        },
        {
          name: "Min",
          type: "line",
          stack: "Min",
          symbol: "none",
          data: min,
          itemStyle: { color: "rgba(204,204,204,0.9)" },
          lineStyle: { color: "rgba(204,204,204,0.9)" },
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

export default BackSimChart;
