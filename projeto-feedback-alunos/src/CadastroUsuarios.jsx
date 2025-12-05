import React, { useState, useEffect } from 'react';

const CadastroUsuarios = ({ initialUser = null, onSave, onCancel }) => {
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

  // Se receber um usuário para edição, preencher o formulário
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

  const validatePassword = (password) => {
    const hasLength = password.length >= 6;
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[@#$%^&*!]/.test(password);
    return hasLength && hasLower && hasUpper && hasNumber && hasSpecial;
  };

  const validateMatricula = (matricula) => /^\d{12}$/.test(matricula);
  const validateNome = (nome) => nome.trim().split(' ').length >= 2;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!validateNome(formData.nome)) newErrors.nome = 'Digite nome e sobrenome';
    if (!validateMatricula(formData.matricula)) newErrors.matricula = 'Matrícula deve ter 12 dígitos';
    if (formData.senha && !validatePassword(formData.senha)) newErrors.senha = 'Senha deve ter 6+ caracteres, maiúscula, minúscula, número e especial';
    if (formData.senha && formData.senha !== formData.confirmPassword) newErrors.confirmPassword = 'As senhas não coincidem';
    if (formData.tipo === 'aluno' && !formData.curso) newErrors.curso = 'Curso é obrigatório para alunos';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSave && onSave(formData);
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
  };

  return (
    <div className="create-user-form">
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
          <label>Senha{initialUser ? ' (deixe em branco para manter atual)' : ''}:</label>
          <input
            type="password"
            value={formData.senha}
            onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
            placeholder={initialUser ? 'Nova senha (opcional)' : 'Digite a senha'}
            required={!initialUser}
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
            <select
              value={formData.curso}
              onChange={(e) => setFormData({ ...formData, curso: e.target.value })}
              required
            >
              <option value="">Selecione um curso</option>
              <option value="Engenharia Civil">Engenharia Civil</option>
              <option value="Análise e Desenvolvimento de Sistemas">Análise e Desenvolvimento de Sistemas</option>
            </select>
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
          <button type="submit" className="login-button" style={{ flex: 1 }}>
            {initialUser ? 'Atualizar' : 'Criar'} Usuário
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="cadastro-button"
              style={{ flex: 1 }}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CadastroUsuarios;
