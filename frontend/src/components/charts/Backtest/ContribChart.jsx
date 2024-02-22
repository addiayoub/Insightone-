import React, { memo, useMemo } from "react";
import { useSelector } from "react-redux";
import BarChart from "../Default/BarChart";

const getSeries = (data) => {
  const values = data
    .map((item) => ({
      name: item.titre,
      value: item.contrib_ptf,
    }))
    .filter((ele) => Math.abs(ele.value) > 0.01);
  values.sort((a, b) => a.value - b.value);
  return values.map(({ name, value }) => ({
    name,
    value,
    itemStyle: {
      color: value < 0 ? "#ee4658" : "#21cc6d",
    },
  }));
};

const ContribChart = ({ data }) => {
  console.log("ContribChart rendered", data);
  const { selectedPtf } = useSelector((state) => state.backtest);
  console.log("selectedPtf", selectedPtf);
  const titles = useMemo(() => data.map((item) => item.titre), [data]);
  console.log(
    "negative values",
    data.map((item) => item[selectedPtf] * 100)
  );
  const seriesData = useMemo(() => getSeries(data), [data, selectedPtf]);
  console.log("seriesData", seriesData);
  const options = useMemo(() => {
    return {
      title: {
        text: "Contribution",
        left: "center",
      },
      grid: {
        right: "100px",
        top: "70px",
      },
      tooltip: {
        axisPointer: {
          // type: "cross",
          crossStyle: {
            color: "#999",
          },
        },
      },
      xAxis: {
        type: "value",
        axisPointer: {
          type: "shadow",
        },
      },
      yAxis: {
        type: "category",
        data: seriesData.map((item) => item.name),
        splitArea: {
          show: true,
        },
        axisPointer: {
          type: "shadow",
        },
      },
      series: [
        {
          type: "bar",
          show: true,
          position: "insideRight",
          data: seriesData,
        },
      ],
    };
  }, [seriesData]);
  const chartHeight = seriesData.length * 15 + 200;
  return (
    <>
      <BarChart
        options={options}
        style={{
          minHeight: chartHeight,
        }}
        saveToExcel={{
          show: true,
          data,
          fileName: options.title.text,
        }}
      />
    </>
  );
};

export default memo(ContribChart);
