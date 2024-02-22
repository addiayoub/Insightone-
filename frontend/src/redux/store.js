import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/AuthSlice";
import dashboardReducer from "./slices/DashboardSlice";
import rapportReducer from "./slices/DataSlice";
import themeReducer from "./slices/ThemeSlice";
import userReducer from "./slices/UserSlice";
import AnalyseChartisteReducer from "./slices/AnalyseChartisteSlice";
import StockReducer from "./slices/StockSlice";
import AnalyseSectorialReducer from "./slices/AnalyseSectorialSlice";
import authMiddleware from "./middleware/authMiddleware";
import OpcvmReducer from "./slices/OpcvmSlice";
import BacktestReducer from "./slices/BacktestSlice";
import TrackingReducer from "./slices/TrackingSlice";
import analyseOPCVMReducer from "./slices/analyseOPCVMSlice";
import fixedIncomeReducer from "./slices/FixedIncomeSlice";
import BlackLittermanReducer from "./slices/BlackLittermanSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    dashboard: dashboardReducer,
    rapport: rapportReducer,
    theme: themeReducer,
    analyseChartiste: AnalyseChartisteReducer,
    stock: StockReducer,
    analyseSectorial: AnalyseSectorialReducer,
    opcvm: OpcvmReducer,
    backtest: BacktestReducer,
    tracking: TrackingReducer,
    analyseOPCVM: analyseOPCVMReducer,
    fixedIncome: fixedIncomeReducer,
    blackLitterman: BlackLittermanReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(authMiddleware),
});
