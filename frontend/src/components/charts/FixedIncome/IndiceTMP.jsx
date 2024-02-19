import React, { useMemo } from "react";
import LineChart from "../Default/LineChart";
import moment from "moment";

const obj = {
  Taux_TMP: 0.015,
  Valeur: 174.2573035340686,
  Variation: 0.00004166666666671759,
  Seance: "2022-02-08T23:00:00.000+00:00",
};

const IndiceTMP = ({ data }) => {
  const seances = useMemo(
    () => data.map((item) => moment(item.Seance).format("DD/MM/YYYY")),
    [data]
  );
  const lineData = useMemo(
    () => data.map((item) => item.Taux_TMP * 100),
    [data]
  );
  const options = useMemo(() => {
    return {
      title: {
        text: "Évolution du TMP interbancaire",
        left: "center",
      },
      tooltip: {
        valueFormatter: (value) => value?.toFixed(2) + "%",
      },
      grid: {
        right: "100px",
      },
      xAxis: {
        type: "category",
        boundaryGap: true,
        data: seances,
      },
      yAxis: {
        axisLabel: {
          formatter: (value) => value + "%",
        },
        min: Math.trunc(Math.min(...lineData)),
      },
      series: [
        {
          name: "TMP",
          type: "line",
          smooth: true,
          data: lineData,
        },
      ],
    };
  }, [lineData, seances]);
  return (
    <>
      <LineChart options={options} style={{ minHeight: 500 }} />
    </>
  );
};

export default IndiceTMP;
