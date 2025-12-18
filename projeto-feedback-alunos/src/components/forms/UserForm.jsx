import React, { useState, useEffect } from 'react';
import Button from '../common/Button';
import { useValidation } from '../../hooks/useValidation';

const UserForm = ({ initialUser = null, onSave, onCancel, isEditing = false }) => {
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

  useEffect(() => {
    if (initialUser) {
      setFormData({
        nome: initialUser.nome || '',
        matricula: initialUser.matricula || '',
        senha: '',
        confirmPassword: '',
        tipo: initialUser.tipo || 'aluno',
        curso: initialUser.curso || '',
        especialidade: initialUser.especialidade || ''
      });
      setErrors({});
    }
  }, [initialUser]);

  const { validatePassword: baseValidatePassword, validateMatricula, validateNome } = useValidation();
  
  const validatePassword = (password) => {
    if (isEditing && !password) return true;
    return baseValidatePassword(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!validateNome(formData.nome)) newErrors.nome = 'Digite nome e sobrenome';
    if (!validateMatricula(formData.matricula)) newErrors.matricula = 'Matrícula deve ter 12 dígitos';
    if (formData.senha && !validatePassword(formData.senha))
      newErrors.senha = 'Senha deve ter 6+ caracteres, maiúscula, minúscula, número e especial';
    if (formData.senha && formData.senha !== formData.confirmPassword)
      newErrors.confirmPassword = 'As senhas não coincidem';
    if (formData.tipo === 'aluno' && !formData.curso)
      newErrors.curso = 'Curso é obrigatório para alunos';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSave && onSave(formData);
      if (!isEditing) {
        setFormData({
          nome: '',
          matricula: '',
          senha: '',
          confirmPassword: '',
          tipo: 'aluno',
          curso: '',
          especialidade: ''
        });
      }
    }
  };

  return (
    <div style={{background: 'rgba(255,255,255,0.95)', padding: '2rem', borderRadius: '15px', marginBottom: '2rem'}}>
      <h2 style={{color: '#00a859', marginBottom: '1.5rem', textAlign: 'center'}}>
        {isEditing ? 'Editar Usuário' : 'Criar Usuário'}
      </h2>

      <form onSubmit={handleSubmit} className="login-form">
        <div className={`form-group ${errors.nome ? 'error' : ''}`}>
          <label>Nome Completo:</label>
          <input
            type="text"
            value={formData.nome}
            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
            placeholder="Digite nome e sobrenome"
            required
          />
          {errors.nome && <div className="error-message">{errors.nome}</div>}
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
          <label>Senha{isEditing ? ' (deixe em branco para manter atual)' : ''}:</label>
          <input
            type="password"
            value={formData.senha}
            onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
            placeholder={isEditing ? 'Nova senha (opcional)' : 'Digite a senha'}
            required={!isEditing}
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
            required={!!formData.senha}
          />
          {errors.confirmPassword && (
            <div className="error-message">{errors.confirmPassword}</div>
          )}
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
              onChange={(e) =>
                setFormData({ ...formData, especialidade: e.target.value })
              }
              placeholder="Digite a especialidade"
            />
          </div>
        )}

        <div style={{ display: 'flex', gap: '10px' }}>
<<<<<<< HEAD:projeto-feedback-alunos/src/CadastroUsuarios.jsx
          <button type="submit" className="btn btn-primary">
            {initialUser ? 'Atualizar' : 'Criar'} Usuário
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="btn btn-secondary"
            >
=======
          <Button type="submit" variant="primary">
            {isEditing ? 'Atualizar' : 'Criar'} Usuário
          </Button>
          {onCancel && (
            <Button variant="secondary" onClick={onCancel}>
>>>>>>> dev:projeto-feedback-alunos/src/components/forms/UserForm.jsx
              Cancelar
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default UserForm;