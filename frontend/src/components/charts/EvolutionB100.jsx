import ReactECharts from "echarts-for-react";
import moment from "moment/moment";
import React, { memo, useMemo } from "react";
import useChartTheme from "../../hooks/useChartTheme";
import { defaultOptions } from "../../utils/chart/defaultOptions";
import SaveToExcel from "../SaveToExcel";
import { Box } from "@mui/material";
import { extractKeys } from "../../utils/extractKeys";
import useSeriesSelector from "../../hooks/useSeriesSelector";

const regex = /^SIM\d+$/;

function EvolutionB100({
  data,
  isGrid,
  title = "Evolution base 100 des Portefeuilles simulés",
}) {
  console.log("EvolutionB100", data);
  const theme = useChartTheme();
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
  const { SeriesSelector, selectedLegend } = useSeriesSelector(seriesNames);

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
          ...theme.xAxis.nameTextStyle,
        },
        ...theme.xAxis,
      },
      legend: {
        data: seriesNames,
        selected: selectedLegend,
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
        itemStyle: {
          color: regex.test(seriesName) ? "rgba(204,204,204,0.2)" : undefined,
        },
        data: data.map((item) => item[seriesName]),
      })),
      ...defaultOptions,
    };
  }, [seriesNames, data, selectedLegend, theme]);
  return (
    <Box className="relative">
      <SaveToExcel data={data} fileName={"Evolution B100"} />
      <SeriesSelector />
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
