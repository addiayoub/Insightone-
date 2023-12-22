import { createSlice } from "@reduxjs/toolkit";
import { getAnalysesData, getIndicateursData } from "../actions/AnalyseActions";

const initialState = {
  loading: false,
  error: null,
  data: [],
};

const analyseSlice = createSlice({
  name: "analyse",
  initialState,
  reducers: {
    resetData: (state) => {
      state.data = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getIndicateursData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getIndicateursData.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.loading = false;
    });
    builder.addCase(getIndicateursData.rejected, (state, { payload }) => {
      if (payload?.status === 401) {
        state.error = payload.message;
        state.data = [];
      } else {
        state.error = payload;
      }
      state.loading = false;
    });
  },
});

export const { resetData } = analyseSlice.actions;
export default analyseSlice.reducer;
