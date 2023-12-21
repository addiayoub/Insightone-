export const lightTheme = {
  colors: [
    "#7cb5ec",
    "#f7a35c",
    "#90ee7e",
    "#7798BF",
    "#aaeeee",
    "#ff0066",
    "#eeaaee",
    "#55BF3B",
    "#DF5353",
    "#7798BF",
    "#aaeeee",
  ],
  chart: {
    backgroundColor: "white",
    style: {
      fontFamily: "Arial, sans-serif",
    },
  },
  title: {
    style: {
      color: "black",
      fontWeight: "bold",
    },
  },
  subtitle: {
    style: {
      color: "black",
    },
  },
  xAxis: {
    gridLineColor: "#e6e6e6",
    labels: {
      style: {
        color: "black",
      },
    },
    lineColor: "#e6e6e6",
    minorGridLineColor: "#e6e6e6",
    tickColor: "#e6e6e6",
    title: {
      style: {
        color: "black",
      },
    },
  },
  yAxis: {
    gridLineColor: "#e6e6e6",
    labels: {
      style: {
        color: "black",
      },
    },
    lineColor: "#e6e6e6",
    minorGridLineColor: "#e6e6e6",
    tickColor: "#e6e6e6",
    title: {
      style: {
        color: "black",
      },
    },
  },
  tooltip: {
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    style: {
      color: "#F0F0F0",
    },
    valueDecimals: 2,
  },
  plotOptions: {
    series: {
      dataLabels: {
        color: "black",
      },
      marker: {
        lineColor: "#333",
      },
    },
    boxplot: {
      fillColor: "#F0F0F0",
    },
    candlestick: {
      lineColor: "black",
    },
    errorbar: {
      color: "black",
    },
  },
  legend: {
    backgroundColor: "white",
    itemStyle: {
      color: "black",
    },
    itemHoverStyle: {
      color: "#039",
    },
    itemHiddenStyle: {
      color: "gray",
    },
  },
  credits: {
    style: {
      color: "#666",
    },
  },
  labels: {
    style: {
      color: "#707070",
    },
  },

  navigation: {
    buttonOptions: {
      symbolStroke: "#DDDDDD",
      hoverSymbolStroke: "#FFFFFF",
      theme: {
        fill: "#505053",
      },
    },
  },
};
export const darkTheme = {
  colors: [
    "#2b908f",
    "#90ee7e",
    "#f45b5b",
    "#7798BF",
    "#aaeeee",
    "#ff0066",
    "#eeaaee",
    "#55BF3B",
    "#DF5353",
    "#7798BF",
    "#aaeeee",
  ],
  chart: {
    backgroundColor: {
      linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
      stops: [
        [0, "#2a2a2b"],
        [1, "#3e3e40"],
      ],
    },
    style: {
      fontFamily: "'Unica One', sans-serif",
    },
    plotBorderColor: "#606063",
  },
  title: {
    style: {
      color: "#E0E0E3",
      textTransform: "uppercase",
      fontSize: "16px",
    },
  },
  subtitle: {
    style: {
      color: "#E0E0E3",
      textTransform: "uppercase",
    },
  },
  xAxis: {
    gridLineColor: "#707073",
    labels: {
      style: {
        color: "#E0E0E3",
      },
    },
    lineColor: "#707073",
    minorGridLineColor: "#505053",
    tickColor: "#707073",
    title: {
      style: {
        color: "#A0A0A3",
      },
    },
  },
  yAxis: {
    gridLineColor: "#707073",
    labels: {
      style: {
        color: "#E0E0E3",
      },
    },
    lineColor: "#707073",
    minorGridLineColor: "#505053",
    tickColor: "#707073",
    tickWidth: 1,
    title: {
      style: {
        color: "#A0A0A3",
      },
    },
  },
  tooltip: {
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    style: {
      color: "#F0F0F0",
    },
    valueDecimals: 2,
  },
  plotOptions: {
    series: {
      dataLabels: {
        color: "#B0B0B3",
      },
      marker: {
        lineColor: "#333",
      },
    },
    boxplot: {
      fillColor: "#505053",
    },
    candlestick: {
      lineColor: "white",
    },
    errorbar: {
      color: "white",
    },
  },
  legend: {
    itemStyle: {
      color: "#000",
    },
    itemHoverStyle: {
      color: "#FFF",
    },
    itemHiddenStyle: {
      color: "#606063",
    },
  },
  credits: {
    style: {
      color: "#666",
    },
  },
  labels: {
    style: {
      color: "#000",
    },
  },

  drilldown: {
    activeAxisLabelStyle: {
      color: "#F0F0F3",
    },
    activeDataLabelStyle: {
      color: "#F0F0F3",
    },
  },

  navigation: {
    buttonOptions: {
      symbolStroke: "#DDDDDD",
      theme: {
        fill: "#505053",
      },
    },
  },

  // scroll charts
  rangeSelector: {
    buttonTheme: {
      fill: "#505053",
      stroke: "#000000",
      style: {
        color: "#CCC",
      },
      states: {
        hover: {
          fill: "#707073",
          stroke: "#000000",
          style: {
            color: "white",
          },
        },
        select: {
          fill: "#000003",
          stroke: "#000000",
          style: {
            color: "white",
          },
        },
      },
    },
    inputBoxBorderColor: "#505053",
    inputStyle: {
      backgroundColor: "#333",
      color: "silver",
    },
    labelStyle: {
      color: "silver",
    },
  },
  accessibility: { enabled: false },
  navigator: {
    handles: {
      backgroundColor: "#666",
      borderColor: "#AAA",
    },
    outlineColor: "#CCC",
    maskFill: "rgba(255,255,255,0.1)",
    series: {
      color: "#7798BF",
      lineColor: "#A6C7ED",
    },
    xAxis: {
      gridLineColor: "#505053",
      labels: {
        enabled: false,
      },
    },
    enabled: true,
    height: 15,
  },

  scrollbar: {
    barBackgroundColor: "#808083",
    barBorderColor: "#808083",
    buttonArrowColor: "#CCC",
    buttonBackgroundColor: "#606063",
    buttonBorderColor: "#606063",
    rifleColor: "#FFF",
    trackBackgroundColor: "#404043",
    trackBorderColor: "#404043",
  },

  // special colors for some of the
  legendBackgroundColor: "rgba(0, 0, 0, 0.5)",
  background2: "#505053",
  dataLabelsColor: "#B0B0B3",
  textColor: "#C0C0C0",
  contrastTextColor: "#F0F0F3",
  maskColor: "rgba(255,255,255,0.3)",

  responsive: {
    rules: [
      {
        condition: {
          maxWidth: 500,
          maxHeight: 400,
        },
        chartOptions: {
          legend: {
            layout: "horizontal",
            align: "center",
            verticalAlign: "bottom",
          },
        },
      },
    ],
  },
};
