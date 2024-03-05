import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../api/axios";
import apiAxios from "../../apiAxios";
import { handleActionsError } from "../../utils/handleActionsError";
import { formatDate } from "../../utils/FormatDate";
import { transformToJSON } from "../../utils/transformToJSON";
import getAPI from "../../api/getAPI";
import apiNewMarko from "../../api/apiNewMarko";
const apiNewMarkoUrl = "NEW_MARKO/";

export const getData = createAsyncThunk("data/getData", async (_, thunkAPI) => {
  try {
    const response = await axiosClient.get(`/data`);
    return response.data;
  } catch (error) {
    return handleActionsError(error, thunkAPI);
  }
});

export const getDataTest = createAsyncThunk(
  "data/getDataTest",
  async ({ dateDebut, dateFin, secteur }, thunkAPI) => {
    try {
      // `/data/getData/${dateDebut}/${dateFin}/${secteur}`,
      const response = await axiosClient.get(`/data/getData/`, {
        params: {
          dateDebut,
          dateFin,
          secteur,
        },
      });
      console.log("params", {
        dateDebut,
        dateFin,
        secteur,
      });
      console.log(response);
      return response.data;
    } catch (error) {
      return handleActionsError(error, thunkAPI);
    }
  }
);

export const getDataWithContraints = createAsyncThunk(
  "data/getDataWithContraints",
  async ({ dateDebut, dateFin, contraints }, thunkAPI) => {
    try {
      console.log("params data with", {
        dateDebut,
        dateFin,
        contraints,
      });
      const response = await axiosClient.get(`/data/getDataWithContraints/`, {
        params: {
          dateDebut,
          dateFin,
          contraints,
        },
      });
      console.log("data with", response);
      return response.data;
    } catch (error) {
      return handleActionsError(error, thunkAPI);
    }
  }
);

export const getChartData = createAsyncThunk(
  "data/getChartData",
  async ({ dateDebut, dateFin, valeurs }, thunkAPI) => {
    try {
      console.log("params chart data", {
        dateDebut,
        dateFin,
        valeurs,
      });
      const response = await axiosClient.get(`/data/getChartData/`, {
        params: {
          dateDebut,
          dateFin,
          valeurs,
        },
      });

      console.log("chart data with", response.data);
      return response.data;
    } catch (error) {
      return handleActionsError(error, thunkAPI);
    }
  }
);

export const getIndices = createAsyncThunk(
  "data/getIndices",
  async (_, thunkAPI) => {
    try {
      const response = await axiosClient.get(`/data/getIndices/`);

      console.log("getIndices", response.data);
      const indices = response.data.data.map((item) => item.NOM_INDICE);
      const classes = [
        ...new Set(response.data.data.map((item) => item.classe)),
      ];
      const categories = [
        ...new Set(response.data.data.map((item) => item.categorie)),
      ];
      const sCategories = [
        ...new Set(response.data.data.map((item) => item.S_CATEGORIE)),
      ];
      console.log("INDICES res", { classes, categories, sCategories, indices });
      localStorage.setItem(
        "indices",
        JSON.stringify({
          data: response.data.data,
          classes,
          categories,
          sCategories,
          indices,
        })
      );
      return {
        data: response.data.data,
        classes,
        categories,
        sCategories,
        indices,
      };
    } catch (error) {
      return handleActionsError(error, thunkAPI);
    }
  }
);

export const getTitres = createAsyncThunk(
  "data/getTitres",
  async (_, thunkAPI) => {
    try {
      const response = await axiosClient.get(`/data/getTitres/`);

      console.log("getTitres", response.data.data);
      localStorage.setItem("titres", JSON.stringify(response.data.data));
      return response.data.data;
    } catch (error) {
      return handleActionsError(error, thunkAPI);
    }
  }
);

export const getIndicesChart = createAsyncThunk(
  "data/getIndicesChart",
  async ({ dateDebut, dateFin, indices }, thunkAPI) => {
    try {
      const response = await axiosClient.get(`/data/getIndicesChart/`, {
        params: {
          dateDebut,
          dateFin,
          indices,
        },
      });
      return response.data;
    } catch (error) {
      return handleActionsError(error, thunkAPI);
    }
  }
);

export const getComparaison = createAsyncThunk(
  "data/getComparaison",
  async ({ dateDebut, dateFin, indices }, thunkAPI) => {
    try {
      const response = await axiosClient.get(`/data/getComparaison/`, {
        params: {
          dateDebut,
          dateFin,
          indices,
        },
      });
      return response.data;
    } catch (error) {
      return handleActionsError(error, thunkAPI);
    }
  }
);

export const getFirstGraph = createAsyncThunk(
  "data/getFirstGraph",
  async ({ dateDebut, dateFin, indices }, thunkAPI) => {
    try {
      const response = await axiosClient.get(`/data/getFirstGraph/`, {
        params: {
          dateDebut,
          dateFin,
          indices,
        },
      });
      return response.data;
    } catch (error) {
      return handleActionsError(error, thunkAPI);
    }
  }
);

export const getRendementRisqueData = createAsyncThunk(
  "data/getRendementRisqueData",
  async ({ dateDebut, dateFin, indices }, thunkAPI) => {
    try {
      const response = await axiosClient.get(`/data/getRendementRisqueData/`, {
        params: {
          dateDebut,
          dateFin,
          indices,
        },
      });
      return response.data;
    } catch (error) {
      return handleActionsError(error, thunkAPI);
    }
  }
);

export const getSecteurs = createAsyncThunk(
  "data/getSecteurs",
  async (_, thunkAPI) => {
    try {
      const response = await axiosClient.get(`/data/getSecteurs/`);
      console.log(response);
      return response.data;
    } catch (error) {
      return handleActionsError(error, thunkAPI);
    }
  }
);
export const Matrice_correlation_Covariance = createAsyncThunk(
  "data/Matrice_correlation_Covariance",
  async (_, thunkAPI) => {
    try {
      const response = await apiNewMarko.post(
        `${apiNewMarkoUrl}POST/Matrice_correlation_Covariance/`,
        {
          dataset: thunkAPI.getState().rapport.dataSet.data,
        }
      );
      console.log("Matrice data", response);
      return response.data;
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const CONTRAINTES_POIDS = createAsyncThunk(
  "data/CONTRAINTES_POIDS",
  async ({ dateDebut, titres, contraintes, contraintesRe }, thunkAPI) => {
    try {
      const reqBody = {
        contraint_ab: contraintes,
        contraint_re: contraintesRe,
      };
      const response = await apiNewMarko.post(
        `${apiNewMarkoUrl}POST/CONTRAINTES_POIDS/`,
        reqBody,
        {
          params: {
            dataMasi: formatDate(dateDebut["$d"]),
            titres,
          },
        }
      );
      console.log("CONTRAINTES_POIDS/", response);
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
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const portefeuille_minimum_variance = createAsyncThunk(
  "data/portefeuille_minimum_variance",
  async (_, thunkAPI) => {
    try {
      const poids = thunkAPI.getState().rapport.contraintesPoids.data.df_return;
      const response = await apiNewMarko.post(
        `${apiNewMarkoUrl}POST/portefeuille_minimum_variance/`,
        {
          dataset: thunkAPI.getState().rapport.dataSet.data,
          df_poids_min_max: poids,
        }
      );
      console.log("portefeuille_minimum_variance", response);
      return {
        data: response.data["Les poids optimaux"],
        poidsEqui: response.data["Les poids equipondéré"],
      };
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const EVOLUTION_B100_PORTEFEUILLE_SIMULE = createAsyncThunk(
  "data/EVOLUTION_B100_PORTEFEUILLE_SIMULE",
  async (_, thunkAPI) => {
    try {
      const poids = thunkAPI.getState().rapport.contraintesPoids.data.df_return;
      const response = await apiNewMarko.post(
        `${apiNewMarkoUrl}POST/EVOLUTION_B100_PORTEFEUILLE_SIMULE/`,
        {
          dataset: thunkAPI.getState().rapport.dataSet.data,
          df_poids_min_max: poids,
        }
      );
      console.log("EVOLUTION_B100_PORTEFEUILLE_SIMULE", response);
      return response.data;
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const EVOLUTION_B100_PORTEFEUILLE_SIMULE2 = createAsyncThunk(
  "data/EVOLUTION_B100_PORTEFEUILLE_SIMULE2",
  async (_, thunkAPI) => {
    try {
      const response = await apiAxios.get(
        "EVOLUTION_B100_PORTEFEUILLE_SIMULE2/?start=25%2F12%2F2018&end=11%2F04%2F2023&titre=LAFARGEHOLCIM%20MAROC&titre=BCP&titre=CIH&titre=ADDOHA&titre=ALLIANCES&titre=ATW&titre=IAM&titre=LES&titre=HPS&titre=CMT&titre=CDM&titre=CTM&titre=DHO&titre=GAZ&titre=MLE&titre=RISMA&titre=COLORADO&titre=SID&titre=OULMES&titre=SNEP&poids=0.04&poids=0.1&poids=0.06&poids=0.04&poids=0.06&poids=0.12&poids=0.08&poids=0.02&poids=0.03&poids=0.05&poids=0.01&poids=0.04&poids=0.05&poids=0.04&poids=0.02&poids=0.04&poids=0.09&poids=0.01&poids=0.06&poids=0.04"
      );
      console.log("EVOLUTION_B100_PORTEFEUILLE_SIMULE2", response);
      return response.data;
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const GENERATION_PORTEFEUILLES_ALEATOIRES = createAsyncThunk(
  "data/GENERATION_PORTEFEUILLES_ALEATOIRES",
  async ({ PTF, risque, nbrPointFront }, thunkAPI) => {
    try {
      const poids = thunkAPI.getState().rapport.contraintesPoids.data.df_return;
      const response = await apiNewMarko.post(
        `${apiNewMarkoUrl}POST/GENERATION_PORTEFEUILLES_ALEATOIRES/`,
        {
          dataset: thunkAPI.getState().rapport.dataSet.data,
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
        `${apiNewMarkoUrl}POST/DISCRETISATION_RENDEMENTS/`,
        {
          dataset: thunkAPI.getState().rapport.dataSet.data,
          df_poids_min_max: poids,
        },
        {
          params: {
            num_points_front: nbrPointFront,
          },
        }
      );
      console.log("GENERATION_PORTEFEUILLES_ALEATOIRES", response, response2);
      const res = {
        data: response.data,
        frontiere: response2.data["Frontière"],
        frontiereWeights: response2.data["df_frontier_weights"],
      };
      return res;
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const portefeuille_Rendement_Maximale = createAsyncThunk(
  "data/portefeuille_Rendement_Maximale",
  async (_, thunkAPI) => {
    const poids = thunkAPI.getState().rapport.contraintesPoids.data.df_return;
    try {
      const response = await apiNewMarko.post(
        `${apiNewMarkoUrl}POST/portefeuille_Rendement_Maximale/`,
        {
          dataset: thunkAPI.getState().rapport.dataSet.data,
          df_poids_min_max: poids,
        }
      );
      console.log("portefeuille_Rendement_Maximale", response);
      return response.data;
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const portefeuille_Markowitz = createAsyncThunk(
  "data/portefeuille_Markowitz",
  async (_, thunkAPI) => {
    const poids = thunkAPI.getState().rapport.contraintesPoids.data.df_return;
    try {
      const response = await apiNewMarko.post(
        `${apiNewMarkoUrl}POST/portefeuille_Markowitz/`,
        {
          dataset: thunkAPI.getState().rapport.dataSet.data,
          df_poids_min_max: poids,
        }
      );
      console.log("portefeuille_Markowitz", response);
      return response.data;
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const get_poids_masi_all = createAsyncThunk(
  "data/get_poids_masi_all",
  async ({ dateDebut }, thunkAPI) => {
    dateDebut = formatDate(dateDebut["$d"]);
    console.log("get_poids_masi_all dateDebut", dateDebut);
    try {
      const response = await apiNewMarko.get(
        `${apiNewMarkoUrl}POST/get_poids_masi_all/?start=${dateDebut}`
      );
      console.log("get_poids_masi_all", response);
      return response.data;
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const DISCRETISATION_RENDEMENTS = createAsyncThunk(
  "data/DISCRETISATION_RENDEMENTS",
  async (_, thunkAPI) => {
    try {
      const response = await apiAxios.get(
        "DISCRETISATION_RENDEMENTS/?num_points_front=10&NB_PTF=5&risk_free_rate=0.025&start=25%2F12%2F2018&end=11%2F04%2F2023&titre=LAFARGEHOLCIM%20MAROC&titre=BCP&titre=CIH&titre=ADDOHA&titre=ALLIANCES&titre=ATW&titre=IAM&titre=LES&titre=HPS&titre=CMT&titre=CDM&titre=CTM&titre=DHO&titre=GAZ&titre=MLE&titre=RISMA&titre=COLORADO&titre=SID&titre=OULMES&titre=SNEP&minp=0&minp=0&minp=0&minp=0&minp=0&minp=0&minp=0&minp=0&minp=0&minp=0&minp=0&minp=0&minp=0&minp=0&minp=0&minp=0&minp=0&minp=0&minp=0&minp=0&maxp=0.1&maxp=0.1&maxp=0.1&maxp=0.1&maxp=0.1&maxp=0.1&maxp=0.1&maxp=0.1&maxp=0.1&maxp=0.1&maxp=0.1&maxp=0.1&maxp=0.1&maxp=0.1&maxp=0.1&maxp=0.1&maxp=0.1&maxp=0.1&maxp=0.1&maxp=0.1"
      );
      console.log("DISCRETISATION_RENDEMENTS", response);
      return response.data;
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const EVOLUTION_B100_PORTEFEUILLE_FRONTIERE_EFFICIENTE =
  createAsyncThunk(
    "data/EVOLUTION_B100_PORTEFEUILLE_FRONTIERE_EFFICIENTE",
    async ({ nbrPointFront }, thunkAPI) => {
      try {
        const poids =
          thunkAPI.getState().rapport.contraintesPoids.data.df_return;
        const response = await apiNewMarko.post(
          `${apiNewMarkoUrl}POST/EVOLUTION_B100_PORTEFEUILLE_FRONTIERE_EFFICIENTE/`,
          {
            dataset: thunkAPI.getState().rapport.dataSet.data,
            df_poids_min_max: poids,
          },
          {
            params: {
              num_points_front: nbrPointFront,
            },
          }
        );
        console.log(
          "EVOLUTION_B100_PORTEFEUILLE_FRONTIERE_EFFICIENTE",
          response
        );
        return response.data;
      } catch (error) {
        console.log("error", error);
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

export const filterMarkoAction = createAsyncThunk(
  "data/filterMarkoAction",
  async ({ dateDebut, dateFin }, thunkAPI) => {
    try {
      const dd = formatDate(dateDebut["$d"]);
      const df = formatDate(dateFin["$d"]);
      console.log("filterMarkoAction dates", dd, df);
      const response = await getAPI.get(`GETAPI?FILTER_MARKO&${dd}&${df}`);
      console.log("FilterMarko", response.data);
      const result = response.data;
      const valeurs = result.map((item) => item.LIBELLE);
      const nbSemaine = result.map((item) => +item.Nb_Semaine);
      const volatilite = result.map(
        (item) => +(item.Volatilite * 100).toFixed(2)
      );
      const vqm = result.map((item) => +item.VQM.toFixed(2));
      const performance = result.map(
        (item) => +(item.Performance * 100).toFixed(2)
      );
      const contraintes = {
        performance: {
          min: Math.min(...performance),
          max: Math.max(...performance),
        },
        vqm: {
          min: Math.min(...vqm),
          max: Math.max(...vqm),
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
      return {
        data: result,
        valeurs,
        contraintes,
      };
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error.data.detail);
    }
  }
);

export const getDataSet = createAsyncThunk(
  "data/getDataSet",
  async ({ dateDebut, dateFin, valeurs }, thunkAPI) => {
    try {
      const response = await apiNewMarko.get(
        `${apiNewMarkoUrl}GET/get_dataset/`,
        {
          params: {
            start: formatDate(dateDebut["$d"]),
            end: formatDate(dateFin["$d"]),
            list_valeur: valeurs,
          },
        }
      );
      console.log("newApi", response);
      return response.data;
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
