import React from 'react';

const perfilLabels = {
    ROLE_ALUNO: "Aluno",
    ROLE_PROFESSOR: "Professor",
    ROLE_ADMIN: "Administrador"
};

const ListUsers = ({ usuarios, onEdit, onDelete }) => {
    return (
        <div className="usuarios-list">
            {usuarios.map(usuario => (
                <div key={usuario.idUsuario} className="avaliacao-card">
                    <h3>{usuario.nome}</h3>
                    <p>Matrícula: {usuario.matricula}</p>
                    <p>Perfil: {perfilLabels[usuario.perfil] || usuario.perfil}</p>

                    {/* Curso: só mostra se existir e usa nome do DTO */}
                    {usuario.curso && (
                        <p>Curso: {usuario.curso.nome} (ID: {usuario.curso.idCurso})</p>
                    )}

                    {/* Especialidade: só mostra para professores */}
                    {usuario.especialidade && (
                        <p>Especialidade: {usuario.especialidade}</p>
                    )}

                    <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                        <button
                            onClick={() => onEdit(usuario)}
                            className="btn btn-primary"
                        >
                            Editar
                        </button>
                        <button
                            onClick={() => onDelete(usuario.idUsuario)}
                            className="btn btn-danger"
                        >
                            Excluir
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ListUsers;
