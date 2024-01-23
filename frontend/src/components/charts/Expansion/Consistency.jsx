import React, { memo, useMemo } from "react";
import ReactECharts from "echarts-for-react";
import useChartTheme from "../../../hooks/useChartTheme";
import { graphic } from "echarts";
import { consistencyFunc } from "../../../utils/consistencyFunc";

const objh = [
  {
    quartile_perf_1S: 3.0,
    Date_VL: "2019-01-24T23:00:00.000+00:00",
    quartile_perf_3M: 4,
    quartile_perf_1M: 4,
  },
  {
    quartile_perf_1S: 1.0,
    Date_VL: "2019-01-31T23:00:00.000+00:00",
    quartile_perf_3M: 3,
    quartile_perf_1M: 3,
  },
  {
    quartile_perf_1S: 1.0,
    Date_VL: "2019-02-07T23:00:00.000+00:00",
    quartile_perf_3M: 1,
    quartile_perf_1M: 1,
  },
];

const datatest = {
  count: {
    1: {
      quartile_perf_1S: 6,
      quartile_perf_1M: 8,
      quartile_perf_3M: 1,
    },
    2: {
      quartile_perf_1S: 9,
      quartile_perf_1M: 7,
      quartile_perf_3M: 11,
    },
    3: {
      quartile_perf_1S: 5,
      quartile_perf_1M: 6,
      quartile_perf_3M: 9,
    },
    4: {
      quartile_perf_1S: 9,
      quartile_perf_1M: 8,
      quartile_perf_3M: 8,
    },
  },
  totals: {
    quartile_perf_1S: 29,
    quartile_perf_1M: 29,
    quartile_perf_3M: 29,
  },
};

const Consistency = ({ chartData }) => {
  const data = useMemo(() => consistencyFunc(chartData), [chartData]);
  const theme = useChartTheme();
  const seriesNames = ["1", "2", "3", "4"];
  const seriesData = seriesNames.map((seriesName) => {
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
      data: [
        (seriesItem.quartile_perf_1S / totals.quartile_perf_1S) * 100,
        (seriesItem.quartile_perf_1M / totals.quartile_perf_1M) * 100,
        (seriesItem.quartile_perf_3M / totals.quartile_perf_3M) * 100,
      ],
    };
  });
  const options = useMemo(() => {
    return {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
        confine: true,
        valueFormatter: (value) => value?.toFixed(2) + "%",
      },
      legend: {
        data: seriesNames,
        ...theme.legend,
      },
      xAxis: {
        type: "category",
        axisTick: { show: false },
        data: ["quartile_perf_1S", "quartile_perf_1M", "quartile_perf_3M"],
        ...theme.xAxis,
      },
      yAxis: {
        type: "value",
        ...theme.yAxis,
      },
      series: seriesData,
    };
  }, [seriesData, seriesNames, theme]);
  return (
    <ReactECharts
      option={options}
      style={{
        height: "500px",
        minWidth: "600px",
        width: "100%",
        margin: "15px auto",
      }}
    />
  );
};

export default Consistency;
