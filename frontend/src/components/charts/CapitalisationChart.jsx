import React, { memo, useMemo } from "react";
import { formatDate } from "../../utils/FormatDate";
import useChartTheme from "../../hooks/useChartTheme";
import LineChart from "./Default/LineChart";
import { formatNumberWithSpaces } from "../../utils/formatNumberWithSpaces";

const CapitalisationChart = ({ data }) => {
  const theme = useChartTheme();
  const options = useMemo(() => {
    return {
      tooltip: {
        position: function (pt) {
          return [pt[0], "10%"];
        },
        valueFormatter: (value) => formatNumberWithSpaces(value?.toFixed(2)),
      },
      title: {
        left: "center",
        text: "",
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: data.map((item) => formatDate(item.SEANCE)),
      },
      yAxis: {
        boundaryGap: [0, "100%"],
        axisLabel: {
          formatter: function (value) {
            const val = value / 1000000000;
            return val + "M";
          },
        },
      },
      series: [
        {
          name: "MASI",
          type: "line",
          symbol: "none",
          sampling: "lttb",
          itemStyle: {
            ...theme.xAxis.nameTextStyle,
          },
          areaStyle: {
            ...theme.xAxis.nameTextStyle,
          },
          data: data.map((item) => item.Capitalisation),
        },
      ],
    };
  }, [data, theme]);

  return (
    <>
      <LineChart options={options} style={{ height: "450px" }} />
    </>
  );
};
export default memo(CapitalisationChart);
