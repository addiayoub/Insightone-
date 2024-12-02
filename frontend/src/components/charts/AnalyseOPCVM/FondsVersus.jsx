import React, { memo, useMemo, useState, useCallback, useRef, useEffect } from "react";
import ReactECharts from "echarts-for-react";
import { generateRandomColorsArray } from "../../../utils/generateRandomColorsArray";
import { formatNumberWithSpaces } from "../../../utils/formatNumberWithSpaces";
import {
  defaultOptions,
  getFullscreenFeature,
  getExportToExcelFeature,
} from "../../../utils/chart/defaultOptions";
import useChartTheme from "../../../hooks/useChartTheme";
import useSeriesSelector from "../../../hooks/useSeriesSelector";
import { Box } from "@mui/material";

const initSaveToExcel = {
  show: false,
  data: [],
  fileName: new Date().getTime(),
};

const ScatterChart = ({
  options,
  style,
  onEvents,
  showSeriesSelector,
  saveToExcel = initSaveToExcel,
}) => {
  const chart = useRef(null);
  const myFullscreen = getFullscreenFeature(chart);
  const myExportToExcel = getExportToExcelFeature(saveToExcel);
  const theme = useChartTheme();
  const {
    title,
    grid,
    tooltip,
    xAxis,
    series,
    yAxis,
    legend,
    toolbox,
    seriesNames: { seriesList = [], init = seriesList } = {},
    ...rest
  } = options;
  const { SeriesSelector, selectedLegend } = useSeriesSelector(
    seriesList,
    init
  );
  const {
    toolbox: {
      feature: { saveAsImage, dataZoom, restore, dataView },
    },
  } = defaultOptions;
  const baseOptions = useMemo(() => {
    return {
      title: {
        ...(title ?? {}),
        ...theme.title,
      },
      legend: {
        orient: "vertical",
        zLevel: 23,
        height: 200,
        type: "scroll",
        right: 0,
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
      xAxis: {
        ...(xAxis ?? {}),
        axisLabel: {
          hideOverlap: true,
          ...xAxis?.axisLabel,
          ...theme.xAxis.nameTextStyle,
        },
        type: "value",
        nameLocation: "middle",
        nameGap: 30,
        nameTextStyle: {
          fontSize: 14,
          ...theme.xAxis.nameTextStyle,
        },
        ...theme.xAxis,
      },
      yAxis: Array.isArray(yAxis)
        ? yAxis.map((yAxisConfig) => ({
            ...yAxisConfig,
            type: "value",
            nameLocation: "middle",
            nameGap: 50,
            axisLabel: {
              hideOverlap: true,
              ...yAxisConfig?.axisLabel,
              ...theme.yAxis.nameTextStyle,
            },
            nameTextStyle: {
              fontSize: 14,
              ...theme.yAxis.nameTextStyle,
            },
            ...theme.yAxis,
          }))
        : [
            {
              ...yAxis,
              type: "value",
              nameLocation: "middle",
              nameGap: 50,
              axisLabel: {
                hideOverlap: true,
                ...yAxis?.axisLabel,
                ...theme.yAxis.nameTextStyle,
              },
              nameTextStyle: {
                fontSize: 14,
                ...theme.yAxis.nameTextStyle,
              },
              ...theme.yAxis,
            },
          ],
      grid: {
        bottom: "50",
        top: "10%",
        containLabel: true,
        ...(grid ?? {}),
      },
      tooltip: {
        trigger: "item",
        axisPointer: {
          type: "cross",
        },
        textStyle: {
          overflow: "breakAll",
          width: 40,
        },
        confine: true,
        valueFormatter: (value) => value?.toFixed(2) + "%",
        ...(tooltip ?? {}),
      },
      toolbox: {
        feature: {
          myFullscreen,
          myExportToExcel,
          dataZoom,
          restore,
          saveAsImage,
          dataView,
        },
        right: 0,
        top: "10px",
        ...(toolbox ?? {}),
      },
      series,
      ...rest,
    };
  }, [series, selectedLegend, options, theme]);
  return (
    <Box className="relative w-full">
      {showSeriesSelector && <SeriesSelector />}
      <ReactECharts
        option={baseOptions}
        key={JSON.stringify(baseOptions)}
        style={{
          minHeight: 400,
          ...style,
        }}
        ref={chart}
        onEvents={onEvents}
      />
    </Box>
  );
};

const FondsVersus = ({ data }) => {
  const [encoursSlicer, setEncoursSlicer] = useState([
    Math.min(...data.map(item => item.encours_OPC)),
    Math.max(...data.map(item => item.encours_OPC))
  ]);
  const [hiddenPoints, setHiddenPoints] = useState([]); 

  const sliderRef = useRef(null);
  const isDraggingRef = useRef(null);
  
  const minValue = Math.min(...data.map(item => item.encours_OPC));
  const maxValue = Math.max(...data.map(item => item.encours_OPC));
  const range = maxValue - minValue;

  const getPositionFromValue = useCallback((value) => {
    return ((value - minValue) / range) * 100;
  }, [minValue, range]);

  const getValueFromPosition = useCallback((position) => {
    const boundedPosition = Math.max(0, Math.min(position, 100));
    return minValue + (boundedPosition / 100) * range;
  }, [minValue, range]);

  const handleMouseDown = (index) => (e) => {
    e.preventDefault();
    isDraggingRef.current = index;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = useCallback((e) => {
    if (isDraggingRef.current === null || !sliderRef.current) return;

    const sliderRect = sliderRef.current.getBoundingClientRect();
    const position = 100 - (((e.clientY - sliderRect.top) / sliderRect.height) * 100);
    const value = getValueFromPosition(position);

    setEncoursSlicer(prev => {
      const newValues = [...prev];
      newValues[isDraggingRef.current] = value;
      
      if (isDraggingRef.current === 0) {
        newValues[0] = Math.min(newValues[0], newValues[1]);
      } else {
        newValues[1] = Math.max(newValues[0], newValues[1]);
      }
      
      return newValues;
    });
  }, [getValueFromPosition]);

  const handleMouseUp = useCallback(() => {
    isDraggingRef.current = null;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseMove]);

  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  const societeGes = useMemo(
    () => [...new Set(data.map((item) => item.Nom_Gerant))],
    [data]
  );
  
  const colors = useMemo(
    () => generateRandomColorsArray(societeGes.length),
    [societeGes]
  );

  const filteredData = useMemo(
    () =>
      data.filter(
        (item) =>
          item.encours_OPC >= encoursSlicer[0] &&
        item.encours_OPC <= encoursSlicer[1] &&
        !hiddenPoints.includes(item.denomination_OPCVM)
    ),
  [data, encoursSlicer, hiddenPoints]
);

  const formatedData = useMemo(() => {
    return filteredData.map((item) => [
      item.vol_opc * 100,
      item.perf_opc_3A * 100,
      item.encours_OPC,
      item.denomination_OPCVM,
      item.Nom_Gerant,
    ]);
  }, [filteredData]);

  const seriesNames = useMemo(
    () => [...new Set(filteredData.map((item) => item.Nom_Gerant))],
    [filteredData]
  );

  const seriesData = useMemo(
    () =>
      formatedData.map(([x, y, z, name, sg]) => ({
        name: sg,
        type: "effectScatter",
        symbol: "circle",
        rippleEffect: {
          period: 4,
        },
        symbolSize: function () {
          return Math.sqrt(z) / 10e2;
        },
        data: [[x, y, name, z]],
        itemStyle: {
          color: colors[societeGes.indexOf(sg)],
        },
      })),
    [formatedData, societeGes, colors]
  );

  const xValues = useMemo(() => filteredData.map((item) => item.vol_opc * 100), [
    filteredData,
  ]);
  const yValues = useMemo(
    () => filteredData.map((item) => item.perf_opc_3A * 100),
    [filteredData]
  );

  const axisValues = {
    x: [Math.min(...xValues), Math.max(...xValues)],
    y: [Math.min(...yValues), Math.max(...yValues)],
  };

  const options = useMemo(() => {
    return {
      title: {
        text: "Fonds versus catégorie",
        left: "center",
      },
      legend: {
        right: 0,
        top: "20%",
        formatter: function (name) {
          if (name.length > 25) {
            const newName = name.split(" ");
            return newName.join(" \n");
          }
          return name;
        },
      },
      grid: {
        right: "250px",
        left: "10px"
      },
      xAxis: {
        name: "Volatilité",
        nameGap: 30,
        min: axisValues.x[0],
        max: axisValues.x[1],
        axisLabel: {
          formatter: (value) => parseFloat(value).toFixed(2),
        },
      },
      yAxis: {
        name: "Performance 3 ans",
        min: axisValues.y[0],
        max:
          axisValues.y[0] === axisValues.y[1]
            ? axisValues.y[0] + 1
            : axisValues.y[1],
        nameGap: 30,
        axisLabel: {
          formatter: (value) => parseFloat(value).toFixed(2),
        },
      },
      seriesNames: { seriesList: seriesNames, init: seriesNames },
      tooltip: {
        trigger: "item",
        formatter: function (params) {
          const { seriesName, value } = params;
          return `<strong>${seriesName} - (${
            value[2]
          })</strong> <br /> Performance 3 ans: ${value[1].toFixed(
            2
          )}% <br /> Volatilité: ${value[0].toFixed(
            2
          )}%<br /> Encours: ${formatNumberWithSpaces(value[3])}`;
        },
      },
      series: seriesData,
    };
  }, [seriesData, filteredData, seriesNames, axisValues]);
  const handlePointClick = (params) => {
    const pointName = params.value[2];
    setHiddenPoints((prev) => [...prev, pointName]);
  };

  // Nouvelle implémentation de handleRestore
  const handleRestore = () => {
    // Réinitialiser les points cachés
    setHiddenPoints([]);
    
    // Réinitialiser les limites du slider à ses valeurs initiales
    setEncoursSlicer([minValue, maxValue]);
  };

  return (
    <div className="flex gap-4 ">
      <div className="w-16.2">
      <div style={{whiteSpace:"nowrap", marginTop:""}} className="flex flex-col text-sm text-gray-500 ">
          <div>{formatNumberWithSpaces(encoursSlicer[1])}</div>
        </div>
        <div className="relative h-[500px] mt-4  mx-auto">
          <div
            ref={sliderRef}
            className="absolute h-full w-2 bg-gray-200 rounded-full left-1/2 -translate-x-1/2"
          >
            <div
              className="absolute w-full bg-blue-500 rounded-full"
              style={{
                bottom: `${getPositionFromValue(encoursSlicer[0])}%`,
                top: `${100 - getPositionFromValue(encoursSlicer[1])}%`
              }}
            />
          </div>
          
          <div
            className="absolute h-4 w-4 bg-blue-600 rounded-full left-1/2 -translate-x-1/2 -mb-2 cursor-pointer"
            style={{ bottom: `${getPositionFromValue(encoursSlicer[0])}%` }}
            onMouseDown={handleMouseDown(0)}
          />
         
          <div
            className="absolute h-4 w-4 bg-blue-600 rounded-full left-1/2 -translate-x-1/2 -mb-2 cursor-pointer"
            style={{ bottom: `${getPositionFromValue(encoursSlicer[1])}%` }}
            onMouseDown={handleMouseDown(1)}
          />

          
        </div>
        
        <div style={{whiteSpace:"nowrap"}} className="flex flex-col text-sm text-gray-500 mt-2">
          <div>{formatNumberWithSpaces(encoursSlicer[0])}</div>
        </div>
      </div>
      <div className="flex-1">
        <ScatterChart
          options={options}
          onEvents={{ click: handlePointClick ,
            restore: handleRestore  // Ajout de l'événement de restauration
          }}
          style={{
            height: "500px",
            minWidth: "600px",
            width: "100%",
          }}
          saveToExcel={{
            data: filteredData,
            show: true,
            fileName: options.title.text,
          }}
          showSeriesSelector
        />
        
      </div>
    </div>
  );
};

export default memo(FondsVersus);
///////origin