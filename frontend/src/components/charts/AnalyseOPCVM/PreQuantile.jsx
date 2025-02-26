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
const quantileColors = {
  quart4: "#5500ff",
  quart3: "#5a5ad6",
  quart2: "#4a4ac8",
  quart1: "#8b8bc6"
};
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
    name: "",
    stack: "q_05",
    type: "line",
    tooltip: { show: false },
    lineStyle: { opacity: 0 },
    emphasis: { disabled: false },
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
    itemStyle: {
      color: quantileColors.quart1
    }
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
    itemStyle: {
      color: quantileColors.quart2
    }
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
    itemStyle: {
      color: quantileColors.quart3
    }
  }), [data]);

  const q_95 = useMemo(() => ({
    name: "quart4",
    stack: "q_05",
    symbol: "none",
    type: "line",
    data: rangeValues.q_95,
    showInLegend: false,
    ...rangeOpts,
    itemStyle: {
      color: quantileColors.quart4
    }
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

  // Configuration du dataZoom améliorée (comme dans AnalyseQuartile)
  const enhancedZoom = [
    {
      type: "slider",
      show: true,
      xAxisIndex: [0],
      start: 0,
      end: 100,
      textStyle: {
        fontSize: 11,
      },
      realtime: true,
      showDataShadow: false
    },
    {
      type: "inside",
      xAxisIndex: [0],
      start: 0,
      end: 100,
      realtime: true,
      showDataShadow: false
    }
  ];

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
    dataZoom: enhancedZoom, // Utilisation de la configuration améliorée
    series: seriesData,
  }), [data, allValues, seriesData, selectedLegend, theme]);

  useEffect(() => {
    const chartInstance = chart.current?.getEchartsInstance();
    if (!chartInstance || !data || data.length === 0) return;
    
    let startIndex = 0;
    
    const updateChartData = (startIdx) => {
      if (!data || !Array.isArray(data) || startIdx < 0 || startIdx >= data.length) {
        console.warn('Invalid data or start index in updateChartData');
        return;
      }
      
      const referenceData = data[startIdx];
      
      if (!referenceData || typeof referenceData !== 'object') {
        console.warn('Invalid reference data at index:', startIdx);
        return;
      }
      
      // Valeurs de référence pour les séries principales
      const refOpcB100 = referenceData.opc_b100 || 1;
      const refBencB100 = referenceData.benc_b100 || 1;
      const startDate = moment(referenceData.Date_VL).format("DD/MM/YYYY");
      
      // Mettre à jour les séries principales pour base 100 à partir du point de zoom
      const newSeriesData = seriesData.map(series => {
        // Ne mettre à jour que les séries principales, pas les quantiles
        if (series.name === data[0]["DENOMINATION_OPCVM"]) {
          return {
            ...series,
            data: data.map(item => ((item.opc_b100 / refOpcB100) * 100))
          };
        }
        if (series.name === data[0]["Nom_Benchmark"]) {
          return {
            ...series,
            data: data.map(item => ((item.benc_b100 / refBencB100) * 100))
          };
        }
        return series; // Retourner les autres séries inchangées (quantiles)
      });
      
      // Mettre à jour le graphique avec les nouvelles données
      chartInstance.setOption({
        series: newSeriesData,
        tooltip: {
          formatter: (params) => {
            if (!params || !Array.isArray(params) || params.length === 0) return '';
            
            const { dataIndex } = params[0];
            const currentData = data[dataIndex];
            if (!currentData) return '';
            
            const currentDate = moment(currentData.Date_VL).format("DD/MM/YYYY");
            const isStartDate = currentDate === startDate;
            
            const dateSection = `
              <div style="margin-bottom: 10px;">
                <div style="font-weight: bold;">Date de début: ${startDate}</div>
                <div style="font-weight: bold;">Date actuelle: ${currentDate}</div>
              </div>
            `;
            
            const itemsSection = params
              .filter(param => {
                // Ne montrer que les séries principales dans le tooltip
                return param.seriesName === data[0]["DENOMINATION_OPCVM"] || 
                       param.seriesName === data[0]["Nom_Benchmark"];
              })
              .map(param => {
                const baseValue = isStartDate ? "100.00" : param.value?.toFixed(2) || '-';
                return `
                  <div style="display: flex; align-items: center; margin-bottom: 2px;">
                    <span style="display: inline-block; width: 10px; height: 10px; background-color: ${param.color}; margin-right: 8px; border-radius: 50%;"></span>
                    <span style="flex: 1;">${param.seriesName}</span>
                    <span style="font-weight: bold; margin-left: 12px;">${baseValue}</span>
                  </div>
                `;
              })
              .join("");
            
            return dateSection + itemsSection;
          }
        }
      });
    };
    
    // Initialisation avec toutes les données
    updateChartData(0);
    
    // Gestionnaire unifié pour tous les événements de zoom
    const handleZoom = (params) => {
      if (!params || typeof params !== 'object') return;
      
      // Traitement pour zoom par lot (batch)
      if (params.batch) {
        const zoomInfo = params.batch[0];
        if (typeof zoomInfo?.start === 'number') {
          startIndex = Math.floor((zoomInfo.start * data.length) / 100);
          updateChartData(startIndex);
        }
        return;
      }
      
      // Traitement pour zoom simple
      if (typeof params.start === 'number') {
        startIndex = Math.floor((params.start * data.length) / 100);
        updateChartData(startIndex);
      }
    };
    
    // Écouter les événements de zoom
    chartInstance.on("datazoom", handleZoom);
    
    // Gestion des actions toolbox
    const handleToolboxAction = () => {
      const option = chartInstance.getOption();
      if (option && option.dataZoom && option.dataZoom.length > 0) {
        const zoomState = option.dataZoom[0];
        if (typeof zoomState.start === 'number') {
          const newStartIndex = Math.floor((zoomState.start * data.length) / 100);
          if (newStartIndex >= 0 && newStartIndex < data.length) {
            updateChartData(newStartIndex);
          }
        }
      }
    };
    
    // Écouter l'événement de restauration (reset)
    chartInstance.on("restore", () => {
      updateChartData(0);
    });
    
    // Écouter l'événement dataZoom du toolbox
    chartInstance.on("dataZoom", handleToolboxAction);
    
    return () => {
      chartInstance.off("datazoom", handleZoom);
      chartInstance.off("restore");
      chartInstance.off("dataZoom", handleToolboxAction);
    };
  }, [data, seriesData]); // Ajout de seriesData comme dépendance

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