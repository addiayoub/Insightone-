import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/AuthSlice";
import dashboardReducer from "./slices/DashboardSlice";
import rapportReducer from "./slices/DataSlice";
import themeReducer from "./slices/ThemeSlice";
import userReducer from "./slices/UserSlice";
import AnalyseReducer from "./slices/AnalyseSlice";
import StockReducer from "./slices/StockSlice";
import SectorialReducer from "./slices/SectorialSlice";
import authMiddleware from "./middleware/authMiddleware";
import OpcvmReducer from "./slices/OpcvmSlice";
import BacktestReducer from "./slices/BacktestSlice";
import TrackingReducer from "./slices/TrackingSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    dashboard: dashboardReducer,
    rapport: rapportReducer,
    theme: themeReducer,
    analyse: AnalyseReducer,
    stock: StockReducer,
    sectorial: SectorialReducer,
    opcvm: OpcvmReducer,
    backtest: BacktestReducer,
    tracking: TrackingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(authMiddleware),
});
