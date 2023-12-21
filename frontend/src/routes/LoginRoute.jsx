import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
export default function LoginRoute() {
  const { user } = useSelector((state) => state.auth);

  return !user ? <Outlet /> : <Navigate to="/" />;
}
