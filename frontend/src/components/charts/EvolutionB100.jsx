import React, { memo, useMemo } from "react";
import useChartTheme from "../../hooks/useChartTheme";
import { Box } from "@mui/material";
import { extractKeys } from "../../utils/extractKeys";
import LineChart from "./Default/LineChart";

const regex = /^SIM\d+$/;

const generateSeries = (data, seriesNames) => {
  return seriesNames.map((serieName) => ({
    name: serieName,
    type: "line",
    itemStyle: {
      color: regex.test(serieName) ? "rgba(204,204,204,0.7)" : undefined,
    },
    symbol: "none",
    data: data.map((item) => item[serieName]),
  }));
};

function EvolutionB100({
  data,
  isGrid,
  title = "Evolution base 100 des Portefeuilles simulés",
}) {
  console.log("EvolutionB100", data);
  const seriesNames = useMemo(
    () => extractKeys(data, ["seance"]).filter((serie) => !regex.test(serie)),
    [data]
  );
  const series = useMemo(
    () => generateSeries(data, seriesNames),
    [data, seriesNames]
  );
  const seances = useMemo(() => data.map((item) => item.seance), [data]);
  const legend = isGrid
    ? {
        type: "scroll",
        orient: "horizontal",
        zLevel: 23,
        width: "60%",
        left: "center",
        bottom: "9%",
      }
    : {
        orient: "vertical",
        zLevel: 23,
        height: "50%",
        top: "center",
        right: 0,
        type: "scroll",
        textStyle: {
          width: 150,
          rich: {
            fw600: {
              fontWeight: 600,
            },
          },
        },
      };
  const options = useMemo(() => {
    const seriesData = seriesNames
      .map((seriesName) => data.map((item) => item[seriesName]))
      .flat()
      .filter((value) => value !== undefined);
    const minYAxisValue = Math.min(...seriesData);
    console.log("minYAxisValue", minYAxisValue);

    return {
      title: {
        text: title,
        left: "center",
      },
      grid: {
        right: isGrid ? "100px" : "20%",
      },
      legend: {
        ...legend,
      },
      xAxis: {
        type: "category",
        // data: data.map((item) => moment(item.seance).format("DD/MM/YYYY")),
        data: seances,
      },
      yAxis: {
        type: "value",
        min: Math.trunc(minYAxisValue),
      },
      seriesNames: {
        seriesList: seriesNames,
        init: seriesNames,
      },
      series,
    };
  }, [seriesNames, data, seances, series]);
  return (
    <Box className="relative">
      <LineChart
        saveToExcel={{
          show: true,
          data,
          fileName: title,
        }}
        options={options}
        style={{
          height: "500px",
          maxHeight: "600px",
        }}
        showSeriesSelector
      />
    </Box>
  );
}

export default memo(EvolutionB100);
