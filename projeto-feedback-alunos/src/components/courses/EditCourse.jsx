import React, { useState, useLayoutEffect } from 'react';

const EditCourse = ({ curso, onUpdate, onCancel }) => {
    const [formData, setFormData] = useState({ nome: '' });

    // 🔹 Atualiza formData sempre que a prop curso mudar
    useLayoutEffect(() => {
        if (curso) {
            setFormData({ nome: curso.nome });
        }
    }, [curso]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.nome.trim()) {
            onUpdate({ ...curso, nome: formData.nome });
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            style={{
                marginBottom: '20px',
                padding: '20px',
                background: 'rgba(255,255,255,0.95)',
                borderRadius: '15px'
            }}
        >
            <h3 style={{ color: '#00a859', marginBottom: '15px' }}>Editar Curso</h3>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                <input
                    type="text"
                    placeholder="Nome do curso"
                    value={formData.nome}
                    onChange={(e) => setFormData({ nome: e.target.value })}
                    style={{
                        width: '250px',
                        padding: '.5rem',
                        borderRadius: '10px',
                        border: '1px solid #ccc',
                        backgroundColor: '#f8f9fa'
                    }}
                    required
                />
                <button type="submit" className="btn btn-primary">Salvar</button>
                <button type="button" onClick={onCancel} className="btn btn-secondary">Cancelar</button>
            </div>
        </form>
    );
};

export default EditCourse;