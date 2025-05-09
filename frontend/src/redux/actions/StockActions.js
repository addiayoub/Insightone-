import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../api/axios";
import { handleActionsError } from "../../utils/handleActionsError";
import axios from "axios";
import getAPI from "../../api/getAPI";
import { formatDate } from "../../utils/FormatDate";
import { getPerfMASI, getPerfSectoriel } from "./PerfGlissanteActions";

export const getStockData = createAsyncThunk(
  "stock/getStockData",
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
      return handleActionsError(error, thunkAPI);
    }
  }
);

export const getCapitalisationData = createAsyncThunk(
  "stock/getCapitalisationData",
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
      return handleActionsError(error, thunkAPI);
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
      return handleActionsError(error, thunkAPI);
    }
  }
);
export const getMarketData = createAsyncThunk(
  "stock/getMarketData",
  async ({ date }, thunkAPI) => {
    try {
      date = formatDate(date["$d"]);
      const perfMarche = await getAPI.get(`Perf_Indice?par1=${date}`);
      const volMarche = await getAPI.get(`Perf_volume?par1=${date}`);
      const princContrib = await getAPI.get(`Perf_contrib?par1=${date}`);
      const princVolumeMB = await getAPI.get(`Perf_volumes_MB?par1=${date}`);
      const princVolumeMC = await getAPI.get(`Perf_volumes_MC?par1=${date}`);
      const evolMasi = await getAPI.get(`Evol_masi?par1=${date}`);
      const volumeEchan = await getAPI.get(`Volume_echange?par1=${date}`);
      const PlusHaussesBaissesVolume = await getAPI.get(
        `Plus_hausses_baisses_volume?par1=${date}`
      );
      const staticSociete = await getAPI.get(`Static_societe?par1=${date}`);
      const staticSociete2 = await getAPI.get(`static_societe2?par1=${date}`);
      const perfMasiVolume = await getAPI.get(
        `Perf_masi_volume?par1=${date}`
      );
      const titreEchange = await getAPI.get(`Titre_echange?par1=${date}`);
      const plusFortesVar = await getAPI.get(`Hebdo_fortes_var?par1=${date}`);
      const perfSecteurs = await getAPI.get(`Perf_secteurs?par1=${date}`);
      const capmarche = await getAPI.get(`Cap_marche?par1=${date}`);
      const masiVolumeYTD = await getAPI.get(`Masi_volume_ytd?par1=${date}`);
      const masiVolume = await getAPI.get(`Masi_volume_1an?par1=${date}`);
      const commentaire = await getAPI.get(`comm_marche?par1=${date}`);
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
      return handleActionsError(error, thunkAPI);
    }
  }
);

export const getSliderData = createAsyncThunk(
  "stock/getSliderData",
  async ({ date }, thunkAPI) => {
    try {
      const response = await axiosClient.get(`/stock/getSliderData`, {
        params: {
          date,
        },
      });
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
        `http://192.168.11.2:30001/report/GET/Perf_secteurs?par1=08-12-2023`,
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
      return handleActionsError(error, thunkAPI);
    }
  }
);

export const getMarketData_2 = createAsyncThunk(
  "stock/getMarketData_2",
  async ({ date }, thunkAPI) => {
    console.log("getMarketData_2");
    try {
      const urls = [
        "Perf_Indice",
        "Perf_volume",
        "Perf_contrib",
        "Perf_volumes_MB",
        "Perf_volumes_MC",
        "Evol_masi",
        "Volume_echange",
        "Plus_hausses_baisses_volume",
        "Static_societe",
        "static_societe2",
        "Perf_secteurs",
        "Perf_masi_volume",
        "Titre_echange",
        "Hebdo_fortes_var",
        "Cap_marche",
        "Masi_volume_ytd",
        "Masi_volume_1an",
        // "comm_marche",
      ];
      date = formatDate(date["$d"]);
      console.log("getMarketData_2 date", date);

      const [
        Perf_Indice,
        Perf_volume,
        Perf_contrib,
        Perf_volumes_MB,
        Perf_volumes_MC,
        Evol_masi,
        Volume_echange,
        Plus_hausses_baisses_volume,
        Static_societe,
        static_societe2,
        Perf_secteurs,
        Perf_masi_volume,
        Titre_echange,
        Hebdo_fortes_var,
        Cap_marche,
        Masi_volume_ytd,
        Masi_volume_1an,
        comm_marche,
      ] = await Promise.all(
        urls.map(async (url) => {
          const response = await getAPI.get(`${url}?par1=${date}`);
          return { [url]: response.data };
        })
      );
      const perfMASI = await getPerfMASI(date);
      const perfSectoriel = await getPerfSectoriel(date);
      console.log(
        "responses market data",
        Perf_Indice,
        Perf_volume,
        Perf_contrib,
        Perf_volumes_MB,
        Perf_volumes_MC,
        Evol_masi,
        Volume_echange,
        Plus_hausses_baisses_volume,
        Static_societe,
        static_societe2,
        Perf_masi_volume,
        Perf_secteurs,
        Titre_echange,
        Hebdo_fortes_var,
        Cap_marche,
        Masi_volume_ytd,
        Masi_volume_1an,
        comm_marche
      );

      const result = {
        perfMarche: Perf_Indice.Perf_Indice,
        volMarche: Perf_volume.Perf_volume,
        princContrib: Perf_contrib.Perf_contrib.sort(
          (a, b) => b.perf_prec - a.perf_prec
        ),
        princVolumeMB: Perf_volumes_MB.Perf_volumes_MB,
        princVolumeMC: Perf_volumes_MC.Perf_volumes_MC,
        evolMasi: Evol_masi.Evol_masi,
        volumeEchan: Volume_echange.Volume_echange.sort(
          (a, b) => new Date(a.seance) - new Date(b.seance)
        ),
        PlusHaussesBaissesVolume:
          Plus_hausses_baisses_volume.Plus_hausses_baisses_volume,
        staticSociete: Static_societe.Static_societe,
        staticSociete2: static_societe2.static_societe2,
        perfMasiVolume: Perf_masi_volume.Perf_masi_volume,
        titreEchange: Titre_echange.Titre_echange,
        plusFortesVar: Hebdo_fortes_var.Hebdo_fortes_var,
        perfSecteurs: Perf_secteurs.Perf_secteurs,
        capmarche: Cap_marche.Cap_marche,
        masiVolumeYTD: Masi_volume_ytd.Masi_volume_ytd,
        masiVolume: Masi_volume_1an.Masi_volume_1an,
        perfMASI,
        perfSectoriel,
        // commentaire: comm_marche.comm_marche,
      };

      return result;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue("Server Error");
      // return handleActionsError(error, thunkAPI);
    }
  }
);

export const getComments = createAsyncThunk(
  "stock/getComments",
  async ({ date }, thunkAPI) => {
    console.log("getComments");
    try {
      date = formatDate(date["$d"]);
      const response = await getAPI.get(`comm_marche?par1=${date}`);
      console.log("comments data", response);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(
        "Une erreur interne est survenue. Veuillez réessayer."
      );
    }
  }
);
