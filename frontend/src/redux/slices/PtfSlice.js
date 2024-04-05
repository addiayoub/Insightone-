import { createSlice } from "@reduxjs/toolkit";

const ptfSlice = createSlice({
  name: "tracking",
  initialState: {
    ptfName: "TEST",
  },
  reducers: {
    setPtfName: (state, { payload }) => {
      console.log("PAYLOAD FROM PTF SLICE ", payload);
      state.ptfName = payload;
    },
  },
});

export const { setPtfName } = ptfSlice.actions;
export default ptfSlice.reducer;
