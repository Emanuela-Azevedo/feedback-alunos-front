import { useState, useEffect } from "react";
import AvaliacaoDisciplinaAPI from "../../services/AvaliacaoDisciplina";
import AvaliacaoProfessorAPI from "../../services/AvaliacaoProfessor";
import useDisciplinas from "../../services/Disciplinas";
import useUsuarios from "../../services/Usuarios";
import useCursos from "../../services/Cursos"; // ⚠️ com C maiúsculo

export default function CreateAvaliacao({ userData, onCancel, onCreated }) {
    const { listarDisciplinas } = useDisciplinas();
    const { listarProfessoresPorCurso } = useUsuarios();
    const { listarCursos } = useCursos();

    const [tipo, setTipo] = useState("disciplina");
    const [nota, setNota] = useState(5);
    const [comentario, setComentario] = useState("");
    const [cursos, setCursos] = useState([]);
    const [disciplinas, setDisciplinas] = useState([]);
    const [professores, setProfessores] = useState([]);
    const [selectedCurso, setSelectedCurso] = useState("");
    const [selectedDisciplina, setSelectedDisciplina] = useState("");
    const [selectedProfessor, setSelectedProfessor] = useState("");
    const [loading, setLoading] = useState(false);

    // 🔹 Carregar cursos e disciplinas apenas uma vez
    useEffect(() => {
        async function carregarDados() {
            try {
                const cursosResp = await listarCursos();
                const disciplinasResp = await listarDisciplinas();
                setCursos(cursosResp);
                setDisciplinas(disciplinasResp);
            } catch (error) {
                console.error("Erro ao carregar dados:", error);
            }
        }
        carregarDados();
    }, []); // sem dependências → evita loop

    async function handleCursoChange(idCurso) {
        setSelectedCurso(idCurso);
        setSelectedProfessor("");
        if (idCurso) {
            try {
                const professoresResp = await listarProfessoresPorCurso(idCurso);
                setProfessores(professoresResp);
            } catch (error) {
                console.error("Erro ao carregar professores:", error);
            }
        } else {
            setProfessores([]);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        try {
            let payload;

            if (tipo === "disciplina") {
                // 🔹 Payload conforme AvaliacaoDisciplinaCreateDTO
                payload = {
                    usuarioId: userData.idUsuario,       // precisa ser o ID do usuário
                    disciplinaId: selectedDisciplina,    // precisa ser o ID da disciplina
                    nota: Number(nota),                  // garantir que seja número
                    comentario: comentario.trim(),       // não pode ser vazio
                    anonima: false
                };

                await AvaliacaoDisciplinaAPI.criarAvaliacao(payload);
            } else {
                // 🔹 Payload para professor (ajuste conforme DTO de professor)
                payload = {
                    usuarioId: userData.idUsuario,
                    professorId: selectedProfessor,
                    nota: Number(nota),
                    comentario: comentario.trim(),
                    anonima: false
                };

                await AvaliacaoProfessorAPI.criarAvaliacao(payload);
            }

            if (onCreated) onCreated(payload);

            // resetar formulário
            setNota(5);
            setComentario("");
            setTipo("disciplina");
            setSelectedCurso("");
            setSelectedDisciplina("");
            setSelectedProfessor("");
            if (onCancel) onCancel();
        } catch (error) {
            console.error("Erro ao criar avaliação:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: "600px", margin: "0 auto" }}>
            <h3>Criar Nova Avaliação</h3>

            <div className="form-group">
                <label>Tipo:</label>
                <select value={tipo} onChange={(e) => setTipo(e.target.value)} className="form-control">
                    <option value="disciplina">Disciplina</option>
                    <option value="professor">Professor</option>
                </select>
            </div>

            {tipo === "disciplina" && (
                <div className="form-group">
                    <label>Disciplina:</label>
                    <select
                        value={selectedDisciplina}
                        onChange={(e) => setSelectedDisciplina(e.target.value)}
                        className="form-control"
                    >
                        <option value="">Selecione uma disciplina</option>
                        {disciplinas.map((d) => (
                            <option key={d.idDisciplina} value={d.idDisciplina}>
                                {d.nome}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {tipo === "professor" && (
                <>
                    <div className="form-group">
                        <label>Curso:</label>
                        <select
                            value={selectedCurso}
                            onChange={(e) => handleCursoChange(e.target.value)}
                            className="form-control"
                        >
                            <option value="">Selecione um curso</option>
                            {cursos.map((c) => (
                                <option key={c.idCurso} value={c.idCurso}>
                                    {c.nome}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Professor:</label>
                        <select
                            value={selectedProfessor}
                            onChange={(e) => setSelectedProfessor(e.target.value)}
                            className="form-control"
                            disabled={!selectedCurso}
                        >
                            <option value="">Selecione um professor</option>
                            {professores.map((p) => (
                                <option key={p.idUsuario} value={p.idUsuario}>
                                    {p.nome}
                                </option>
                            ))}
                        </select>
                    </div>
                </>
            )}

            <div className="form-group">
                <label>Nota (0 a 5):</label>
                <input
                    type="number"
                    min="0"
                    max="5"
                    value={nota}
                    onChange={(e) => setNota(Number(e.target.value))}
                    className="form-control"
                />
            </div>

            <div className="form-group">
                <label>Comentário:</label>
                <textarea
                    value={comentario}
                    onChange={(e) => setComentario(e.target.value)}
                    className="form-control"
                    maxLength={500}
                />
            </div>

            <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
                <button type="submit" className="btn btn-success" disabled={loading}>
                    {loading ? "Salvando..." : "Salvar"}
                </button>
                <button type="button" className="btn btn-secondary" onClick={onCancel}>
                    Cancelar
                </button>
            </div>
        </form>
    );
}