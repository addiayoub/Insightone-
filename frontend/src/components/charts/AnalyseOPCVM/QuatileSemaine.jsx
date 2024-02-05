import React, { memo, useMemo } from "react";
import { graphic } from "echarts";
import moment from "moment";
import BarChart from "../Default/BarChart";

const QuatileSemaine = ({ data }) => {
  const seriesData = data.map((item) => item.quartile_perf_1S);
  console.log("seriesData", seriesData);
  const seances = useMemo(
    () => data.map((item) => moment(item.Date_VL).format("DD/MM/YYYY")),
    [data]
  );
  const options = useMemo(() => {
    return {
      title: {
        text: "Quartile par semaine",
        left: "center",
      },
      grid: {
        right: "100px",
        bottom: "10%",
      },
      xAxis: {
        data: seances,
        type: "category",
        z: 10,
      },
      tooltip: {
        trigger: "item",
        valueFormatter: (value) => value,
      },
      dataZoom: true,
      series: [
        {
          type: "bar",
          showBackground: true,
          itemStyle: {
            color: new graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#83bff6" },
              { offset: 0.5, color: "#188df0" },
              { offset: 1, color: "#188df0" },
            ]),
          },
          emphasis: {
            itemStyle: {
              color: new graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#2378f7" },
                { offset: 0.7, color: "#2378f7" },
                { offset: 1, color: "#83bff6" },
              ]),
            },
          },
          data: seriesData,
        },
      ],
    };
  }, [seriesData, seances]);
  return (
    <>
      <BarChart
        style={{
          height: "500px",
          minWidth: "600px",
          width: "100%",
          margin: "15px auto",
        }}
        options={options}
      />
    </>
  );
};

export default memo(QuatileSemaine);
