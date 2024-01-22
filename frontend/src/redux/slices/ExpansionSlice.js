import { createSlice } from "@reduxjs/toolkit";
import { getAnalyse } from "../actions/ExpansionActions";

const initialState = {
  data: {
    analyseQuatile: [],
    performance: [],
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
    });
    builder.addCase(getAnalyse.rejected, (state, payload) => {
      state.loading = false;
      state.data.analyseQuatile = [];
      state.data.performance = [];
      state.error = payload;
    });
  },
});

export default expansionSlice.reducer;
