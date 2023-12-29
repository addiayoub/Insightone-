import { createSlice } from "@reduxjs/toolkit";
import { getEvolutionB100Portef, getPortef } from "../actions/BacktestActions";

const backtestSlice = createSlice({
  name: "backtest",
  initialState: {
    data: {
      loading: false,
      error: null,
      data: [],
      df_contrib: [],
      Rel_div: [],
      qte_div: [],
      quantite_av: [],
      quantite_ap: [],
      div_ord: [],
      div_exc: [],
      portef_ap: [],
      portef_av: [],
      valo_ap: [],
      valo_av: [],
      operation_mnt: [],
      operation_qte: [],
      poids_ap: [],
      poids_av: [],
    },
    evolutionB100Ptfs: {
      data: [],
      loading: false,
      error: null,
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPortef.pending, ({ data }) => {
      data.loading = true;
    });
    builder.addCase(getPortef.fulfilled, ({ data }, { payload }) => {
      data.loading = false;
      data.data = payload;
      data.df_contrib = payload.df_contrib;
      data.Rel_div = payload.Rel_div;
      data.qte_div = payload.qte_div;
      data.quantite_av = payload.quantite_av;
      data.quantite_ap = payload.quantite_ap;
      data.div_ord = payload.div_ord;
      data.div_exc = payload.div_exc;
      data.portef_ap = payload.portef_ap;
      data.portef_av = payload.portef_av;
      data.valo_ap = payload.valo_ap;
      data.valo_av = payload.valo_av;
      data.operation_mnt = payload.operation_mnt;
      data.operation_qte = payload.operation_qte;
      data.poids_ap = payload.poids_ap;
      data.poids_av = payload.poids_av;
    });
    builder.addCase(getPortef.rejected, ({ data }, { payload }) => {
      data.loading = false;
      data.data = {};
      data.error = payload;
    });

    // GEt Evolution B100 ptfs
    builder.addCase(getEvolutionB100Portef.pending, ({ evolutionB100Ptfs }) => {
      evolutionB100Ptfs.loading = true;
    });
    builder.addCase(
      getEvolutionB100Portef.fulfilled,
      ({ evolutionB100Ptfs }, { payload }) => {
        evolutionB100Ptfs.loading = false;
        evolutionB100Ptfs.data = payload;
      }
    );
    builder.addCase(
      getEvolutionB100Portef.rejected,
      ({ evolutionB100Ptfs }, { payload }) => {
        evolutionB100Ptfs.loading = false;
        evolutionB100Ptfs.data = [];
        evolutionB100Ptfs.error = payload;
      }
    );
  },
});

export const { resetData } = backtestSlice.actions;
export default backtestSlice.reducer;
