import { createContext, useContext, useState, useEffect } from "react";
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
        const savedUser = localStorage.getItem("userData");

        if (!token || !savedUser) {
            setLoading(false);
            return;
        }

        try {
            const userData = JSON.parse(savedUser);

            let userType = null;
            if (userData.role === "ROLE_ALUNO") userType = "student";
            else if (userData.role === "ROLE_PROFESSOR") userType = "teacher";
            else if (userData.role === "ROLE_ADMIN") userType = "admin";

            setAuthState({
                token,
                isLoggedIn: true,
                userType,
                userData,
            });
        } catch (err) {
            console.error("AuthContext: erro ao restaurar userData", err);
            localStorage.removeItem("token");
            localStorage.removeItem("userData");
        } finally {
            setLoading(false);
        }
    }, []);

    const login = async (matricula, password) => {
        try {
            const response = await AuthAPI.login({ matricula, password });
            const data = response.data;
            // data já tem: token, usuarioId, matricula, nome, role

            localStorage.setItem("token", data.token);
            localStorage.setItem("userData", JSON.stringify({
                usuarioId: data.usuarioId,
                matricula: data.matricula,
                nome: data.nome,
                role: data.role,
            }));

            let userType = null;
            if (data.role === "ROLE_ALUNO") userType = "student";
            else if (data.role === "ROLE_PROFESSOR") userType = "teacher";
            else if (data.role === "ROLE_ADMIN") userType = "admin";

            setAuthState({
                token: data.token,
                isLoggedIn: true,
                userType,
                userData: {
                    usuarioId: data.usuarioId,
                    matricula: data.matricula,
                    nome: data.nome,
                    role: data.role,
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
        localStorage.removeItem("userData");
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