// src/AppRoutes.jsx
import React from "react";
import Login from "../components/login/Login.jsx";
import StudentPage from "../screens/student/StudentPage";
import TeacherPage from "../screens/teacher/TeacherPage";
import AdminPage from "../screens/admin/AdminPage";
import { useAuth } from "../context/AuthContext";

const AppRoutes = () => {
  const { isLoggedIn, userType, userData, loading, logout } = useAuth();

  if (loading) return <div>Carregando...</div>;

  if (!isLoggedIn) return <Login />;

  switch (userType) {
    case "admin":
      return <AdminPage userData={userData} onLogout={logout} />;
    case "teacher":
      return <TeacherPage userData={userData} onLogout={logout} />;
    case "student":
      return <StudentPage userData={userData} onLogout={logout} />;
    default:
      return <Login />;
  }
};

export default AppRoutes;