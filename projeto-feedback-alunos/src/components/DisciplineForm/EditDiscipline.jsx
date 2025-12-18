import React, { useState, useEffect } from 'react';
import styles from './EditDiscipline.module.css';

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
    <div className={styles.container}>
      <h2 className={styles.title}>Editar Disciplina</h2>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label>Nome da Disciplina:</label>
          <input
            type="text"
            value={formData.nome}
            onChange={(e) => setFormData({...formData, nome: e.target.value})}
            placeholder="Nome da disciplina"
            required
          />
        </div>
        
        <div className={styles.formGroup}>
          <label>Código:</label>
          <input
            type="text"
            value={formData.codigo}
            onChange={(e) => setFormData({...formData, codigo: e.target.value})}
            placeholder="Código"
            required
          />
        </div>
        
        <div className={styles.formGroup}>
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
        
        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.btnPrimary}>Atualizar Disciplina</button>
          <button type="button" onClick={onCancel} className={styles.btnSecondary}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default EditDiscipline;