import { useEffect, useState } from "react";
import AvaliacaoDisciplinaAPI from "../../services/AvaliacaoDisciplina";
import AvaliacaoProfessorAPI from "../../services/AvaliacaoProfessor";

export default function EditAvaliacao({ id, tipo, onCancel, onUpdated }) {
    const [avaliacao, setAvaliacao] = useState(null);
    const [nota, setNota] = useState(5);
    const [comentario, setComentario] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function carregarAvaliacao() {
            try {
                let response;
                if (tipo === "disciplina") {
                    response = await AvaliacaoDisciplinaAPI.buscarPorId(id);
                } else {
                    response = await AvaliacaoProfessorAPI.buscarPorId(id);
                }
                setAvaliacao(response.data);
                setNota(response.data.nota);
                setComentario(response.data.comentario);
            } catch (error) {
                console.error("Erro ao carregar avaliação:", error);
            } finally {
                setLoading(false);
            }
        }
        carregarAvaliacao();
    }, [id, tipo]);

    async function handleUpdate(e) {
        e.preventDefault();
        try {
            const payload = {
                nota,
                comentario,
            };

            let response;
            if (tipo === "disciplina") {
                response = await AvaliacaoDisciplinaAPI.atualizarAvaliacao(id, payload);
            } else {
                response = await AvaliacaoProfessorAPI.atualizarAvaliacao(id, payload);
            }

            if (onUpdated) onUpdated(response.data); // callback para atualizar lista
            if (onCancel) onCancel(); // fecha o formulário
        } catch (error) {
            console.error("Erro ao atualizar avaliação:", error);
        }
    }

    if (loading) return <p>Carregando avaliação...</p>;
    if (!avaliacao) return <p>Avaliação não encontrada.</p>;

    return (
        <form
            onSubmit={handleUpdate}
            style={{
                maxWidth: "600px",
                margin: "0 auto",
                padding: "1rem",
                border: "1px solid #ccc",
                borderRadius: "8px",
            }}
        >
            <h3>Editar Avaliação ({tipo})</h3>

            <div className="form-group">
                <label>Nota (1 a 5):</label>
                <input
                    type="number"
                    min="1"
                    max="5"
                    value={nota}
                    onChange={(e) => setNota(e.target.value)}
                    className="form-control"
                />
            </div>

            <div className="form-group">
                <label>Comentário:</label>
                <textarea
                    value={comentario}
                    onChange={(e) => setComentario(e.target.value)}
                    className="form-control"
                />
            </div>

            <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
                <button type="submit" className="btn btn-primary">
                    Salvar
                </button>
                <button type="button" className="btn btn-secondary" onClick={onCancel}>
                    Cancelar
                </button>
            </div>
        </form>
    );
}