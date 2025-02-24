import React, { memo, useRef, useEffect, useState, useCallback } from "react";
import ReactECharts from "echarts-for-react";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import useChartTheme from "../../hooks/useChartTheme";
import {
  getExportToExcelFeature,
  getFullscreenFeature,
} from "../../utils/chart/defaultOptions";

const CandlestickChart = ({ data }) => {
  const [chartData, setChartData] = useState(null);
  const chart = useRef(null);
  const { darkTheme } = useSelector((state) => state.theme);
  const themeColors = useChartTheme();
  
  const echartsInstance = useRef(null);
  const initialZoomRef = useRef({
    dataZoom: [{
      start: 0,
      end: 100
    }, {
      start: 0,
      end: 100
    }]
  });

  const onChartReady = useCallback((instance) => {
    echartsInstance.current = instance;
    instance.on('restore', () => {
      instance.setOption({
        dataZoom: initialZoomRef.current.dataZoom
      }, {
        replaceMerge: ['dataZoom']
      });
    });
  }, []);

  const myFullscreen = getFullscreenFeature(chart);
  const myExportToExcel = getExportToExcelFeature({
    show: true,
    data: data?.historical_data || [],
    fileName: `candlestick_data_${new Date().getTime()}`
  });

  useEffect(() => {
    if (data) {
      transformData(data);
    }
  }, [data, darkTheme]);

  const transformData = (data) => {
    if (!data.historical_data) {
      return;
    }

    const historicalData = data.historical_data;
    const historicalDates = historicalData.map(item => item.Date);

    const textColor = darkTheme ? '#ffffff' : '#333333';
    const gridColor = darkTheme ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
    
    const candlestickData = historicalData.map(item => [
      item.Open,
      item.Close,
      item.Low,
      item.High
    ]);
    
    const seriesData = [{
      name: 'Chandelier',
      type: 'candlestick',
      data: candlestickData,
      itemStyle: {
        color: '#ef232a',
        color0: '#14b143',
        borderColor: '#ef232a',
        borderColor0: '#14b143'
      }
    }];
    
    const legendData = ['Chandelier'];

    const options = {
      backgroundColor: darkTheme ? '#1a1a1a' : '#ffffff',
      
      title: {
        ...themeColors.title,
        text: "Graphique en Chandelier",
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
        },
        formatter: (params) => {
          const item = params[0];
          return `
            Date: ${item.axisValue}<br/>
            Ouverture: ${item.data[0]}<br/>
            Fermeture: ${item.data[1]}<br/>
            Plus bas: ${item.data[2]}<br/>
            Plus haut: ${item.data[3]}
          `;
        }
      },
      
      legend: {
        data: legendData,
        textStyle: {
          color: textColor
        },
        bottom: "10%",
        selected: legendData.reduce((acc, key) => ({ ...acc, [key]: true }), {})
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
        data: historicalDates,
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
        scale: true,
        min: 'dataMin',
        max: 'dataMax',
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
          }
        },
        {
          type: 'inside',
          xAxisIndex: [0],
          start: 0,
          end: 100
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
            buttonColor: '#ff4d4f',
            buttonTextColor: '#ffffff',
            optionToContent: function(opt) {
              if (!opt.series || !opt.xAxis || !historicalDates) return '';
              
              let tableContent = '<table style="width:100%; border-collapse:collapse;">';
              
              tableContent += '<tr>' +
                '<th style="border:1px solid ' + gridColor + '; padding:8px;">Date</th>' +
                '<th style="border:1px solid ' + gridColor + '; padding:8px;">Ouverture</th>' +
                '<th style="border:1px solid ' + gridColor + '; padding:8px;">Fermeture</th>' +
                '<th style="border:1px solid ' + gridColor + '; padding:8px;">Plus bas</th>' +
                '<th style="border:1px solid ' + gridColor + '; padding:8px;">Plus haut</th>' +
                '</tr>';
  
              const candlestickData = opt.series[0].data;
              
              for (let i = 0; i < historicalDates.length; i++) {
                if (candlestickData[i]) {
                  tableContent += '<tr>' +
                    '<td style="border:1px solid ' + gridColor + '; padding:8px;">' + historicalDates[i] + '</td>' +
                    '<td style="border:1px solid ' + gridColor + '; padding:8px;">' + candlestickData[i][0] + '</td>' +
                    '<td style="border:1px solid ' + gridColor + '; padding:8px;">' + candlestickData[i][1] + '</td>' +
                    '<td style="border:1px solid ' + gridColor + '; padding:8px;">' + candlestickData[i][2] + '</td>' +
                    '<td style="border:1px solid ' + gridColor + '; padding:8px;">' + candlestickData[i][3] + '</td>' +
                    '</tr>';
                }
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

export default memo(CandlestickChart);
//sto