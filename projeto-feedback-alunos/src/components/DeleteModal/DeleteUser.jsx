import React from 'react';
import styles from './DeleteUser.module.css';

const DeleteUser = ({ user, onConfirm, onCancel }) => {
  const handleDelete = () => {
    onConfirm(user.id);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Confirmar Exclusão</h2>
        
        <div className={styles.content}>
          <p>Tem certeza que deseja excluir o usuário:</p>
          <div className={styles.userInfo}>
            <strong>{user.nome}</strong>
            <span>Matrícula: {user.matricula}</span>
            <span>Tipo: {user.tipo}</span>
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

export default DeleteUser;