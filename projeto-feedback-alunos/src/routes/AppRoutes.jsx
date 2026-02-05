// src/AppRoutes.jsx
import React from "react";
import Login from "../components/login/Login.jsx";
import StudentPage from "../screens/student/StudentPage";
import TeacherPage from "../screens/teacher/TeacherPage";
import AdminPage from "../screens/admin/AdminPage";
import { useAuth } from "../context/AuthContext"; // <-- IMPORTAÇÃO CORRETA

const AppRoutes = () => {
  const { isLoggedIn, userType, userData, loading, logout } = useAuth(); // <-- logout vem do contexto

  if (loading) return <div>Carregando...</div>;
  
  if (!isLoggedIn) return <Login />;

  switch (userType) {
    case "admin":
      return <AdminPage userData={userData} onLogout={logout} />;
    case "professor":
      return <TeacherPage userData={userData} onLogout={logout} />;
    case "aluno":
      return <StudentPage userData={userData} onLogout={logout} />;
    default:
      return <Login />;
  }
};

export default AppRoutes;