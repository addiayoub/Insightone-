import React, { memo, useMemo } from "react";
import BarChart from "../Default/BarChart";
import { formatNumberWithSpaces } from "../../../utils/formatNumberWithSpaces";

const getSeries = (data) => {
  const formatedData = data.reduce((accumulator, item) => {
    const existingItem = accumulator.find(
      (accItem) => accItem.name.toLowerCase() === item.EMETTEUR.toLowerCase()
    );

    if (existingItem) {
      existingItem.value += item.Valorisation;
    } else {
      accumulator.push({
        name: item.EMETTEUR,
        value: item.Valorisation,
      });
    }

    return accumulator;
  }, []);
  const result = formatedData.map((item) => ({
    ...item,
    name: item.name === "" ? "Autres" : item.name,
  }));
  result.sort((a, b) => a.value - b.value);
  console.log("series", result);
  return result;
};
const ValorisationChart = ({ data }) => {
  const series = useMemo(() => getSeries(data), [data]);
  const yAxisValues = useMemo(
    () => series.map((serie) => serie.name),
    [series]
  );
  const options = useMemo(() => {
    return {
      title: {
        text: "Valorisation par Emetteur",
        left: "center",
      },
      tooltip: {
        axisPointer: {
          type: "shadow",
        },
        valueFormatter: (value) => formatNumberWithSpaces(value),
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        top: "75px",
      },
      xAxis: {
        type: "value",
        splitLine: {
          show: false,
        },
        min: "dataMin",
        max: "dataMax",
      },
      yAxis: {
        type: "category",
        data: yAxisValues,
      },
      toolbox: {
        top: "30px",
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
          data: series,
        },
      ],
    };
  }, [series, yAxisValues]);
  return (
    <BarChart
      options={options}
      style={{ height: "500px" }}
      saveToExcel={{
        show: true,
        data,
        fileName: options.title.text,
      }}
    />
  );
};

export default memo(ValorisationChart);
