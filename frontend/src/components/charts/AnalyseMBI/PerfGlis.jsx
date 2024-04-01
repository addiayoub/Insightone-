import React from "react";
import ReactECharts from "echarts-for-react";
import { ref } from "../../PerfGlis/columns";
// const data = {
//   perf_1AN: 0.033579768132318444,
//   perf_9M: 0.024642967227012313,
//   perf_6M_an: 0.03214619995199852,
//   perf_6M: 0.015945963106305472,
//   perf_2ANS: 0.04823805499116807,
//   perf_3ANS: 0.06420687016785598,
//   perf_4ANS: 0.08914043763972668,
//   perf_5ANS_an: 0.021981388210960073,
//   perf_5ANS: 0.11484613777032071,
//   perf_3M_an: 0.0299667743411407,
//   perf_1S: 0.000670489589695622,
//   perf_2ANS_an: 0.023834974491088623,
//   perf_3ANS_an: 0.02095988198621712,
//   perf_2M: 0.004481807248899239,
//   perf_YTD: 0.004810930608569075,
//   perf_4ANS_an: 0.02157668042638239,
//   perf_3M: 0.007408947384318854,
//   perf_1M: 0.0025198788957212503,
//   perf_1AN_an: 0.033579768132318444,
// };

const getSeries = (data) => {
  // const seriesNames = Object.keys(data)
  //   .map((item) => ({
  //     key: item,
  //     value: ref[item],
  //   }))
  //   .filter((item) => item.value !== undefined);
  const seriesNames = Object.values(ref);
  const keys = Object.keys(ref);
  const seriesData = keys.map((key) =>
    parseFloat((data[key] * 100).toFixed(2))
  );
  const sum = seriesData.reduce((acc, val) => acc + val, 0);
  const average = parseFloat((sum / seriesData.length).toFixed(2));
  return { seriesNames, seriesData, average };
};

const PerfGlis = ({ data }) => {
  const { seriesNames, seriesData, average } = getSeries(data);
  console.log("SRIES NAMES", seriesNames, data, seriesData, average);

  const option = {
    title: {
      text: "Mixed Chart - Line with Bar",
      left: "center",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    xAxis: {
      type: "category",
      data: seriesNames,
    },
    yAxis: [
      {
        type: "value",
        name: "Performance",
        min: "dataMin",
        max: "dataMax",
        axisLabel: {
          formatter: "{value}",
        },
      },
      {
        type: "value",
        name: "Average",
        min: "dataMin",
        max: "dataMax",
        axisLabel: {
          formatter: "{value}",
        },
      },
    ],
    series: [
      {
        name: "Performance",
        type: "bar",
        data: seriesData,
      },
      {
        name: "Average",
        type: "line",
        yAxisIndex: 1,
        data: Object.keys(data)
          .filter((key) => key.startsWith("perf_"))
          .map(() => average),
      },
    ],
  };

  return <ReactECharts option={option} />;
};

export default PerfGlis;
