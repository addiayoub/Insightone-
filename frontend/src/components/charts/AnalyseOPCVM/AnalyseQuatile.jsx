import React, { memo, useMemo, useRef, useEffect } from "react";
import ReactECharts from "echarts-for-react";
import moment from "moment";
import {
  defaultOptions,
  getExportToExcelFeature,
  getFullscreenFeature,
} from "../../../utils/chart/defaultOptions";
import useChartTheme from "../../../hooks/useChartTheme";
import useSeriesSelector from "../../../hooks/useSeriesSelector";
import { Box } from "@mui/material";

const initSaveToExcel = {
  show: false,
  data: [],
  fileName: new Date().getTime(),
};

const series = [
  { name: "ajust_b100", data: "ajust_b100" },
  { name: "DENOMINATION_OPCVM", data: "opc_b100" },
  { name: "Nom_Benchmark", data: "benc_b100" },
];

const AnalyseQuartile = ({ 
  options, 
  style, 
  showSeriesSelector, 
  saveToExcel = initSaveToExcel, 
  data 
}) => {
  const chart = useRef(null);
  const myFullscreen = getFullscreenFeature(chart);
  const myExportToExcel = getExportToExcelFeature(saveToExcel);
  const theme = useChartTheme();
  const { show, data: excelData, fileName } = saveToExcel;
  
  const allValues = useMemo(
    () => series.map((serie) => (data || []).map((item) => item[serie.data])).flat(),
    [data]
  );
  
  const computedOptions = useMemo(() => {
    const baseOptions = options || {};
    const {
      title,
      grid,
      tooltip,
      xAxis,
      series: optionSeries,
      yAxis,
      legend,
      seriesNames: { seriesList = [], init = seriesList } = {},
      ...rest
    } = baseOptions;

    const { SeriesSelector, selectedLegend } = useSeriesSelector(
      seriesList,
      init
    );

    const {
      dataZoom: zoom,
      toolbox: {
        feature: { saveAsImage, dataZoom, restore, dataView },
      },
    } = defaultOptions;

    // Modifier la configuration de dataZoom pour ajouter un événement
    zoom.forEach(item => {
      item.realtime = true;
      item.showDataShadow = false;
    });

    return {
      title: {
        ...(title ?? {
          text: "",
          left: "center",
        }),
        ...theme.title,
      },
      xAxis: {
        type: "category",
        data: (data || []).map((item) => moment(item.Date_VL).format("DD/MM/YYYY")),
        ...(xAxis ?? {}),
        axisLabel: {
          hideOverlap: true,
          ...(xAxis?.axisLabel ?? {}),
          ...theme.xAxis.nameTextStyle,
        },
        ...theme.xAxis,
      },
      yAxis: {
        type: "value",
        min: Math.trunc(Math.min(...allValues)),
        ...(yAxis ?? {}),
        axisLabel: {
          hideOverlap: true,
          ...(yAxis?.axisLabel ?? {}),
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
        ...(legend ?? {}),
        ...theme.legend,
      },
      grid: {
        right: "100px",
        top: "10%",
        bottom: "15%",
        containLabel: true,
        ...(grid ?? {
          right: "80px",
        }),
      },
      tooltip: {
        trigger: "axis",
        textStyle: {
          overflow: "breakAll",
          width: 40,
        },
        confine: true,
        valueFormatter: (value) => value?.toFixed(2),
        ...(tooltip ?? {}),
      },
      toolbox: {
        feature: {
          myFullscreen,
          myExportToExcel,
          saveAsImage,
          dataView: {
            show: true,
            readOnly: true, // Empêcher l'édition directe pour garder un aperçu des données
            optionToContent: function (opt) {
              // Extraire les données des séries et les dates
              const series = opt.series;
              const xAxisData = opt.xAxis[0].data;
      
              // Construire les en-têtes des colonnes
              const headers = `
                <tr>
                  <th style="padding: 3px; font-size:15px; text-align: center; border: 3px solid #ddd; background-color: #f9f9f9;">Date</th>
                  ${series
                    .map(
                      (serie) => `
                      <th style="padding: 5px; text-align: center; font-size:15px; border: 3px solid #ddd; background-color: #f9f9f9;">${serie.name}</th>
                    `
                    )
                    .join("")}
                </tr>
              `;
      
              // Construire les lignes des données
              const rows = xAxisData
                .map((date, index) => {
                  const values = series
                    .map(
                      (serie) => `
                        <td style="padding: 8px; text-align: center; color: var(--primary-color);font-weight: bold; border: 3px solid #ddd;">
                          ${serie.data[index]?.toFixed(2) ?? "-"}
                        </td>
                      `
                    )
                    .join("");
                  return `
                    <tr>
                      <td style="padding: 8px; text-align: center; color: var(--primary-color) ;border: 3px solid #ddd;">${date}</td>
                      ${values}
                    </tr>
                  `;
                })
                .join("");
              // Retourner le tableau HTML complet
              return `
                <div style="padding: 10px; font-family: Arial, sans-serif; color: #333;">
                  <table style="width: 100%; border-collapse: collapse; border: 3px solid #ddd;">
                    <thead>${headers}</thead>
                    <tbody>${rows}</tbody>
                  </table>
                </div>
              `;
            },
            backgroundColor: "#ffffff", // Couleur de fond
            textareaBorderColor: "#ddd", // Bordures des champs de texte
            textColor: "#333", // Couleur du texte
            buttonTextColor: "#fff", // Couleur du texte des boutons
          },
          dataZoom,
          restore,
        },
      },
      
      dataZoom: zoom,
      series: optionSeries || series.map((serie) => ({
        name:
          serie.name === "ajust_b100"
            ? "Perf ajustée de la classe"
            : (data && data[0] && data[0][serie.name]) || serie.name,
        type: "line",
        data: (data || []).map((item) => item[serie.data]),
        symbol: "none",
      })),
      ...rest,
    };
  }, [series, data, options, allValues, theme]);

  useEffect(() => {
    const chartInstance = chart.current.getEchartsInstance();
    let startIndex = 0;
    // DataZoom handler
    chartInstance.on("datazoom", (params) => {
      const { start } = params;
      startIndex = Math.floor((start * data.length) / 100);
    });
    
    return () => {
      chartInstance.off("datazoom");
    };
  }, [data]);
    return (
    <Box className="relative">
      {showSeriesSelector && <SeriesSelector />}
      <ReactECharts
        option={computedOptions}
        key={JSON.stringify(computedOptions)}
        style={{
          minHeight: 500,
          ...style,
        }}
        ref={chart}
      />
    </Box>
  );
};

export default memo(AnalyseQuartile);