import moment from "moment/moment";
import React, { memo, useMemo } from "react";
import { Box } from "@mui/material";
import { formatNumberWithSpaces } from "../../utils/formatNumberWithSpaces";
import generateXYChartSeries from "../../utils/chart/generateXYChartSeries";
import LineChart from "./Default/LineChart";
const IndicesChart = ({ data }) => {
  console.log("EChartsPreview", data);
  const seriesData = useMemo(
    () => generateXYChartSeries(data, "VALEUR"),
    [data]
  );
  const seriesNames = useMemo(
    () => seriesData.map((serie) => serie.name),
    [seriesData]
  );
  const options = useMemo(() => {
    console.log("memo run");
    return {
      title: {
        text: "Evolution du volume des titres sélectionnés",
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
        type: "value",
        nameLocation: "middle",
        nameGap: 50,
        name: "VALEUR",
      },
      series: seriesData,
      tooltip: {
        trigger: "axis",
        confine: true,
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
  }, [seriesData]);
  return (
    <Box>
      <LineChart
        style={{ minHeight: 500, height: 600, maxHeight: 750 }}
        options={options}
        showSeriesSelector
        saveToExcel={{
          show: true,
          data,
          fileName: options.title.text,
        }}
      />
    </Box>
  );
};

export default memo(IndicesChart);
