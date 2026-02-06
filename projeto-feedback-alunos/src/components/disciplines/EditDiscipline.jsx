import React, { useState, useLayoutEffect, useEffect } from "react";
import useUsuarios from "../../services/usuarios";
import useCursos from "../../services/cursos";

const EditDiscipline = ({ disciplina, cursos = [], onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    nome: "",
    cursoId: "",
    professorId: ""
  });
  const [professores, setProfessores] = useState([]);

  const { listarProfessoresPorCurso } = useUsuarios();
  const { listarCursos } = useCursos();

  // 🔹 Inicializa formData quando disciplina muda
  useLayoutEffect(() => {
    if (disciplina) {
      setFormData({
        nome: disciplina.nome || "",
        cursoId: Number(disciplina.cursoId) || "",
        professorId: Number(disciplina.professorId) || ""
      });
    }
  }, [disciplina]);

  // 🔹 Carregar professores quando cursoId muda
  useEffect(() => {
    if (!formData.cursoId) {
      setProfessores([]);
      return;
    }
    listarProfessoresPorCurso(formData.cursoId)
        .then((data) => {
          console.log("Professores recebidos do backend:", data);
          setProfessores(data);
        })
        .catch((err) => console.error("Erro ao carregar professores:", err));
  }, [formData.cursoId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      idDisciplina: disciplina.idDisciplina,
      nome: formData.nome,
      cursoId: Number(formData.cursoId),
      professorId: Number(formData.professorId)
    };
    console.log("Payload enviado ao backend (edit):", payload);
    onSave(payload);
  };

  return (
      <div style={{ background: "rgba(255,255,255,0.95)", padding: "2rem", borderRadius: "15px", marginBottom: "2rem" }}>
        <h2 style={{ color: "#00a859", marginBottom: "1.5rem", textAlign: "center" }}>
          Editar Disciplina
        </h2>

        <form onSubmit={handleSubmit} className="login-form">
          {/* Nome da disciplina (não editável) */}
          <div className="form-group" style={{ marginBottom: "1rem" }}>
            <label>Nome da Disciplina:</label>
            <input type="text" value={formData.nome} disabled />
          </div>

          {/* Curso (não editável) */}
          <div className="form-group" style={{ marginBottom: "1rem" }}>
            <label>Curso:</label>
            <select value={formData.cursoId} disabled>
              {cursos.map((curso) => (
                  <option key={curso.idCurso} value={curso.idCurso}>
                    {curso.nome}
                  </option>
              ))}
            </select>
          </div>

          {/* Professores do curso */}
          <div className="form-group" style={{ marginBottom: "1.5rem" }}>
            <label>Professor Responsável:</label>
            <select
                value={formData.professorId}
                onChange={(e) => setFormData({ ...formData, professorId: Number(e.target.value) })}
                required
                disabled={professores.length === 0}
            >
              <option value="">Selecione o professor</option>
              {professores.map((prof) => (
                  <option key={prof.idUsuario} value={prof.idUsuario}>
                    {prof.nome}
                  </option>
              ))}
            </select>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <button type="submit" className="btn btn-primary">Atualizar</button>
            <button type="button" onClick={onCancel} className="btn btn-secondary">Cancelar</button>
          </div>
        </form>
      </div>
  );
};

export default EditDiscipline;