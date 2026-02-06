import { useState, useEffect } from "react";
import AvaliacaoDisciplinaAPI from "../../services/AvaliaoesDisciplina.js";
import AvaliacaoProfessorAPI from "../../services/AvaliacoesProfessor.js";
import useDisciplinas from "../../services/Disciplinas";
import useUsuarios from "../../services/Usuarios";
import useCursos from "../../services/Cursos";

export default function CreateAvaliacao({ userData, onCancel, onCreated }) {
    const { listarDisciplinas } = useDisciplinas();
    const { listarProfessoresPorCurso } = useUsuarios();
    const { listarCursos } = useCursos();

    const [tipo, setTipo] = useState("disciplina");
    const [nota, setNota] = useState(5);
    const [comentario, setComentario] = useState("");
    const [anonima, setAnonima] = useState(false);
    const [cursos, setCursos] = useState([]);
    const [disciplinas, setDisciplinas] = useState([]);
    const [professores, setProfessores] = useState([]);
    const [selectedCurso, setSelectedCurso] = useState("");
    const [selectedDisciplina, setSelectedDisciplina] = useState("");
    const [selectedProfessor, setSelectedProfessor] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function carregarDados() {
            try {
                const cursosResp = await listarCursos();
                const disciplinasResp = await listarDisciplinas();
                setCursos(cursosResp);
                setDisciplinas(disciplinasResp);
            } catch (error) {
                console.error("CreateAvaliacao - Erro ao carregar dados:", error);
            }
        }
        carregarDados();
    }, []);

    async function handleCursoChange(idCurso) {
        setSelectedCurso(idCurso);
        setSelectedProfessor("");
        if (idCurso) {
            try {
                const professoresResp = await listarProfessoresPorCurso(idCurso);
                setProfessores(professoresResp);
            } catch (error) {
                console.error("CreateAvaliacao - Erro ao carregar professores:", error);
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
                if (!selectedDisciplina) {
                    alert("Selecione uma disciplina!");
                    setLoading(false);
                    return;
                }

                payload = {
                    usuarioId: userData.usuarioId,
                    disciplinaId: Number(selectedDisciplina),
                    nota: Number(nota),
                    comentario: comentario.trim(),
                    anonima: anonima,
                };
                await AvaliacaoDisciplinaAPI.criarAvaliacao(payload);
            } else {
                if (!selectedProfessor) {
                    alert("Selecione um professor!");
                    setLoading(false);
                    return;
                }

                payload = {
                    usuarioId: userData.usuarioId,
                    professorId: Number(selectedProfessor),
                    nota: Number(nota),
                    comentario: comentario.trim(),
                    anonima: anonima,
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
            setAnonima(false);

            if (onCancel) onCancel();
        } catch (error) {
            console.error("CreateAvaliacao - Erro ao criar avaliação:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: "600px", margin: "0 auto" }}>
            <h3>Criar Nova Avaliação</h3>

            {/* Tipo da avaliação */}
            <div className="form-group">
                <label>Tipo:</label>
                <select value={tipo} onChange={(e) => setTipo(e.target.value)} className="form-control">
                    <option value="disciplina">Disciplina</option>
                    <option value="professor">Professor</option>
                </select>
            </div>

            {/* Select de disciplina */}
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

            {/* Select de curso e professor */}
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

            {/* Nota */}
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

            {/* Comentário */}
            <div className="form-group">
                <label>Comentário:</label>
                <textarea
                    value={comentario}
                    onChange={(e) => setComentario(e.target.value)}
                    className="form-control"
                    maxLength={500}
                />
            </div>

            {/* Avaliação anônima */}
            <div className="form-group" style={{ marginTop: "1rem" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <input
                        type="checkbox"
                        checked={anonima}
                        onChange={(e) => setAnonima(e.target.checked)}
                    />
                    <span>Anônimo</span>
                </label>
            </div>

            {/* Botões */}
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