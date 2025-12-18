import React, { useState } from 'react';
import styles from './CreateDiscipline.module.css';

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
    <form onSubmit={handleSubmit} className={styles.container}>
      <h3 className={styles.title}>Adicionar Nova Disciplina</h3>
      <div className={styles.form}>
        <input
          type="text"
          placeholder="Nome da disciplina"
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
        <select
          value={formData.curso}
          onChange={(e) => setFormData({...formData, curso: e.target.value})}
          className={styles.selectCourse}
          required
        >
          <option value="">Selecione o curso</option>
          {cursos.map(curso => (
            <option key={curso.id} value={curso.nome}>{curso.nome}</option>
          ))}
        </select>
        <button type="submit" className={styles.btnAdd}>Adicionar</button>
      </div>
    </form>
  );
};

export default CreateDiscipline;