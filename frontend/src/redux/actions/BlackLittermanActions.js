import { createAsyncThunk } from "@reduxjs/toolkit";
import { formatDate } from "../../utils/FormatDate";
import apiNewMarko from "../../api/apiNewMarko";
import { transformForPtfAlloca } from "../../utils/formatBacktestData";
export const valueAtRiskAction = createAsyncThunk(
  "BlackLitterman/valueAtRiskAction",
  async (
    { dateDebut, dateFin, days, initInvest, mcSims, titres },
    thunkAPI
  ) => {
    try {
      // ?start=25%2F12%2F2020&end=02%2F02%2F2024&Days=100&InitialInvestment=10000&mc_sims=100&list_valeur=AFMA&list_valeur=ITISSALAT AL-MAGHRIB
      const response = await apiNewMarko.post(
        "Value_at_Risk/POST/Value_at_Risk/",
        {},
        {
          params: {
            start: formatDate(dateDebut["$d"]),
            end: formatDate(dateFin["$d"]),
            Days: +days,
            InitialInvestment: initInvest * 1e6,
            mc_sims: mcSims,
            list_valeur: titres,
          },
        }
      );
      // console.log(Object.keys(response.data));
      return response.data;
    } catch (error) {
      console.log("valueAtRiskAction error", error);
      return thunkAPI.rejectWithValue("Error server");
    }
  }
);

export const portfolioOptiAction = createAsyncThunk(
  "BlackLitterman/portfolioOptiAction",
  async ({ nbPtfs, dateDebut, dateFin, titres }, thunkAPI) => {
    try {
      // num_of_portfolios=5000&start=25%2F12%2F2020&end=02%2F02%2F2024&list_valeur=BCP&list_valeur=ATW&list_valeur=BOA
      // num_of_portfolios=1000&start=21%2F02%2F2022&end=19%2F02%2F2024&list_valeur=AFMA&list_valeur=ITISSALAT%20AL-MAGHRIB
      console.log(
        `start: ${formatDate(dateDebut["$d"])} || end: ${formatDate(
          dateFin["$d"]
        )}`
      );
      // &list_valeur=BCP&list_valeur=ATW&list_valeur=BOA
      const response = await apiNewMarko.post(
        `portfolio_optimization/POST/portfolio_optimization/?num_of_portfolios=${nbPtfs}&start=${formatDate(
          dateDebut["$d"]
        )}&end=${formatDate(dateFin["$d"])}`,
        {},
        {
          params: {
            // num_of_portfolios: nbPtfs,
            // start: formatDate(dateDebut["$d"]),
            // end: formatDate(dateFin["$d"]),
            list_valeur: titres,
          },
        }
      );
      console.log(Object.keys(response.data));
      return response.data;
    } catch (error) {
      console.log("portfolioOptiAction error", error);
      return thunkAPI.rejectWithValue("Error server");
    }
  }
);

export const portfolioAllocationAction = createAsyncThunk(
  "BlackLitterman/portfolioAllocationAction",
  async ({ dateDebut, dateFin, rfr }, thunkAPI) => {
    const body1 = [
      { valeur: "ADH", view: 0.05, min: 0, max: 0.1 },
      { valeur: "ALM", view: 0.05, min: 0, max: 0.1 },
      { valeur: "ATW", view: 0.05, min: 0, max: 0.1 },
      { valeur: "BAL", view: 0.05, min: 0, max: 0.1 },
      { valeur: "BCI", view: 0.05, min: 0, max: 0.1 },
      { valeur: "BOA", view: 0.05, min: 0, max: 0.1 },
      { valeur: "BCP", view: 0.05, min: 0, max: 0.1 },
      { valeur: "CDM", view: 0.05, min: 0, max: 0.1 },
      { valeur: "CIH", view: 0.05, min: 0, max: 0.1 },
      { valeur: "CSR", view: 0.05, min: 0, max: 0.1 },
      { valeur: "DWY", view: 0.05, min: 0, max: 0.1 },
      { valeur: "EQD", view: 0.05, min: 0, max: 0.1 },
      { valeur: "GAZ", view: 0.05, min: 0, max: 0.1 },
      { valeur: "HPS", view: 0.05, min: 0, max: 0.1 },
      { valeur: "ITISSALAT AL-MAGHRIB", view: 0.05, min: 0, max: 0.1 },
      { valeur: "LES", view: 0.05, min: 0, max: 0.1 },
      { valeur: "SAH", view: 0.05, min: 0, max: 0.1 },
      { valeur: "SBM", view: 0.05, min: 0, max: 0.1 },
      { valeur: "SMI", view: 0.05, min: 0, max: 0.1 },
      { valeur: "UMR", view: 0.05, min: 0, max: 0.1 },
    ];

    const { ptfToBacktest } = thunkAPI.getState().backtest;
    console.log(
      "Date debut",
      formatDate(dateDebut["$d"]),
      "date Fin",
      formatDate(dateFin["$d"]),
      "Backtest is",
      ptfToBacktest,
      "format ptf",
      transformForPtfAlloca([ptfToBacktest])
    );
    const body = transformForPtfAlloca([ptfToBacktest]);
    try {
      // ?start=25%2F12%2F2020&end=02%2F02%2F2024&risk_free_rate=0.009
      const response = await apiNewMarko.post(
        `Black_Litterman_Portfolio/POST/Portfolio_Allocation/`,
        body1,
        {
          params: {
            start: formatDate(dateDebut["$d"]),
            end: formatDate(dateFin["$d"]),
            // risk_free_rate: 0.009,
            risk_free_rate: +rfr / 100,
          },
        }
      );
      console.log(Object.keys(response.data));
      return response.data;
    } catch (error) {
      console.log("portfolioAllocationAction error", error);
      return thunkAPI.rejectWithValue("Error server");
    }
  }
);

// [
//   { valeur: "ADH", view: 0.05, min: 0, max: 0.1 },
//   { valeur: "ALM", view: 0.05, min: 0, max: 0.1 },
//   { valeur: "ATW", view: 0.05, min: 0, max: 0.1 },
//   { valeur: "BAL", view: 0.05, min: 0, max: 0.1 },
//   { valeur: "BCI", view: 0.05, min: 0, max: 0.1 },
//   { valeur: "BOA", view: 0.05, min: 0, max: 0.1 },
//   { valeur: "BCP", view: 0.05, min: 0, max: 0.1 },
//   { valeur: "CDM", view: 0.05, min: 0, max: 0.1 },
//   { valeur: "CIH", view: 0.05, min: 0, max: 0.1 },
//   { valeur: "CSR", view: 0.05, min: 0, max: 0.1 },
//   { valeur: "DWY", view: 0.05, min: 0, max: 0.1 },
//   { valeur: "EQD", view: 0.05, min: 0, max: 0.1 },
//   { valeur: "GAZ", view: 0.05, min: 0, max: 0.1 },
//   { valeur: "HPS", view: 0.05, min: 0, max: 0.1 },
//   { valeur: "ITISSALAT AL-MAGHRIB", view: 0.05, min: 0, max: 0.1 },
//   { valeur: "LES", view: 0.05, min: 0, max: 0.1 },
//   { valeur: "SAH", view: 0.05, min: 0, max: 0.1 },
//   { valeur: "SBM", view: 0.05, min: 0, max: 0.1 },
//   { valeur: "SMI", view: 0.05, min: 0, max: 0.1 },
//   { valeur: "UMR", view: 0.05, min: 0, max: 0.1 },
// ];
