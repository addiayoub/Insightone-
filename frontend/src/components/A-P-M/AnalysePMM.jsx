import React, { memo, useRef, useEffect, useState, useCallback } from "react";
import ReactECharts from "echarts-for-react";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import useChartTheme from "../../hooks/useChartTheme";
import {
  defaultOptions,
  getExportToExcelFeature,
  getFullscreenFeature,
} from "../../utils/chart/defaultOptions";

const AnalysePMM = ({ data }) => {
  const [chartData, setChartData] = useState(null);
  const chart = useRef(null);
  const { darkTheme } = useSelector((state) => state.theme);
  const themeColors = useChartTheme();
  
  const echartsInstance = useRef(null);

  const onChartReady = useCallback((instance) => {
    echartsInstance.current = instance;
  }, []);

  const myFullscreen = getFullscreenFeature(chart);
  const myExportToExcel = getExportToExcelFeature({
    show: true,
    data: data?.historical_data || [],
    fileName: `price_data_${new Date().getTime()}`
  });

  useEffect(() => {
    if (data) {
      transformData(data);
    }
  }, [data, darkTheme]);

  const transformData = (data) => {
    if (!data.historical_data || !data.predictions) {
      return;
    }

    const historicalData = data.historical_data;
    const predictionData = data.predictions;

    const last30Historical = historicalData.slice(-30);
    const allHistorical = historicalData;

    const historicalDates = last30Historical.map(item => item.Date);
    const predictionDates = predictionData.map(item => item.Date);
    const allDates = [...historicalDates, ...predictionDates];
    const splitIndex = historicalDates.length - 1;

    const textColor = darkTheme ? '#ffffff' : '#333333';
    const gridColor = darkTheme ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
    const closeLineColor = darkTheme ? '#ffffff' : '#000000';
    const predictionColor = '#1890ff'; // Bleu pour la moyenne
    const minColor = '#ff0000'; // Rouge pour le minimum
    const maxColor = '#52c41a'; // Vert pour le maximum

    const closeValues = last30Historical.map(item => item.Close);
    const predictionMean = predictionData.map(item => item.Mean);
    const predictionMin = predictionData.map(item => item.Min);
    const predictionMax = predictionData.map(item => item.Max);

    const allValues = [
      ...closeValues,
      ...predictionMean,
      ...predictionMin,
      ...predictionMax
    ].filter(val => val !== null && val !== undefined);
    
    const minValue = Math.floor(Math.min(...allValues));
    const maxValue = Math.ceil(Math.max(...allValues));

    const seriesData = [
      {
        name: 'Close',
        type: 'line',
        data: closeValues,
        color: closeLineColor,
        symbol: 'none',
        lineStyle: { width: 2 }
      },
      {
        name: 'Moyen',
        type: 'line',
        data: [...Array(historicalDates.length - 1).fill(null), allHistorical[allHistorical.length - 1].Close, ...predictionMean.slice(1)],
        color: predictionColor,
        symbol: 'none',
        lineStyle: { width: 2 }
      },
      {
        name: 'Min',
        type: 'line',
        data: [...Array(historicalDates.length - 1).fill(null), allHistorical[allHistorical.length - 1].Close, ...predictionMin.slice(1)],
        color: minColor,
        symbol: 'none',
        lineStyle: { width: 1 }
      },
      {
        name: 'Max',
        type: 'line',
        data: [...Array(historicalDates.length - 1).fill(null), allHistorical[allHistorical.length - 1].Close, ...predictionMax.slice(1)],
        color: maxColor,
        symbol: 'none',
        lineStyle: { width: 1 }
        // Suppression de areaStyle pour enlever l'ombre
      },
      {
        name: 'Historique',
        type: 'line',
        silent: true,
        animation: false,
        data: Array(allDates.length).fill(null),
        markArea: {
          silent: true,
          data: [
            [{
              name: 'Historique',
              xAxis: allDates[0],
              itemStyle: {
                color: darkTheme ? 'rgba(80, 80, 80, 0.2)' : 'rgba(200, 200, 200, 0.2)'
              }
            }, {
              xAxis: allDates[splitIndex]
            }]
          ],
          label: {
            show: true,
            position: 'insideTop',
            distance: 5,
            color: textColor,
            fontWeight: 'bold',
            fontSize: 14
          }
        }
      },
      {
        name: 'Prédiction',
        type: 'line',
        silent: true,
        animation: false,
        data: Array(allDates.length).fill(null),
        markArea: {
          silent: true,
          data: [
            [{
              name: 'Prédiction',
              xAxis: allDates[splitIndex],
              itemStyle: {
              }
            }, {
              xAxis: allDates[allDates.length - 1]
            }]
          ],
          label: {
            show: true,
            position: 'insideTop',
            distance: 5,
            color: textColor,
            fontWeight: 'bold',
            fontSize: 14
          }
        }
      }
    ];

    const options = {
      backgroundColor: darkTheme ? '#1a1a1a' : '#ffffff',
      
      title: {
        ...themeColors.title,
        text: "Analyse des Prédictions",
        textStyle: {
          color: textColor,
          fontSize: 16
        }
      },  
      
      tooltip: {
        trigger: 'axis',
        backgroundColor: darkTheme ? 'rgba(50,50,50,0.9)' : 'rgba(255,255,255,0.9)',
        borderColor: gridColor,
        textStyle: {
          color: textColor
        }
      },
      
      legend: {
        data: ['Close', 'Moyen', 'Min', 'Max'],
        textStyle: {
          color: textColor
        },
        bottom: "10%",
        selected: {
          'Close': true,
          'Moyen': true,
          'Min': true,
          'Max': true
        }
      },
      
      grid: {
        top: 40,
        bottom: 90,
        left: 40,
        right: 40,
        containLabel: true
      },
      
      xAxis: {
        type: 'category',
        data: allDates,
        axisLabel: {
          color: textColor,
          rotate: 45
        },
        axisLine: {
          lineStyle: {
            color: gridColor
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: gridColor
          }
        }
      },
      
      yAxis: {
        type: 'value',
        min: minValue,
        max: maxValue,
        axisLabel: {
          color: textColor
        },
        axisLine: {
          lineStyle: {
            color: gridColor
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: gridColor
          }
        }
      },
      
      dataZoom: [
        {
          type: 'slider',
          show: true,
          xAxisIndex: [0],
          start: 0,
          end: 100,
          bottom: 10,
          textStyle: {
            color: textColor
          },
          borderColor: gridColor,
          backgroundColor: darkTheme ? 'rgba(47,69,84,0.3)' : 'rgba(225,225,225,0.3)',
          fillerColor: darkTheme ? 'rgba(167,183,204,0.2)' : 'rgba(47,69,84,0.2)',
          handleStyle: {
            color: textColor
          },
          zoomOnMouseWheel: 'shift'
        },
        {
          type: 'inside',
          xAxisIndex: [0],
          minSpan: 5,
          maxSpan: 100,
          zoomOnMouseWheel: true,
          moveOnMouseMove: true,
          moveOnMouseWheel: true
        }
      ],
      
      toolbox: {
        feature: {
          myFullscreen,
          myExportToExcel,
          dataView: {
            show: true,
            readOnly: true,
            backgroundColor: darkTheme ? '#1a1a1a' : '#ffffff',
            textareaColor: darkTheme ? '#1a1a1a' : '#ffffff',
            textareaBorderColor: gridColor,
            textColor: textColor,
            buttonColor: predictionColor,
            buttonTextColor: '#ffffff',
            optionToContent: function(opt) {
              if (!opt.series || !opt.xAxis || !allDates) return '';
              
              let tableContent = '<table style="width:100%; border-collapse:collapse;">';
              
              tableContent += '<tr>' +
                '<th style="border:1px solid ' + gridColor + '; padding:8px;">Date</th>' +
                '<th style="border:1px solid ' + gridColor + '; padding:8px;">Close</th>' +
                '<th style="border:1px solid ' + gridColor + '; padding:8px;">Moyen</th>' +
                '<th style="border:1px solid ' + gridColor + '; padding:8px;">Min</th>' +
                '<th style="border:1px solid ' + gridColor + '; padding:8px;">Max</th>' +
                '</tr>';
  
              const closeData = opt.series[0].data;
              const meanData = opt.series[1].data;
              const minData = opt.series[2].data;
              const maxData = opt.series[3].data;

              for (let i = 0; i < allDates.length; i++) {
                const close = closeData[i] !== null ? Number(closeData[i]).toFixed(2) : '-';
                const mean = meanData[i] !== null ? Number(meanData[i]).toFixed(2) : '-';
                const min = minData[i] !== null ? Number(minData[i]).toFixed(2) : '-';
                const max = maxData[i] !== null ? Number(maxData[i]).toFixed(2) : '-';

                tableContent += '<tr>' +
                  '<td style="border:1px solid ' + gridColor + '; padding:8px;">' + allDates[i] + '</td>' +
                  '<td style="border:1px solid ' + gridColor + '; padding:8px;">' + close + '</td>' +
                  '<td style="border:1px solid ' + gridColor + '; padding:8px;">' + mean + '</td>' +
                  '<td style="border:1px solid ' + gridColor + '; padding:8px;">' + min + '</td>' +
                  '<td style="border:1px solid ' + gridColor + '; padding:8px;">' + max + '</td>' +
                  '</tr>';
              }
  
              tableContent += '</table>';
  
              return '<div style="max-height:500px;overflow:auto;padding:10px;color:' + textColor + ';background-color:' + (darkTheme ? '#1a1a1a' : '#ffffff') + ';">' + tableContent + '</div>';
            }
          },
          saveAsImage: {
            backgroundColor: darkTheme ? '#1a1a1a' : '#ffffff'
          },
          dataZoom: {},
          restore: {}
        },
        right: 20
      },
      
      series: seriesData
    };

    setChartData(options);
  };

  return (
    <Box className="relative" sx={{ backgroundColor: darkTheme ? '#1a1a1a' : '#ffffff' }}>
      {chartData && (
        <ReactECharts
          option={chartData}
          style={{ height: 500 }}
          ref={chart}
          theme={darkTheme ? 'dark' : null}
          onChartReady={onChartReady}
          notMerge={true}
        />
      )}
    </Box>
  );
};

export default memo(AnalysePMM);