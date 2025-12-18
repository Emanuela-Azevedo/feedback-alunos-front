import React from 'react';
import styles from './DeleteCourse.module.css';

const DeleteCourse = ({ curso, onConfirm, onCancel }) => {
  const handleDelete = () => {
    onConfirm(curso.id);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Confirmar Exclusão</h2>
        
        <div className={styles.content}>
          <p>Tem certeza que deseja excluir o curso:</p>
          <div className={styles.courseInfo}>
            <strong>{curso.nome}</strong>
            <span>Código: {curso.codigo}</span>
          </div>
          <p className={styles.warning}>Esta ação não pode ser desfeita!</p>
        </div>

        <div className={styles.buttonGroup}>
          <button 
            onClick={onCancel}
            className={styles.btnCancel}
          >
            Cancelar
          </button>
          <button 
            onClick={handleDelete}
            className={styles.btnDelete}
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCourse;