import React, { useRef, useCallback } from 'react';
import ReactECharts from "echarts-for-react";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import useChartTheme from "../../hooks/useChartTheme";
import {
  defaultOptions,
  getExportToExcelFeature,
  getFullscreenFeature,
} from "../../utils/chart/defaultOptions";

// Composant principal qui va contenir les quatre graphiques
const BacktestCharts = ({ backtestData }) => {
  // Vérifier si les données nécessaires sont disponibles
  if (!backtestData || !backtestData.backtest_response || !backtestData.backtest_response.transactions_df) {
    return <div className="p-4 text-center text-gray-500">Aucune donnée de backtest disponible</div>;
  }

  // Récupérer les données de transactions
  const transactions = backtestData.backtest_response.transactions_df;
  const chartTheme = useChartTheme();
  const { darkTheme } = useSelector((state) => state.theme);

  return (
    <div className="mt-4 space-y-6">
      <h2 className="text-xl font-bold">Résultats détaillés du Backtest</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MontantChart transactions={transactions} chartTheme={chartTheme} darkTheme={darkTheme} />
        <CapitalChart transactions={transactions} chartTheme={chartTheme} darkTheme={darkTheme} />
        <ActionsChart transactions={transactions} chartTheme={chartTheme} darkTheme={darkTheme} />
        <PrixChart transactions={transactions} chartTheme={chartTheme} darkTheme={darkTheme} />
      </div>
    </div>
  );
};

// Composant pour le graphique de Montant
// Composant pour le graphique de Montant
const MontantChart = ({ transactions, chartTheme, darkTheme }) => {
    // Référence au graphique pour fullscreen
    const chartRef = useRef(null);
    const echartsInstance = useRef(null);
  
    const onChartReady = useCallback((instance) => {
      echartsInstance.current = instance;
    }, []);
  
    // Préparer les données pour le graphique
    const dates = transactions.map(t => t.Date);
    const montants = transactions.map(t => t.Montant);
    
    // Récupération des fonctionnalités du toolbox
    const myFullscreen = getFullscreenFeature(chartRef);
    const myExportToExcel = getExportToExcelFeature({
      show: true,
      data: transactions,
      fileName: `montant_backtest_${new Date().getTime()}`
    });
  
    const textColor = darkTheme ? '#ffffff' : '#333333';
    const gridColor = darkTheme ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
    
    const options = {
      ...defaultOptions,
      backgroundColor: darkTheme ? '#1a1a1a' : '#ffffff',
      tooltip: {
        trigger: 'axis',
        formatter: function(params) {
          const value = params[0].value;
          return `${params[0].name}: ${new Intl.NumberFormat('fr-FR').format(value)}`;
        },
        backgroundColor: darkTheme ? 'rgba(50,50,50,0.9)' : 'rgba(255,255,255,0.9)',
        borderColor: gridColor,
        textStyle: {
          color: textColor
        }
      },
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
            buttonColor: '#1890ff',
            buttonTextColor: '#ffffff',
            optionToContent: function(opt) {
              if (!opt.series || !opt.xAxis) return '';
              
              // Obtenir toutes les clés des transactions pour les en-têtes
              const allKeys = Object.keys(transactions[0] || {});
              
              let tableContent = '<table style="width:100%; border-collapse:collapse;">';
              
              // Créer les en-têtes du tableau avec toutes les clés
              tableContent += '<tr>';
              allKeys.forEach(key => {
                tableContent += '<th style="border:1px solid ' + gridColor + '; padding:8px;">' + key + '</th>';
              });
              tableContent += '</tr>';
  
              // Ajouter toutes les données pour chaque transaction
              for (let i = 0; i < transactions.length; i++) {
                tableContent += '<tr>';
                allKeys.forEach(key => {
                  const value = transactions[i][key];
                  const displayValue = value !== null && value !== undefined ? 
                    (typeof value === 'number' ? 
                      new Intl.NumberFormat('fr-FR', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      }).format(value) : 
                      value) : 
                    '-';
                  
                  tableContent += '<td style="border:1px solid ' + gridColor + '; padding:8px;">' + displayValue + '</td>';
                });
                tableContent += '</tr>';
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
      xAxis: {
        type: 'category',
        data: dates,
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
        axisLabel: {
          color: textColor,
          formatter: (value) => new Intl.NumberFormat('fr-FR').format(value)
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
      series: [
        {
          name: 'Montant',
          type: 'line',
          data: montants,
          color: '#8884d8',
          symbol: 'none',
          lineStyle: { width: 2 }
        }
      ]
    };
  
    return (
      <Box className="p-4 rounded-lg shadow" sx={{ backgroundColor: darkTheme ? '#1a1a1a' : '#ffffff' }}>
        <h3 className="text-lg font-semibold mb-4" style={{ color: textColor }}>Évolution des Montants</h3>
        <ReactECharts 
          option={options} 
          theme={darkTheme ? 'dark' : null}
          style={{ height: '300px', width: '100%' }}
          ref={chartRef}
          onChartReady={onChartReady}
          notMerge={true}
        />
      </Box>
    );
  };

// Composant pour le graphique de Capital
const CapitalChart = ({ transactions, chartTheme, darkTheme }) => {
  // Référence au graphique pour fullscreen
  const chartRef = useRef(null);
  const echartsInstance = useRef(null);
  const actions = transactions.map(t => t.Actions);

  const onChartReady = useCallback((instance) => {
    echartsInstance.current = instance;
  }, []);

  // Préparer les données pour le graphique
  const dates = transactions.map(t => t.Date);
  const capitals = transactions.map(t => t.Capital);
  
  // Récupération des fonctionnalités du toolbox
  const myFullscreen = getFullscreenFeature(chartRef);
  const myExportToExcel = getExportToExcelFeature({
    show: true,
    data: transactions,
    fileName: `capital_backtest_${new Date().getTime()}`
  });

  const textColor = darkTheme ? '#ffffff' : '#333333';
  const gridColor = darkTheme ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
  
  const options = {
    ...defaultOptions,
    backgroundColor: darkTheme ? '#1a1a1a' : '#ffffff',
    tooltip: {
      trigger: 'axis',
      formatter: function(params) {
        const value = params[0].value;
        return `${params[0].name}: ${new Intl.NumberFormat('fr-FR').format(value)}`;
      },
      backgroundColor: darkTheme ? 'rgba(50,50,50,0.9)' : 'rgba(255,255,255,0.9)',
      borderColor: gridColor,
      textStyle: {
        color: textColor
      }
    },
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
          buttonColor: '#1890ff',
          buttonTextColor: '#ffffff',
          optionToContent: function(opt) {
            if (!opt.series || !opt.xAxis) return '';
            
            let tableContent = '<table style="width:100%; border-collapse:collapse;">';
            
            tableContent += '<tr>' +
              '<th style="border:1px solid ' + gridColor + '; padding:8px;">Date</th>' +
              '<th style="border:1px solid ' + gridColor + '; padding:8px;">Capital</th>' +
              '</tr>';

            const data = opt.series[0].data;

            for (let i = 0; i < dates.length; i++) {
              const capital = data[i] !== null ? Number(data[i]).toFixed(2) : '-';

              tableContent += '<tr>' +
                '<td style="border:1px solid ' + gridColor + '; padding:8px;">' + dates[i] + '</td>' +
                '<td style="border:1px solid ' + gridColor + '; padding:8px;">' + capital + '</td>' +
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
    xAxis: {
      type: 'category',
      data: dates,
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
      axisLabel: {
        color: textColor,
        formatter: (value) => new Intl.NumberFormat('fr-FR').format(value)
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
    series: [
      {
        name: 'Capital',
        type: 'line',
        data: capitals,
        color: '#82ca9d',
        symbol: 'none',
        lineStyle: { width: 2 }
      }
    ]
  };

  return (
    <Box className="p-4 rounded-lg shadow" sx={{ backgroundColor: darkTheme ? '#1a1a1a' : '#ffffff' }}>
      <h3 className="text-lg font-semibold mb-4" style={{ color: textColor }}>Évolution du Capital</h3>
      <ReactECharts 
        option={options} 
        theme={darkTheme ? 'dark' : null}
        style={{ height: '300px', width: '100%' }}
        ref={chartRef}
        onChartReady={onChartReady}
        notMerge={true}
      />
    </Box>
  );
};

// Composant pour le graphique d'Actions
const ActionsChart = ({ transactions, chartTheme, darkTheme }) => {
  // Référence au graphique pour fullscreen
  const chartRef = useRef(null);
  const echartsInstance = useRef(null);

  const onChartReady = useCallback((instance) => {
    echartsInstance.current = instance;
  }, []);

  // Préparer les données pour le graphique
  const dates = transactions.map(t => t.Date);
  const actions = transactions.map(t => t.Actions);
  
  // Récupération des fonctionnalités du toolbox
  const myFullscreen = getFullscreenFeature(chartRef);
  const myExportToExcel = getExportToExcelFeature({
    show: true,
    data: transactions,
    fileName: `actions_backtest_${new Date().getTime()}`
  });

  const textColor = darkTheme ? '#ffffff' : '#333333';
  const gridColor = darkTheme ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
  
  const options = {
    ...defaultOptions,
    backgroundColor: darkTheme ? '#1a1a1a' : '#ffffff',
    tooltip: {
      trigger: 'axis',
      formatter: function(params) {
        const value = params[0].value;
        return `${params[0].name}: ${new Intl.NumberFormat('fr-FR').format(value)}`;
      },
      backgroundColor: darkTheme ? 'rgba(50,50,50,0.9)' : 'rgba(255,255,255,0.9)',
      borderColor: gridColor,
      textStyle: {
        color: textColor
      }
    },
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
          buttonColor: '#1890ff',
          buttonTextColor: '#ffffff',
          optionToContent: function(opt) {
            if (!opt.series || !opt.xAxis) return '';
            
            let tableContent = '<table style="width:100%; border-collapse:collapse;">';
            
            tableContent += '<tr>' +
              '<th style="border:1px solid ' + gridColor + '; padding:8px;">Date</th>' +
              '<th style="border:1px solid ' + gridColor + '; padding:8px;">Actions</th>' +
              '</tr>';

            const data = opt.series[0].data;

            for (let i = 0; i < dates.length; i++) {
              const action = data[i] !== null ? Number(data[i]).toFixed(2) : '-';

              tableContent += '<tr>' +
                '<td style="border:1px solid ' + gridColor + '; padding:8px;">' + dates[i] + '</td>' +
                '<td style="border:1px solid ' + gridColor + '; padding:8px;">' + action + '</td>' +
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
    xAxis: {
      type: 'category',
      data: dates,
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
      axisLabel: {
        color: textColor,
        formatter: (value) => new Intl.NumberFormat('fr-FR').format(value)
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
    series: [
      {
        name: 'Actions',
        type: 'line',
        data: actions,
        color: '#ff7300',
        symbol: 'none',
        lineStyle: { width: 2 }
      }
    ]
  };

  return (
    <Box className="p-4 rounded-lg shadow" sx={{ backgroundColor: darkTheme ? '#1a1a1a' : '#ffffff' }}>
      <h3 className="text-lg font-semibold mb-4" style={{ color: textColor }}>Nombre d'Actions</h3>
      <ReactECharts 
        option={options} 
        theme={darkTheme ? 'dark' : null}
        style={{ height: '300px', width: '100%' }}
        ref={chartRef}
        onChartReady={onChartReady}
        notMerge={true}
      />
    </Box>
  );
};

// NOUVEAU: Composant pour le graphique de Prix
const PrixChart = ({ transactions, chartTheme, darkTheme }) => {
  // Référence au graphique pour fullscreen
  const chartRef = useRef(null);
  const echartsInstance = useRef(null);
  const actions = transactions.map(t => t.Actions);

  const onChartReady = useCallback((instance) => {
    echartsInstance.current = instance;
  }, []);

  // Préparer les données pour le graphique
  const dates = transactions.map(t => t.Date);
  
  // Supposons que les prix sont disponibles dans les transactions sous "Prix"
  // Si ce n'est pas le cas, remplacez "Prix" par le bon champ ou calculez-le
  const prix = transactions.map(t => t.Prix || (t.Montant && t.Actions ? (t.Montant / t.Actions) : null));
  
  // Récupération des fonctionnalités du toolbox
  const myFullscreen = getFullscreenFeature(chartRef);
  const myExportToExcel = getExportToExcelFeature({
    show: true,
    data: transactions.map((t, index) => ({
      Date: t.Date,
      Prix: prix[index]
    })),
    fileName: `prix_backtest_${new Date().getTime()}`
  });

  const textColor = darkTheme ? '#ffffff' : '#333333';
  const gridColor = darkTheme ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
  
  const options = {
    ...defaultOptions,
    backgroundColor: darkTheme ? '#1a1a1a' : '#ffffff',
    tooltip: {
      trigger: 'axis',
      formatter: function (params) {
        const value = params[0].value;
        if (value === null || value === undefined) return `${params[0].name}: N/A`;
        return `${params[0].name}: ${new Intl.NumberFormat('fr-FR', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }).format(value)}`;
      },
      backgroundColor: darkTheme ? 'rgba(50,50,50,0.9)' : 'rgba(255,255,255,0.9)',
      borderColor: gridColor,
      textStyle: {
        color: textColor
      }
    },
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
          buttonColor: '#1890ff',
          buttonTextColor: '#ffffff',
          optionToContent: function (opt) {
            if (!opt.series || !opt.xAxis) return '';
  
            let tableContent = '<table style="width:100%; border-collapse:collapse;">';
            tableContent += '<tr>' +
              '<th style="border:1px solid ' + gridColor + '; padding:8px;">Date</th>' +
              '<th style="border:1px solid ' + gridColor + '; padding:8px;">Prix</th>' +
              '</tr>';
  
            const data = opt.series[0].data;
  
            for (let i = 0; i < dates.length; i++) {
              const prixValue = data[i] !== null && data[i] !== undefined ?
                new Intl.NumberFormat('fr-FR', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                }).format(data[i]) :
                'N/A';
  
              tableContent += '<tr>' +
                '<td style="border:1px solid ' + gridColor + '; padding:8px;">' + dates[i] + '</td>' +
                '<td style="border:1px solid ' + gridColor + '; padding:8px;">' + prixValue + '</td>' +
                '</tr>';
            }
  
            tableContent += '</table>';
  
            return '<div style="max-height:500px;overflow:auto;padding:10px;color:' +
              textColor + ';background-color:' + (darkTheme ? '#1a1a1a' : '#ffffff') + ';">' +
              tableContent + '</div>';
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
    xAxis: {
      type: 'category',
      data: dates,
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
      axisLabel: {
        color: textColor,
        formatter: (value) =>
          new Intl.NumberFormat('fr-FR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          }).format(value)
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
    series: [
      {
        name: 'Prix',
        type: 'line',
        data: prix,
        color: 'red',
        symbol: 'none',
        lineStyle: { width: 2 },
        markPoint: {
          data: [
            { type: 'max', name: 'Max' },
            { type: 'min', name: 'Min' }
          ],
          label: {
            color: textColor
          }
        }
      }
    ]
  };
  

  return (
    <Box className="p-4 rounded-lg shadow" sx={{ backgroundColor: darkTheme ? '#1a1a1a' : '#ffffff' }}>
      <h3 className="text-lg font-semibold mb-4" style={{ color: textColor }}>Évolution du Prix</h3>
      <ReactECharts 
        option={options} 
        theme={darkTheme ? 'dark' : null}
        style={{ height: '300px', width: '100%' }}
        ref={chartRef}
        onChartReady={onChartReady}
        notMerge={true}
      />
    </Box>
  );
};

export default BacktestCharts;