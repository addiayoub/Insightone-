import { createSlice } from "@reduxjs/toolkit";
import {
  portfolioAllocationAction,
  portfolioOptiAction,
  valueAtRiskAction,
} from "../actions/BlackLittermanActions";
const initialState = {
  valueAtRisk: {
    data: {
      historicalVar: [],
      parametricVar: [],
      portfolioSims: [],
      varCvar: [],
    },
    loading: false,
    error: null,
  },
  portfolioOpti: {
    data: {
      weights: [],
      metrics: [],
      simulations: [],
      minVolatility: [],
      optimizedSharpe: [],
      optimizedVolatility: [],
      maxSharpeRatio: [],
    },
    loading: false,
    error: null,
  },
  portfolioAllocation: {
    data: {
      covariantCorrelation: [],
      marketPrior: [],
      omega: [],
      bl: [],
      rets: [],
      weights: [],
      portfolioPerf: [],
    },
    loading: false,
    error: null,
  },
};

const BlackLittermanSlice = createSlice({
  name: "BlackLittermanSlice",
  initialState,
  extraReducers: (builder) => {
    // Value At Risk
    builder.addCase(valueAtRiskAction.pending, ({ valueAtRisk }) => {
      valueAtRisk.loading = true;
    });
    builder.addCase(
      valueAtRiskAction.fulfilled,
      ({ valueAtRisk }, { payload }) => {
        valueAtRisk.loading = false;
        valueAtRisk.data.historicalVar = payload.df_Historical_VaR;
        valueAtRisk.data.parametricVar = payload.df_Parametric_VaR;
        valueAtRisk.data.portfolioSims = payload.df_portfolio_sims;
        valueAtRisk.data.varCvar = payload.df_VaR_CVaR;
      }
    );
    builder.addCase(
      valueAtRiskAction.rejected,
      ({ valueAtRisk }, { payload }) => {
        valueAtRisk.loading = false;
        valueAtRisk.data = initialState.valueAtRisk.data;
        valueAtRisk.error = payload;
      }
    );

    // Portfolio Optimization
    builder.addCase(portfolioOptiAction.pending, ({ portfolioOpti }) => {
      portfolioOpti.loading = true;
    });
    builder.addCase(
      portfolioOptiAction.fulfilled,
      ({ portfolioOpti }, { payload }) => {
        portfolioOpti.loading = false;
        portfolioOpti.data.weights = payload.weights_df;
        portfolioOpti.data.metrics = payload.metrics_df;
        portfolioOpti.data.simulations = payload.simulations_df;
        portfolioOpti.data.maxSharpeRatio = payload.df_max_sharpe_ratio;
        portfolioOpti.data.minVolatility = payload.df_min_volatility;
        portfolioOpti.data.optimizedSharpe = payload.df_optimized_sharpe;
        portfolioOpti.data.optimizedVolatility =
          payload.df_optimized_volatility;
      }
    );
    builder.addCase(
      portfolioOptiAction.rejected,
      ({ portfolioOpti }, { payload }) => {
        portfolioOpti.loading = false;
        portfolioOpti.data = initialState.portfolioOpti.data;
        portfolioOpti.error = payload;
      }
    );

    // Portfolio Allocation
    builder.addCase(
      portfolioAllocationAction.pending,
      ({ portfolioAllocation }) => {
        portfolioAllocation.loading = true;
      }
    );
    builder.addCase(
      portfolioAllocationAction.fulfilled,
      ({ portfolioAllocation }, { payload }) => {
        portfolioAllocation.loading = false;
        portfolioAllocation.data.covariantCorrelation =
          payload.S_Covariant_Correlation;
        portfolioAllocation.data.marketPrior = payload.df_market_prior;
        portfolioAllocation.data.omega = payload.df_omega;
        portfolioAllocation.data.rets = payload.rets_df;
        portfolioAllocation.data.bl = payload.S_bl;
        portfolioAllocation.data.weights = payload.df_weights;
        portfolioAllocation.data.portfolioPerf =
          payload.df_portfolio_performance;
      }
    );
    builder.addCase(
      portfolioAllocationAction.rejected,
      ({ portfolioAllocation }, { payload }) => {
        portfolioAllocation.loading = false;
        portfolioAllocation.error = payload;
        portfolioAllocation.data = initialState.portfolioAllocation.data;
      }
    );
  },
});

export default BlackLittermanSlice.reducer;
