import { createSlice } from "@reduxjs/toolkit";
import {
  getComments,
  getDashboardData,
  getMarketData,
  getMarketData_2,
  getSliderData,
} from "../actions/StockActions";

const initialState = {
  loading: false,
  error: null,
  data: [],
};

const stockSlice = createSlice({
  name: "analyse",
  initialState: {
    ...initialState,
    marketData: {
      loading: false,
      error: null,
      data: [],
    },
    sliderData: {
      loading: false,
      error: null,
      data: [],
    },
    comments: {
      loading: false,
      error: null,
      data: [],
    },
  },
  reducers: {
    resetData: (state) => {
      state.data = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getDashboardData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getDashboardData.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.loading = false;
    });
    builder.addCase(getDashboardData.rejected, (state, { payload }) => {
      if (payload?.status === 401) {
        state.error = payload.message;
        state.data = [];
      } else {
        state.error = payload;
      }
      state.loading = false;
    });

    // Market Data
    builder.addCase(getMarketData_2.pending, ({ marketData }) => {
      marketData.loading = true;
    });
    builder.addCase(
      getMarketData_2.fulfilled,
      ({ marketData }, { payload }) => {
        marketData.data = payload;
        marketData.loading = false;
      }
    );
    builder.addCase(getMarketData_2.rejected, ({ marketData }, { payload }) => {
      if (payload?.status === 401) {
        marketData.error = payload.message;
        marketData.data = [];
      } else {
        marketData.error = payload;
      }
      marketData.loading = false;
    });

    // Slider Data
    builder.addCase(getSliderData.pending, ({ sliderData }) => {
      sliderData.loading = true;
    });
    builder.addCase(getSliderData.fulfilled, ({ sliderData }, { payload }) => {
      sliderData.data = payload.data;
      sliderData.loading = false;
    });
    builder.addCase(getSliderData.rejected, ({ sliderData }, { payload }) => {
      if (payload?.status === 401) {
        sliderData.error = payload.message;
        sliderData.data = [];
      } else {
        sliderData.error = payload;
      }
      sliderData.loading = false;
    });

    // Get Comments
    builder.addCase(getComments.pending, ({ comments }) => {
      comments.loading = true;
    });
    builder.addCase(getComments.fulfilled, ({ comments }, { payload }) => {
      comments.data = payload.data;
      comments.loading = false;
    });
    builder.addCase(getComments.rejected, ({ comments }, { payload }) => {
      comments.error = payload;
      comments.data = [];
      comments.loading = false;
    });
  },
});

export const { resetData } = stockSlice.actions;
export default stockSlice.reducer;
