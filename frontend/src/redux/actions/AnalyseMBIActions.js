import { createAsyncThunk } from "@reduxjs/toolkit";
import { formatDate } from "../../utils/FormatDate";
import getAPI from "../../api/getAPI";
import { getLastItem } from "../../utils/getLastItem";
import {
  calcResume,
  getResidu,
  getPerf,
  handleStats,
  getLastPerfGli,
  getPerIndice,
} from "../../utils/analyseMbi";

export const getData = createAsyncThunk(
  "AnalyseMBI/getData",
  async (
    { dateDebut = "25/02/2024", dateFin = "25/03/2024", bench = "MBI CT" },
    thunkAPI
  ) => {
    try {
      const urls = [
        {
          url: "Attrib_Cumul_AXA_BENCH",
          params: `&${bench}&${dateDebut}&${dateFin}`,
          varName: "cumulAXABench",
        },
        {
          url: "Attrib_Cumul_CA_BENCH",
          params: `&${bench}&${dateDebut}&${dateFin}`,
          varName: "cumulCABench",
        },
        {
          url: "PERF_GLISS_NOMINAL",
          params: `&${bench}&${dateDebut}&${dateFin}`,
          varName: "perfGlisNomi",
        },
        {
          url: "Attrib_Cumul_STATPRO_BENCH",
          params: `&${bench}&${dateDebut}&${dateFin}`,
          varName: "cumulStatproBench",
        },
        {
          url: "PERF_GLISS_MBI",
          params: `&${bench}&${dateDebut}&${dateFin}`,
          varName: "perfGlisMBI",
        },
        {
          url: "EVOLUTION_MBI",
          params: `&${bench}&${dateDebut}&${dateFin}`,
          varName: "evolMBI",
        },
        {
          url: "EVOLUTION_NOMINAL",
          params: `&${bench}&${dateDebut}&${dateFin}`,
          varName: "evolNomi",
        },
        {
          url: "EVOLUTION_MBI_BASE_100",
          params: `&${bench}&${dateDebut}&${dateFin}`,
          varName: "evolMBIB100",
        },
        {
          url: "EVOLUTION_NOMINAL_BASE_100",
          params: `&${bench}&${dateDebut}&${dateFin}`,
          varName: "evolNomiB100",
        },
        {
          url: "COMPOSITION_FINAL_MBI",
          params: `&${bench}&${dateFin}`,
          varName: "compFinMBI",
        },
        {
          url: "OPERATIONS_GISEMENTS",
          params: `&${dateDebut}&${dateFin}`,
          varName: "operGisements",
        },
        {
          url: "MBI_FIELDS",
          params: `&${bench}&${dateDebut}&${dateFin}`,
          varName: "MBIFields",
        },
      ];
      let [
        { cumulAXABench },
        { cumulCABench },
        { perfGlisNomi },
        { cumulStatproBench },
        { perfGlisMBI },
        { evolMBI },
        { evolNomi },
        { evolMBIB100 },
        { evolNomiB100 },
        { compFinMBI },
        { operGisements },
        { MBIFields },
      ] = await Promise.all(
        urls.map(async ({ url, varName, params }) => {
          try {
            const response = await getAPI.get(`GETAPI?${url}${params}`);
            return { [varName]: response.data };
          } catch (error) {
            console.log(error);
            return { [varName]: [] };
          }
        })
      );
      const perf = getPerf(evolMBIB100);
      const cumulAXABenchRes = [
        {
          "Portage systematique": calcResume(
            cumulAXABench,
            "Portage_systematique_period"
          ),
          "Portage swap spread": calcResume(
            cumulAXABench,
            "Portage_swap_spread_period"
          ),
          "Portage specifique": calcResume(
            cumulAXABench,
            "portage_specifique_period"
          ),
          "Var taux systematique": calcResume(
            cumulAXABench,
            "Var_taux_systematique_period"
          ),
          "Var swap": calcResume(cumulAXABench, "Var_swap_period"),
          "Var taux specifique": calcResume(
            cumulAXABench,
            "Variation_taux_specifique_period"
          ),
        },
      ];
      // cumulAXABenchRes[0]["Perf indice"] = getPerIndice(cumulAXABenchRes[0]);
      cumulAXABenchRes[0]["Residu"] = getResidu(perf, cumulAXABenchRes[0]);
      const cumulCABenchRes = [
        {
          "Effet coupon": calcResume(cumulCABench, "effet_coupon_period"),
          "Effet amortissement": calcResume(
            cumulCABench,
            "effet_amortissement_period"
          ),
          "Effet niveau": calcResume(cumulCABench, "effet_niveau_period"),
          "Effet courbe": calcResume(cumulCABench, "effet_courbe_period"),
          "Effet spread": calcResume(cumulCABench, "effet_spread_period"),
          Residu: calcResume(cumulCABench, "Residu_Titre_period"),
        },
      ];
      // cumulCABenchRes[0]["Perf indice"] = getPerIndice(cumulCABenchRes[0]);
      cumulCABenchRes[0]["Perf indice"] = getResidu(perf, cumulCABenchRes[0]);
      console.log("cumulAXABenchRes", cumulAXABenchRes);

      const stateProRes = [
        {
          "Effet taux act period": calcResume(
            cumulStatproBench,
            "effet_Taux_act_period"
          ),
          "Effet courbe period": calcResume(
            cumulStatproBench,
            "effet_Courbe_period"
          ),
          "Effet spread period": calcResume(
            cumulStatproBench,
            "effet_Spread_period"
          ),
          "Effet convexite period": calcResume(
            cumulStatproBench,
            "effet_Convexite_period"
          ),
          Residu: calcResume(cumulStatproBench, "Residu_Titre_period"),
        },
      ];
      // stateProRes[0]["Perf indice"] = getPerIndice(cumulStatproBench[0]);
      stateProRes[0]["Perf indice"] = parseFloat((perf * 100).toFixed(2));

      // COMPOSITION FINAL MBI
      const sumTotVal = calcResume(compFinMBI, "TOTAL_VALO");

      compFinMBI = compFinMBI.map((item) => {
        return {
          ...item,
          poids: (item["TOTAL_VALO"] / sumTotVal) * 100,
        };
      });
      // CARDS STATS
      let stats = handleStats(getLastItem(MBIFields));
      stats.perf = perf * 100;
      console.log("STATS", stats);
      return {
        cumulAXABench,
        cumulAXABenchRes,
        cumulCABench,
        cumulCABenchRes,
        perfGlisNomi: getLastPerfGli(perfGlisNomi),
        cumulStatproBench,
        stateProRes,
        perfGlisMBI: getLastPerfGli(perfGlisMBI),
        evolMBI,
        stats,
        evolNomi,
        evolMBIB100,
        evolNomiB100,
        compFinMBI,
        operGisements,
        MBIFields,
      };
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue("Server Error");
    }
  }
);
