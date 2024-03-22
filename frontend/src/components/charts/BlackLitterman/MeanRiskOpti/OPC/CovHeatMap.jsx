import React, { memo, useMemo } from "react";
import HeatMapChart from "../../../Default/HeatMapChart";
import {
  calculateChartHeight,
  transformCorrelationDataForHeatmap,
} from "../../../../../utils/chart/heatmap";

function CovHeatMap({ data, title }) {
  const companies = useMemo(() => data.map((item) => item.index), [data]);
  const heatmapData = useMemo(
    () => transformCorrelationDataForHeatmap(data, companies, true),
    [data, companies]
  );
  console.log("correlationHeatmapData", heatmapData);
  const option = useMemo(() => {
    return {
      title: {
        text: title,
        left: "center",
      },
      tooltip: {
        position: "top",
        formatter: ({ data }) => {
          const xAxisName = companies[data[0]];
          const yAxisName = companies[data[1]];
          const value = data[2];
          return `${xAxisName} - ${yAxisName}<br/>Valeur: ${value}`;
        },
      },
      grid: { top: "50px" },
      animation: true,
      xAxis: {
        type: "category",
        data: companies,
      },
      yAxis: {
        type: "category",
        data: companies,
      },
      series: [
        {
          name: "Correlation",
          type: "heatmap",
          data: heatmapData,
          label: {
            // show: true,
            formatter: function (params) {
              console.log("params heat", params);
              return value[2] + "%";
            },
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };
  }, [companies, heatmapData]);
  return (
    <>
      <HeatMapChart
        options={option}
        notMerge={true}
        lazyUpdate={true}
        style={{
          minHeight: calculateChartHeight(companies),
          height: "100%",
          width: "100%",
        }}
        opts={{ renderer: "svg" }}
        saveToExcel={{
          show: true,
          data,
          fileName: title,
        }}
      />
    </>
  );
}

export default memo(CovHeatMap);
