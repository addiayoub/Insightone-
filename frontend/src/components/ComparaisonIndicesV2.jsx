import moment from "moment";
import React, { memo, useMemo } from "react";
import { Box } from "@mui/material";
import { formatNumberWithSpaces } from "../utils/formatNumberWithSpaces";
import generateXYChartSeries from "../utils/chart/generateXYChartSeries";
import LineChart from "./charts/Default/LineChart";

const ComparaisonIndicesV2 = ({ data }) => {
  console.log("EChartsPreview", data);
  const seriesData = useMemo(
    () => generateXYChartSeries(data, "COTATION_B100"),
    [data]
  );
  const seriesNames = useMemo(
    () => seriesData.map((serie) => serie.name),
    [seriesData]
  );
  const options = useMemo(() => {
    return {
      title: {
        text: "Comparaison des indices",
        left: "center",
      },
      xAxis: {
        type: "time",
        axisLabel: {
          formatter: function (value) {
            return moment(value).format("DD-MM-YYYY");
          },
        },
      },
      seriesNames: { seriesList: seriesNames, init: seriesNames },
      yAxis: {
        nameLocation: "middle",
        nameGap: 50,
        name: "VALEUR",
      },
      series: seriesData,
      tooltip: {
        valueFormatter: (value) => formatNumberWithSpaces(value),
        axisPointer: {
          type: "line",
          label: {
            show: false,
            formatter: function (params) {
              return moment(params.value).format("DD-MM-YYYY");
            },
          },
        },
      },
      grid: {
        left: "50px",
        right: "80px",
      },
    };
  }, [seriesData, seriesNames]);
  return (
    <Box>
      <LineChart
        options={options}
        showSeriesSelector
        style={{ minHeight: 500, height: 600, maxHeight: 750 }}
      />
    </Box>
  );
};

export default memo(ComparaisonIndicesV2);
