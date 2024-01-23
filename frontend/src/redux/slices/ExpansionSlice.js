import { createSlice } from "@reduxjs/toolkit";
import { getAnalyse } from "../actions/ExpansionActions";

const initialState = {
  data: {
    analyseQuatile: [],
    performance: [],
    classementPerformance: [],
    barometreQuantalys: [],
    loeilExpert: [],
    indicateursRisque: [],
    fondsVersusCat1: [],
    fondsVersusCat2: [],
    fondsVersusCat3: [],
  },
  loading: false,
  error: null,
};

const expansionSlice = createSlice({
  name: "expansion",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAnalyse.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAnalyse.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.data.analyseQuatile = payload.analyseQuatile;
      state.data.performance = payload.performance;
      state.data.classementPerformance = payload.classementPerformance;
      state.data.barometreQuantalys = payload.barometreQuantalys;
      state.data.indicateursRisque = payload.indicateursRisque;
      state.data.loeilExpert = payload.loeilExpert;
      state.data.fondsVersusCat1 = payload.fondsVersusCat1;
      state.data.fondsVersusCat2 = payload.fondsVersusCat2;
      state.data.fondsVersusCat3 = payload.fondsVersusCat3;
    });
    builder.addCase(getAnalyse.rejected, (state, payload) => {
      state.loading = false;
      state.data = { ...initialState.data };
      state.error = payload;
    });
  },
});

export default expansionSlice.reducer;
