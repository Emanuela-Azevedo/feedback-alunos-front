import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8081",
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token"); // token salvo no login
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

const criarAvaliacao = (avaliacaoData) => {
    return api.post("/api/avaliacoes/disciplinas", avaliacaoData);
};

const listarAvaliacoes = () => {
    return api.get("/api/avaliacoes/disciplinas");
};

const buscarPorId = (id) => {
    return api.get(`/api/avaliacoes/disciplinas/${id}`);
};

const atualizarAvaliacao = (id, avaliacaoData) => {
    return api.put(`/api/avaliacoes/disciplinas/${id}`, avaliacaoData);
};

const excluirAvaliacao = (id) => {
    return api.delete(`/api/avaliacoes/disciplinas/${id}`);
};

export default {
    criarAvaliacao,
    listarAvaliacoes,
    buscarPorId,
    atualizarAvaliacao,
    excluirAvaliacao,
};