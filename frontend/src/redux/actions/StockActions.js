import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../axios";
import { handleActionsError } from "../../utils/handleActionsError";
import axios from "axios";
import apiMarko from "../../api/apiMarko";
import { formatDate } from "../../utils/FormatDate";

export const getStockData = createAsyncThunk(
  "user/getStockData",
  async ({ date }, thunkAPI) => {
    try {
      const response = await axiosClient.get(`/stock/stockChartData`, {
        params: {
          date,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      // return custom error message from backend if present
      handleActionsError(error, thunkAPI);
    }
  }
);

export const getCapitalisationData = createAsyncThunk(
  "user/getCapitalisationData",
  async ({ date }, thunkAPI) => {
    try {
      const response = await axiosClient.get(`/stock/getCapitalisationData`, {
        params: {
          date,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      // return custom error message from backend if present
      handleActionsError(error, thunkAPI);
    }
  }
);

export const getDashboardData = createAsyncThunk(
  "stock/getDashboardData",
  async ({ date }, thunkAPI) => {
    try {
      const response = await axiosClient.get(`/stock/allQueries`, {
        params: { date },
      });
      console.log("allQueries date", date);
      console.log("allQueries resp", response);
      return response.data;
    } catch (error) {
      console.log(error);
      handleActionsError(error, thunkAPI);
    }
  }
);
export const getMarketData = createAsyncThunk(
  "stock/getMarketData",
  async ({ date }, thunkAPI) => {
    try {
      date = formatDate(date["$d"]);
      const perfMarche = await apiMarko.get(`GETAPI?Perf_Indice&${date}`);
      const volMarche = await apiMarko.get(`GETAPI?Perf_volume&${date}`);
      const princContrib = await apiMarko.get(`GETAPI?Perf_contrib&${date}`);
      const princVolumeMB = await apiMarko.get(
        `GETAPI?Perf_volumes_MB&${date}`
      );
      const princVolumeMC = await apiMarko.get(
        `GETAPI?Perf_volumes_MC&${date}`
      );
      const evolMasi = await apiMarko.get(`GETAPI?Evol_masi&${date}`);
      const volumeEchan = await apiMarko.get(`GETAPI?Volume_echange&${date}`);
      const PlusHaussesBaissesVolume = await apiMarko.get(
        `GETAPI?Plus_hausses_baisses_volume&${date}`
      );
      const staticSociete = await apiMarko.get(`GETAPI?Static_societe&${date}`);
      const staticSociete2 = await apiMarko.get(
        `GETAPI?static_societe2&${date}`
      );
      const perfMasiVolume = await apiMarko.get(
        `GETAPI?Perf_masi_volume&${date}`
      );
      const titreEchange = await apiMarko.get(`GETAPI?Titre_echange&${date}`);
      const plusFortesVar = await apiMarko.get(
        `GETAPI?Hebdo_fortes_var&${date}`
      );
      const perfSecteurs = await apiMarko.get(`GETAPI?Perf_secteurs&${date}`);
      const capmarche = await apiMarko.get(`GETAPI?Cap_marche&${date}`);
      const masiVolumeYTD = await apiMarko.get(
        `GETAPI?Masi_volume_ytd&${date}`
      );
      const masiVolume = await apiMarko.get(`GETAPI?Masi_volume_1an&${date}`);
      const commentaire = await apiMarko.get(`GETAPI?comm_marche&${date}`);
      const result = {
        perfMarche: perfMarche.data,
        volMarche: volMarche.data,
        princContrib: princContrib.data.sort(
          (a, b) => b.perf_prec - a.perf_prec
        ),
        princVolumeMB: princVolumeMB.data,
        princVolumeMC: princVolumeMC.data,
        evolMasi: evolMasi.data,
        volumeEchan: volumeEchan.data.sort(
          (a, b) => new Date(a.seance) - new Date(b.seance)
        ),
        PlusHaussesBaissesVolume: PlusHaussesBaissesVolume.data,
        staticSociete: staticSociete.data,
        staticSociete2: staticSociete2.data,
        perfMasiVolume: perfMasiVolume.data,
        titreEchange: titreEchange.data,
        plusFortesVar: plusFortesVar.data,
        perfSecteurs: perfSecteurs.data,
        capmarche: capmarche.data,
        masiVolumeYTD: masiVolumeYTD.data,
        masiVolume: masiVolume.data,
        commentaire: commentaire.data,
      };
      console.log("getMarketData", date);
      console.log("getMarketData", result);
      console.log("before volumeEchan.data", volumeEchan.data);
      console.log(
        "volumeEchan.data",
        volumeEchan.data.sort((a, b) => new Date(a.seance) - new Date(b.seance))
      );
      return result;
    } catch (error) {
      console.log(error);
      handleActionsError(error, thunkAPI);
    }
  }
);

export const getSliderData = createAsyncThunk(
  "stock/getSliderData",
  async (_, thunkAPI) => {
    try {
      const response = await axiosClient.get(`/stock/getSliderData`);
      console.log("getSliderData resp", response);
      return response.data;
    } catch (error) {
      console.log(error);
      return handleActionsError(error, thunkAPI);
    }
  }
);

export const getSecteurs_2 = createAsyncThunk(
  "stock/getSecteurs_2",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://192.168.11.109:9090/GETAPI?Perf_secteurs&08-12-2023`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjb25zdW1lciIsImlhdCI6MTcwMjA0Mzg4MSwiZXhwIjoxNzAyMTMwMjgxfQ.eoZnIP_XGQtQdplz2WahEW-Rd2w3CtAnIo1m3b7Jajk`,
          },
        }
      );
      console.log("getSecteurs_2", response);
      return response.data;
    } catch (error) {
      console.log(error);
      handleActionsError(error, thunkAPI);
    }
  }
);

export const getMarketData_2 = createAsyncThunk(
  "stock/getMarketData",
  async (_, thunkAPI) => {
    console.log("getMarketData_2");
    try {
      const urls = [
        "GETAPI?Perf_Indice&",
        "GETAPI?Perf_volume&",
        "GETAPI?Perf_contrib&",
      ];

      const requests = urls.map((url) => apiMarko.get(`${url}10/10/2023`));

      Promise.all(requests)
        .then((responses) => {
          responses.forEach((response, index) => {
            console.log(`Response for URL ${urls[index]}:`, response.data);
          });
        })
        .catch((error) => {
          // Handle errors here
          console.error("Error:", error);
        });
      return "result";
    } catch (error) {
      console.log(error);
      // handleActionsError(error, thunkAPI);
    }
  }
);
