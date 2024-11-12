import { createAsyncThunk } from "@reduxjs/toolkit";
import { formatDate } from "../../utils/FormatDate";
import apiNewMarko from "../../api/apiNewMarko";
import { transformBacktestData } from "../../utils/formatBacktestData";
import { getLastItem, getLastItemWithFilter } from "../../utils/getLastItem";
import moment from "moment";

const endpoint = "BACKTEST/";

export const valueAtRiskAction = createAsyncThunk(
  "BlackLitterman/valueAtRiskAction",
  async ({ dateDebut, dateFin, days, mcSims }, thunkAPI) => {
    const { ptfToBacktest } = thunkAPI.getState().backtest;
    const body = transformBacktestData([ptfToBacktest], "poids");
    try {
      const response = await apiNewMarko.post(
        `${endpoint}Value_at_Risk/POST/Value_at_Risk/`,
        body,
        {
          params: {
            start: formatDate(dateDebut["$d"]),
            end: formatDate(dateFin["$d"]),
            forecasting_days: days,
            lookback_days: 5,
            mc_sims: mcSims,
          },
        }
      );
      console.log(
        "NEW DATA",
        addBacktestToSim(
          response.data.df_back_sim,
          response.data.df_portfolio_sims
        )
      );
      console.log("valueAtRiskAction response", response.data);
      console.log("Resume response", handleResume([], days));
      const resume = handleResume(response.data.df_back_sim, days);
      return {
        ...response.data,
        resume,
        df_portfolio_sims: addBacktestToSim(
          response.data.df_back_sim,
          response.data.df_portfolio_sims
        ),
      };
    } catch (error) {
      console.log("valueAtRiskAction error", error);
      return thunkAPI.rejectWithValue("Error server");
    }
  }
);

const addBacktestToSim = (backtestData, simData) => {
  const ptfs = Object.keys(simData[0]).filter((item) => item !== "seance");
  const data = [];
  backtestData = backtestData.filter((item) => item.label === "Backtest");
  // backtestData = [getLastItem(backtestData)];
  if (backtestData.length > 7) {
    backtestData = backtestData.slice(-7);
  }
  backtestData?.forEach((ele) => {
    const { mean, seance } = ele;
    const dd = { seance };
    ptfs?.forEach((item) => {
      dd[item] = mean;
      data.push(dd);
    });
  });

  return [...data, ...simData];
};

const handleResume = (data, days) => {
  if (data.length > 0) {
    // const condition = (element) => element.label === "Backtest";
    const item = getLastItem(data);
    if (item !== undefined) {
      const { mean, min, max, seance ,last_value } = item;
      const based = [
        {
          type: "Moyenne",
          valeur: mean,
        },
        {
          type: "Min",
          valeur: min,
        },
        {
          type: "Max",
          valeur: max,
        },
      ];
      const resume = based.map(({ type, valeur }) => ({
        type,
        valeur: parseFloat(valeur.toFixed(2)),
        rendement: parseFloat((valeur / last_value - 1).toFixed(2)),
        date: moment(seance).format("DD/MM/YYYY"),
        days,
      }));
      return resume;
    }
  }
  return [];
};
