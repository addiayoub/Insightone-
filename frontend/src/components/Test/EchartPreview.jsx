import React, { memo, useMemo } from "react";
import moment from "moment";
import { formatNumberWithSpaces } from "../../utils/formatNumberWithSpaces";
import LineChart from "../charts/Default/LineChart";

const formatData = (data) => {
  const seriesData = [];
  for (const key in data) {
    seriesData.push({
      name: key,
      type: "line",
      data: data[key].map((item) => ({
        // name: moment(item.SEANCE).format("DD-MM-YYYY"),
        value: [moment(item.SEANCE).valueOf(), item.Cours_Ajuste],
      })),
      symbol: "none",
    });
  }
  return seriesData;
};

const EChartsPreview = ({ data }) => {
  const seriesData = useMemo(() => formatData(data), [data]);
  console.log("e preview data", data);
  const options = useMemo(() => {
    return {
      title: {
        text: "Evolution du cours des titres sélectionnés",
        left: "left",
      },
      xAxis: {
        type: "time",
        axisLabel: {
          formatter: function (value) {
            return moment(value).format("DD-MM-YYYY");
          },
        },
      },
      legend: {
        width: "80%",
      },
      yAxis: {
        name: "Valeur Ajuste",
        nameLocation: "middle",
        nameGap: 50,
      },
      series: seriesData,
      tooltip: {
        confine: true,
        valueFormatter: (value) => formatNumberWithSpaces(value),
        trigger: "axis",
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
    <>
      <LineChart
        options={options}
        style={{
          minHeight: 500,
        }}
      />
    </>
  );
};

export default memo(EChartsPreview);
