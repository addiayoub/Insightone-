import moment from "moment";
import React, { useMemo } from "react";
import useChartTheme from "../../../hooks/useChartTheme";
import { formatNumberWithSpaces } from "../../../utils/formatNumberWithSpaces";
import LineChart from "../Default/LineChart";
// {
//       "seance": "2023-12-01",
//       "Somme actif_AP": 5000002540.43,
//       "Opération ajustement": 0,
//       "Trésorerie": -2540.430000305176,
//       "Montant total": 5000000000,
//       "VL": 100,
//       "VL non rebalancé": 99.99999999999999,
//       "Dividende total": 5000000,
//       "Montant Dividende Réinvesti": 0,
//       "Reliquat dividende": 0,
//       "Montant total sans dividende": 5000000000,
//       "VL sans dividende": 100
//     }

const tooltipFormatter = (params) => {
  const VL = params[0];
  const bubbles = params[1]
    ? `<span>${params[1].marker} Dividende total: ${formatNumberWithSpaces(
        params[1].value[2]
      )}</span>`
    : "";
  const seance = `<strong>${VL.axisValue}</strong><br />`;
  return `${seance}<span>${VL.marker} VL: ${VL.value.toFixed(
    2
  )}</span><br />${bubbles}`;
};
const obb = {
  type: "value",
  min: 0,
  // max: 10, // Adjust the range based on your data
  // interval: 2,
  // axisLabel: {
  //   formatter: "{value} K",
  // },
};

const VlChart = ({ data, seriesNames, title, withBubbles }) => {
  console.log("data", data);

  // const seriesNames = Object.keys(data[0]).filter((key) =>
  //   ["VL non rebalancé", "VL sans dividende", "VL"].includes(key)
  // );
  // const seriesNames = ["Somme actif_AP"];
  const bubblesData = useMemo(
    () =>
      data
        .map((item) => [
          moment(item.seance).format("DD/MM/YYYY"),
          item.VL,
          item["Dividende total"],
        ])
        .filter((item) => item[2] !== 0),
    [data]
  );
  const bubbles = useMemo(
    () =>
      bubblesData.map(([x, y, z], index) => ({
        type: "effectScatter",
        symbol: "circle",
        // yAxisIndex: 1,
        symbolSize: function () {
          console.log("z", Math.sqrt(z) / 10);
          // return 20;
          return Math.sqrt(z) / 18;
        },
        tooltip: {
          // show: false,
        },
        data: [[x, y, z]],
        itemStyle: {
          color: "green",
        },
        name: "Dividende total",
      })),
    [bubblesData]
  );
  const tooltip = withBubbles ? { formatter: tooltipFormatter } : {};
  const lineSeries = seriesNames.map((seriesName) => ({
    name: seriesName,
    type: "line",
    symbol: "none",
    data: data.map((item) => item[seriesName]),
  }));
  // Extract all data points from lineSeries into a single array
  const allDataPoints = useMemo(
    () => lineSeries.reduce((acc, series) => [...acc, ...series.data], []),
    [lineSeries]
  );

  // Find the minimum value using Math.min
  const minValue = useMemo(() => Math.min(...allDataPoints), [allDataPoints]);
  console.log("VL minValue", minValue, bubblesData, data);
  const seriesData = withBubbles ? lineSeries.concat(bubbles) : lineSeries;
  const options = useMemo(() => {
    return {
      title: {
        text: title,
        left: "center",
      },
      grid: {
        right: "133px",
        // right: "3%",
        bottom: "15%",
      },
      tooltip: {
        ...tooltip,
        valueFormatter: (value) => formatNumberWithSpaces(value),
      },
      xAxis: {
        type: "category",
        data: data.map((item) => moment(item.seance).format("DD/MM/YYYY")),
      },

      yAxis: {
        type: "value",
        min: Math.trunc(minValue),
        axisLabel: {
          formatter: function (value) {
            // Convert the value to millions and add 'M' at the end
            // return (value / 1e9).toFixed(0) + " M";
            return formatNumberWithSpaces(value);
          },
        },
      },
      series: seriesData,
    };
  }, [seriesData, data]);
  return (
    <>
      <LineChart
        options={options}
        style={{
          margin: "50px auto",
          height: "500px",
          maxHeight: "600px",
        }}
      />
    </>
  );
};

export default VlChart;
