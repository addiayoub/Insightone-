import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Main from "../components/layouts/main/Main";

function AdminRoutes() {
  const { user } = useSelector((state) => state.auth);

  return user?.role === 305 ? <Main /> : <Navigate to="/login" />;
}

export default AdminRoutes;
