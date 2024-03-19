import { createAsyncThunk } from "@reduxjs/toolkit";
import apiNewMarko from "../../api/apiNewMarko";
import { formatDate } from "../../utils/FormatDate";
import {
  transformBacktestData,
  transformForBacktest,
} from "../../utils/formatBacktestData";
import moment from "moment";

const apiTrading = "trading/";

export const getPortef = createAsyncThunk(
  "backtest/getPortef",

  async (
    {
      dateDebut,
      dateFin,
      filters,
      montant,
      upDown,
      backtestDate,
      qte,
      poids,
      sens,
      instrument,
      df_op,
    },
    thunkAPI
  ) => {
    const { ptfToBacktest } = thunkAPI.getState().backtest;
    const operations = df_op.map(({ _id, ...rest }) => rest);
    const body = {
      // LIBELLE - Min - Max - Importance
      df_poids: transformForBacktest([ptfToBacktest]),
      df_op: df_op.length < 1 ? [{}] : operations,
      // df_poids: [{}],
      // df_op: [{}],
      // [
      //   {
      // Date: "18/12/2023",
      // Sens: "Achat",
      // INSTRUMENT: "CFG BANK",
      // Quantité: "",
      // Poids: 0.018120009,
      // Date: formatDate(backtestDate["$d"]),
      // Sens: sens,
      // INSTRUMENT: instrument,
      // Quantité: qte,
      // Poids: poids,
      //   },
      // ],
    };
    try {
      const response = await apiNewMarko.post(
        `${apiTrading}POST/get_portef/`,
        body,
        {
          params: {
            start: formatDate(dateDebut["$d"]),
            end: formatDate(dateFin["$d"]),
            Flag_hebdo: filters.flag_hebdo,
            CMP_Cloture: filters.cmp_cloture,
            Div_Reinvesti: filters.div_reinvesti,
            montant_investi: +montant * 1e6,
            Flag_Trading: filters.flag_trading,
            momentum_contrarien: filters.momentum_contrarien,
            upside_downside: +upDown,
            // start: "10/05/2022",
            // end: "10/10/2023",
            // Flag_hebdo: 1,
            // CMP_Cloture: 0,
            // Div_Reinvesti: 1,
            // montant_investi: 100000000,
            // Flag_Trading: 0,
            // momentum_contrarien: 1,
            // upside_downside: 5,
          },
        }
      );
      // const response = await apiNewMarko.post(
      //   `${apiTrading}POST/get_portef/?start=25%2F12%2F2023&end=01%2F02%2F2024&Flag_hebdo=1&CMP_Cloture=0&Div_Reinvesti=1&montant_investi=10000000&Flag_Trading=0&momentum_contrarien=1&upside_downside=5`,
      //   body
      // );
      console.log("get_portef", response);
      return response.data;
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue("Server Error");
    }
  }
);

export const getEvolutionB100Portef = createAsyncThunk(
  "backtest/getEvolutionB100Portef",
  async ({ dateDebut, dateFin, list_indices }, thunkAPI) => {
    // const body = transformBacktestData(backtestData);
    const { ptfToBacktest } = thunkAPI.getState().backtest;
    console.log("ptfToBacktest", ptfToBacktest);
    const body = transformBacktestData([ptfToBacktest]);
    console.log("ptfToBacktest body", body);

    try {
      const response = await apiNewMarko.post(
        `${apiTrading}POST/EVOLUTION_B100_PTFS/`,
        body,
        {
          params: {
            list_indices,
            start: formatDate(dateDebut["$d"]),
            end: formatDate(dateFin["$d"]),
          },
        }
      );

      console.log("getEvolutionB100Portef", response);
      console.log("Merged data", mergeData(response.data));
      const dataToMerge = {
        "Evolution base 100 des Portefeuille simulé": response.data[
          "Evolution base 100 des Portefeuille simulé"
        ].map((item) => {
          return { ...item };
        }),
        "Evolution base 100 des indices": response.data[
          "Evolution base 100 des indices"
        ].map((item) => {
          return { ...item };
        }),
      };
      console.log("mergeData(dataToMerge)", mergeData(dataToMerge));

      return {
        ptfsData: mergeData(dataToMerge),
        ptfsContrib: response.data.df_contrib_ptf,
        df_rendement: response.data.df_rendement,
        df_poids: response.data.df_poids,
      };
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue("Server Error");
    }
  }
);

export const backtestAction = createAsyncThunk(
  "backtest/backtestAction",
  async ({ rf, fromSlice = "backtest" }, thunkAPI) => {
    console.log("call ", "backtestAction", fromSlice);
    const body =
      fromSlice === "backtest"
        ? thunkAPI.getState().backtest.evolutionB100Ptfs.data.df_rendement
        : thunkAPI.getState().tracking.generationPtfAlea.df_rendement;
    console.log("body", body);

    console.log("ref before", rf);
    rf = +rf / 100;
    console.log("ref after", rf);
    try {
      const endpoints = [
        {
          link: "CUMULATIVE_RETURNS",
          params: {},
        },
        {
          link: "EOY_RETURNS_BARS",
          params: {},
        },
        {
          link: "EOY_RETURNS_TABLE",
          params: {},
        },
        {
          link: "KEY_PERFORMANCE_METRICS",
          params: { rf },
        },
        {
          link: "DISTRIBUTION_OF_MONTHLY_RETURNS",
          params: {},
        },
        {
          link: "ROLLING_BETA_TO_BENCHMARK",
          params: {},
        },
        {
          link: "ROLLING_VOLATILITY",
          params: {},
        },
        {
          link: "ROLLING_SHARPE",
          params: { rf },
        },
        {
          link: "ROLLING_SORTINO",
          params: { rf },
        },
        {
          link: "WORST_10_DRAWDOWNS",
          params: {},
        },
        {
          link: "MONTHLY_RETURNS",
          params: {},
        },
        {
          link: "RETURN_QUANTILES",
          params: {},
        },
        {
          link: "DAILY_RETURNS",
          params: {},
        },
        {
          link: "MONTHLY_RELATIVE_RETURNS",
          params: {},
        },
        {
          link: "UNDERWATER_PLOT",
          params: {},
        },
      ];

      const [
        CUMULATIVE_RETURNS,
        EOY_RETURNS_BARS,
        EOY_RETURNS_TABLE,
        KEY_PERFORMANCE_METRICS,
        DISTRIBUTION_OF_MONTHLY_RETURNS,
        ROLLING_BETA_TO_BENCHMARK,
        ROLLING_VOLATILITY,
        ROLLING_SHARPE,
        ROLLING_SORTINO,
        WORST_10_DRAWDOWNS,
        MONTHLY_RETURNS,
        RETURN_QUANTILES,
        DAILY_RETURNS,
        MONTHLY_RELATIVE_RETURNS,
        UNDERWATER_PLOT,
      ] = await Promise.all(
        endpoints.map(async ({ link, params }) => {
          try {
            const response = await apiNewMarko.post(
              `${apiTrading}POST/${link}`,
              body,
              { params }
            );
            return response.data;
          } catch (error) {
            console.log("endpoints error", error);
          }
        })
      );
      const sortedCumRe = CUMULATIVE_RETURNS["Cumulative Returns"].sort(
        (a, b) => moment(a.seance).valueOf() - moment(b.seance).valueOf()
      );
      console.log(
        "backtestAction",
        CUMULATIVE_RETURNS["Cumulative Returns"],
        "sort cumla",
        sortedCumRe,
        EOY_RETURNS_TABLE,
        KEY_PERFORMANCE_METRICS,
        DISTRIBUTION_OF_MONTHLY_RETURNS
      );
      return {
        cumulative: CUMULATIVE_RETURNS
          ? sortByDate(CUMULATIVE_RETURNS["Cumulative Returns"])
          : [],
        eoy: EOY_RETURNS_BARS ? EOY_RETURNS_BARS["EOY Returns bars"] : [],
        eoyTable: EOY_RETURNS_TABLE
          ? EOY_RETURNS_TABLE["EOY Returns table"]
          : [],
        distributionMonthly: DISTRIBUTION_OF_MONTHLY_RETURNS
          ? DISTRIBUTION_OF_MONTHLY_RETURNS["Distribution of Monthly Returns"]
          : [],
        rollingBeta: ROLLING_BETA_TO_BENCHMARK
          ? sortByDate(ROLLING_BETA_TO_BENCHMARK["Rolling Beta to Benchmark"])
          : [],
        rollingVolat: ROLLING_VOLATILITY
          ? sortByDate(ROLLING_VOLATILITY["Rolling Volatility"])
          : [],
        rollingSharpe: ROLLING_SHARPE ? ROLLING_SHARPE["Rolling Sharpe"] : [],
        rollingSortino: ROLLING_SORTINO
          ? sortByDate(ROLLING_SORTINO["Rolling Sortino"])
          : [],
        worstDrawdowns: WORST_10_DRAWDOWNS
          ? WORST_10_DRAWDOWNS["Worst 10 Drawdowns"]
          : [],
        monthlyReturns: MONTHLY_RETURNS
          ? MONTHLY_RETURNS["Monthly Returns"]
          : [],
        monthlyRelReturns: MONTHLY_RELATIVE_RETURNS
          ? MONTHLY_RELATIVE_RETURNS["Monthly Relative Returns"]
          : [],
        dailyReturns: DAILY_RETURNS
          ? sortByDate(DAILY_RETURNS["daily returns"])
          : [],
        quantiles: RETURN_QUANTILES ? RETURN_QUANTILES["Return Quantiles"] : [],
        keyPerf: KEY_PERFORMANCE_METRICS
          ? KEY_PERFORMANCE_METRICS["Key Performance Metrics"]
          : [],
        underwater: UNDERWATER_PLOT
          ? sortByDate(UNDERWATER_PLOT["drawdowns"])
          : [],
      };
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue("Server Error");
    }
  }
);

const mergeData = (data) => {
  const mergedData = {};

  // Iterate over each dataset
  Object.keys(data).forEach((datasetName) => {
    // Iterate over the array in each dataset
    data[datasetName].forEach((item) => {
      const { seance, ...rest } = item;

      // Format the seance to DD/MM/YYYY
      const formattedSeance = moment(seance).format("DD/MM/YYYY");

      // Create an object for the merged data if it doesn't exist
      if (!mergedData[formattedSeance]) {
        mergedData[formattedSeance] = { seance: formattedSeance };
      }

      // Merge the properties into the existing merged data
      mergedData[formattedSeance] = { ...mergedData[formattedSeance], ...rest };
    });
  });

  // Convert the mergedData object to an array and sort by seance
  const resultArray = Object.values(mergedData).sort(
    (a, b) =>
      moment(a.seance, "DD/MM/YYYY").toDate() -
      moment(b.seance, "DD/MM/YYYY").toDate()
  );

  return resultArray;
};
const sortByDate = (data, field = "seance") => {
  return data.sort(
    (a, b) => moment(a[field]).valueOf() - moment(b[field]).valueOf()
  );
};
