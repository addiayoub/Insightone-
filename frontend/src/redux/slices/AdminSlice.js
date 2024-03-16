import { createSlice } from "@reduxjs/toolkit";
import { getStats } from "../actions/AdminActions";

const initialState = {
  stats: {
    data: [],
    loading: false,
    error: null,
  },
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getStats.pending, (state) => {
      state.stats.loading = true;
    });
    builder.addCase(getStats.fulfilled, (state, { payload }) => {
      state.stats.loading = false;
      state.stats.data = payload;
    });
    builder.addCase(getStats.rejected, (state, payload) => {
      state.stats.loading = false;
      state.stats.error = payload;
      state.stats.data = [];
    });
  },
});

export default adminSlice.reducer;
