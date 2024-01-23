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
        {
          url: "CLASSEMENT_PERFORMANCE",
          params: `&${date}&${opcvm}`,
          varName: "classementPerformance",
        },
        {
          url: "BAROMETRE_QUANTALYS",
          params: `&${date}&${opcvm}&${periode}`,
          varName: "barometreQuantalys",
        },
        {
          url: "LŒIL_DE_LEXPERT",
          params: `&${date}&${opcvm}`,
          varName: "loeilExpert",
        },
        {
          url: "INDICATEURS_DE_RISQUE",
          params: `&${date}&${opcvm}`,
          varName: "indicateursRisque",
        },
        {
          url: "FONDS_VERSUS_CATEGORIE_1",
          params: `&${date}&${opcvm}`,
          varName: "fondsVersusCat1",
        },
        {
          url: "FONDS_VERSUS_CATEGORIE_2",
          params: `&${date}&${opcvm}`,
          varName: "fondsVersusCat2",
        },
        {
          url: "FONDS_VERSUS_CATEGORIE_3",
          params: `&${date}&${opcvm}`,
          varName: "fondsVersusCat3",
        },
      ];
      const [
        { analyseQuatile },
        { performance },
        { classementPerformance },
        { barometreQuantalys },
        { loeilExpert },
        { indicateursRisque },
        { fondsVersusCat1 },
        { fondsVersusCat2 },
        { fondsVersusCat3 },
      ] = await Promise.all(
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
      return {
        analyseQuatile,
        performance,
        classementPerformance,
        barometreQuantalys,
        loeilExpert,
        indicateursRisque,
        fondsVersusCat1,
        fondsVersusCat2,
        fondsVersusCat3,
      };
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue("Server Error");
    }
  }
);
