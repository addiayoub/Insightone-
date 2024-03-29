import moment from "moment";
import React, { useMemo } from "react";
import LineChart from "../Default/LineChart";

const EvolB100 = ({ data, title }) => {
  const xData = useMemo(
    () => data.map((item) => moment(item.SEANCE).format("DD/MM/YYYY")),
    [data]
  );
  const options = useMemo(() => {
    return {
      title: { text: title, x: "center" },
      xAxis: {
        type: "category",
        data: xData,
      },
      yAxis: {
        type: "value",
        min: function (value) {
          return value.min?.toFixed(2);
        },
      },
      series: {
        name: "Valeur B100",
        type: "line",
        symbol: "none",
        data: data.map((item) => item.VALEUR_B100),
      },
    };
  }, [data, xData]);
  return (
    <LineChart
      options={options}
      saveToExcel={{ show: true, fileName: options.title.text, data }}
    />
  );
};

export default EvolB100;
