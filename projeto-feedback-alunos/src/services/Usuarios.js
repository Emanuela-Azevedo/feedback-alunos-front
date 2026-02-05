import axios from "axios";
import { useAuth } from "../context/AuthContext";

const API_URL = "http://localhost:8081/api/usuarios";

export default function useUsuarios() {
    const { token } = useAuth();

    const getConfig = () => ({
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    // Normaliza para garantir que sempre exista idUsuario
    const normalizarUsuario = (usuario) => ({
        ...usuario,
        idUsuario: usuario.idUsuario ?? usuario.id, // fallback caso backend mande "id"
    });

    const listarUsuarios = async () => {
        try {
            const res = await axios.get(API_URL, getConfig());
            return (res.data || []).map(normalizarUsuario);
        } catch (err) {
            throw new Error(err.response?.data || "Erro ao listar usuários");
        }
    };

    const buscarPorId = async (idUsuario) => {
        try {
            const res = await axios.get(`${API_URL}/${idUsuario}`, getConfig());
            return normalizarUsuario(res.data);
        } catch (err) {
            throw new Error(err.response?.data || "Erro ao buscar usuário por ID");
        }
    };

    const buscarPorMatricula = async (matricula) => {
        try {
            const res = await axios.get(`${API_URL}/matricula/${matricula}`, getConfig());
            return normalizarUsuario(res.data);
        } catch (err) {
            throw new Error(err.response?.data || "Erro ao buscar usuário por matrícula");
        }
    };

    const criarUsuario = async (data, tipo = "aluno") => {
        try {
            let endpoint = `${API_URL}/aluno`;
            if (tipo === "professor") endpoint = `${API_URL}/professor`;
            if (tipo === "admin") endpoint = `${API_URL}/admin`;

            const res = await axios.post(endpoint, data, getConfig());
            return normalizarUsuario(res.data);
        } catch (err) {
            throw new Error(err.response?.data || "Erro ao criar usuário");
        }
    };

    const atualizarUsuario = async (idUsuario, data) => {
        try {
            const res = await axios.put(`${API_URL}/${idUsuario}`, data, getConfig());
            return normalizarUsuario(res.data);
        } catch (err) {
            throw new Error(err.response?.data || "Erro ao atualizar usuário");
        }
    };

    const excluirUsuario = async (idUsuario) => {
        try {
            await axios.delete(`${API_URL}/${idUsuario}`, getConfig());
            return true;
        } catch (err) {
            throw new Error(err.response?.data || "Erro ao excluir usuário");
        }
    };

    return {
        listarUsuarios,
        buscarPorId,
        buscarPorMatricula,
        criarUsuario,
        atualizarUsuario,
        excluirUsuario,
    };
}