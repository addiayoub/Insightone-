import { createAsyncThunk } from "@reduxjs/toolkit";
import apiNewMarko from "../../api/apiNewMarko";
import { formatDate } from "../../utils/FormatDate";
import { transformBacktestData } from "../../utils/formatBacktestData";

const apiTrading = "trading/";

export const getPortef = createAsyncThunk(
  "backtest/getPortef",

  async ({ dateDebut, dateFin, filters, montant, upDown }, thunkAPI) => {
    const body = [{}];
    try {
      const response = await apiNewMarko.post(
        `${apiTrading}POST/get_portef/`,
        body,
        {
          params: {
            // start: formatDate(dateDebut["$d"]),
            // end: formatDate(dateFin["$d"]),
            // Flag_hebdo: filters.flag_hebdo,
            // CMP_Cloture: filters.cmp_cloture,
            // Div_Reinvesti: filters.div_reinvesti,
            // montant_investi: +montant,
            // Flag_Trading: filters.flag_trading,
            // momentum_contrarien: filters.momentum_contrarien,
            // upside_downside: +upDown,
            start: "10/05/2022",
            end: "10/10/2023",
            Flag_hebdo: 1,
            CMP_Cloture: 0,
            Div_Reinvesti: 1,
            montant_investi: 100000000,
            Flag_Trading: 0,
            momentum_contrarien: 1,
            upside_downside: 5,
          },
        }
      );
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
  async ({ dateDebut, dateFin, backtestData, list_indices }, thunkAPI) => {
    const body = transformBacktestData(backtestData);
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
      return mergeData(response.data);
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

      // Create an object for the merged data if it doesn't exist
      if (!mergedData[seance]) {
        mergedData[seance] = { seance };
      }

      // Merge the properties into the existing merged data
      mergedData[seance] = { ...mergedData[seance], ...rest };
    });
  });

  // Convert the mergedData object to an array
  const resultArray = Object.values(mergedData);

  return resultArray;
};
