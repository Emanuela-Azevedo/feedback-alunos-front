import React from 'react';
import styles from './ListUsers.module.css';

const ListUsers = ({ usuarios, onEdit, onDelete }) => {
  return (
    <div className={styles.usersList}>
      {usuarios.map(usuario => (
        <div key={usuario.id} className={styles.userCard}>
          <h3>{usuario.nome}</h3>
          <p>Matrícula: {usuario.matricula}</p>
          <p>Tipo: {usuario.tipo}</p>
          {usuario.curso && <p>Curso: {usuario.curso}</p>}
          {usuario.especialidade && <p>Especialidade: {usuario.especialidade}</p>}
          <div className={styles.buttonGroup}>
            <button 
              onClick={() => onEdit(usuario)}
              className={styles.btnEdit}
            >
              Editar
            </button>
            <button 
              onClick={() => onDelete(usuario.id)}
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

export default ListUsers;