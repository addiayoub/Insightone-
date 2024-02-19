import { createAsyncThunk } from "@reduxjs/toolkit";
import { formatDate } from "../../utils/FormatDate";
import getApi from "../../api/apiMarko";

export const getFixedIncome = createAsyncThunk(
  "fixedIncome/getFixedIncome",
  async ({ date }, thunkAPI) => {
    try {
      date = formatDate(date["$d"]);
      const urls = [
        {
          url: "TMP_Interbancaire",
          params: `&${date}`,
          varName: "TMPInterbancaire",
        },
        {
          url: "Indice_TMP",
          params: `&${date}`,
          varName: "indiceTMP",
        },
        {
          url: "Indice_Monia",
          params: `&${date}`,
          varName: "indiceMonia",
        },
        {
          url: "Avance_7Jours",
          params: `&${date}`,
          varName: "avance7j",
        },
        {
          url: "Instrument_swap",
          params: `&${date}`,
          varName: "instrumentSwap",
        },
        {
          url: "Avance_24h",
          params: `&${date}`,
          varName: "avance24h",
        },
        {
          url: "Instrument_prets_garantis",
          params: `&${date}`,
          varName: "pretsGarantis",
        },
        {
          url: "Placements_Tresor",
          params: `&${date}`,
          varName: "placementsTresor",
        },
        {
          url: "Placements_Tresor_Par_Jour",
          params: `&${date}`,
          varName: "placementsTresorJour",
        },
        {
          url: "Instrument_pension_livree",
          params: `&${date}`,
          varName: "pensionLivree",
        },
        {
          url: "LEVEES_DU_TRESOR",
          params: `&${date}`,
          varName: "leveesTresor",
        },
        {
          url: "Courbe_Taux_Primaire",
          params: `&${date}`,
          varName: "tauxPrimaire",
        },
        {
          url: "Courbe_Taux_Secondaire",
          params: `&${date}`,
          varName: "tauxSecondaire",
        },
        {
          url: "Evol_Insuffisance_Liquidite",
          params: `&${date}`,
          varName: "evolInsuffisanceLiquidite",
        },
        {
          url: "INSUFFISANCE",
          params: `&${date}`,
          varName: "insuffisance",
        },
        {
          url: "COMMENTAIRE_FI_BKGR",
          params: `&${date}`,
          varName: "commentaires",
        },
        {
          url: "Volume_Courbe_Secondaire",
          params: `&${date}`,
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
            const response = await getApi.get(`GETAPI?${url}${params}`);
            return { [varName]: response.data };
          } catch (error) {
            console.log(error);
            return [];
          }
        })
      );
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
        tauxPrimaire,
        tauxSecondaire,
        evolInsuffisanceLiquidite: evolInsuffisanceLiquidite.sort(
          (a, b) => new Date(a.date_complete) - new Date(b.date_complete)
        ),
        insuffisance,
        commentaires,
        volumeSecondaire,
      };
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue("Server Error");
    }
  }
);
