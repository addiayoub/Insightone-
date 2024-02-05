import React, { memo, useMemo } from "react";
import { useSelector } from "react-redux";
import { extractKeys } from "../../../utils/extractKeys";
import LineChart from "../Default/LineChart";

const getOptions = (data, seriesNames, title, init, ptf = "") => {
  return {
    title: {
      text: title,
      left: "center",
    },
    xAxis: {
      type: "category",
      data: data.map((item) => item.seance),
    },
    legend: {
      width: "50%",
      left: "center",
    },
    seriesNames: { seriesList: seriesNames, init },
    series: seriesNames.map((seriesName) => ({
      name: seriesName === "returns_mv_cum" && ptf ? ptf : seriesName,
      type: "line",
      symbol: "none",
      data: data.map((item) => item[seriesName] * 100),
    })),
  };
};
const simOpt = "SIM optimal";
const Cumualative = ({ data, forSIM }) => {
  const { selectedPtf } = useSelector((state) => state.backtest);
  console.log("render Cumualative", data, selectedPtf);
  const seriesNames = useMemo(
    () =>
      extractKeys(data, ["seance", "returns_mv_cum"])
        .filter(
          (serie) => serie === selectedPtf || serie.startsWith("returns_mv_cum")
        )
        .map((item) =>
          item.startsWith("returns_mv_cum")
            ? item.replace(/^returns_mv_cum_/, "")
            : item
        ),
    [data]
  );

  const seriesNames2 = useMemo(() => {
    const originalArray = Object.keys(data[0]).filter(
      (key) => key !== "seance" && key !== selectedPtf
    );

    const index = originalArray.indexOf("returns_mv_cum");

    if (index !== -1) {
      originalArray.splice(index, 1); // Remove 'returns_mv_cum' from its current position
      originalArray.unshift("returns_mv_cum"); // Add 'returns_mv_cum' to the beginning
    }

    return originalArray;
  }, [data, selectedPtf]);
  console.log("seriesNames - 1", seriesNames, "seriesNames2", seriesNames2);
  const init = forSIM ? [seriesNames[0], simOpt] : seriesNames;
  console.log("cumlative init", init, forSIM);
  const options = useMemo(
    () =>
      getOptions(data, seriesNames, "Cumulative Returns vs Benchmark", init),
    [data, seriesNames]
  );
  const options2 = useMemo(
    () =>
      getOptions(
        data,
        seriesNames,
        "Cumulative Returns vs Benchmark (Log Scaled)",
        init,
        selectedPtf
      ),
    [data, seriesNames, selectedPtf]
  );

  return (
    <>
      <div className="relative">
        <LineChart
          options={options}
          style={{
            minHeight: 500,
            margin: "15px 0",
          }}
          showSeriesSelector
          saveToExcel={{
            show: true,
            data,
            fileName: "Cumulative Returns vs Benchmark",
          }}
        />
      </div>
      <div className="realative">
        <LineChart
          options={options2}
          style={{
            minHeight: 500,
            margin: "15px 0",
          }}
          showSeriesSelector
        />
      </div>
    </>
  );
};

export default memo(Cumualative);
