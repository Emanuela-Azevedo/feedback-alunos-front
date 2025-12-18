import React from 'react';
import styles from './ListCourses.module.css';

const ListCourses = ({ cursos, onEdit, onDelete }) => {
  return (
    <div className={styles.coursesList}>
      {cursos.map(curso => (
        <div key={curso.id} className={styles.courseCard}>
          <h3>{curso.nome}</h3>
          <p>Código: {curso.codigo}</p>
          <div className={styles.buttonGroup}>
            <button 
              onClick={() => onEdit(curso)}
              className={styles.btnEdit}
            >
              Editar
            </button>
            <button 
              onClick={() => onDelete(curso.id)}
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

export default ListCourses;