import Highcharts from "highcharts/highstock";
import React from "react";
// import Highcharts from "highcharts";
import { Box, Button } from "@mui/material";
import HighchartsReact from "highcharts-react-official";
import { Setting2 } from "iconsax-react";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  hideChart,
  openModal,
  resetCustomization,
} from "../../redux/slices/DataSlice";
import SettingsModal from "./SettingsModal";

function Chart({ data }) {
  const { customization, modalIsOpen } = useSelector((state) => state.rapport);
  const chart1Ref = useRef(null);
  const chart2Ref = useRef(null);
  const keys = Object.keys(data);
  const categories = data[keys[0]]
    .map((item) => item.Seance)
    .map((dateString) => {
      const date = new Date(dateString);
      const formattedDate = date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      });
      return formattedDate;
    });
  console.log(data[keys[0]]);

  function syncNavigator(e) {
    const { min, max } = e;

    // Update the navigator's range in both charts
    chart1Ref.current.chart.xAxis[0].setExtremes(min, max, true, false);
    chart2Ref.current.chart.xAxis[0].setExtremes(min, max, true, false);
  }
  useEffect(() => {
    if (chart1Ref.current && chart2Ref.current) {
      const chart1 = chart1Ref.current.chart;
      const chart2 = chart2Ref.current.chart;
      Highcharts.addEvent(chart1.xAxis[0], "afterSetExtremes", syncNavigator);
      Highcharts.addEvent(chart2.xAxis[0], "afterSetExtremes", syncNavigator);
    }
  }, []);
  const dispatch = useDispatch();
  const option1 = {
    rangeSelector: {
      selected: 1,
      enabled: false,
    },
    chart: {
      zoomType: "x",
      type: customization.yAxis1.type,
    },
    title: {
      text: customization.title,
      align: "center",
    },
    xAxis: {
      type: "datetime",
      categories,
    },
    yAxis: {
      title: {
        text: customization.yAxis1.title.toUpperCase(),
        style: {
          color: customization.yAxis1.color,
        },
      },
      labels: {
        format: "{value}",
        style: {
          color: customization.yAxis1.color,
        },
      },
    },
    legend: {
      layout: "horizontal",
      align: "center",
      verticalAlign: "bottom",
      enabled: true,
    },
    tooltip: {
      shared: true,
      crosshairs: true,
    },
    accessibility: { enabled: false },
    series: Object.keys(data).map((secteur) => ({
      name: secteur,
      data: data[secteur].map((item) => item[customization.yAxis1.title]),
      marker: { enabled: false },
      showInLegend: true,
    })),
    navigator: {
      enabled: true,
      xAxis: {
        labels: {
          enabled: false,
        },
      },
    },
  };
  const option2 = {
    rangeSelector: {
      selected: 1,
      enabled: false,
    },
    chart: {
      zoomType: "x",
      type: customization.yAxis2.type,
    },
    title: {
      text: "",
    },
    xAxis: {
      type: "datetime",
      categories,
    },
    yAxis: {
      title: {
        text: customization.yAxis2.title.toUpperCase(),
        style: {
          color: customization.yAxis2.color,
        },
      },
      labels: {
        format: "{value}",
        style: {
          color: customization.yAxis2.color,
        },
      },
    },
    legend: {
      layout: "horizontal",
      align: "center",
      verticalAlign: "bottom",
      enabled: true,
    },
    tooltip: {
      shared: true,
      crosshairs: true,
    },
    accessibility: { enabled: false },
    series: Object.keys(data).map((secteur) => ({
      name: secteur,
      data: data[secteur].map((item) => item[customization.yAxis2.title]),
      marker: { enabled: false },
    })),
  };

  const handelBack = () => {
    dispatch(hideChart());
    dispatch(resetCustomization());
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 10,
        }}
      >
        <Button
          variant="contained"
          sx={{ marginBlock: 1, fontSize: "16px", alignSelf: "end" }}
          onClick={() => dispatch(openModal())}
        >
          <Setting2 size="27" style={{ marginRight: "5px" }} />
          Paramètres Graphique
        </Button>
      </Box>
      <HighchartsReact
        highcharts={Highcharts}
        options={option1}
        ref={chart1Ref}
        // constructorType={"TradingChart"}
      />
      <HighchartsReact
        highcharts={Highcharts}
        options={option2}
        ref={chart2Ref}
        // constructorType={"TradingChart"}
      />
      {modalIsOpen && <SettingsModal />}
    </>
  );
}

export default Chart;
