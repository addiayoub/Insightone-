import React, { useMemo } from "react";
import LineChart from "../Default/LineChart";
import moment from "moment";

const obj = {
  Volume_JJ: 11492,
  Indice_Monia: 0.02956,
  seance: "2024-02-01T23:00:00.000+00:00",
};

const IndiceMonia = ({ data }) => {
  const seances = useMemo(
    () => data.map((item) => moment(item.seance).format("DD/MM/YYYY")),
    [data]
  );
  const lineData = useMemo(
    () => data.map((item) => item.Indice_Monia * 100),
    [data]
  );

  const barData = useMemo(() => data.map((item) => item.Volume_JJ), [data]);
  console.log("bar min", Math.trunc(Math.min(...barData)));
  const options = useMemo(() => {
    return {
      title: {
        text: "Evolution du taux MONIA",
        left: "center",
      },
      grid: {
        right: "100px",
        top: "10%",
        bottom: "15%",
      },
      xAxis: {
        type: "category",
        boundaryGap: true,
        data: seances,
      },
      yAxis: [
        {
          min: Math.min(...lineData),
          axisLabel: {
            formatter: (value) => value + "%",
          },
        },
        {
          min: Math.trunc(Math.min(...barData)),
        },
      ],
      series: [
        {
          name: "Monia",
          type: "line",
          smooth: true,
          data: lineData,
          symbol: "none",
        },
        {
          name: "Volume (M MAD)",
          type: "bar",
          yAxisIndex: 1,
          smooth: true,
          data: barData,
          itemStyle: {
            color: "rgb(52 211 153)",
            emphasis: {
              color: "rgb(110 231 183)",
            },
          },
        },
      ],
    };
  }, [lineData, barData, seances]);
  return (
    <div>
      <LineChart
        options={options}
        saveToExcel={{
          show: true,
          data,
          fileName: "Evolution du taux MONIA",
        }}
      />
    </div>
  );
};

export default IndiceMonia;
