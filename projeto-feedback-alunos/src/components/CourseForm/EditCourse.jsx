import React, { useState, useEffect } from 'react';
import styles from './EditCourse.module.css';

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
    <div className={styles.container}>
      <h2 className={styles.title}>Editar Curso</h2>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label>Nome do Curso:</label>
          <input
            type="text"
            value={formData.nome}
            onChange={(e) => setFormData({...formData, nome: e.target.value})}
            placeholder="Nome do curso"
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
        
        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.btnPrimary}>Atualizar Curso</button>
          <button type="button" onClick={onCancel} className={styles.btnSecondary}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default EditCourse;