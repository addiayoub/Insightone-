import React, { memo, useMemo } from "react";
import BarChart from "../../../Default/BarChart";
const ex = {
  Returns: -0.022996922957744366,
  Frequency: 0.013888888888888925,
  "Normal: $\\mu=0.00%$%, $\\sigma=0.34%$%": 8.287264698264324e-12,
};
const getSeries = (data) => {
  const key = Object.keys(data[0])[2];
  const returns = data.map((item) =>
    parseFloat((item.Returns * 100).toFixed(2))
  );
  const frequency = data.map((item) => item.Frequency * 100);
  const normal = data.map((item) => item[key] * 100);
  return { returns, frequency, normal };
};

const PtfReturnsHisto = ({ data }) => {
  const { frequency, returns, normal } = useMemo(() => getSeries(data), [data]);
  console.log("normal", normal);
  const options = useMemo(() => {
    return {
      title: {
        text: "Portefeuille Returns",
        left: "center",
      },
      legend: {
        left: "center",
        bottom: "9%",
      },
      grid: {
        right: "5%",
        top: "50px",
        bottom: "15%",
      },
      showDataZoom: true,
      xAxis: {
        type: "category",
        data: returns,
        axisTick: {
          show: true,
        },
        axisLine: {
          show: true,
        },
      },
      series: [
        {
          name: "Frequency",
          type: "bar",
          data: frequency,
        },
        {
          name: "Normal",
          type: "line",
          symbol: "none",
          sampling: "lttb",
          itemStyle: {
            color: "#df289e",
          },
          areaStyle: {
            color: "rgba(223, 40, 158, 0.25)",
          },
          smooth: true,
          data: normal,
        },
      ],
    };
  }, [normal, frequency, returns]);
  return (
    <>
      <BarChart
        options={options}
        style={{
          minHeight: "510px",
          margin: "15px 0",
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

export default memo(PtfReturnsHisto);
