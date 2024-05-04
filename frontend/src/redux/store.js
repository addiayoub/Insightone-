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
import compOPCVMReducer from "./slices/CompOpcvmSlice";
import fixedIncomeReducer from "./slices/FixedIncomeSlice";
import BlackLittermanReducer from "./slices/BlackLittermanSlice";
import RiskManageReducer from "./slices/RiskManageSlice";
import ProfileFinReducer from "./slices/ProfileFinSlice";
import AnalyseMBIReducer from "./slices/AnalyseMBISlice";
import AdminReducer from "./slices/AdminSlice";
import PtfReducer from "./slices/PtfSlice";
import PerfIndiReducer from "./slices/PerfIndiSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: AdminReducer,
    user: userReducer,
    dashboard: dashboardReducer,
    rapport: rapportReducer,
    theme: themeReducer,
    analyseChartiste: AnalyseChartisteReducer,
    profilFin: ProfileFinReducer,
    stock: StockReducer,
    analyseSectorial: AnalyseSectorialReducer,
    opcvm: OpcvmReducer,
    backtest: BacktestReducer,
    tracking: TrackingReducer,
    analyseOPCVM: analyseOPCVMReducer,
    fixedIncome: fixedIncomeReducer,
    blackLitterman: BlackLittermanReducer,
    riskManage: RiskManageReducer,
    compOpcvm: compOPCVMReducer,
    analyseMBI: AnalyseMBIReducer,
    ptf: PtfReducer,
    perfIndi: PerfIndiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(authMiddleware),
});
