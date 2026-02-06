import React, { useState } from "react";

const ListAvaliacoes = ({ avaliacoes = [], mediasDisciplina = [], onEdit, onDelete }) => {
    const [paginaAtual, setPaginaAtual] = useState(1);
    const itensPorPagina = 5;

    const indiceInicial = (paginaAtual - 1) * itensPorPagina;
    const indiceFinal = indiceInicial + itensPorPagina;
    const avaliacoesPagina = avaliacoes.slice(indiceInicial, indiceFinal);

    const totalPaginas = Math.ceil(avaliacoes.length / itensPorPagina);

    return (
        <div style={{ marginTop: "2rem" }}>
            {avaliacoes.length === 0 ? (
                <p>Nenhuma avaliação encontrada.</p>
            ) : (
                <>
                    {/* 🔹 Mostra médias por disciplina */}
                    <div style={{ marginBottom: "1rem" }}>
                        <h4>Média por disciplina</h4>
                        <ul>
                            {mediasDisciplina.map((d) => (
                                <li key={d.disciplina}>
                                    {d.disciplina}: {d.media} ({d.avaliacoes})
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Cards de avaliações */}
                    <div
                        className="avaliacoes-cards"
                        style={{
                            display: "grid",
                            gap: "1rem",
                            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                        }}
                    >
                        {avaliacoesPagina.map((avaliacao) => (
                            <div
                                key={`${avaliacao.tipoAvaliacao}-${avaliacao.id}`}
                                className="card"
                                style={{
                                    border: "1px solid #ddd",
                                    borderRadius: "10px",
                                    padding: "1rem",
                                    background: "#fff",
                                    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                                }}
                            >
                                <h4 style={{ marginBottom: "0.5rem" }}>
                                    {avaliacao.tipoAvaliacao === "professor"
                                        ? `Professor: ${avaliacao.professorNome}`
                                        : `Disciplina: ${avaliacao.disciplinaNome}`}
                                </h4>

                                <p><strong>Nota:</strong> {avaliacao.nota}/5</p>
                                <p><strong>Comentário:</strong> {avaliacao.comentario}</p>
                                <p><strong>Data:</strong> {avaliacao.dataAvaliacao}</p>
                                {avaliacao.anonima && (
                                    <p style={{ fontStyle: "italic", color: "#888" }}>
                                        Avaliação anônima
                                    </p>
                                )}

                                <div style={{ marginTop: "0.5rem" }}>
                                    <button
                                        onClick={() => onEdit(avaliacao)}
                                        className="btn btn-warning"
                                        style={{ marginRight: "10px" }}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => onDelete(avaliacao)}
                                        className="btn btn-danger"
                                    >
                                        Excluir
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Paginação */}
                    <div
                        style={{
                            marginTop: "1rem",
                            display: "flex",
                            gap: "0.5rem",
                            justifyContent: "center",
                        }}
                    >
                        {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((num) => (
                            <button
                                key={num}
                                onClick={() => setPaginaAtual(num)}
                                style={{
                                    padding: "6px 12px",
                                    borderRadius: "6px",
                                    border: "1px solid #00a859",
                                    background: paginaAtual === num ? "#00a859" : "transparent",
                                    color: paginaAtual === num ? "#fff" : "#00a859",
                                    cursor: "pointer",
                                }}
                            >
                                {num}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default ListAvaliacoes;