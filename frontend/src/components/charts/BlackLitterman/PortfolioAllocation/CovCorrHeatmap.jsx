import React, { memo, useMemo } from "react";
import {
  calculateChartHeight,
  transformCorrelationDataForHeatmap,
} from "../../../../utils/chart/heatmap";
import HeatMapChart from "../../Default/HeatMapChart";

function CovCorrHeatmap({ data, title }) {
  const companies = useMemo(() => data.map((item) => item.Symbol), [data]);
  const heatmapData = useMemo(
    () => transformCorrelationDataForHeatmap(data, companies),
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
        formatter: (params) => {
          const xAxisName = companies[params.data[0]];
          const yAxisName = companies[params.data[1]];
          const value = params.data[2];
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
            show: false,
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

export default memo(CovCorrHeatmap);
