import React from 'react';
import logoIfpb from '../../assets/logo-ifpb.png';

const Header = ({ title, userName, onLogout }) => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '1rem',
      marginBottom: '2rem',
      paddingBottom: '1rem',
      borderBottom: '2px solid #00a859',
      position: 'relative'
    }}>
      <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
        <img src={logoIfpb} alt="Logo IFPB" style={{width: '60px', height: 'auto'}} />
        <h1 style={{color: '#00a859', margin: 0, fontSize: '2rem', fontWeight: '700'}}>{title}</h1>
      </div>
      
      {userName && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <span style={{color: '#333', fontSize: '1rem', fontWeight: '600'}}>
            Olá, {userName}
          </span>
          <button 
            onClick={onLogout}
            style={{
              background: '#dc3545',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '25px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Sair
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;