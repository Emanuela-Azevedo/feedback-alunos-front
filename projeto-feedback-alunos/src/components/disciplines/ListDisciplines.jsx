import React from 'react';

const ListDisciplines = ({ disciplinas, onEdit, onDelete }) => {
  return (
    <div className="usuarios-list">
      {disciplinas.map(disciplina => (
        <div key={disciplina.id} className="avaliacao-card">
          <h3>{disciplina.nome}</h3>
          <p>Código: {disciplina.codigo}</p>
          <p>Curso: {disciplina.curso}</p>
          <div style={{display: 'flex', gap: '8px', marginTop: '10px'}}>
            <button 
              onClick={() => onEdit(disciplina)}
              className="btn btn-primary"
            >
              Editar
            </button>
            <button 
              onClick={() => onDelete(disciplina.id)}
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

export default ListDisciplines;