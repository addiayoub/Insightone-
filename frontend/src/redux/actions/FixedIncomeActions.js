import { createAsyncThunk } from "@reduxjs/toolkit";
import { formatDate } from "../../utils/FormatDate";
import getApi from "../../api/getAPI";
import { getPerfMBI, getPerfNominal } from "./PerfGlissanteActions";

export const getFixedIncome = createAsyncThunk(
  "fixedIncome/getFixedIncome",
  async ({ date }, thunkAPI) => {
    try {
      date = formatDate(date["$d"]);
      const urls = [
        {
          url: "TMP_Interbancaire",
          params: `?par1=${date}`,
          varName: "TMPInterbancaire",
        },
        {
          url: "Indice_TMP",
          params: `?par1=${date}`,
          varName: "indiceTMP",
        },
        {
          url: "Indice_Monia",
          params: `?par1=${date}`,
          varName: "indiceMonia",
        },
        {
          url: "Avance_7Jours",
          params: `?par1=${date}`,
          varName: "avance7j",
        },
        {
          url: "Instrument_swap",
          params: `?par1=${date}`,
          varName: "instrumentSwap",
        },
        {
          url: "Avance_24h",
          params: `?par1=${date}`,
          varName: "avance24h",
        },
        {
          url: "Instrument_prets_garantis",
          params: `?par1=${date}`,
          varName: "pretsGarantis",
        },
        {
          url: "Placements_Tresor",
          params: `?par1=${date}`,
          varName: "placementsTresor",
        },
        {
          url: "Placements_Tresor_Par_Jour",
          params: `?par1=${date}`,
          varName: "placementsTresorJour",
        },
        {
          url: "Instrument_pension_livree",
          params: `?par1=${date}`,
          varName: "pensionLivree",
        },
        {
          url: "LEVEES_DU_TRESOR",
          params: `?par1=${date}`,
          varName: "leveesTresor",
        },
        {
          url: "Courbe_Taux_Primaire",
          params: `?par1=${date}`,
          varName: "tauxPrimaire",
        },
        {
          url: "Courbe_Taux_Secondaire",
          params: `?par1=${date}`,
          varName: "tauxSecondaire",
        },
        {
          url: "Evol_Insuffisance_Liquidite",
          params: `?par1=${date}`,
          varName: "evolInsuffisanceLiquidite",
        },
        {
          url: "INSUFFISANCE",
          params: `?par1=${date}`,
          varName: "insuffisance",
        },
        {
          url: "COMMENTAIRE_FI_BKGR",
          params: `?par1=${date}`,
          varName: "commentaires",
        },
        {
          url: "Volume_Courbe_Secondaire",
          params: `?par1=${date}`,
          varName: "volumeSecondaire",
        },
      ];
      const [
        { TMPInterbancaire },
        { indiceTMP },
        { indiceMonia },
        { avance7j },
        { instrumentSwap },
        { avance24h },
        { pretsGarantis },
        { placementsTresor },
        { placementsTresorJour },
        { pensionLivree },
        { leveesTresor },
        { tauxPrimaire },
        { tauxSecondaire },
        { evolInsuffisanceLiquidite },
        { insuffisance },
        { commentaires },
        { volumeSecondaire },
      ] = await Promise.all(
        urls.map(async ({ url, varName, params }) => {
          try {
            const response = await getApi.get(`${url}${params}`);
            return { [varName]: response.data };
          } catch (error) {
            console.log(error);
            return [];
          }
        })
      );
      const perfMBI = await getPerfMBI(date);
      const perfNominal = await getPerfNominal(date);
      console.log("fixed MBI", perfMBI);
      console.log("fixed perfNominal", perfNominal);
      return {
        TMPInterbancaire,
        indiceTMP: indiceTMP.sort(
          (a, b) => new Date(a.Seance) - new Date(b.Seance)
        ),
        indiceMonia: indiceMonia.sort(
          (a, b) => new Date(a.seance) - new Date(b.seance)
        ),
        avance7j,
        instrumentSwap,
        avance24h,
        pretsGarantis,
        placementsTresor,
        placementsTresorJour,
        pensionLivree,
        leveesTresor,
        tauxPrimaire: tauxPrimaire.sort(
          (a, b) => new Date(b.date_complete) - new Date(a.date_complete)
        ),
        tauxSecondaire: tauxSecondaire.sort(
          (a, b) => new Date(b.date_complete) - new Date(a.date_complete)
        ),
        evolInsuffisanceLiquidite: evolInsuffisanceLiquidite.sort(
          (a, b) => new Date(a.date_complete) - new Date(b.date_complete)
        ),
        insuffisance,
        commentaires,
        volumeSecondaire,
        perfMBI,
        perfNominal,
      };
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(
        "Une erreur interne est survenue. Veuillez réessayer"
      );
    }
  }
);
