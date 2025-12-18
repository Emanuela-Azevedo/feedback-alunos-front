import React, { useState } from 'react';

const CreateDiscipline = ({ cursos, onSave }) => {
  const [formData, setFormData] = useState({ nome: '', codigo: '', curso: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.nome && formData.codigo && formData.curso) {
      onSave(formData);
      setFormData({ nome: '', codigo: '', curso: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{marginBottom: '20px', padding: '20px', background: 'rgba(255,255,255,0.95)', borderRadius: '15px'}}>
      <h3 style={{color: '#00a859', marginBottom: '15px'}}>Adicionar Nova Disciplina</h3>
      <div style={{display: 'flex', gap: '10px', marginBottom: '10px'}}>
        <input
          type="text"
          placeholder="Nome da disciplina"
          value={formData.nome}
          onChange={(e) => setFormData({...formData, nome: e.target.value})}
          style={{width: '200px', padding: '.5rem', borderRadius: '10px', border: '1px solid #ccc', backgroundColor: '#f8f9fa'}}
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
        <select
          value={formData.curso}
          onChange={(e) => setFormData({...formData, curso: e.target.value})}
          style={{width: '180px', padding: '.5rem', borderRadius: '10px', border: '1px solid #ccc', backgroundColor: '#f8f9fa', color: '#333'}}
          required
        >
          <option value="">Selecione o curso</option>
          {cursos.map(curso => (
            <option key={curso.id} value={curso.nome}>{curso.nome}</option>
          ))}
        </select>
        <button type="submit" className="btn btn-primary">Adicionar</button>
      </div>
    </form>
  );
};

export default CreateDiscipline;