import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Dashboard from "../components/Dashboard/Index.jsx";
import Login from "../components/Login.jsx";
import Profile from "../components/Profile.jsx";
import Index from "../components/analyse/Index.jsx";
import Data from "../components/charts/Data.jsx";
import Users from "../components/users/Users.jsx";
import AddUser from "../pages/AddUser";
import UpdateUser from "../pages/UpdateUser";
import AdminRoutes from "./AdminRoutes";
import AuthRoute from "./AuthRoute";
import LoginRoute from "./LoginRoute";
import AnalyseSectorial from "../components/Secteurs/Secteurs.jsx";
import Markowitz from "../components/Markowitz/Markowitz.jsx";
import Opcvm from "../components/OPCVM/Index.jsx";
import Backtest from "../components/Backtest/Backtest.jsx";
import Portefeuilles from "../components/portefeuilles/Index.jsx";
import Tracking from "../components/Tracking/Index.jsx";
import AnalyseOPCVM from "../components/AnalyseOPCVM/Index.jsx";
import FixedIncome from "../components/FixedIncome/Index.jsx";
import BlackLitterman from "../components/BlackLitterman/Index.jsx";
import ScrollToTop from "../components/Ui/ScrollToTop.jsx";

function RouterProvider() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route element={<AuthRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/rapports" element={<Data />} />
            <Route path="/markowitz" element={<Markowitz />} />
            <Route path="/analyse-chartiste" element={<Index />} />
            <Route path="/analyse-sectorial" element={<AnalyseSectorial />} />
            <Route path="/opcvm" element={<Opcvm />} />
            <Route path="/backtest" element={<Backtest />} />
            <Route path="/portefeuilles" element={<Portefeuilles />} />
            <Route path="/tracking" element={<Tracking />} />
            <Route path="/analyse-opcvm" element={<AnalyseOPCVM />} />
            <Route path="/fixed-income" element={<FixedIncome />} />
            <Route path="/black-litterman" element={<BlackLitterman />} />
          </Route>
          <Route element={<AdminRoutes />}>
            <Route path="/users" element={<Users />} />
            <Route path="/users/:username/edit" element={<UpdateUser />} />
            <Route path="/users/create" element={<AddUser />} />
          </Route>
          <Route element={<LoginRoute />}>
            <Route element={<Login />} path="/login" />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </>
  );
}

export default RouterProvider;
