import axios from "axios";
import { useAuth } from "../context/AuthContext";

const API_URL = "http://localhost:8081/api/cursos";

export default function useCursos() {
    const { token } = useAuth();

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    };

    const normalizarCurso = (curso) => ({
        ...curso,
        idCurso: curso.idCurso ?? curso.id, // garante que sempre exista idCurso
    });

    const listarCursos = async () => {
        try {
            const res = await axios.get(API_URL, config);
            return (res.data || []).map(normalizarCurso);
        } catch (err) {
            throw new Error(err.response?.data || "Erro ao listar cursos");
        }
    };

    const criarCurso = async (data) => {
        try {
            const res = await axios.post(API_URL, data, config);
            return normalizarCurso(res.data);
        } catch (err) {
            throw new Error(err.response?.data || "Erro ao criar curso");
        }
    };

    const atualizarCurso = async (idCurso, data) => {
        try {
            const res = await axios.put(`${API_URL}/${idCurso}`, data, config);
            return normalizarCurso(res.data);
        } catch (err) {
            throw new Error(err.response?.data || "Erro ao atualizar curso");
        }
    };

    const excluirCurso = async (idCurso) => {
        try {
            await axios.delete(`${API_URL}/${idCurso}`, config);
            return true;
        } catch (err) {
            throw new Error(err.response?.data || "Erro ao excluir curso");
        }
    };

    return {
        listarCursos,
        criarCurso,
        atualizarCurso,
        excluirCurso,
    };
}
