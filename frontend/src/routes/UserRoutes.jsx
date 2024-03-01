import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import Main from "../components/layouts/main/Main";
export default function UserRoutes() {
  const { user } = useSelector((state) => state.auth);
  console.log("user is ", user);
  return user ? (
    user?.role !== 305 ? (
      <Main />
    ) : (
      <Navigate to="/users" />
    )
  ) : (
    <Navigate to="/login" />
  );
}
