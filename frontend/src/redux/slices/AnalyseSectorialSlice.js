import { createSlice } from "@reduxjs/toolkit";
import { getSectorialData } from "../actions/AnalyseSectorialActions";

const initialState = {
  loading: false,
  error: null,
  data: [],
  news: [],
  lastSeance: [],
};

const analyseSectorialSlice = createSlice({
  name: "analyseSectorial",
  initialState,
  reducers: {
    resetData: (state) => {
      state.data = [];
      state.news = [];
      state.lastSeance = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSectorialData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSectorialData.fulfilled, (state, { payload }) => {
      state.data = payload.data;
      state.news = payload.news;
      state.lastSeance = payload.lastSeance;
      state.loading = false;
    });
    builder.addCase(getSectorialData.rejected, (state, { payload }) => {
      if (payload?.status === 401) {
        state.error = payload.message;
        state.data = [];
        state.news = [];
      } else {
        state.error = payload;
      }
      state.loading = false;
    });
  },
});

export const { resetData: resetSectorialData } = analyseSectorialSlice.actions;
export default analyseSectorialSlice.reducer;
