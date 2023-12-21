import React from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
function LightChart({ options }) {
  Highcharts.setOptions({
    chart: {
      backgroundColor: "#fff",
    },
  });
  return <Highcharts highcharts={Highcharts} options={options} />;
}

export default LightChart;
