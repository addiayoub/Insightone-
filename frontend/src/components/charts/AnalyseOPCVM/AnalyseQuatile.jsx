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
  data = [] 
}) => {
  const chart = useRef(null);
  const myFullscreen = getFullscreenFeature(chart);
  const myExportToExcel = getExportToExcelFeature(saveToExcel);
  const theme = useChartTheme();
  
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

    const { SeriesSelector, selectedLegend } = useSeriesSelector(seriesList, init);

    const {
      dataZoom: defaultZoom,
      toolbox: {
        feature: { saveAsImage, dataZoom, restore, dataView },
      },
    } = defaultOptions;

    // Configuration du dataZoom
    const zoom = [
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
            readOnly: true,
            optionToContent: function (opt) {
              if (!opt?.series || !opt?.xAxis?.[0]?.data) return '';
              
              const series = opt.series;
              const xAxisData = opt.xAxis[0].data;
      
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

              return `
                <div style="padding: 10px; font-family: Arial, sans-serif; color: #333;">
                  <table style="width: 100%; border-collapse: collapse; border: 3px solid #ddd;">
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
      },
      dataZoom: zoom,
      series: optionSeries || series.map((serie) => ({
        name:
          serie.name === "ajust_b100"
            ? "Perf ajustée de la classe"
            : (data?.[0]?.[serie.name] || serie.name),
        type: "line",
        data: (data || []).map((item) => item[serie.data]),
        symbol: "none",
      })),
      ...rest,
    };
  }, [data, options, theme, myFullscreen, myExportToExcel]);

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
      
      const refValues = {
        ajust_b100: referenceData.ajust_b100 ?? null,
        opc_b100: referenceData.opc_b100 ?? null,
        benc_b100: referenceData.benc_b100 ?? null
      };
      
      const newSeriesData = series.map(serie => {
        const serieData = data.map((item) => {
          const baseValue = refValues[serie.data];
          if (baseValue == null || !item[serie.data]) return null;
          return (item[serie.data] / baseValue) * 100;
        });

        return {
          name: serie.name === "ajust_b100"
            ? "Perf ajustée de la classe"
            : (data[0]?.[serie.name] || serie.name),
          type: "line",
          data: serieData,
          symbol: "none"
        };
      });
      
      chartInstance.setOption({
        series: newSeriesData,
        tooltip: {
          formatter: (params) => {
            if (!params || !Array.isArray(params) || params.length === 0) return '';
            
            const currentData = data[params[0].dataIndex];
            if (!currentData) return '';
            
            const startDate = moment(data[startIdx]?.Date_VL).format("DD/MM/YYYY");
            const currentDate = moment(currentData.Date_VL).format("DD/MM/YYYY");
            
            const items = params.map(param => ({
              seriesName: param.seriesName,
              value: param.value?.toFixed(2) || '-',
              color: param.color
            }));

            const dateSection = `
              <div style="margin-bottom: 10px;">
                <div style="font-weight: bold;">Date de début: ${startDate}</div>
                <div style="font-weight: bold;">Date actuelle: ${currentDate}</div>
              </div>
            `;

            const itemsSection = items.map(item => `
              <div style="display: flex; align-items: center; margin-bottom: 2px;">
                <span style="display: inline-block; width: 10px; height: 10px; background-color: ${item.color}; margin-right: 8px; border-radius: 50%;"></span>
                <span style="flex: 1;">${item.seriesName}</span>
                <span style="font-weight: bold; margin-left: 12px;">${item.value}</span>
              </div>
            `).join("");

            return dateSection + itemsSection;
          }
        }
      });
    };

    // Unified zoom handler for both slider and inside zoom
    const handleZoom = (params) => {
      if (!params || !params.batch) {
        // Handle non-batch zoom events
        if (typeof params?.start === 'number') {
          startIndex = Math.floor((params.start * data.length) / 100);
          updateChartData(startIndex);
        }
        return;
      }

      // Handle batch zoom events
      const zoomInfo = params.batch[0];
      if (typeof zoomInfo?.start === 'number') {
        startIndex = Math.floor((zoomInfo.start * data.length) / 100);
        updateChartData(startIndex);
      }
    };

    // Initialize chart
    if (data.length > 0) {
      updateChartData(0);
    }

    // Listen for all zoom events
    chartInstance.on("datazoom", handleZoom);
    
    // Solution pour le problème de dataZoom toolbox
    // Écouter les événements spécifiques du toolbox
    const handleToolboxAction = () => {
      // Récupérer l'état actuel du zoom après l'action toolbox
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
  }, [data, theme]); // Ajout de theme comme dépendance

  if (!data || data.length === 0) {
    return <Box className="relative">No data available</Box>;
  }

  return (
    <Box className="relative">
      {showSeriesSelector && <SeriesSelector />}
      <ReactECharts
        option={computedOptions}
        key={`${JSON.stringify(computedOptions)}-${theme ? JSON.stringify(Object.keys(theme)) : ''}`}
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