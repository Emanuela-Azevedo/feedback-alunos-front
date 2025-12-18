import React from 'react';
import styles from './ListDisciplines.module.css';

const ListDisciplines = ({ disciplinas, onEdit, onDelete }) => {
  return (
    <div className={styles.disciplinesList}>
      {disciplinas.map(disciplina => (
        <div key={disciplina.id} className={styles.disciplineCard}>
          <h3>{disciplina.nome}</h3>
          <p>Código: {disciplina.codigo}</p>
          <p>Curso: {disciplina.curso}</p>
          <div className={styles.buttonGroup}>
            <button 
              onClick={() => onEdit(disciplina)}
              className={styles.btnEdit}
            >
              Editar
            </button>
            <button 
              onClick={() => onDelete(disciplina.id)}
              className={styles.btnDelete}
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