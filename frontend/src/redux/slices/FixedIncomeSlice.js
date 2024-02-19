import { createSlice } from "@reduxjs/toolkit";
import { getFixedIncome } from "../actions/FixedIncomeActions";

const initialState = {
  data: {
    TMPInterbancaire: [],
    indiceTMP: [],
    indiceMonia: [],
    avance7j: [],
    instrumentSwap: [],
    avance24h: [],
    pretsGarantis: [],
    placementsTresor: [],
    placementsTresorJour: [],
    pensionLivree: [],
    leveesTresor: [],
    tauxPrimaire: [],
    tauxSecondaire: [],
    evolInsuffisanceLiquidite: [],
    insuffisance: [],
    commentaires: [],
    volumeSecondaire: [],
  },
  loading: false,
  error: null,
};

const fixedIncomeSlice = createSlice({
  name: "fixedIncome",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getFixedIncome.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getFixedIncome.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.data.TMPInterbancaire = payload.TMPInterbancaire.reverse();
      state.data.indiceTMP = payload.indiceTMP;
      state.data.indiceMonia = payload.indiceMonia;
      state.data.avance7j = payload.avance7j.reverse();
      state.data.instrumentSwap = payload.instrumentSwap;
      state.data.avance24h = payload.avance24h;
      state.data.pretsGarantis = payload.pretsGarantis;
      state.data.placementsTresor = payload.placementsTresor;
      state.data.placementsTresorJour = payload.placementsTresorJour;
      state.data.pensionLivree = payload.pensionLivree;
      state.data.leveesTresor = payload.leveesTresor;
      state.data.tauxPrimaire = payload.tauxPrimaire;
      state.data.tauxSecondaire = payload.tauxSecondaire;
      state.data.evolInsuffisanceLiquidite = payload.evolInsuffisanceLiquidite;
      state.data.insuffisance = payload.insuffisance;
      state.data.commentaires = payload.commentaires;
      state.data.volumeSecondaire = payload.volumeSecondaire;
    });
    builder.addCase(getFixedIncome.rejected, (state, { payload }) => {
      state.loading = false;
      state.data.error = payload;
      state.data = initialState.data;
    });
  },
});

export default fixedIncomeSlice.reducer;
