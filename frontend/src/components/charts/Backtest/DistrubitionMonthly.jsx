import React, { memo, useMemo } from "react";
import BarChart from "../Default/BarChart";

// const lineData = data.map((item) => item.Frequency * 100);
// const barData = data.map((item) => item.KDE);
// const xAxisData = data.map((item) => item.Returns * 100);
const DistrubitionMonthly = ({ data }) => {
  console.log("Render DistrubitionMonthly");
  const xAxisData = useMemo(
    () => data.map((item) => (item.Returns * 100).toFixed(2)),
    [data]
  );
  const min = Math.min(...xAxisData);
  const max = Math.max(...xAxisData);
  console.log("Min DistrubitionMonthly", min, max);
  const options = useMemo(() => {
    return {
      title: {
        text: "Distribution of Weekly Returns",
        left: "center",
      },
      tooltip: {
        axisPointer: {
          // type: "cross",
          crossStyle: {
            color: "#999",
          },
        },
        valueFormatter: (value) => value?.toFixed(2),
      },
      legend: {
        show: false,
      },
      grid: { top: "15%" },
      xAxis: {
        type: "category",
        data: [...xAxisData, max + 1],
        boundaryGap: true,
        axisPointer: {
          type: "shadow",
        },
      },
      yAxis: [
        {
          name: "KDB",
        },
        {
          name: "Frequency",
        },
      ],
      series: [
        {
          name: "KDE",
          type: "line",
          smooth: true,
          symbol: "none",
          sampling: "lttb",
          itemStyle: {
            color: "#30c63f",
          },
          areaStyle: {
            color: "rgba(48, 198, 63, 0.25)",
          },
          data: data.map((item) => item.KDE),
        },
        {
          name: "Frequency",
          type: "bar",
          yAxisIndex: 1,
          data: data.map((item) => item.Frequency),
        },
        {
          name: "Norm Value",
          type: "line",
          symbol: "none",
          sampling: "lttb",
          itemStyle: {
            color: "#df289e",
          },
          areaStyle: {
            color: "rgba(223, 40, 158, 0.25)",
          },
          smooth: true,
          data: data.map((item) => item.norm_values),
        },
      ],
    };
  }, [data, xAxisData]);
  return (
    <>
      <BarChart
        options={options}
        style={{
          minHeight: 500,
        }}
        saveToExcel={{
          show: true,
          data,
          fileName: options.title.text,
        }}
      />
    </>
  );
};

export default memo(DistrubitionMonthly);
