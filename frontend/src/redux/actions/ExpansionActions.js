import { createAsyncThunk } from "@reduxjs/toolkit";
import apiNewMarko from "../../api/apiNewMarko";
import { formatDate } from "../../utils/FormatDate";
import moment from "moment";
import apiMarko from "../../api/apiMarko";

const apiTracking = "OPC_IND/";

export const getAnalyse = createAsyncThunk(
  "expansion/getAnalyse",
  async ({ date, opcvm, seuil, periode }, thunkAPI) => {
    try {
      // date = formatDate(date["$d"]);
      date = "05/01/2024";
      seuil = seuil / 100;
      const urls = [
        {
          url: "ANALYSE_QUARTILE_3",
          params: `&${date}&${opcvm}&${periode}`,
          varName: "analyseQuatile",
        },
        {
          url: "PERFORMANCE_PARAM_4",
          params: `&${date}&${opcvm}`,
          varName: "performance",
        },
      ];
      const [{ analyseQuatile }, { performance }] = await Promise.all(
        urls.map(async ({ url, varName, params }) => {
          try {
            const response = await apiMarko.get(`GETAPI?${url}${params}`);
            return { [varName]: response.data };
          } catch (error) {
            console.log(error);
            return [];
          }
        })
      );
      console.log("Expansion Analyse", analyseQuatile, performance);
      return { analyseQuatile, performance };
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue("Server Error");
    }
  }
);
