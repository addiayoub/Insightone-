import React, { useState, useRef, useMemo, useEffect } from "react";
import ReactECharts from "echarts-for-react";
import { IconButton } from "@mui/material";
import { Eye, EyeOff } from "react-feather";
import useChartTheme from "../../hooks/useChartTheme";
import PtfRange from "./PtfRange";
import Ptf from "../Markowitz/PortefeuilleFrontiere";

function PortefeuilleAleatoires({
  data,
  frontiere,
  setOpen,
  frontiereWeights,
  type,
}) {
  const chart = useRef(null);
  const tabRef = useRef(null);
  const [name, setName] = useState(null);
  const theme = useChartTheme();
  const results = data.results.map((item) => [item.X, item.Y]);
  const rendement = data.results.map((item) => +item.Y.toFixed(2));
  console.log("PortefeuilleAleatoires - Renreded aga");
  const labels = data["df_Val_return_std_dev"].map((item) => ({
    value: [item.X, item.Y],
    name: item.labels,
    itemStyle: {
      color: "#e100ff",
    },
  }));
  const seriesData = [
    {
      name: "PTF equi-pondéré",
      color: "black",
    },
    {
      name: "PTF Minimum Variance",
      color: "green",
    },
    {
      name: "MASI Rentabilité",
      color: "red",
    },
    {
      name: "PTF Max Rendement",
      color: "purple",
    },
    {
      name: "PTF Markowitz",
      color: "blue",
    },
  ];
  const ptf = frontiere.map((item) => ({
    value: [item.Risque * 100, item.Rendement * 100],
    name: item.ptf,
    itemStyle: {
      color: "#808080",
    },
  }));
  const [isShow, setIsShow] = useState(true);
  const options = useMemo(() => {
    return {
      title: {
        text: "Traçage de la frontière efficiente",
        left: "center",
        top: 0,
        ...theme.title,
      },
      legend: {
        data: seriesData.map((item) => item.name),
        orient: "verticaly",
        zLevel: 5,
        right: 0,
        top: "10%",
        type: "scroll",
        ...theme.legend,
      },
      grid: {
        bottom: "50",
        left: "50",
        right: "200",
      },
      toolbox: {
        feature: {
          dataZoom: {
            yAxisIndex: "none",
          },
          restore: {},
          saveAsImage: {},
        },
        left: 0,
        top: 15,
      },
      visualMap: {
        min: Math.min(...rendement),
        max: Math.max(...rendement),
        dimension: 1,
        orient: "vertical",
        right: 0,
        top: "center",
        text: ["HAUT", "BAS"],
        calculable: true,
        inRange: {
          color: ["#f2c31a", "#24b7f2"],
        },
        ...theme.legend,
      },
      tooltip: {
        trigger: "item",
        axisPointer: {
          type: "cross",
        },
        formatter: function (params) {
          const { name, seriesName } = params;
          const res =
            name !== ""
              ? name
              : seriesName.startsWith("series")
              ? ""
              : seriesName;
          return `<strong>${res}</strong> <br /> Rendement: ${params.value[1].toFixed(
            2
          )}% <br /> Risque: ${params.value[0].toFixed(2)}%`;
        },
        // valueFormatter: (value) => value.toFixed(2),
      },

      xAxis: [
        {
          type: "value",
          name: "Risque",
          nameLocation: "middle",
          nameGap: 30,
          nameTextStyle: {
            fontSize: 19,
            ...theme.xAxis.nameTextStyle,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
          name: "Rendement",
          nameLocation: "middle",
          nameGap: 30,
          nameTextStyle: {
            fontSize: 19,
            ...theme.yAxis.nameTextStyle,
          },
        },
      ],
      series: [
        ...seriesData.map((item) => ({
          name: item.name,
          type: "effectScatter",
          symbolSize: "19",
          data: [
            {
              value: [data[item.name]["X"], data[item.name]["Y"]],
              itemStyle: {
                color: item.color,
              },
            },
          ],
          itemStyle: {
            color: item.color,
          },
        })),
        {
          name: "",
          type: "effectScatter",
          symbol: "circle",
          symbolSize: 8,
          data: ptf,
        },
        {
          type: "scatter",
          symbol: "circle",
          symbolSize: 4,
          data: labels,
          color: "red",
          label: {
            show: isShow,
            position: "top",
            formatter: (params) => params.name,
            ...theme.title.textStyle,
            fontSize: 9,
          },
        },
        {
          type: "scatter",
          symbol: "circle",
          symbolSize: 3,
          data: results,
        },
      ],
    };
  }, [data]);
  const handleClick = (params) => {
    const { seriesType, name: serieName } = params;
    console.log("seriesType: ", seriesType, "name:", serieName);
    if (seriesType === "effectScatter" && serieName) {
      tabRef.current.scrollIntoView({
        behavior: "smooth",
      });
      setName(serieName);
      setOpen(true);
    }
  };
  return (
    <>
      <div className="relative mb-10">
        <ReactECharts
          option={options}
          style={{ height: "650px", width: "100%" }}
          onEvents={{
            click: handleClick,
          }}
          ref={chart}
        />
        <IconButton
          className="absolute right-0 text-[10px] top-0 max-w-[100px] mb-5"
          color="primary"
          title="Afficher/Masquer les labels"
          variant="contained"
          onClick={() => setIsShow(!isShow)}
        >
          {isShow ? <Eye /> : <EyeOff />}
        </IconButton>
      </div>
      <div ref={tabRef}>
        {name && (
          <>
            <Ptf
              ptfs={frontiere}
              data={frontiereWeights.filter((item) => item[name] > 0.01)}
              field={name}
              type={type}
            />
          </>
        )}
      </div>
    </>
  );
}

export default PortefeuilleAleatoires;
