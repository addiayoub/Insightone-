import React, { memo, useMemo } from "react";
import { consistencyFunc } from "../../../utils/consistencyFunc";
import { gradientPalette } from "../../../utils/generateRandomColorsArray";
import BarChart from "../Default/BarChart";

const seriesNames = ["1", "2", "3", "4"];

const Consistency = ({ chartData }) => {
  const data = useMemo(() => consistencyFunc(chartData), [chartData]);
  const seriesData = useMemo(() => {
    const colors = gradientPalette;
    return seriesNames.map((seriesName, index) => {
      const { count, totals } = data;
      const seriesItem = count[seriesName];
      return {
        name: seriesName,
        type: "bar",
        stack: "total",
        label: {
          show: true,
          position: "inside",
          formatter: (params) => {
            return params.value.toFixed(2) + "%";
          },
        },
        itemStyle: { color: gradientPalette[index] },
        data: [
          (seriesItem.quartile_perf_1S / totals.quartile_perf_1S) * 100,
          (seriesItem.quartile_perf_1M / totals.quartile_perf_1M) * 100,
          (seriesItem.quartile_perf_3M / totals.quartile_perf_3M) * 100,
        ],
      };
    });
  }, [seriesNames, data, gradientPalette]);
  const options = useMemo(() => {
    const dd = seriesData.reverse();
    return {
      title: {
        text: "Consistency check (Présence par quartile)",
        left: "center",
      },
      tooltip: {
        axisPointer: {
          type: "shadow",
        },
      },
      xAxis: {
        type: "category",
        data: ["1s", "1m", "3m"],
      },
      yAxis: {
        axisLabel: {
          show: false,
        },
      },
      series: dd,
    };
  }, [seriesData, seriesNames]);
  return (
    <>
      <BarChart
        style={{
          height: "500px",
          minWidth: "600px",
          width: "100%",
          margin: "15px auto",
        }}
        saveToExcel={{
          show: true,
          data: chartData,
          fileName: options.title.text,
        }}
        options={options}
      />
    </>
  );
};

export default memo(Consistency);
