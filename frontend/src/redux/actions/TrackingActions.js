import { createAsyncThunk } from "@reduxjs/toolkit";
import apiNewMarko from "../../api/apiNewMarko";
import { formatDate } from "../../utils/FormatDate";
import moment from "moment";
import filterData from "../../utils/filterData";

const apiTracking = "BACKTEST/TRACK_OPC/";

export const generationPtfAlea = createAsyncThunk(
  "tacking/GENERATION_PORTEFEUILLES_ALEATOIRES",
  async ({ nbSim, dateDebut, dateFin, indices, opcvm, ajuster }, thunkAPI) => {
    try {
      console.log(`/${opcvm}/`);
      const response = await apiNewMarko.post(
        `${apiTracking}POST/GENERATION_PORTEFEUILLES_ALEATOIRES/`,
        indices,
        {
          params: {
            nb_simulations: nbSim,
            start: formatDate(dateDebut["$d"]),
            end: formatDate(dateFin["$d"]),
            opcvm,
            flag_ajust_poids: ajuster,
          },
        }
      );
      console.log("GENERATION_PORTEFEUILLES_ALEATOIRES", response.data);
      const patterns = [/SIM optimal/, new RegExp(opcvm)];
      return {
        ...response.data,
        df_rendement: filterData(response.data.df_perf, patterns),
        df_b100: response.data.df_b100.map((item) => ({
          ...item,
          seance: moment(item.seance).format("DD/MM/YYYY"),
        })),
      };
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue("Server Error");
    }
  }
);
