import React, { useState } from 'react';
import styles from './CreateCourse.module.css';

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
    <form onSubmit={handleSubmit} className={styles.container}>
      <h3 className={styles.title}>Adicionar Novo Curso</h3>
      <div className={styles.form}>
        <input
          type="text"
          placeholder="Nome do curso"
          value={formData.nome}
          onChange={(e) => setFormData({...formData, nome: e.target.value})}
          className={styles.inputName}
          required
        />
        <input
          type="text"
          placeholder="Código"
          value={formData.codigo}
          onChange={(e) => setFormData({...formData, codigo: e.target.value})}
          className={styles.inputCode}
          required
        />
        <button type="submit" className={styles.btnAdd}>Adicionar</button>
      </div>
    </form>
  );
};

export default CreateCourse;