import axios from "axios";
import { useAuth } from "../context/AuthContext";

const API_URL = "http://localhost:8081/api/disciplinas";

export default function useDisciplinas() {
    const { token } = useAuth();

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    };

    // Listar todas as disciplinas
    const listarDisciplinas = async () => {
        try {
            const res = await axios.get(API_URL, config);
            return res.data;
        } catch (err) {
            throw new Error(err.response?.data || "Erro ao listar disciplinas");
        }
    };

    // Buscar disciplina por ID
    const buscarDisciplinaPorId = async (id) => {
        try {
            const res = await axios.get(`${API_URL}/${id}`, config);
            return res.data;
        } catch (err) {
            throw new Error(err.response?.data || "Disciplina não encontrada");
        }
    };

    // Criar uma nova disciplina
    const criarDisciplina = async (data) => {
        try {
            const res = await axios.post(API_URL, data, config);
            return res.data;
        } catch (err) {
            throw new Error(err.response?.data || "Erro ao criar disciplina");
        }
    };

    // Atualizar disciplina existente
    const atualizarDisciplina = async (id, data) => {
        try {
            const res = await axios.put(`${API_URL}/${id}`, data, config);
            return res.data;
        } catch (err) {
            throw new Error(err.response?.data || "Erro ao atualizar disciplina");
        }
    };

    // Excluir disciplina
    const excluirDisciplina = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`, config);
            return true;
        } catch (err) {
            throw new Error(err.response?.data || "Erro ao excluir disciplina");
        }
    };

    return {
        listarDisciplinas,
        buscarDisciplinaPorId,
        criarDisciplina,
        atualizarDisciplina,
        excluirDisciplina,
    };
}