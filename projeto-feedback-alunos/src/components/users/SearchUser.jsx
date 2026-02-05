import React from 'react';

const SearchUser = ({ searchValue, onSearchChange, onCreateClick }) => {
    return (
        <div style={{display: 'flex', gap: '10px', marginBottom: '20px', alignItems: 'center'}}>
            <input
                type="text"
                aria-label="Buscar usuário por matrícula"
                placeholder="Buscar por matrícula..."
                value={searchValue}
                onChange={(e) => onSearchChange(e.target.value)}
                style={{
                    width: '300px',
                    padding: '.7rem',
                    borderRadius: '10px',
                    border: '1px solid #ccc',
                    backgroundColor: '#f8f9fa'
                }}
            />
            <button
                type="button"
                onClick={onCreateClick}
                className="btn btn-primary"
            >
                Criar Usuário
            </button>
        </div>
    );
};

export default SearchUser;