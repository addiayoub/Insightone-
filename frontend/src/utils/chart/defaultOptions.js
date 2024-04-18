import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
const exportToExcel = (data, fileName) => {
  data = Array.isArray(data) ? data : [data];
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // Buffer to store the generated Excel file
  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });
  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  });

  saveAs(blob, `${fileName}.xlsx`);
};

export const getExportToExcelFeature = (options) => {
  const { data, fileName, show } = options;
  console.log("getExportToExcelFeature options", options);
  return {
    show,
    title: "Export Excel",
    icon: "path://M21 7v12q0 .825-.587 1.413T19 21H5q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h12zm-9 11q1.25 0 2.125-.875T15 15q0-1.25-.875-2.125T12 12q-1.25 0-2.125.875T9 15q0 1.25.875 2.125T12 18m-6-8h9V6H6z",
    iconStyle: { borderColor: "#444ce7" },
    onclick: function () {
      return exportToExcel(data, fileName ? fileName : new Date().getTime());
    },
  };
};

const goFullscreen = (chartRef) => {
  const chart = chartRef.current.getEchartsInstance();
  const element = chart.getDom();
  console.log("chart", chart);
  console.log("element", element, element.parentNode);

  // Set a different background color when in fullscreen mode
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    element.requestFullscreen();
  }
};

export const getFullscreenFeature = (chartRef) => {
  return {
    show: true,
    title: "Fullscreen",
    icon: "path://M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3",
    iconStyle: { borderColor: "#444ce7" },
    onclick: function () {
      return goFullscreen(chartRef);
    },
  };
};
export const defaultOptions = {
  dataZoom: [
    {
      type: "slider", // Enable slider data zoom
      show: true,
      xAxisIndex: [0],
      start: 0,
      end: 100,
      textStyle: {
        fontSize: 11,
      },
    },
    {
      type: "inside",
      xAxisIndex: [0],
      start: 0,
      end: 100,
    },
  ],
  toolbox: {
    feature: {
      magicType: {
        show: true,
        type: ["line", "bar"],
        option: {
          line: {
            smooth: true,
          },
        },
        iconStyle: { borderColor: "#444ce7" },
      },
      dataZoom: {
        yAxisIndex: true,
        iconStyle: { borderColor: "#444ce7" },
        title: {
          zoom: "Zoom",
          back: "Zoom Out",
        },
      },
      saveAsImage: {
        iconStyle: { borderColor: "#444ce7" },
        title: "Enregister sous image",
      },
      dataView: {
        iconStyle: { borderColor: "#444ce7" },
        readOnly: true,
      },
      restore: {
        title: "Réinitialiser",
        iconStyle: { borderColor: "#444ce7" },
      },
      brush: {
        type: ["lineX", "clear"],
        iconStyle: { borderColor: "#444ce7" },
      },
    },
  },
};

export const defaultPie = {
  name: "",
  type: "pie",
  radius: ["30%", "70%"],
  // radius: "50%",
  avoidLabelOverlap: false,
  label: {
    // alignTo: "edge",
    show: true,
    formatter: function (params) {
      let name = params.name;
      const { value } = params;
      if (name.length > 5) {
        const newName = name.split(" ");

        name = newName.join(" \n");
      }
      return `${name}:${value.toFixed(2)}%`;
    },
    fontSize: 9,
    minMargin: 6,
    edgeDistance: 10,
    lineHeight: 15,
    rotate: -2,
  },
  labelLine: {
    length: 10,
    length2: 0,
    maxSurfaceAngle: 500,
  },
  emphasis: {
    itemStyle: {
      shadowBlur: 10,
      shadowOffsetX: 0,
      shadowColor: "rgba(0, 0, 0, 0.5)",
    },
  },
};

export const rangeOpts = {
  z: -1,
  name: "",
  stack: "Min",
  tooltip: {
    show: false,
  },
  type: "line",
  areaStyle: {
    color: "rgba(204,204,204,0.5)",
    opacity: 1,
    origin: "start",
  },
  lineStyle: {
    opacity: 0,
  },
  itemStyle: { color: "rgba(204,204,204,0.5)", opacity: 1 },
  emphasis: {
    disabled: true,
  },
  symbolSize: 0,
};
