// src/services/Authentication.js
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8081",
});

// função de login
const login = ({ matricula, password }) => {
    return api.post("/api/auth/login", { matricula, password });
};

// exporta as funções
export default { login };

export { api, login };
