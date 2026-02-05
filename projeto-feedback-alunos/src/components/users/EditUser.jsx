import React, { useState, useEffect } from 'react';
import { useValidation } from '../../hooks/useValidation';
import useCursos from "../../services/cursos";

const EditUser = ({ user, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    nome: '',
    matricula: '',
    curso: '',
    senha: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const { validateNome, validatePassword } = useValidation();

  const { listarCursos } = useCursos();
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    if (user) {
      const updateForm = () => {
        setFormData({
          nome: user.nome || '',
          matricula: user.matricula || '',
          curso: user.curso || '',
          senha: '',
          confirmPassword: ''
        });
      };
      updateForm();
    }
  }, [user]);

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

    if (formData.nome && !validateNome(formData.nome)) {
      newErrors.nome = 'Digite nome e sobrenome';
    }
    if (formData.senha && !validatePassword(formData.senha)) {
      newErrors.senha = 'Senha deve ter 6+ caracteres, maiúscula, minúscula, número e especial';
    }
    if (formData.senha && formData.senha !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const payload = {
        nome: formData.nome || undefined,
        matricula: formData.matricula, // não editável, mas enviado
        curso: formData.curso || undefined,
        senha: formData.senha || undefined // só envia se foi alterada
      };

      onSave && onSave(payload);
    }
  };

  return (
      <div style={{background: 'rgba(255,255,255,0.95)', padding: '2rem', borderRadius: '15px', marginBottom: '2rem'}}>
        <h2 style={{color: '#00a859', marginBottom: '1.5rem', textAlign: 'center'}}>Editar Usuário</h2>

        <form onSubmit={handleSubmit} className="login-form">
          {/* Nome */}
          <div className={`form-group ${errors.nome ? 'error' : ''}`}>
            <label>Nome Completo:</label>
            <input
                type="text"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                placeholder="Digite nome e sobrenome"
            />
            {errors.nome && <div className="error-message">{errors.nome}</div>}
          </div>

          {/* Matrícula (não editável) */}
          <div className="form-group">
            <label>Matrícula:</label>
            <input
                type="text"
                value={formData.matricula}
                readOnly
                style={{ backgroundColor: '#e9ecef' }}
            />
          </div>

          {/* Curso */}
          <div className="form-group">
            <label>Curso:</label>
            <select
                value={formData.curso}
                onChange={(e) => setFormData({ ...formData, curso: e.target.value })}
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
          </div>

          {/* Senha (opcional) */}
          <div className={`form-group ${errors.senha ? 'error' : ''}`}>
            <label>Nova Senha (opcional):</label>
            <input
                type="password"
                value={formData.senha}
                onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
                placeholder="Digite a nova senha"
            />
            {errors.senha && <div className="error-message">{errors.senha}</div>}
          </div>

          {/* Confirmar Senha */}
          <div className={`form-group ${errors.confirmPassword ? 'error' : ''}`}>
            <label>Confirmar Nova Senha:</label>
            <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                placeholder="Confirme a nova senha"
            />
            {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit" className="btn btn-primary">Atualizar Usuário</button>
            <button type="button" onClick={onCancel} className="btn btn-secondary">Cancelar</button>
          </div>
        </form>
      </div>
  );
};

export default EditUser;