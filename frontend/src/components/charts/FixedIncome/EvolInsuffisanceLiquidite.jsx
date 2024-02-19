import React, { memo, useMemo } from "react";
import LineChart from "../Default/LineChart";
import moment from "moment";
const obj = {
  Moy_Insuffisance_Liquidite: -54340.26903225807,
  "Ratio de réserve obligatoire": 0.02,
  date_complete: "2020-01-01",
  annee: 2020,
  mois: 1,
};

const EvolInsuffisanceLiquidite = ({ data }) => {
  const seances = useMemo(
    () => data.map((item) => moment(item.date_complete).format("DD/MM/YYYY")),
    [data]
  );
  const lineData = useMemo(
    () => data.map((item) => item["Ratio de réserve obligatoire"] * 100),
    [data]
  );

  const barData = useMemo(
    () => data.map((item) => item.Moy_Insuffisance_Liquidite),
    [data]
  );
  console.log("bar min", Math.trunc(Math.min(...barData)));
  const options = useMemo(() => {
    return {
      title: {
        text: "Evolution de l'insuffisance de liquidité",
        left: "center",
      },
      grid: {
        right: "100px",
      },
      xAxis: {
        type: "category",
        boundaryGap: true,
        data: seances,
      },
      yAxis: [
        {
          min: Math.trunc(Math.min(...barData)),
        },
        {
          min: Math.trunc(Math.min(...lineData)),
          axisLabel: {
            formatter: (value) => value + "%",
          },
        },
      ],
      series: [
        {
          name: "TMP",
          type: "line",
          smooth: true,
          data: lineData,
          yAxisIndex: 1,
        },
        {
          name: "Volume",
          type: "bar",
          smooth: true,
          data: barData,
        },
      ],
    };
  }, [lineData, barData, seances]);
  return (
    <div>
      <LineChart options={options} />
    </div>
  );
};

export default memo(EvolInsuffisanceLiquidite);
