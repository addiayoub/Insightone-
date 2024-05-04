import { createSlice } from "@reduxjs/toolkit";
import { getData } from "../actions/PerfIndiActions";

const initialState = {
  loading: false,
  error: null,
  data: {
    CAMPAGNE_CEREALIERE: {},
    TAUX_REMPLISSAGE_BARRAGES: {},
    INFLATION: {},
    RECETTES_TOURISTIQUE: {},
    TRANSFERTS_MRE: {},
    RECETTES_IDE: {},
    TAUX_DEBITEURS: {},
    CONSOMMATION_ELECTRICITE: {},
    CHOMAGE_URBAIN: {},
    PIB_VOLUME: {},
    TAUX_CHANGE: {},
    BOURSE_MASI: {},
    DEFICIT_COMMERCIAL: {},
  },
};
const perfIndiceSlice = createSlice({
  name: "perfIndice",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getData.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getData.fulfilled, (state, { payload }) => {
      const {
        CAMPAGNE_CEREALIERE,
        TAUX_REMPLISSAGE_BARRAGES,
        INFLATION,
        RECETTES_TOURISTIQUE,
        TRANSFERTS_MRE,
        RECETTES_IDE,
        TAUX_DEBITEURS,
        CONSOMMATION_ELECTRICITE,
        CHOMAGE_URBAIN,
        PIB_VOLUME,
        TAUX_CHANGE,
        BOURSE_MASI,
        DEFICIT_COMMERCIAL,
      } = payload;
      state.loading = false;
      state.data = {
        CAMPAGNE_CEREALIERE,
        TAUX_REMPLISSAGE_BARRAGES,
        INFLATION,
        RECETTES_TOURISTIQUE,
        TRANSFERTS_MRE,
        RECETTES_IDE,
        TAUX_DEBITEURS,
        CONSOMMATION_ELECTRICITE,
        CHOMAGE_URBAIN,
        PIB_VOLUME,
        TAUX_CHANGE,
        BOURSE_MASI,
        DEFICIT_COMMERCIAL,
      };
    });

    builder.addCase(getData.rejected, (state, { payload }) => {
      state.loading = false;
      state.data = initialState.data;
      state.error = payload;
    });
  },
});

export default perfIndiceSlice.reducer;
