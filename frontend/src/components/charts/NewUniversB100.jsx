import React, { useMemo, memo } from "react";
import moment from "moment";
import { formatDate } from "../../utils/FormatDate";
import { formatNumberWithSpaces } from "../../utils/formatNumberWithSpaces";
import LineChart from "./Default/LineChart";

const formatData = (data, firstCoursAjusteValues) => {
  const seriesData = [];
  for (const key in data) {
    seriesData.push({
      name: key,
      type: "line",
      data: data[key].map((item) => ({
        name: moment(item.SEANCE).format("DD-MM-YYYY"),
        value: [
          moment(item.SEANCE).valueOf(),
          (item.Cours_Ajuste / firstCoursAjusteValues[item.CLE_TITRE]) * 100,
        ],
      })),
      symbol: "none",
    });
  }
  return seriesData;
};
const getFirstCoursAjusteValues = (data) => {
  const firstCoursAjusteValues = {};
  Object.keys(data).forEach((key) => {
    const valuesForKey = data[key];
    const cle = data[key][0]["CLE_TITRE"];

    valuesForKey.sort((a, b) => new Date(a.SEANCE) - new Date(b.SEANCE));
    const firstValue = valuesForKey[0]?.Cours_Ajuste;
    firstCoursAjusteValues[cle] = firstValue;
  });
  return firstCoursAjusteValues;
};
const NewUniversB100 = ({ data, dateDebut, dateFin }) => {
  const firstCoursAjusteValues = useMemo(
    () => getFirstCoursAjusteValues(data),
    [data]
  );

  const seriesData = useMemo(
    () => formatData(data, firstCoursAjusteValues),
    [data, firstCoursAjusteValues]
  );

  const options = useMemo(() => {
    return {
      title: {
        text: `Comparaison en base 100 des titres sélectionnés \n entre le ${formatDate(
          dateDebut["$d"]
        )} et ${formatDate(dateFin["$d"])} \n`,
        left: "center",
        top: -5,
      },
      xAxis: {
        type: "time",
        interval: 10,
        axisLabel: {
          formatter: function (value) {
            return moment(value).format("DD-MM-YYYY");
          },
        },
      },
      legend: {
        width: "80%",
      },
      yAxis: {
        name: "Cours_Ajuste",
        nameLocation: "middle",
        nameGap: 50,
      },
      series: seriesData,
      tooltip: {
        trigger: "axis",
        valueFormatter: (value) => formatNumberWithSpaces(value),
        confine: true,
        axisPointer: {
          type: "cross",
          label: {
            show: false,
            formatter: function (params) {
              return moment(params.value).format("DD-MM-YYYY");
            },
          },
        },
      },
      grid: {
        left: "10%",
        right: "15%",
        bottom: "15%",
      },
    };
  }, [seriesData]);

  return (
    <>
      <LineChart
        options={options}
        style={{ minHeight: 500 }}
        saveToExcel={{
          show: true,
          data,
          fileName: options.title.text,
        }}
      />
    </>
  );
};

export default memo(NewUniversB100);
