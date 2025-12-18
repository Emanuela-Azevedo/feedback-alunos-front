import React from 'react';

const ListUsers = ({ usuarios, onEdit, onDelete }) => {
  return (
    <div className="usuarios-list">
      {usuarios.map(usuario => (
        <div key={usuario.id} className="avaliacao-card">
          <h3>{usuario.nome}</h3>
          <p>Matrícula: {usuario.matricula}</p>
          <p>Tipo: {usuario.tipo}</p>
          {usuario.curso && <p>Curso: {usuario.curso}</p>}
          {usuario.especialidade && <p>Especialidade: {usuario.especialidade}</p>}
          <div style={{display: 'flex', gap: '8px', marginTop: '10px'}}>
            <button 
              onClick={() => onEdit(usuario)}
              className="btn btn-primary"
            >
              Editar
            </button>
            <button 
              onClick={() => onDelete(usuario.id)}
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