import { createSlice } from "@reduxjs/toolkit";
import { generationPtfAlea } from "../actions/TrackingActions";
const trackingSlice = createSlice({
  name: "tracking",
  initialState: {
    generationPtfAlea: {
      loading: false,
      error: null,
      dataset: [],
      df_b100: [],
      df_moy: [],
      df_p: [],
      df_poids: [],
      df_result: [],
      df_t: [],
    },
  },
  extraReducers: (builder) => {
    builder.addCase(generationPtfAlea.pending, ({ generationPtfAlea }) => {
      generationPtfAlea.loading = true;
    });
    builder.addCase(
      generationPtfAlea.fulfilled,
      ({ generationPtfAlea }, { payload }) => {
        generationPtfAlea.loading = false;
        generationPtfAlea.dataset = payload.dataset;
        generationPtfAlea.df_b100 = payload.df_b100;
        generationPtfAlea.df_p = payload.df_p;
        generationPtfAlea.df_moy = payload.df_moy;
        generationPtfAlea.df_result = payload.df_result;
        generationPtfAlea.df_poids = payload.df_poids;
        generationPtfAlea.df_t = payload.df_t;
      }
    );
    builder.addCase(
      generationPtfAlea.rejected,
      ({ generationPtfAlea }, { payload }) => {
        generationPtfAlea.loading = false;
        generationPtfAlea.error = payload;
      }
    );
  },
});

export default trackingSlice.reducer;
