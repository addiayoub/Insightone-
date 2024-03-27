import { createSlice } from "@reduxjs/toolkit";
import { getData, getNews } from "../actions/ProfileFinActions";
const initialState = {
  data: {
    bilan: [],
    cmptRes: [],
    dividende: [],
    bilanRes: [],
    cmptResResu: [],
    fluxRes: [],
    news: JSON.parse(localStorage.getItem("news")) ?? [],
  },
  error: null,
  loading: false,
};
const ProfileFinSlice = createSlice({
  name: "profilFin",
  initialState,
  extraReducers: (builder) => {
    //
    builder.addCase(getData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getData.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.data.bilan = payload.bilan;
      state.data.cmptRes = payload.cmptRes;
      state.data.dividende = payload.dividende;
      state.data.bilanRes = payload.bilanRes;
      state.data.cmptResResu = payload.cmptResResu;
      state.data.dividende = payload.dividende;
      state.data.fluxRes = payload.fluxRes;
    });
    builder.addCase(getData.rejected, (state, { payload }) => {
      state.loading = false;
      state.data = initialState.data;
      state.error = payload;
    });

    // GET NEWS
    builder.addCase(getNews.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getNews.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.data.news = payload;
    });
    builder.addCase(getNews.rejected, (state, { payload }) => {
      state.loading = false;
      state.data.news = initialState.data.news;
      state.error = payload;
    });
  },
});

export default ProfileFinSlice.reducer;
