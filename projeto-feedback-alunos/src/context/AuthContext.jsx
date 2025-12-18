import React, { createContext, useContext, useState } from 'react';
import { testUsers, testCourses, testDisciplines, testEvaluations, testProfessors } from '../data';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);
  const [userData, setUserData] = useState(null);

  const login = (user) => {
    setUserData(user);
    setUserType(user.tipo);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserType(null);
    setUserData(null);
  };

  const value = {
    isLoggedIn,
    userType,
    userData,
    login,
    logout,
    testUsers,
    testCourses,
    testDisciplines,
    testEvaluations,
    testProfessors
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};