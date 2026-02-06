import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8081",
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

const criarAvaliacao = (avaliacaoData) => {
    return api.post("/api/avaliacoes/professores", avaliacaoData);
};

const listarAvaliacoes = () => {
    return api.get("/api/avaliacoes/professores");
};

const buscarPorId = (id) => {
    return api.get(`/api/avaliacoes/professores/${id}`);
};

const atualizarAvaliacao = (id, avaliacaoData) => {
    return api.put(`/api/avaliacoes/professores/${id}`, avaliacaoData);
};

const excluirAvaliacao = (id) => {
    return api.delete(`/api/avaliacoes/professores/${id}`);
};

export default {
    criarAvaliacao,
    listarAvaliacoes,
    buscarPorId,
    atualizarAvaliacao,
    excluirAvaliacao,
};