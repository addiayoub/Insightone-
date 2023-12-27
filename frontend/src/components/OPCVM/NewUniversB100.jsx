import React, { useMemo, memo } from "react";
import ReactECharts from "echarts-for-react";
import moment from "moment";
import { formatDate } from "../../utils/FormatDate";
import { formatNumberWithSpaces } from "../../utils/formatNumberWithSpaces";
import useChartTheme from "../../hooks/useChartTheme";

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
  const seriesData = Object.keys(data).map((key) => ({
    name: key,
    type: "line",
    data: data[key].map((item) => [
      moment(item.Date_VL).valueOf(),
      (item.VL_AJUSTE / firstCoursAjusteValues[key]) * 100,
    ]),
    showSymbol: false,
  }));
  const theme = useChartTheme();
  const options = useMemo(() => {
    return {
      title: {
        text: `Comparaison en base 100 des titres sélectionnés \n entre le ${formatDate(
          dateDebut["$d"]
        )} et ${formatDate(dateFin["$d"])}`,
        ...theme.title,
        left: "center",
      },
      legend: {
        bottom: "0%",
        orient: "horizontal",
        type: "scroll",
        width: "80%",
        ...theme.legend,
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
      yAxis: {
        type: "value",
        name: "Valeur Ajuste",
        nameLocation: "middle",
        nameGap: 50,
        ...theme.yAxis,
      },
      series: seriesData,
      tooltip: {
        valueFormatter: (value) => formatNumberWithSpaces(value),
        trigger: "axis",
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
      dataZoom: [
        {
          type: "inside",
          start: 0,
          end: 100,
        },
        {
          show: true,
          type: "slider",
          top: "85%",
          start: 0,
          end: 100,
        },
      ],
      grid: {
        left: "50px",
        right: "80px",
        bottom: "15%",
        top: "10%",
        containLabel: true,
      },
      toolbox: {
        feature: {
          dataZoom: {
            yAxisIndex: true,
          },
          restore: {},
          saveAsImage: {},
        },
        top: "20px",
      },
    };
  }, [theme, seriesData]);

  return (
    <ReactECharts
      option={options}
      style={{ minHeight: 500 }}
      key={JSON.stringify(options)}
    />
  );
};

export default memo(NewUniversB100);
