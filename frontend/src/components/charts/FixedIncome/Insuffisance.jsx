import React, { memo, useMemo } from "react";
import BarChart from "../Default/BarChart";
import { formatNumberWithSpaces } from "../../../utils/formatNumberWithSpaces";

const Insuffisance = ({ data }) => {
  data = data[data.length - 1];
  console.log("Insuffisance", data);
  const seriesNames = useMemo(() =>
    Object.keys(data).filter((item) => item !== "Date")
  );
  const options = useMemo(() => {
    return {
      title: {
        text: "Répartition de l'insuffisance bancaire par composante",
        left: "center",
      },
      tooltip: {
        valueFormatter: (value) => formatNumberWithSpaces(value ?? 0),
        axisPointer: {
          type: "shadow",
        },
      },
      xAxis: {
        type: "category",
        data: seriesNames,
        axisLabel: {
          show: false,
        },
      },
      yAxis: {
        axisLabel: {
          show: false,
        },
      },
      series: [
        {
          type: "bar",
          data: seriesNames.map((serieName) => data[serieName]),
          label: {
            show: true,
            position: "bottom",
            formatter: function (params) {
              return `${params.name}\n ${formatNumberWithSpaces(params.value)}`;
            },
          },
        },
      ],
    };
  }, [data, seriesNames]);
  return (
    <>
      <BarChart
        options={options}
        saveToExcel={{
          show: true,
          data: [data],
          fileName: "Répartition de l'insuffisance bancaire par composante",
        }}
      />
    </>
  );
};

export default memo(Insuffisance);
