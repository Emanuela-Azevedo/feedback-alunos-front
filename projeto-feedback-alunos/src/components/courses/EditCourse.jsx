import React, { useState, useEffect } from 'react';

const EditCourse = ({ curso, onSave, onCancel }) => {
  const [formData, setFormData] = useState({ nome: '', codigo: '' });

  useEffect(() => {
    if (curso) {
      setFormData({
        nome: curso.nome || '',
        codigo: curso.codigo || ''
      });
    }
  }, [curso]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.nome && formData.codigo) {
      onSave(formData);
    }
  };

  return (
    <div style={{background: 'rgba(255,255,255,0.95)', padding: '2rem', borderRadius: '15px', marginBottom: '2rem'}}>
      <h2 style={{color: '#00a859', marginBottom: '1.5rem', textAlign: 'center'}}>Editar Curso</h2>
      
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label>Nome do Curso:</label>
          <input
            type="text"
            value={formData.nome}
            onChange={(e) => setFormData({...formData, nome: e.target.value})}
            placeholder="Nome do curso"
            required
          />
        </div>
        
        <div className="form-group">
          <label>Código:</label>
          <input
            type="text"
            value={formData.codigo}
            onChange={(e) => setFormData({...formData, codigo: e.target.value})}
            placeholder="Código"
            required
          />
        </div>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="submit" className="btn btn-primary">Atualizar Curso</button>
          <button type="button" onClick={onCancel} className="btn btn-secondary">Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default EditCourse;