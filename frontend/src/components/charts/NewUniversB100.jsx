import React, { useMemo, memo } from "react";
import ReactECharts from "echarts-for-react";
import moment from "moment";
import { formatDate } from "../../utils/FormatDate";
import useChartTheme from "../../hooks/useChartTheme";
import { formatNumberWithSpaces } from "../../utils/formatNumberWithSpaces";

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
      showSymbol: false,
    });
  }
  return seriesData;
};

const NewUniversB100 = ({ data, dateDebut, dateFin }) => {
  const theme = useChartTheme();
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

  const firstCoursAjusteValues = getFirstCoursAjusteValues(data);

  const seriesData = formatData(data, firstCoursAjusteValues);

  const options = useMemo(() => {
    return {
      title: {
        text: `Comparaison en base 100 des titres sélectionnés \n entre le ${formatDate(
          dateDebut["$d"]
        )} et ${formatDate(dateFin["$d"])} \n`,
        left: "center",
        top: -5,
        ...theme.title,
      },
      xAxis: {
        type: "time",
        interval: 10,
        axisLabel: {
          formatter: function (value) {
            return moment(value).format("DD-MM-YYYY");
          },
          hideOverlap: true,
        },
      },
      legend: {
        bottom: "0%",
        orient: "horizontal",
        type: "scroll",
        width: "80%",
        ...theme.legend,
      },
      yAxis: {
        type: "value",
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
        left: "10%",
        right: "15%",
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
  }, [seriesData, theme]);

  return (
    <ReactECharts
      option={options}
      key={JSON.stringify(options)}
      style={{ minHeight: 500 }}
    />
  );
};

export default memo(NewUniversB100);
