import React from 'react';

const ListCourses = ({ cursos, onEdit, onDelete }) => {
  return (
    <div className="usuarios-list">
      {cursos.map(curso => (
        <div key={curso.id} className="avaliacao-card">
          <h3>{curso.nome}</h3>
          <p>Código: {curso.codigo}</p>
          <div style={{display: 'flex', gap: '8px', marginTop: '10px'}}>
            <button 
              onClick={() => onEdit(curso)}
              className="btn btn-primary"
            >
              Editar
            </button>
            <button 
              onClick={() => onDelete(curso.id)}
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

export default ListCourses;