import React, { useState, useEffect } from 'react';
import useCursos from "../../services/cursos";
import useUsuarios from "../../services/usuarios";

const CreateDiscipline = ({ onSave }) => {
  const [formData, setFormData] = useState({ nome: '', cursoId: '', professorId: '' });

  const { listarCursos } = useCursos();
  const { listarProfessoresPorCurso } = useUsuarios();
  const [cursos, setCursos] = useState([]);
  const [professores, setProfessores] = useState([]);

  useEffect(() => {
    async function fetchCursos() {
      const cursosRes = await listarCursos();
      setCursos(cursosRes || []);
    }
    fetchCursos();
  }, []);

  useEffect(() => {
    async function fetchProfessores() {
      if (formData.cursoId) {
        const profRes = await listarProfessoresPorCurso(formData.cursoId);
        setProfessores(profRes || []);
      } else {
        setProfessores([]);
      }
    }
    fetchProfessores();
  }, [formData.cursoId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.nome && formData.cursoId && formData.professorId) {
      onSave(formData);
      setFormData({ nome: '', cursoId: '', professorId: '' });
    }
  };

  return (
      <form onSubmit={handleSubmit} style={{marginBottom: '20px', padding: '20px', background: 'rgba(255,255,255,0.95)', borderRadius: '15px'}}>
        <h3 style={{color: '#00a859', marginBottom: '15px'}}>Adicionar Nova Disciplina</h3>
        <div style={{display: 'flex', gap: '10px', marginBottom: '10px'}}>
          <input
              type="text"
              placeholder="Nome da disciplina"
              value={formData.nome}
              onChange={(e) => setFormData({...formData, nome: e.target.value})}
              required
          />

          <select
              value={formData.cursoId}
              onChange={(e) => setFormData({...formData, cursoId: e.target.value})}
              required
          >
            <option value="">Selecione o curso</option>
            {cursos.map(curso => (
                <option key={curso.idCurso} value={curso.idCurso}>{curso.nome}</option>
            ))}
          </select>

          <select
              value={formData.professorId}
              onChange={(e) => setFormData({...formData, professorId: e.target.value})}
              required
              disabled={!formData.cursoId}
          >
            <option value="">Selecione o professor</option>
            {professores.map(prof => (
                <option key={prof.idUsuario} value={prof.idUsuario}>{prof.nome}</option>
            ))}
          </select>

          <button type="submit" className="btn btn-primary">Adicionar</button>
        </div>
      </form>
  );
};

export default CreateDiscipline;