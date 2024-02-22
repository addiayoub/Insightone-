import React, { useMemo, memo } from "react";
import BarChart from "../../Default/BarChart";

const getSeries = (dataArray, field) => {
  let result = [];
  const values = [];
  dataArray.map((item) => values.push(item[field]));
  values
    .sort((a, b) => a - b)
    .map((value) => {
      result.push({
        value,
      });
    });
  console.log("result", result);
  return result;
};

function MarketPrior({ data, field = "market_prior", title = "Market Prior" }) {
  console.log("Last seance", data);
  const yAxisValues = useMemo(() => data.map((item) => item.Symbol), [data]);
  const options = useMemo(() => {
    return {
      title: {
        text: title,
        left: "center",
      },
      tooltip: {
        axisPointer: {
          type: "shadow",
        },
        valueFormatter: (value) => value?.toFixed(2),
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        top: "65px",
      },
      xAxis: {
        type: "value",
        splitLine: {
          show: false,
        },
        axisTick: {
          show: true,
        },
        axisLine: {
          show: true,
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
          data: getSeries(data, field),
        },
      ],
    };
  }, [data, yAxisValues]);
  return (
    <BarChart
      options={options}
      saveToExcel={{
        show: true,
        data,
        fileName: options.title.text,
      }}
    />
  );
}

export default memo(MarketPrior);
