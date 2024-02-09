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
      dataView: { iconStyle: { borderColor: "#444ce7" } },
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
