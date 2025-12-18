import { createContext, useContext, useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode"; 
import AuthAPI from "../services/AuthAPI";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ enrollmentNumber: "", fullName: "", id: null, imgUrl: "", username: "" });
  const [userRoles, setUserRoles] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const login = async (credentials) => {
    await AuthAPI.login(credentials).then((response) => {
      
      if (response.status === 200) {
        setToken(response.data.token);
        setUser(response.data.user);
        localStorage.setItem("token", response.data.token);
        
        const decoded = jwtDecode(response.data.token);
        setUserRoles(decoded.roles);
      } 
    });  
  };
  
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setUserRoles(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, userRoles, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);