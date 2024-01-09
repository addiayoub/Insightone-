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
};
