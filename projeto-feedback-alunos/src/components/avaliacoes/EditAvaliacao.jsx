import { useState, useEffect } from "react";
import AvaliacaoDisciplinaAPI from "../../services/AvaliaoesDisciplina";
import AvaliacaoProfessorAPI from "../../services/AvaliacoesProfessor";

export default function EditAvaliacao({ id, tipo, onCancel, onUpdated }) {
    const [nota, setNota] = useState(5);
    const [comentario, setComentario] = useState("");
    const [anonima, setAnonima] = useState(false);
    const [avaliacao, setAvaliacao] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function carregar() {
            console.log("🔎 EditAvaliacao: iniciando carregamento...");
            console.log("Props recebidas:", { id, tipo });

            try {
                let response;
                if (tipo === "disciplina") {
                    response = await AvaliacaoDisciplinaAPI.buscarPorId(id);
                } else {
                    response = await AvaliacaoProfessorAPI.buscarPorId(id);
                }

                console.log("Resposta da API:", response);

                const dados = response.data;
                console.log("Dados recebidos:", dados);

                setAvaliacao(dados);
                setNota(dados.nota);
                setComentario(dados.comentario);
                setAnonima(dados.anonima);
            } catch (error) {
                console.error("❌ Erro ao carregar avaliação:", error);
            }
        }
        carregar();
    }, [id, tipo]);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        try {
            let payload;
            if (tipo === "disciplina") {
                payload = {
                    usuarioId: avaliacao.usuarioId,
                    disciplinaId: avaliacao.disciplinaId,
                    nota: Number(nota),
                    comentario: comentario.trim(),
                    anonima: anonima,
                };
                console.log("Payload Disciplina:", payload);
                await AvaliacaoDisciplinaAPI.atualizarAvaliacao(id, payload);
            } else {
                payload = {
                    usuarioId: avaliacao.usuarioId,
                    professorId: avaliacao.professorId,
                    nota: Number(nota),
                    comentario: comentario.trim(),
                    anonima: anonima,
                };
                console.log("Payload Professor:", payload);
                await AvaliacaoProfessorAPI.atualizarAvaliacao(id, payload);
            }

            if (onUpdated) onUpdated({ ...avaliacao, nota, comentario, anonima });
        } catch (error) {
            console.error("❌ Erro ao atualizar avaliação:", error.response?.data || error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: "600px", margin: "0 auto" }}>
            <h3>Editar Avaliação</h3>

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