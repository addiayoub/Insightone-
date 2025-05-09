import { createAsyncThunk } from "@reduxjs/toolkit";
import { formatDate } from "../../utils/FormatDate";
import getAPI from "../../api/getAPI";
import partitionData from "../../utils/partitionData";

const barometreSortOrder = {
  "Très haussier": 4,
  Haussier: 3,
  Neutre: 2,
  Baissier: 1,
  "Très baissier": 0,
};

export const getAnalyse = createAsyncThunk(
  "AnalyseOPCVM/getAnalyse",
  async ({ date, opcvm, seuil, periode }, thunkAPI) => {
    try {
      date = formatDate(date["$d"]);
      seuil = seuil / 100;
      const urls = [
        {
          url: "ANALYSE_QUARTILE_3",
          params: `?par1=${date}&par2=${opcvm}&par3=${periode}`,
          varName: "analyseQuatile",
        },
        {
          url: "PERFORMANCE_PARAM_4",
          params: `?par1=${date}&par2=${opcvm}`,
          varName: "performance",
        },
        {
          url: "CLASSEMENT_PERFORMANCE",
          params: `?par1=${date}&par2=${opcvm}`,
          varName: "classementPerformance",
        },
        {
          url: "BAROMETRE_QUANTALYS",
          params: `?par1=${date}&par2=${opcvm}&par3=${periode}`,
          varName: "barometreQuantalys",
        },
        {
          url: "LOEIL_DE_LEXPERT",
          params: `?par1=${date}&par2=${opcvm}`,
          varName: "loeilExpert",
        },
        {
          url: "INDICATEURS_DE_RISQUE",
          params: `?par1=${date}&par2=${opcvm}`,
          varName: "indicateursRisque",
        },
        {
          url: "FONDS_VERSUS_CATEGORIE_1",
          params: `?par1=${date}&par2=${opcvm}`,
          varName: "fondsVersusCat1",
        },
        {
          url: "FONDS_VERSUS_CATEGORIE_2",
          params: `?par1=${date}&par2=${opcvm}`,
          varName: "fondsVersusCat2",
        },
        {
          url: "FONDS_VERSUS_CATEGORIE_3",
          params: `?par1=${date}&par2=${opcvm}`,
          varName: "fondsVersusCat3",
        },
        {
          url: "INDICATEURS_PERF_RISQUE",
          params: `?par1=${date}&par2=${opcvm}`,
          varName: "indicateursPerfRisque",
        },
        {
          url: "ANALYSE_LIPPER_1",
          params: `?par1=${date}&par2=${opcvm}&par3=${periode}&par4=${seuil}`,
          varName: "analyseLipper1",
        },
        {
          url: "ANALYSE_LIPPER_2",
          params: `?par1=${date}&par2=${opcvm}&par3=${periode}&par4=${seuil}`,
          varName: "analyseLipper2",
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
        { indicateursPerfRisque },
        { analyseLipper1 },
        { analyseLipper2 },
      ] = await Promise.all(
        urls.map(async ({ url, varName, params }) => {
          try {
            const response = await getAPI.get(`${url}${params}`);
            return { [varName]: response.data };
          } catch (error) {
            console.log(error);
            return [];
          }
        })
      );
      console.log(
        "AnalyseOPCVM Analyse",
        analyseQuatile,
        performance,
        "partitionData",
        partitionData(performance)
      );
      const separatePerf = partitionData(performance);
      return {
        analyseQuatile: analyseQuatile.sort(
          (a, b) => new Date(a.Date_VL) - new Date(b.Date_VL)
        ),
        performance: separatePerf,
        classementPerformance,
        barometreQuantalys: barometreQuantalys.sort(
          (a, b) => barometreSortOrder[a.marche] - barometreSortOrder[b.marche]
        ),
        loeilExpert,
        indicateursRisque,
        fondsVersusCat1,
        fondsVersusCat2,
        fondsVersusCat3,
        indicateursPerfRisque,
        analyseLipper1,
        analyseLipper2,
      };
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue("Server Error");
    }
  }
);
