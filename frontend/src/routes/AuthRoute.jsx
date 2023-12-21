import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import Main from "../components/layouts/main/Main";
export default function LoginRoute() {
  const { user } = useSelector((state) => state.auth);

  return user ? <Main /> : <Navigate to="/login" />;
}
