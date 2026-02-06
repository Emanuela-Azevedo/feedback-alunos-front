import React from "react";

const ListAvaliacoes = ({ avaliacoes = [], onEdit, onDelete }) => {
    return (
        <div style={{ marginTop: "2rem" }}>
            {avaliacoes.length === 0 ? (
                <p>Nenhuma avaliação encontrada.</p>
            ) : (
                <table className="table">
                    <thead>
                    <tr>
                        <th>Tipo</th>
                        <th>Referência</th>
                        <th>Nota</th>
                        <th>Comentário</th>
                        <th>Data</th>
                        <th>Ações</th>
                    </tr>
                    </thead>
                    <tbody>
                    {avaliacoes.map((avaliacao) => (
                        <tr key={avaliacao.id}>
                            <td>
                                {avaliacao.tipoAvaliacao === "professor"
                                    ? "Professor"
                                    : "Disciplina"}
                            </td>
                            <td>
                                {avaliacao.tipoAvaliacao === "professor"
                                    ? avaliacao.professor
                                    : avaliacao.disciplina}
                            </td>
                            <td>{avaliacao.nota}/5</td>
                            <td>{avaliacao.comentario}</td>
                            <td>{avaliacao.data}</td>
                            <td>
                                <button
                                    onClick={() => onEdit(avaliacao)}
                                    className="btn btn-warning"
                                    style={{ marginRight: "10px" }}
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => onDelete(avaliacao.id)}
                                    className="btn btn-danger"
                                >
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ListAvaliacoes;