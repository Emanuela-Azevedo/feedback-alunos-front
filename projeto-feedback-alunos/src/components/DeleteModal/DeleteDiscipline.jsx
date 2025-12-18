import React from 'react';
import styles from './DeleteDiscipline.module.css';

const DeleteDiscipline = ({ disciplina, onConfirm, onCancel }) => {
  const handleDelete = () => {
    onConfirm(disciplina.id);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Confirmar Exclusão</h2>
        
        <div className={styles.content}>
          <p>Tem certeza que deseja excluir a disciplina:</p>
          <div className={styles.disciplineInfo}>
            <strong>{disciplina.nome}</strong>
            <span>Código: {disciplina.codigo}</span>
            <span>Curso: {disciplina.curso}</span>
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

export default DeleteDiscipline;