import ReactECharts from "echarts-for-react";
import moment from "moment/moment";
import React, { memo, useMemo } from "react";
import useChartTheme from "../../hooks/useChartTheme";
import { defaultOptions } from "../../utils/chart/defaultOptions";
import SaveToExcel from "../SaveToExcel";
import { Box } from "@mui/material";
import { extractKeys } from "../../utils/extractKeys";

function EvolutionB100({ data, isGrid }) {
  console.log("EvolutionB100", data);
  const theme = useChartTheme();
  const ser = [""];
  const seriesNames = extractKeys(data, ["seance"]);
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
  console.log("seriesNames EvolutionB100", seriesNames);
  console.log("seriesNames o", ser);
  const dates = useMemo(
    () =>
      data.map((item) => [
        item.seance,
        moment(item.seance).format("DD/MM/YYYY"),
      ]),
    [data]
  );
  console.log(
    "dates EvolutionB100",
    dates,
    dates.sort((a, b) => a - b)
  );
  console.log(
    "13/01/2006",
    moment("13/01/2006"),
    moment("13/01/2006").format("DD/MM/YYYY")
  );
  const options = useMemo(() => {
    const seriesData = seriesNames
      .map((seriesName) => data.map((item) => item[seriesName]))
      .flat()
      .filter((value) => value !== undefined);
    const minYAxisValue = Math.min(...seriesData);
    console.log("minYAxisValue", minYAxisValue);

    return {
      title: {
        text: "Evolution base 100 des Portefeuilles simulés",
        left: "center",
        ...theme.title,
      },
      grid: {
        right: isGrid ? "100px" : "20%",
        top: "10%",
        // right: "3%",
        bottom: "15%",
        containLabel: true,
      },
      toolbox: {
        feature: {
          dataZoom: {
            yAxisIndex: true,
          },
          restore: {},
          saveAsImage: {},
          dataView: {},
        },
        top: "20px",
      },
      tooltip: {
        trigger: "axis",
        textStyle: {
          overflow: "breakAll",
          width: 40,
        },
        confine: true,
        valueFormatter: (value) => value?.toFixed(2),
      },
      xAxis: {
        type: "category",
        // data: data.map((item) => moment(item.seance).format("DD/MM/YYYY")),
        data: data.map((item) => item.seance),
        axisLabel: {
          ...theme.yAxis.nameTextStyle,
        },
        ...theme.yAxis,
      },
      legend: {
        data: seriesNames,
        ...legend,
        formatter: function (name) {
          if (name.length > 25 && !isGrid) {
            const newName = name.split(" ");
            return newName.join(" \n");
          }
          return name;
        },
        ...theme.legend,
      },
      yAxis: {
        type: "value",
        min: Math.trunc(minYAxisValue),
        axisLabel: {
          ...theme.yAxis.nameTextStyle,
        },
        ...theme.yAxis,
      },
      series: seriesNames.map((seriesName) => ({
        name: seriesName,
        type: "line",
        data: data.map((item) => item[seriesName]),
      })),
      ...defaultOptions,
    };
  }, [seriesNames, data, theme]);
  return (
    <Box className="relative">
      <SaveToExcel data={data} fileName={"Evolution B100"} />
      <ReactECharts
        option={options}
        style={{
          height: "500px",
          maxHeight: "600px",
        }}
      />
    </Box>
  );
}

export default memo(EvolutionB100);
