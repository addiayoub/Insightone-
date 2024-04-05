import { createSlice } from "@reduxjs/toolkit";
import { valueAtRiskAction } from "../actions/RiskManageActions";

const initialState = {
  data: {
    histoVar: [],
    resume: [],
    varCvar: [],
    backSim: [],
    ptfSim: [],
  },
  loading: false,
  error: null,
};

const RiskManageSlice = createSlice({
  name: "RiskManageSlice",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(valueAtRiskAction.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(valueAtRiskAction.fulfilled, (state, { payload }) => {
      const { df_histo, resume, df_VaR_CVaR, df_back_sim, df_portfolio_sims } =
        payload;
      state.loading = false;
      state.data.histoVar = df_histo;
      state.data.resume = resume;
      state.data.varCvar = df_VaR_CVaR;
      state.data.backSim = df_back_sim;
      state.data.ptfSim = df_portfolio_sims;
    });

    builder.addCase(valueAtRiskAction.rejected, (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    });
  },
});

export default RiskManageSlice.reducer;
