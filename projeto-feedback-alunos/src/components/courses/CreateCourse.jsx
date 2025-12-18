import React, { useState } from 'react';

const CreateCourse = ({ onSave }) => {
  const [formData, setFormData] = useState({ nome: '', codigo: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.nome && formData.codigo) {
      onSave(formData);
      setFormData({ nome: '', codigo: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{marginBottom: '20px', padding: '20px', background: 'rgba(255,255,255,0.95)', borderRadius: '15px'}}>
      <h3 style={{color: '#00a859', marginBottom: '15px'}}>Adicionar Novo Curso</h3>
      <div style={{display: 'flex', gap: '10px', marginBottom: '10px'}}>
        <input
          type="text"
          placeholder="Nome do curso"
          value={formData.nome}
          onChange={(e) => setFormData({...formData, nome: e.target.value})}
          style={{width: '250px', padding: '.5rem', borderRadius: '10px', border: '1px solid #ccc', backgroundColor: '#f8f9fa'}}
          required
        />
        <input
          type="text"
          placeholder="Código"
          value={formData.codigo}
          onChange={(e) => setFormData({...formData, codigo: e.target.value})}
          style={{width: '100px', padding: '.5rem', borderRadius: '10px', border: '1px solid #ccc', backgroundColor: '#f8f9fa'}}
          required
        />
        <button type="submit" className="btn btn-primary">Adicionar</button>
      </div>
    </form>
  );
};

export default CreateCourse;