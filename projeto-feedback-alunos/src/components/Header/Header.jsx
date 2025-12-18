import React from 'react';
import logoIfpb from '../../assets/logo-ifpb.png';
import styles from './Header.module.css';

const Header = ({ title, userName, onLogout }) => {
  return (
    <div className={styles.header}>
      <div className={styles.logoSection}>
        <img src={logoIfpb} alt="Logo IFPB" className={styles.logo} />
        <h1 className={styles.title}>{title}</h1>
      </div>
      
      {userName && (
        <div className={styles.userSection}>
          <span className={styles.userName}>
            Olá, {userName}
          </span>
          <button 
            onClick={onLogout}
            className={styles.logoutButton}
          >
            Sair
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;