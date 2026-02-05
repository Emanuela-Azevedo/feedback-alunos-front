import React from 'react';

const ListCourses = ({ cursos, onEdit, onDelete }) => {
  if (!cursos || cursos.length === 0) {
    return <p>Nenhum curso cadastrado.</p>;
  }

  return (
      <div className="usuarios-list">
        {cursos.map(curso => (
            <div key={curso.idCurso} className="avaliacao-card">
              <h3>{curso.nome}</h3>
              <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                <button onClick={() => onEdit(curso)} className="btn btn-primary">
                  Editar
                </button>
                <button onClick={() => onDelete(curso.idCurso)} className="btn btn-danger">
                  Excluir
                </button>
              </div>
            </div>
        ))}
      </div>
  );
};

export default ListCourses;
