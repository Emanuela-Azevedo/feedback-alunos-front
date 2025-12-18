import React, { useState, useEffect } from 'react';

const EditDiscipline = ({ disciplina, cursos, onSave, onCancel }) => {
  const [formData, setFormData] = useState({ nome: '', codigo: '', curso: '' });

  useEffect(() => {
    if (disciplina) {
      setFormData({
        nome: disciplina.nome || '',
        codigo: disciplina.codigo || '',
        curso: disciplina.curso || ''
      });
    }
  }, [disciplina]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.nome && formData.codigo && formData.curso) {
      onSave(formData);
    }
  };

  return (
    <div style={{background: 'rgba(255,255,255,0.95)', padding: '2rem', borderRadius: '15px', marginBottom: '2rem'}}>
      <h2 style={{color: '#00a859', marginBottom: '1.5rem', textAlign: 'center'}}>Editar Disciplina</h2>
      
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label>Nome da Disciplina:</label>
          <input
            type="text"
            value={formData.nome}
            onChange={(e) => setFormData({...formData, nome: e.target.value})}
            placeholder="Nome da disciplina"
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
        
        <div className="form-group">
          <label>Curso:</label>
          <select
            value={formData.curso}
            onChange={(e) => setFormData({...formData, curso: e.target.value})}
            required
          >
            <option value="">Selecione o curso</option>
            {cursos.map(curso => (
              <option key={curso.id} value={curso.nome}>{curso.nome}</option>
            ))}
          </select>
        </div>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="submit" className="btn btn-primary">Atualizar Disciplina</button>
          <button type="button" onClick={onCancel} className="btn btn-secondary">Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default EditDiscipline;