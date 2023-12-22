import { createAsyncThunk } from "@reduxjs/toolkit";
import apiNewMarko from "../../api/apiNewMarko";
import { formatDate } from "../../utils/FormatDate";

const apiTrading = "trading/";

export const getPortef = createAsyncThunk(
  "backtest/getPortef",

  async (_, thunkAPI) => {
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
            start: "10/10/2023",
            end: "15/10/2023",
            Flag_hebdo: 1,
            CMP_Cloture: 0,
            Div_Reinvesti: 1,
            montant_investi: 5000000000,
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
