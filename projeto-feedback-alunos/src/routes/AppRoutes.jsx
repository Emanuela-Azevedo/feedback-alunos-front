import React from 'react';
import { useAuth } from '../context/AuthContext';
import Login from '../components/Login';
import StudentPage from '../screens/student/StudentPage';
import TeacherPage from '../screens/teacher/TeacherPage';
import AdminPage from '../screens/admin/AdminPage';

const AppRoutes = () => {
  const { isLoggedIn, userType, userData, login, logout } = useAuth();

  if (isLoggedIn) {
    switch (userType) {
      case 'aluno':
        return <StudentPage userData={userData} onLogout={logout} />;
      case 'professor':
        return <TeacherPage userData={userData} onLogout={logout} />;
      case 'admin':
        return <AdminPage userData={userData} onLogout={logout} />;
      default:
        return null;
    }
  }

  return <Login onLogin={login} />;
};

export default AppRoutes;