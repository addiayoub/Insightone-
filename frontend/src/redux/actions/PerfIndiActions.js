import { createAsyncThunk } from "@reduxjs/toolkit";
import apiNewMarko from "../../api/apiNewMarko";
const endpoint = "perf/indicateurs_macro/GET/";

export const getData = createAsyncThunk(
  "perfIndice/getData",
  async (_, thunkAPI) => {
    try {
      const urls = [
        "PIB_VOLUME",
        "INFLATION",
        "CAMPAGNE_CEREALIERE",
        "TAUX_REMPLISSAGE_BARRAGES",
        "RECETTES_TOURISTIQUE",
        "RECETTES_IDE",
        "TRANSFERTS_MRE",
        "DEFICIT_COMMERCIAL",
        "CONSOMMATION_ELECTRICITE",
        "TAUX_DEBITEURS",
        "BOURSE_MASI",
        "CHOMAGE_URBAIN",
        "TAUX_CHANGE",
      ];
      const responses = await Promise.all(
        urls.map(async (url) => {
          try {
            const response = await apiNewMarko.get(`${endpoint}${url}/`);
            // console.log(`response ${varName}:`, response);
            return { [url]: response.data };
          } catch (error) {
            console.log(error);
            return [];
          }
        })
      );
      const [
        PIB_VOLUME,
        INFLATION,
        CAMPAGNE_CEREALIERE,
        TAUX_REMPLISSAGE_BARRAGES,
        RECETTES_TOURISTIQUE,
        RECETTES_IDE,
        TRANSFERTS_MRE,
        DEFICIT_COMMERCIAL,
        CONSOMMATION_ELECTRICITE,
        TAUX_DEBITEURS,
        BOURSE_MASI,
        CHOMAGE_URBAIN,
        TAUX_CHANGE,
      ] = responses.map((obj) => Object.values(obj)[0]);
      console.log("RES", responses);
      return {
        PIB_VOLUME,
        INFLATION,
        CAMPAGNE_CEREALIERE,
        TAUX_REMPLISSAGE_BARRAGES,
        RECETTES_TOURISTIQUE,
        RECETTES_IDE,
        TRANSFERTS_MRE,
        DEFICIT_COMMERCIAL,
        CONSOMMATION_ELECTRICITE,
        TAUX_DEBITEURS,
        BOURSE_MASI,
        CHOMAGE_URBAIN,
        TAUX_CHANGE,
      };
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error.response.data.detail);
    }
  }
);
