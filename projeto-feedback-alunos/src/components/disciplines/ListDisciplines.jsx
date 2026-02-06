import React from "react";

const ListDisciplines = ({ disciplinas = [], cursos = [], professores = [], onEdit, onDelete }) => {
    return (
        <div style={{ marginTop: "2rem" }}>
            {disciplinas.length === 0 ? (
                <p>Nenhuma disciplina cadastrada.</p>
            ) : (
                <table className="table">
                    <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Curso</th>
                        <th>Professor</th>
                        <th>Ações</th>
                    </tr>
                    </thead>
                    <tbody>
                    {disciplinas.map((disciplina) => (
                        <tr key={disciplina.idDisciplina}>
                            <td>{disciplina.nome}</td>
                            {/* Faz o join manual com cursos */}
                            <td>
                                {cursos.find((c) => c.idCurso === disciplina.cursoId)?.nome || "—"}
                            </td>
                            {/* Faz o join manual com professores */}
                            <td>
                                {professores.find((p) => p.idUsuario === disciplina.professorId)?.nome || "—"}
                            </td>
                            <td>
                                <button
                                    onClick={() => onEdit(disciplina)}
                                    className="btn btn-warning"
                                    style={{ marginRight: "10px" }}
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => onDelete(disciplina.idDisciplina)}
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

export default ListDisciplines;