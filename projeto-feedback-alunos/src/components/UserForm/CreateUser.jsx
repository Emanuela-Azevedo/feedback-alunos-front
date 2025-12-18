import React, { useState } from 'react';
import { useValidation } from '../../hooks/useValidation';
import styles from './CreateUser.module.css';

const CreateUser = ({ onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    nome: '',
    matricula: '',
    senha: '',
    confirmPassword: '',
    tipo: 'aluno',
    curso: '',
    especialidade: ''
  });

  const [errors, setErrors] = useState({});
  const { validatePassword, validateMatricula, validateNome } = useValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!validateNome(formData.nome)) newErrors.nome = 'Digite nome e sobrenome';
    if (!validateMatricula(formData.matricula)) newErrors.matricula = 'Matrícula deve ter 12 dígitos';
    if (!validatePassword(formData.senha)) newErrors.senha = 'Senha deve ter 6+ caracteres, maiúscula, minúscula, número e especial';
    if (formData.senha !== formData.confirmPassword) newErrors.confirmPassword = 'As senhas não coincidem';
    if (formData.tipo === 'aluno' && !formData.curso) newErrors.curso = 'Curso é obrigatório para alunos';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSave && onSave(formData);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Criar Usuário</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={`${styles.formGroup} ${errors.nome ? styles.error : ''}`}>
          <label>Nome Completo:</label>
          <input
            type="text"
            value={formData.nome}
            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
            placeholder="Digite nome e sobrenome"
            required
          />
          {errors.nome && <div className={styles.errorMessage}>{errors.nome}</div>}
        </div>

        <div className={`form-group ${errors.matricula ? 'error' : ''}`}>
          <label>Matrícula:</label>
          <input
            type="text"
            value={formData.matricula}
            onChange={(e) => setFormData({ ...formData, matricula: e.target.value.replace(/\D/g, '') })}
            placeholder="202315020035"
            maxLength="12"
            required
          />
          {errors.matricula && <div className="error-message">{errors.matricula}</div>}
        </div>

        <div className={`form-group ${errors.senha ? 'error' : ''}`}>
          <label>Senha:</label>
          <input
            type="password"
            value={formData.senha}
            onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
            placeholder="Digite a senha"
            required
          />
          {errors.senha && <div className="error-message">{errors.senha}</div>}
        </div>

        <div className={`form-group ${errors.confirmPassword ? 'error' : ''}`}>
          <label>Confirmar Senha:</label>
          <input
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            placeholder="Confirme a senha"
            required
          />
          {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
        </div>

        <div className="form-group">
          <label>Tipo:</label>
          <select
            value={formData.tipo}
            onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
          >
            <option value="aluno">Aluno</option>
            <option value="professor">Professor</option>
            <option value="admin">Administrador</option>
          </select>
        </div>

        {formData.tipo === 'aluno' && (
          <div className={`form-group ${errors.curso ? 'error' : ''}`}>
            <label>Curso:</label>
            <input
              type="text"
              value={formData.curso}
              onChange={(e) => setFormData({ ...formData, curso: e.target.value })}
              placeholder="Digite o curso"
              required
            />
            {errors.curso && <div className="error-message">{errors.curso}</div>}
          </div>
        )}

        {formData.tipo === 'professor' && (
          <div className="form-group">
            <label>Especialidade:</label>
            <input
              type="text"
              value={formData.especialidade}
              onChange={(e) => setFormData({ ...formData, especialidade: e.target.value })}
              placeholder="Digite a especialidade"
            />
          </div>
        )}

        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="submit" className="btn btn-primary">Criar Usuário</button>
          <button type="button" onClick={onCancel} className="btn btn-secondary">Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;