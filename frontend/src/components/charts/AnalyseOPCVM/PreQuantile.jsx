import React, { memo, useMemo, useRef, useEffect } from "react";
import ReactECharts from "echarts-for-react";
import moment from "moment";
import { Box } from "@mui/material";
import useChartTheme from "../../../hooks/useChartTheme";
import useSeriesSelector from "../../../hooks/useSeriesSelector";
import {
  defaultOptions,
  getExportToExcelFeature,
  getFullscreenFeature,
} from "../../../utils/chart/defaultOptions";

const series = [
  { name: "DENOMINATION_OPCVM", data: "opc_b100" },
  { name: "Nom_Benchmark", data: "benc_b100" },
];

const rangeOpts = {
  z: -1,
  tooltip: {
    show: false,
  },
  lineStyle: {
    opacity: 0,
  },
  areaStyle: {
    color: "#1338be",
    origin: "start",
  },
  emphasis: {
    disabled: true,
  },
  symbolSize: 0,
};

const initSaveToExcel = {
  show: false,
  data: [],
  fileName: new Date().getTime(),
};

const PreQuantile = ({ data, style, showSeriesSelector, saveToExcel = initSaveToExcel }) => {
  const chart = useRef(null);
  const theme = useChartTheme();
  
  const allValues = useMemo(
    () => series.map((serie) => data.map((item) => item[serie.data])).flat(),
    [data]
  );

  const rangeValues = {
    q_05: data.map((item) => item.q_05),
    quart1: data.map((item) => item.quart1),
    quart2: data.map((item) => item.quart2),
    quart3: data.map((item) => item.quart3),
    q_95: data.map((item) => item.q_95),
  };

  const yMin = Math.trunc(Math.min(...allValues, ...rangeValues.q_05));

  const legendData = useMemo(
    () => series.map((serie) => data[0][serie.name]),
    [series, data]
  );

  const baseSeries = series.map((serie) => ({
    name: serie.name === "ajust_b100" ? "Perf ajustée de la classe" : data[0][serie.name],
    type: "line",
    symbol: "none",
    itemStyle: {
      color: serie.name === "DENOMINATION_OPCVM" ? "red" : "yellow"
    },
    data: data.map((item) => item[serie.data]),
  }));

  const q_05 = useMemo(() => ({
    name: "q_05",
    stack: "q_05",
    type: "line",
    symbol: "none",
    tooltip: { show: false },
    lineStyle: { opacity: 1 },
    emphasis: { disabled: true },
    symbolSize: 0,
    data: rangeValues.q_05,
  }), [data]);

  const quart1 = useMemo(() => ({
    name: "quart1",
    stack: "q_05",
    symbol: "none",
    type: "line",
    data: rangeValues.quart1,
    ...rangeOpts,
    areaStyle: {
      ...rangeOpts.areaStyle,
      opacity: 0.4,
    },
  }), [data]);

  const quart2 = useMemo(() => ({
    name: "quart2",
    stack: "q_05",
    symbol: "none",
    type: "line",
    data: rangeValues.quart2,
    ...rangeOpts,
    areaStyle: {
      ...rangeOpts.areaStyle,
      opacity: 0.6,
    },
  }), [data]);

  const quart3 = useMemo(() => ({
    name: "quart3",
    stack: "q_05",
    symbol: "none",
    type: "line",
    data: rangeValues.quart3,
    ...rangeOpts,
    areaStyle: {
      ...rangeOpts.areaStyle,
      opacity: 0.8,
    },
  }), [data]);

  const q_95 = useMemo(() => ({
    name: "quart4",
    stack: "q_05",
    symbol: "none",
    type: "line",
    data: rangeValues.q_95,
    showInLegend: false,
    ...rangeOpts,
  }), [data]);

  const seriesData = baseSeries.concat([q_05, quart1, quart2, quart3, q_95]);
  const serieafficher = baseSeries.concat([quart1, quart2, quart3, q_95]);

  const myFullscreen = getFullscreenFeature(chart);
  const myExportToExcel = getExportToExcelFeature(saveToExcel);
  
  const {
    dataZoom: zoom,
    toolbox: {
      feature: { saveAsImage, dataZoom, restore, dataView },
    },
  } = defaultOptions;

  const { SeriesSelector, selectedLegend } = useSeriesSelector(
    serieafficher.map(s => s.name),
    serieafficher.map(s => s.name)
  );

  const options = useMemo(() => ({
    title: {
      text: "",
      left: "center",
      ...theme.title,
    },
    legend: {
      orient: "horizontal",
      zLevel: 23,
      width: "70%",
      bottom: "9%",
      type: "scroll",
      textStyle: {
        width: 150,
        rich: {
          fw600: {
            fontWeight: 600,
          },
        },
      },
      selected: selectedLegend,
      ...theme.legend,
    },
    grid: {
      right: "100px",
      top: "10%",
      bottom: "15%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: data.map((item) => moment(item.Date_VL).format("DD/MM/YYYY")),
      axisLabel: {
        hideOverlap: true,
        ...theme.xAxis.nameTextStyle,
      },
      ...theme.xAxis,
    },
    yAxis: {
      type: "value",
      min: yMin,
      axisLabel: {
        hideOverlap: true,
        ...theme.yAxis.nameTextStyle,
      },
      min: function (value) {
        return value?.min?.toFixed(2);
      },
      max: function (value) {
        return value?.max?.toFixed(2);
      },
      ...theme.yAxis,
    },
    tooltip: {
      trigger: "axis",
      textStyle: {
        overflow: "breakAll",
        width: 40,
      },
      confine: true,
      valueFormatter: (value) => value?.toFixed(2),
    },
    toolbox: {
      feature: {
        myFullscreen,
        myExportToExcel,
        saveAsImage,
        dataView: {
          show: true,
          readOnly: true,
          optionToContent: function (opt) {
            // On ne garde que les deux séries principales (DENOMINATION_OPCVM et Nom_Benchmark)
            const mainSeries = opt.series.filter(s => 
              s.name === opt.series[0].name || 
              s.name === opt.series[1].name
            );
            const xAxisData = opt.xAxis[0].data;
        
            // Construction des en-têtes
            const headers = `
              <tr>
                <th style="padding: 8px; font-size:15px; text-align: center; border: 1px solid #ddd; background-color: #f9f9f9;">Date</th>
                ${mainSeries
                  .map(
                    (serie) => `
                    <th style="padding: 8px; text-align: center; font-size:15px; border: 1px solid #ddd; background-color: #f9f9f9;">${serie.name}</th>
                  `
                  )
                  .join("")}
              </tr>
            `;
        
            // Construction des lignes de données
            const rows = xAxisData
              .map((date, index) => {
                const values = mainSeries
                  .map(
                    (serie) => `
                      <td style="padding: 8px; text-align: center; color: var(--primary-color); font-weight: bold; border: 1px solid #ddd;">
                        ${serie.data[index] !== undefined ? serie.data[index].toFixed(2) : "-"}
                      </td>
                    `
                  )
                  .join("");
                return `
                  <tr>
                    <td style="padding: 8px; text-align: center;  color: var(--primary-color); border: 1px solid #ddd;">${date}</td>
                    ${values}
                  </tr>
                `;
              })
              .join("");
        
            // Retour du tableau HTML
            return `
              <div style="padding: 10px; font-family: Arial, sans-serif; color: #333; overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse; border: 1px solid #ddd;">
                  <thead>${headers}</thead>
                  <tbody>${rows}</tbody>
                </table>
              </div>
            `;
          },
          backgroundColor: "#ffffff",
          textareaBorderColor: "#ddd",
          textColor: "#333",
          buttonTextColor: "#fff",
        },
        dataZoom,
        restore,
      },
      top: "20px",
    },
    dataZoom: zoom,
    series: seriesData,
  }), [data, allValues, seriesData, selectedLegend, theme]);
  useEffect(() => {
    const chartInstance = chart.current.getEchartsInstance();
  
    let refAjustB100 = 1;
    let refOpcB100 = 1;
    let startDate = null;
    let newSeriesData = [];
  
    chartInstance.on("datazoom", (params) => {
      if (data && data.length > 0) {
        const { start } = params;
        const startIndex = Math.floor((start * data.length) / 100);
  
        const firstZoomedData = data[startIndex];
        if (firstZoomedData) {
          refAjustB100 = firstZoomedData.ajust_b100 || 1;
          refOpcB100 = firstZoomedData.opc_b100 || 1;
          startDate = moment(firstZoomedData.Date_VL).format("DD/MM/YYYY");
  
          // Calculer les nouvelles séries en base 100
         
  
          // Mettre à jour le graphique avec les nouvelles données
          chartInstance.setOption({
            series: newSeriesData,
      
          });
        }
      }
    });
  
    return () => {
      chartInstance.off("datazoom");
    };
  }, [data, options.tooltip]);

  return (
    <Box className="relative">
      {showSeriesSelector && <SeriesSelector />}
      <ReactECharts
        option={options}
        key={JSON.stringify(options)}
        style={{
          minHeight: 500,
          ...style,
        }}
        ref={chart}
      />
    </Box>
  );
};

export default memo(PreQuantile);