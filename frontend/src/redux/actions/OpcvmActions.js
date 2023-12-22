import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../axios";
import apiNewMarko from "../../api/apiNewMarko";
import { handleActionsError } from "../../utils/handleActionsError";
import { formatDate } from "../../utils/FormatDate";
import axios from "axios";
const apiOPCVMUrl = "OPCVM/";

export const getData = createAsyncThunk(
  "opcvm/getData",
  async ({ dateDebut, dateFin, classes, societes, types }, thunkAPI) => {
    try {
      const response = await axiosClient.get(`/opcvm/`, {
        params: {
          dateDebut,
          dateFin,
          classes,
          societes,
          types,
        },
      });
      const data = response.data.data;
      const libelles = data.map((item) => item.DENOMINATION_OPCVM);
      const nbSemaine = data.map((item) => +item.Nb_Semaine);
      const volatilite = data.map(
        (item) => +(item.Volatilite * 100).toFixed(2)
      );
      const cours = data.map((item) => +(item.EM_Hebdo / 1e6).toFixed(2));
      const performance = data.map(
        (item) => +(item.Performance * 100).toFixed(2)
      );
      const contraintes = {
        performance: {
          min: Math.min(...performance),
          max: Math.max(...performance),
        },
        cours: {
          min: Math.min(...cours),
          max: Math.max(...cours),
        },
        volatilite: {
          min: Math.min(...volatilite),
          max: Math.max(...volatilite),
        },
        nbSemaine: {
          min: Math.min(...nbSemaine),
          max: Math.max(...nbSemaine),
        },
      };
      console.log("getData", { data, libelles, contraintes });

      return { data, libelles, contraintes };
    } catch (error) {
      return handleActionsError(error, thunkAPI);
    }
  }
);

export const getSocietesGestion = createAsyncThunk(
  "opcvm/getSocietesGestion",
  async (_, thunkAPI) => {
    try {
      const response = await axiosClient.get(`/opcvm/getSocietesGestion`);
      console.log("getSocietesGestion", response.data);
      return response.data;
    } catch (error) {
      return handleActionsError(error, thunkAPI);
    }
  }
);

export const getDataSet = createAsyncThunk(
  "opcvm/getDataSet",
  async ({ dateDebut, dateFin, classes, societes }, thunkAPI) => {
    try {
      const response = await apiNewMarko.get(`${apiOPCVMUrl}POST/get_dataset`, {
        params: {
          start: formatDate(dateDebut["$d"]),
          end: formatDate(dateFin["$d"]),
          list_class: classes,
          list_sdg: societes,
        },
      });
      console.log("getDataSet", response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.detail);
    }
  }
);

export const getChartData = createAsyncThunk(
  "opcvm/getChartData",
  async ({ dateDebut, dateFin, libelles }, thunkAPI) => {
    try {
      const response = await axiosClient.get(`/opcvm/getChartData`, {
        params: {
          dateDebut,
          dateFin,
          libelles,
        },
      });
      console.log("getChartData OPCVM", response.data);
      return response.data;
    } catch (error) {
      return handleActionsError(error, thunkAPI);
    }
  }
);

export const getMatriceCorr = createAsyncThunk(
  "opcvm/getMatrice",
  async (_, thunkAPI) => {
    try {
      const response = await apiNewMarko.post(
        `${apiOPCVMUrl}POST/Matrice_correlation_Covariance/`,
        {
          dataset: thunkAPI.getState().opcvm.dataSet.filteredData,
        }
      );
      console.log("Matrice data opcvm", response);
      return response.data;
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error.response.data.detail);
    }
  }
);

export const contraintesPoids_ = createAsyncThunk(
  "opcvm/contraintesPoids",
  async ({ titres, contraintes }, thunkAPI) => {
    try {
      const reqBody = contraintes;
      const response = await apiNewMarko.post(
        `${apiOPCVMUrl}POST/CONTRAINTES_POIDS/`,
        reqBody,
        {
          params: {
            titres,
          },
        }
      );
      console.log("contraintesPoids", response);
      const result = {
        ...response.data,
        df_return: response.data.df_return.map((item) => ({
          ...item,
          minp: item["minp"] / 100,
          maxp: item["maxp"] / 100,
        })),
      };
      return result;
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error.response.data.detail);
    }
  }
);

export const portefeuilleMinimumVariance_ = createAsyncThunk(
  "opcvm/portefeuilleMinimumVariance",
  async (_, thunkAPI) => {
    try {
      const poids = thunkAPI.getState().opcvm.contraintesPoids.data.df_return;
      const response = await apiNewMarko.post(
        `${apiOPCVMUrl}POST/portefeuille_minimum_variance/`,
        {
          dataset: thunkAPI.getState().opcvm.dataSet.filteredData,
          df_poids_min_max: poids,
        }
      );
      console.log("portefeuille_minimum_variance OPCVM", response);
      return {
        data: response.data["Les poids optimaux"],
        poidsEqui: response.data["Les poids equipondéré"],
      };
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error.response.data.detail);
    }
  }
);

export const portefeuilleRendementMaximale_ = createAsyncThunk(
  "opcvm/portefeuilleRendementMaximale",
  async (_, thunkAPI) => {
    const poids = thunkAPI.getState().opcvm.contraintesPoids.data.df_return;
    try {
      const response = await apiNewMarko.post(
        `${apiOPCVMUrl}POST/portefeuille_Rendement_Maximale/`,
        {
          dataset: thunkAPI.getState().opcvm.dataSet.filteredData,
          df_poids_min_max: poids,
        }
      );
      console.log("opcvm/portefeuilleRendementMaximale", response);
      return response.data;
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error.response.data.detail);
    }
  }
);

export const portefeuilleMarkowitz_ = createAsyncThunk(
  "opcvm/portefeuilleMarkowitz",
  async (_, thunkAPI) => {
    const poids = thunkAPI.getState().opcvm.contraintesPoids.data.df_return;
    try {
      const response = await apiNewMarko.post(
        `${apiOPCVMUrl}POST/portefeuille_Markowitz/`,
        {
          dataset: thunkAPI.getState().opcvm.dataSet.filteredData,
          df_poids_min_max: poids,
        }
      );
      console.log("opcvm/portefeuilleMarkowitz", response);
      return response.data;
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error.response.data.detail);
    }
  }
);

export const portefeuilleSimule_ = createAsyncThunk(
  "opcvm/portefeuilleSimule",
  async ({ risque }, thunkAPI) => {
    const poids = thunkAPI.getState().opcvm.contraintesPoids.data.df_return;
    try {
      const response = await apiNewMarko.post(
        `${apiOPCVMUrl}POST/EVOLUTION_B100_PORTEFEUILLE_SIMULE/`,
        {
          dataset: thunkAPI.getState().opcvm.dataSet.filteredData,
          df_poids_min_max: poids,
        },
        {
          params: { risk_free_rate: risque / 100 },
        }
      );
      console.log("opcvm/EVOLUTION_B100_PORTEFEUILLE_SIMULE", response);
      return response.data;
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error.response.data.detail);
    }
  }
);

export const portefeuilleAleatoire_ = createAsyncThunk(
  "opcvm/portefeuilleAleatoire_",
  async ({ PTF, risque, nbrPointFront }, thunkAPI) => {
    const poids = thunkAPI.getState().opcvm.contraintesPoids.data.df_return;
    const dataset = thunkAPI.getState().opcvm.dataSet.filteredData;
    try {
      const response = await apiNewMarko.post(
        `${apiOPCVMUrl}POST/GENERATION_PORTEFEUILLES_ALEATOIRES/`,
        {
          dataset,
          df_poids_min_max: poids,
        },
        {
          params: {
            NB_PTF_ALEA: PTF,
            risk_free_rate: risque / 100,
          },
        }
      );
      const response2 = await apiNewMarko.post(
        `${apiOPCVMUrl}POST/DISCRETISATION_RENDEMENTS/`,
        {
          dataset,
          df_poids_min_max: poids,
        },
        {
          params: {
            num_points_front: nbrPointFront,
          },
        }
      );
      console.log("opcvm/GENERATION_PORTEFEUILLES_ALEATOIRES", response);
      console.log("opcvm/DISCRETISATION_RENDEMENTS", response2);
      return {
        data: response.data,
        frontiere: response2.data["Frontière"],
        frontiereWeights: response2.data["df_frontier_weights"],
      };
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error.response.data.detail);
    }
  }
);

export const evolutionB100Frontiere_ = createAsyncThunk(
  "opcvm/evolutionB100Frontiere_",
  async ({ nbrPointFront }, thunkAPI) => {
    try {
      const poids = thunkAPI.getState().opcvm.contraintesPoids.data.df_return;
      const response = await apiNewMarko.post(
        `${apiOPCVMUrl}POST/EVOLUTION_B100_PORTEFEUILLE_FRONTIERE_EFFICIENTE/`,
        {
          dataset: thunkAPI.getState().opcvm.dataSet.filteredData,
          df_poids_min_max: poids,
        },
        {
          params: {
            num_points_front: nbrPointFront,
          },
        }
      );
      console.log("evolutionB100Frontiere_", response);
      return response.data;
    } catch (error) {
      console.log("error", error);
      // thunkAPI.rejectWithValue(error.data.detail);
    }
  }
);

export const testApi = createAsyncThunk(
  "opcvm/testApi",
  async (_, thunkAPI) => {
    try {
      const urls = [
        "https://jsonplaceholder.typicode.com/posts",
        "https://jsonplaceholder.typicode.com/comments",
        "https://jsonplaceholder.typicode.com/albums",
        "https://jsonplaceholder.typicode.com/photos",
        "https://jsonplaceholder.typicode.com/todos",
        "https://jsonplaceholder.typicode.com/users",
      ];
      const requests = urls.map((url) => axios.get(url));

      Promise.all(requests)
        .then((responses) => {
          responses.forEach((response, index) => {
            console.log(`Response for URL ${urls[index]}:`, response.data);
          });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      console.log("testApi", requests);
      return "response.data";
    } catch (error) {
      console.log("error", error);
      // thunkAPI.rejectWithValue(error.data.detail);
    }
  }
);
