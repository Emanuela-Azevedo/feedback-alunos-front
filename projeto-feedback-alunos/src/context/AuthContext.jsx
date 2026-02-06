import { createContext, useContext, useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import AuthAPI from "../services/Authentication";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        token: null,
        isLoggedIn: false,
        userType: null,
        userData: null,
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setLoading(false);
            return;
        }

        try {
            const decoded = jwtDecode(token);
            const role = decoded.roles?.[0] || decoded.authorities?.[0] || null;

            let userType = null;
            if (role === "ROLE_ALUNO") {
                userType = "student";
            } else if (role === "ROLE_PROFESSOR") {
                userType = "teacher";
            } else if (role === "ROLE_ADMIN") {
                userType = "admin";
            }

            if (!userType) {
                localStorage.removeItem("token");
                setLoading(false);
                return;
            }

            setAuthState({
                token,
                isLoggedIn: true,
                userType,
                userData: {
                    matricula: decoded.sub,
                    role,
                    nome: decoded.nome || "", // se o token tiver nome
                },
            });
        } catch (err) {
            console.error("AuthContext: erro ao decodificar token", err);
            localStorage.removeItem("token");
        } finally {
            setLoading(false);
        }
    }, []);

    const login = async (matricula, password) => {
        try {
            const response = await AuthAPI.login({ matricula, password });
            const token = response.data.token;
            localStorage.setItem("token", token);

            const decoded = jwtDecode(token);
            const role = decoded.roles?.[0] || decoded.authorities?.[0] || null;

            let userType = null;
            if (role === "ROLE_ALUNO") {
                userType = "student";
            } else if (role === "ROLE_PROFESSOR") {
                userType = "teacher";
            } else if (role === "ROLE_ADMIN") {
                userType = "admin";
            }

            if (!userType) {
                localStorage.removeItem("token");
                setAuthState({
                    token: null,
                    isLoggedIn: false,
                    userType: null,
                    userData: null,
                });
                return false;
            }

            setAuthState({
                token,
                isLoggedIn: true,
                userType,
                userData: {
                    matricula: decoded.sub,
                    role,
                    nome: decoded.nome || "",
                },
            });
            return true;
        } catch (err) {
            console.error("AuthContext: erro no login", err);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setAuthState({
            token: null,
            isLoggedIn: false,
            userType: null,
            userData: null,
        });
    };

    const getAuthHeader = () => ({
        headers: { Authorization: `Bearer ${authState.token}` },
    });

    return (
        <AuthContext.Provider
            value={{ ...authState, login, logout, getAuthHeader, loading }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth deve ser usado dentro de AuthProvider");
    return context;
};