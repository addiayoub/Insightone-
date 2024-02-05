import React, { memo, useMemo } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import LineChart from "../Default/LineChart";

const Underwater = ({ data }) => {
  console.log("Underwater data", data);
  const { selectedPtf } = useSelector((state) => state.backtest);
  const seances = useMemo(
    () => data.map((item) => moment(item.seance).format("DD/MM/YYYY")),
    [data]
  );
  const seriesData = useMemo(
    () => data.map((item) => item[selectedPtf] * 100),
    [data, selectedPtf]
  );
  const average = useMemo(() => data.map((item) => item.Average * 100), [data]);
  const options = useMemo(() => {
    return {
      tooltip: {
        valueFormatter: (value) => value?.toFixed(2) + "%",
      },
      title: {
        left: "center",
        text: "Underwater Plot",
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: seances,
      },
      yAxis: {
        boundaryGap: [0, "100%"],
        axisLabel: {
          formatter: "{value}%",
        },
      },
      series: [
        {
          name: selectedPtf,
          type: "line",
          symbol: "none",
          sampling: "lttb",
          itemStyle: {
            color: "red",
          },
          areaStyle: {
            color: "rgba(237, 45, 45, 0.2)",
          },
          data: seriesData,
        },
        {
          name: "Average",
          type: "line",
          symbol: "none",
          itemStyle: {
            color: "blue",
          },
          data: average,
        },
      ],
    };
  }, [selectedPtf, seriesData, average, seances]);
  return (
    <LineChart
      options={options}
      style={{
        minHeight: 500,
        margin: "15px 0",
      }}
      saveToExcel={{ show: true, data, fileName: "Underwater Plot" }}
    />
  );
};

export default memo(Underwater);
