import React, { useMemo, memo, useRef } from "react";
import ReactECharts from "echarts-for-react";
import moment from "moment";
import { formatDate } from "../../utils/FormatDate";
import { formatNumberWithSpaces } from "../../utils/formatNumberWithSpaces";
import LineChart from "../charts/Default/LineChart";

const getFirstCoursAjusteValues = (data) => {
  const firstCoursAjusteValues = {};
  Object.keys(data).forEach((key) => {
    const valuesForKey = data[key];
    valuesForKey.sort((a, b) => new Date(a.Date_VL) - new Date(b.Date_VL));
    const firstValue = valuesForKey[0]?.VL_AJUSTE;
    firstCoursAjusteValues[key] = firstValue;
  });
  return firstCoursAjusteValues;
};

const NewUniversB100 = ({ data, dateDebut, dateFin }) => {
  const firstCoursAjusteValues = useMemo(
    () => getFirstCoursAjusteValues(data),
    [data]
  );
  const seriesNames = Object.keys(data);
  const seriesData = seriesNames.map((key) => ({
    name: key,
    type: "line",
    data: data[key].map((item) => [
      moment(item.Date_VL).valueOf(),
      (item.VL_AJUSTE / firstCoursAjusteValues[key]) * 100,
    ]),
    symbol: "none",
  }));
  const options = useMemo(() => {
    return {
      title: {
        text: `Comparaison en base 100 des titres sélectionnés \n entre le ${formatDate(
          dateDebut["$d"]
        )} et ${formatDate(dateFin["$d"])}`,
        left: "center",
      },
      xAxis: {
        type: "time",
        axisLabel: {
          formatter: function (value) {
            return moment(value).format("DD-MM-YYYY");
          },
          hideOverlap: true,
        },
      },
      seriesNames: { seriesList: seriesNames, init: seriesNames },
      yAxis: {
        name: "Valeur Ajuste",
        nameLocation: "middle",
        nameGap: 50,
      },
      series: seriesData,
      tooltip: {
        valueFormatter: (value) => formatNumberWithSpaces(value),
        axisPointer: {
          type: "line",
          label: {
            show: false,
            formatter: function (params) {
              return moment(params.value).format("DD-MM-YYYY");
            },
          },
        },
      },
      grid: {
        left: "50px",
        right: "80px",
      },
    };
  }, [seriesData, seriesNames]);

  return (
    <LineChart
      options={options}
      style={{ minHeight: 500 }}
      // showSeriesSelector
    />
  );
};

export default memo(NewUniversB100);
