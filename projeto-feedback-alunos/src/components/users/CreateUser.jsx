import React, { useState, useEffect } from 'react';
import { useValidation } from '../../hooks/useValidation';
import useCursos from "../../services/cursos";

const CreateUser = ({ onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    nome: '',
    matricula: '',
    senha: '',
    confirmPassword: '',
    perfil: 'ROLE_ALUNO',
    curso: '',
    especialidade: ''
  });

  const [errors, setErrors] = useState({});
  const { validatePassword, validateMatricula, validateNome } = useValidation();

  const { listarCursos } = useCursos();
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const cursosRes = await listarCursos();
        setCursos(cursosRes || []);
      } catch (err) {
        console.error("Erro ao carregar cursos:", err);
      }
    }
    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!validateNome(formData.nome)) newErrors.nome = 'Digite nome e sobrenome';
    if (!validateMatricula(formData.matricula)) newErrors.matricula = 'Matrícula deve ter 12 dígitos';
    if (!validatePassword(formData.senha)) newErrors.senha = 'Senha deve ter 6+ caracteres, maiúscula, minúscula, número e especial';
    if (formData.senha !== formData.confirmPassword) newErrors.confirmPassword = 'As senhas não coincidem';
    if ((formData.perfil === 'ROLE_ALUNO' || formData.perfil === 'ROLE_PROFESSOR') && !formData.curso) {
      newErrors.curso = 'Curso é obrigatório';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const payload = {
        nome: formData.nome,
        matricula: formData.matricula,
        senha: formData.senha,
        perfil: formData.perfil,
        curso: formData.perfil !== 'ROLE_ADMIN' ? formData.curso : undefined,
        especialidade: formData.perfil === 'ROLE_PROFESSOR' ? formData.especialidade : undefined
      };
      onSave && onSave(payload);
    }
  };

  return (
      <div style={{background: 'rgba(255,255,255,0.95)', padding: '2rem', borderRadius: '15px', marginBottom: '2rem'}}>
        <h2 style={{color: '#00a859', marginBottom: '1.5rem', textAlign: 'center'}}>Criar Usuário</h2>

        <form onSubmit={handleSubmit} className="login-form">
          {/* Nome */}
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

          {/* Matrícula */}
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

          {/* Senha */}
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

          {/* Confirmar Senha */}
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

          {/* Perfil */}
          <div className="form-group">
            <label>Perfil:</label>
            <select
                value={formData.perfil}
                onChange={(e) => setFormData({ ...formData, perfil: e.target.value })}
            >
              <option value="ROLE_ALUNO">Aluno</option>
              <option value="ROLE_PROFESSOR">Professor</option>
              <option value="ROLE_ADMIN">Administrador</option>
            </select>
          </div>

          {/* Curso */}
          {(formData.perfil === 'ROLE_ALUNO' || formData.perfil === 'ROLE_PROFESSOR') && (
              <div className={`form-group ${errors.curso ? 'error' : ''}`}>
                <label>Curso:</label>
                <select
                    value={formData.curso}
                    onChange={(e) => setFormData({ ...formData, curso: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      padding: '.7rem',
                      borderRadius: '10px',
                      border: '1px solid #ccc',
                      backgroundColor: '#f8f9fa'
                    }}
                >
                  <option value="">Selecione um curso</option>
                  {cursos.map(curso => (
                      <option key={curso.idCurso} value={curso.idCurso}>
                        {curso.nome}
                      </option>
                  ))}
                </select>
                {errors.curso && <div className="error-message">{errors.curso}</div>}
              </div>
          )}

          {/* Especialidade */}
          {formData.perfil === 'ROLE_PROFESSOR' && (
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