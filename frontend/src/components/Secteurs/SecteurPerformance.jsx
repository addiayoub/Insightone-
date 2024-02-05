import React, { useMemo, memo } from "react";
import { downColor, upColor } from "../../utils/generateRandomColorsArray";
import BarChart from "../charts/Default/BarChart";

const color = (dataArray) => {
  let result = [];
  const values = [];
  dataArray.map((item) => values.push(item.Rdt_cum * 100));
  values
    .sort((a, b) => a - b)
    .map((value) => {
      if (value < 0) {
        result.push({
          value,
          itemStyle: { color: upColor },
        });
      } else {
        result.push({
          value,
          itemStyle: { color: downColor },
        });
      }
    });
  console.log(result);
  return result;
};

function SecteurPerformance({ data, height = "400px" }) {
  console.log("Last seance", data);
  const yAxisValues = useMemo(
    () => data.map((item) => item.nom_indice),
    [data]
  );
  const options = useMemo(() => {
    return {
      title: {
        text: "Performance Secteur",
        left: "center",
      },
      tooltip: {
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
      },
      xAxis: {
        type: "value",
        splitLine: {
          show: false,
        },
      },
      yAxis: {
        type: "category",
        data: yAxisValues,
      },
      series: [
        {
          name: "",
          type: "bar",
          label: {
            show: false,
          },
          emphasis: {
            focus: "series",
          },
          data: color(data),
        },
      ],
    };
  }, [data, yAxisValues]);
  return <BarChart options={options} style={{ height }} />;
}

export default memo(SecteurPerformance);
