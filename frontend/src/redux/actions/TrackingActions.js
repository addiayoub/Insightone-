import { createAsyncThunk } from "@reduxjs/toolkit";
import apiNewMarko from "../../api/apiNewMarko";
import { formatDate } from "../../utils/FormatDate";
import moment from "moment";

const apiTracking = "TRACK_OPC/";

export const generationPtfAlea = createAsyncThunk(
  "tacking/GENERATION_PORTEFEUILLES_ALEATOIRES",
  async ({ nbSim, dateDebut, dateFin, indices, opcvm }, thunkAPI) => {
    try {
      const response = await apiNewMarko.post(
        `${apiTracking}POST/GENERATION_PORTEFEUILLES_ALEATOIRES/`,
        {},
        {
          params: {
            nb_simulations: nbSim,
            start: formatDate(dateDebut["$d"]),
            end: formatDate(dateFin["$d"]),
            list_ind: indices,
            opcvm,
          },
        }
      );
      console.log("GENERATION_PORTEFEUILLES_ALEATOIRES", response.data);
      return {
        ...response.data,
        df_b100: response.data.df_b100.map((item) => ({
          ...item,
          seance: moment(item.seance).format("DD/MM/YYYY"),
        })),
        df_p: response.data.df_p.map((item) => ({
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
