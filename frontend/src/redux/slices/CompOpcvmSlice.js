import { createSlice } from "@reduxjs/toolkit";
import { getData } from "../actions/CompOpcvmActions";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const compOpcvmSlice = createSlice({
  name: "compOpcvm",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getData.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.data = payload;
    });
    builder.addCase(getData.rejected, (state, { payload }) => {
      state.loading = false;
      state.data = [];
      state.error = payload;
    });
  },
});

export default compOpcvmSlice.reducer;
