import { createSlice } from "@reduxjs/toolkit";
import { getData } from "../actions/AnalyseMBIActions";

const initialState = {
  data: {
    cumulAXABench: [],
    cumulAXABenchRes: [],
    cumulCABench: [],
    cumulCABenchRes: [],
    perfGlisNomi: [],
    cumulStatproBench: [],
    stateProRes: [],
    perfGlisMBI: [],
    evolMBI: [],
    evolNomi: [],
    evolMBIB100: [],
    evolNomiB100: [],
    compFinMBI: [],
    operGisements: [],
    MBIFields: [],
  },
  loading: false,
  error: null,
};

const AnalyseMBISlice = createSlice({
  name: "AnalyseMBISlice",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getData.fulfilled, (state, { payload }) => {
      const {
        cumulAXABench,
        cumulCABench,
        perfGlisNomi,
        cumulStatproBench,
        perfGlisMBI,
        evolMBI,
        evolNomi,
        evolMBIB100,
        evolNomiB100,
        compFinMBI,
        operGisements,
        MBIFields,
        cumulAXABenchRes,
        cumulCABenchRes,
        stateProRes,
      } = payload;
      state.loading = false;
      state.data = {
        cumulAXABench,
        cumulCABench,
        perfGlisNomi,
        cumulStatproBench,
        perfGlisMBI,
        evolMBI,
        evolNomi,
        evolMBIB100,
        evolNomiB100,
        compFinMBI,
        operGisements,
        MBIFields,
        cumulAXABenchRes,
        cumulCABenchRes,
        stateProRes,
      };
    });
    builder.addCase(getData.rejected, (state, payload) => {
      state.loading = false;
      state.data = { ...initialState.data };
      state.error = payload;
    });
  },
});

export default AnalyseMBISlice.reducer;
