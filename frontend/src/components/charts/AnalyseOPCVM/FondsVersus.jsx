import React, { memo, useMemo, useState, useCallback, useRef, useEffect } from "react";
import { generateRandomColorsArray } from "../../../utils/generateRandomColorsArray";
import { formatNumberWithSpaces } from "../../../utils/formatNumberWithSpaces";
import ScatterChart from "../Default/ScatterChart";

const FondsVersus = ({ data }) => {
  const [encoursSlicer, setEncoursSlicer] = useState([
    Math.min(...data.map(item => item.encours_OPC)),
    Math.max(...data.map(item => item.encours_OPC))
  ]);
  
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
    // Changed to use clientY and height for vertical slider
    const position = 100 - (((e.clientY - sliderRect.top) / sliderRect.height) * 100);
    const value = getValueFromPosition(position);

    setEncoursSlicer(prev => {
      const newValues = [...prev];
      newValues[isDraggingRef.current] = value;
      
      // Ensure handles don't cross
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

  // Rest of your existing code for charts and data processing remains exactly the same
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
          item.encours_OPC <= encoursSlicer[1]
      ),
    [data, encoursSlicer]
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
        left: "10px" // Added more space on the left for the slider
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

  return (
    <div className="flex gap-4 ">
      {/* Vertical Slider Container */}
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
          
          {/* Vertical Handles */}
          
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
        
        {/* Value labels */}
        <div style={{whiteSpace:"nowrap"}} className="flex flex-col text-sm text-gray-500 mt-2">
          <div>{formatNumberWithSpaces(encoursSlicer[0])}</div>
        </div>
      </div>
      {/* Chart */}
      <div className="flex-1">
        <ScatterChart
          options={options}
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