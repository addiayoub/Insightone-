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
          dataView,
          dataZoom,
          restore,
        },
        top: "20px",
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
    
    let refAjustB100 = 1;
    let refOpcB100 = 1;
    let refBencB100 = 1;
    let startDate = null;
    
    chartInstance.on("datazoom", (params) => {
      if (data && data.length > 0) {
        const { start } = params;
        const startIndex = Math.floor((start * data.length) / 100);
        
        const firstZoomedData = data[startIndex];
        if (firstZoomedData) {
          refAjustB100 = firstZoomedData.ajust_b100 || 1;
          refOpcB100 = firstZoomedData.opc_b100 || 1;
          refBencB100 = firstZoomedData.benc_b100 || 1;
          startDate = moment(firstZoomedData.Date_VL).format("DD/MM/YYYY");
          
          console.log("Références calculées:", {
            date_debut: startDate,
            ajust_b100: refAjustB100,
            opc_b100: refOpcB100,
            benc_b100: refBencB100,
          });
          
          chartInstance.setOption({
            tooltip: {
              ...computedOptions.tooltip,
              formatter: (params) => {
                const { dataIndex } = params[0];
                const currentData = data[dataIndex];
                
                const items = [
                  {
                    seriesName: "Perf ajustée de la classe",
                    value: dataIndex === startIndex
                      ? 100
                      : ((currentData.ajust_b100 / refAjustB100) * 100).toFixed(2),
                    color: "#5470c6"
                  },
                  {
                    seriesName: "CPG PERFORMANCE",
                    value: dataIndex === startIndex
                      ? 100
                      : ((currentData.opc_b100 / refOpcB100) * 100).toFixed(2),
                    color: "#91cc75"
                  },
                  {
                    seriesName: "MASI RENTABILITE BRUT",
                    value: dataIndex === startIndex
                      ? 100
                      : ((currentData.benc_b100 / refBencB100) * 100).toFixed(2),
                    color: "#fac858"
                  }
                ];
  
                const dateSection = `
                  <div style="margin-bottom: 10px;">
                    <div style="font-weight: bold; ">Date de début: ${startDate}</div>
                    <div style="font-weight: bold; ">Date actuelle: ${moment(currentData.Date_VL).format("DD/MM/YYYY")}</div>
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
        }
      }
    });
    
    return () => {
      chartInstance.off("datazoom");
    };
  }, [data]);
  
////////origin
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