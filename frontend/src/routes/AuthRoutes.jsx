import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Main from "../components/layouts/main/Main";
export default function AuthRoutes() {
  const { user } = useSelector((state) => state.auth);
  console.log("user is ", user);
  return user ? <Main /> : <Navigate to="/login" />;
}
