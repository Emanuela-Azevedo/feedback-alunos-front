import React from 'react';
import styles from './SearchUser.module.css';

const SearchUser = ({ searchValue, onSearchChange, onCreateClick }) => {
  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder="Buscar por matrícula..."
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
        className={styles.searchInput}
      />
      <button 
        onClick={onCreateClick}
        className={styles.createButton}
      >
        Criar Usuário
      </button>
    </div>
  );
};

export default SearchUser;