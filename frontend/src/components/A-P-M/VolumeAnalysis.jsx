import React, { memo, useRef, useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import { Box } from "@mui/material";
import useChartTheme from "../../hooks/useChartTheme";
import {
  getExportToExcelFeature,
  getFullscreenFeature,
} from "../../utils/chart/defaultOptions";
import { useSelector } from "react-redux";

const VolumeAnalysis = ({ data }) => {
  const [chartData, setChartData] = useState(null);
  const chart = useRef(null);
  const theme = useChartTheme();
  const { darkTheme } = useSelector((state) => state.theme);

  const myFullscreen = getFullscreenFeature(chart);
  const myExportToExcel = getExportToExcelFeature({
    show: true,
    data: [],
    fileName: `volume_data_${new Date().getTime()}`
  });

  const formatDate = (dateStr) => {
    const [day, month, year] = dateStr.split("-");
    return new Date(year, month - 1, day);
  };

  // Utiliser toutes les données au lieu des 20 dernières
  const getAllEntries = (data) => {
    return [...data].sort((a, b) => {
      const dateA = formatDate(a.Date);
      const dateB = formatDate(b.Date);
      return dateA - dateB;
    });
  };

  // Conserver les couleurs même après restauration
  const getBarColors = (dataLength) => {
    const colors = [];
    for (let i = 0; i < dataLength; i++) {
      colors.push(i % 2 === 0 ? '#109618' : '#dc3912');
    }
    return colors;
  };

  useEffect(() => {
    if (data) {
      transformData(data);
    }
  }, [data, darkTheme]);

  const transformData = (data) => {
    if (!data.historical_data) {
      return;
    }

    const textColor = darkTheme ? '#fff' : '#000';
    const gridColor = darkTheme ? '#666' : '#ddd';
    const backgroundColor = darkTheme ? '' : '#ffffff';

    // Utiliser toutes les données
    const allData = getAllEntries(data.historical_data);
    const volumeData = allData.map(item => item.Volume);
    const dates = allData.map(item => item.Date);
    
    // Générer les couleurs fixes pour toutes les barres
    const barColors = getBarColors(volumeData.length);

    const minVolume = 0;
    const maxVolume = Math.max(...volumeData) * 1.1;

    // Intégrer le thème pour conserver les styles après restauration
    const options = {
      backgroundColor: backgroundColor,
      title: {
        text: '',
        left: 'center',
        textStyle: {
          color: textColor
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: darkTheme ? '#6a7985' : '#888'
          }
        },
        backgroundColor: darkTheme ? 'rgba(50,50,50,0.9)' : 'rgba(255,255,255,0.9)',
        borderColor: gridColor,
        textStyle: {
          color: textColor
        },
        formatter: (params) => {
          return `
            <div style="margin-bottom: 10px; color: ${textColor}">
              <strong>Date: ${params[0].axisValue}</strong><br/>
              <span>Volume: ${(params[0].data / 1000000).toLocaleString()} millions</span>
            </div>
          `;
        }
      },
      xAxis: {
        type: 'category',
        data: dates,
        axisLabel: {
          hideOverlap: true,
          interval: Math.floor(dates.length / 20),
          rotate: 45,
          color: textColor,
          formatter: (value) => {
            const [day, month, year] = value.split("-");
            return `${day}/${month}/${year}`;
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: gridColor,
            type: 'dashed',
            opacity: 0.3
          }
        },
        axisLine: {
          lineStyle: {
            color: textColor
          }
        },
        nameTextStyle: {
          color: textColor
        }
      },
      yAxis: {
        type: 'value',
        scale: false,
        min: minVolume,
        max: maxVolume,
        axisLabel: {
          color: textColor,
          formatter: (value) => {
            return (value / 1000000).toFixed(2) + ' M';
          }
        },
        name: 'Volume (millions)',
        nameLocation: 'middle',
        nameGap: 50,
        nameTextStyle: {
          color: textColor
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: gridColor,
            type: 'solid',
            opacity: 0.5
          }
        },
        axisLine: {
          lineStyle: {
            color: textColor
          }
        }
      },
      grid: {
        right: "80px",
        top: "10%",
        bottom: "15%",
        left: "80px",
        containLabel: true,
      },
      dataZoom: [
        {
          type: "slider",
          show: true,
          xAxisIndex: [0],
          start: 0,
          end: 100,
          textStyle: {
            fontSize: 11,
            color: textColor
          },
          borderColor: textColor,
          backgroundColor: darkTheme ? 'rgba(47,69,84,0.3)' : 'rgba(225,225,225,0.3)',
          fillerColor: darkTheme ? 'rgba(167,183,204,0.2)' : 'rgba(47,69,84,0.2)',
          handleStyle: {
            color: textColor
          }
        },
        {
          type: "inside",
          xAxisIndex: [0],
          start: 0,
          end: 100
        }
      ],
      toolbox: {
        feature: {
          myFullscreen,
          myExportToExcel,
          saveAsImage: {
            iconStyle: {
              borderColor: textColor
            }
          },
          dataView: {
            show: true,
            readOnly: true,
            optionToContent: function (opt) {
              if (!allData) return '';
              
              const tableBgColor = darkTheme ? '#333' : '#fff';
              const tableTextColor = darkTheme ? '#fff' : '#000';
              const headerBgColor = darkTheme ? '#444' : '#f5f5f5';
              const borderColor = darkTheme ? '#666' : '#ddd';
              
              const headers = `
                <tr>
                  <th style="padding: 8px; font-size: 14px; text-align: center; border: 2px solid ${borderColor}; background-color: ${headerBgColor};">Date</th>
                  <th style="padding: 8px; font-size: 14px; text-align: center; border: 2px solid ${borderColor}; background-color: ${headerBgColor};">Volume (millions)</th>
                </tr>
              `;

              const rows = allData.map((item) => `
                <tr>
                  <td style="padding: 6px; text-align: center; border: 1px solid ${borderColor};">${item.Date}</td>
                  <td style="padding: 6px; text-align: center; border: 1px solid ${borderColor};">${(item.Volume / 1000000).toFixed(2)}</td>
                </tr>
              `).join('');

              return `
                <div style="max-height: 500px; overflow: auto; padding: 10px; font-family: Arial, sans-serif; background-color: ${tableBgColor}; color: ${tableTextColor}">
                  <table style="width: 100%; border-collapse: collapse; border: 2px solid ${borderColor};">
                    <thead>${headers}</thead>
                    <tbody>${rows}</tbody>
                  </table>
                </div>
              `;
            },
            backgroundColor: darkTheme ? "#333" : "#fff",
            textareaBorderColor: gridColor,
            textColor: textColor,
            buttonColor: "#1890ff",
            buttonTextColor: "#fff",
            iconStyle: {
              borderColor: textColor
            }
          },
          dataZoom: {
            iconStyle: {
              borderColor: textColor
            }
          },
          restore: {
            iconStyle: {
              borderColor: textColor
            }
          }
        },
        iconStyle: {
          borderColor: textColor
        }
      },
      legend: {
        textStyle: {
          color: textColor
        }
      },
      series: [
        {
          name: '',
          type: 'bar',
          data: volumeData,
          itemStyle: {
            // Utiliser le tableau de couleurs pré-généré
            color: (params) => barColors[params.dataIndex]
          },
          barWidth: '60%',
          label: {
            show: false,
            color: textColor
          }
        }
      ]
    };

    // Fusionner avec le thème de base pour la cohérence
    const mergedOptions = {
      ...theme,
      ...options
    };

    setChartData(mergedOptions);
  };

  return (
    <Box className="relative" sx={{ backgroundColor: darkTheme ? '#333333' : '#ffffff' }}>
      {chartData && (
        <ReactECharts
          option={chartData}
          style={{ height: 500 }}
          ref={chart}
          notMerge={true} // Empêche la fusion automatique qui pourrait réinitialiser les couleurs
          theme={darkTheme ? 'dark' : 'light'}
        />
      )}
    </Box>
  );
};

export default memo(VolumeAnalysis);