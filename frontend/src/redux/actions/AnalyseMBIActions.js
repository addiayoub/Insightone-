import { createAsyncThunk } from "@reduxjs/toolkit";
import { formatDate } from "../../utils/FormatDate";
import getAPI from "../../api/getAPI";

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
            return [];
          }
        })
      );
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
      cumulAXABenchRes[0]["Perf indice"] = getPerIndice(cumulAXABenchRes[0]);
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
      cumulCABenchRes[0]["Perf indice"] = getPerIndice(cumulCABenchRes[0]);
      console.log("cumulAXABenchRes", cumulAXABenchRes);
      // COMPOSITION FINAL MBI
      const sumTotVal = calcResume(compFinMBI, "TOTAL_VALO");
      console.log("sum tot", sumTotVal);
      compFinMBI = compFinMBI.map((item) => {
        console.log(
          `COMPFINMBI: ${item["TOTAL_VALO"]} / ${sumTotVal} = ${
            item["TOTAL_VALO"] / sumTotVal
          }`
        );
        return {
          ...item,
          poids: (item["TOTAL_VALO"] / sumTotVal) * 100,
        };
      });
      return {
        cumulAXABench,
        cumulAXABenchRes,
        cumulCABench,
        cumulCABenchRes,
        perfGlisNomi,
        cumulStatproBench,
        perfGlisMBI,
        evolMBI,
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
const calcResume = (data, field, perce = true) => {
  const sum = data.reduce((acc, item) => {
    const value = perce ? Number(item[field]) * 100 : Number(item[field]);
    return acc + value;
  }, 0);
  return parseFloat(sum.toFixed(2));
};
const get = (data) => {
  return [
    {
      "Portage systematique": calcResume(data, "Portage_systematique_period"),
      "Portage swap spread": calcResume(data, "Portage_swap_spread_period"),
      "Portage specifique": calcResume(data, "portage_specifique_period"),
      "Var taux systematique": calcResume(data, "Var_taux_systematique_period"),
      "Var swap": calcResume(data, "Var_swap_period"),
      "Var taux specifique": calcResume(
        data,
        "Variation_taux_specifique_period"
      ),
    },
  ];
};

function getPerIndice(obj) {
  let sum = 0;

  // Iterate over the keys of the object
  for (const key in obj) {
    // Check if the value is a number
    if (typeof obj[key] === "number") {
      // Add the value to the total sum
      sum += obj[key];
    }
  }

  return parseFloat(sum.toFixed(2));
}