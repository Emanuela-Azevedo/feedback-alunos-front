import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import MainLayout from "../pages/admin/AdminHomePage/MainLayout";

const PrivateRoute = () => {
  const { token } = localStorage.getItem("token") ? { token: localStorage.getItem("token") } : useAuth();
  return token ? <MainLayout /> : <Navigate to="/auth/login" />;
};

export default PrivateRoute;