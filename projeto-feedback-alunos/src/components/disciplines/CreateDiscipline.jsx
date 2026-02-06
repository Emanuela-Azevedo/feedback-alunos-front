import React, { useState, useEffect } from "react";
import useCursos from "../../services/cursos";
import useUsuarios from "../../services/usuarios";

const CreateDiscipline = ({ onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    nome: "",
    cursoId: "",
    professorId: ""
  });
  const [cursos, setCursos] = useState([]);
  const [professores, setProfessores] = useState([]);

  const { listarCursos } = useCursos();
  const { listarProfessoresPorCurso } = useUsuarios();

  // 🔹 Carregar cursos ao montar
  useEffect(() => {
    listarCursos()
        .then((data) => {
          console.log("Cursos recebidos:", data);
          setCursos(data);
        })
        .catch((err) => console.error("Erro ao carregar cursos:", err));
  }, []);

  // 🔹 Carregar professores quando cursoId muda
  useEffect(() => {
    if (!formData.cursoId) {
      console.log("Nenhum curso selecionado ainda");
      setProfessores([]);
      return;
    }
    console.log("Curso selecionado:", formData.cursoId);
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
      nome: formData.nome,
      cursoId: Number(formData.cursoId),
      professorId: Number(formData.professorId)
    };
    console.log("Payload enviado ao backend:", payload);
    onSave(payload);
  };

  return (
      <div style={{ background: "rgba(255,255,255,0.95)", padding: "2rem", borderRadius: "15px", marginBottom: "2rem" }}>
        <h2 style={{ color: "#00a859", marginBottom: "1.5rem", textAlign: "center" }}>
          Criar Disciplina
        </h2>

        <form onSubmit={handleSubmit} className="login-form">
          {/* Nome */}
          <div className="form-group" style={{ marginBottom: "1rem" }}>
            <label>Nome da Disciplina:</label>
            <input
                type="text"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                placeholder="Nome da disciplina"
                required
            />
          </div>

          {/* Curso */}
          <div className="form-group" style={{ marginBottom: "1rem" }}>
            <label>Curso:</label>
            <select
                value={formData.cursoId}
                onChange={(e) => setFormData({ ...formData, cursoId: Number(e.target.value) })}
                required
            >
              <option value="">Selecione o curso</option>
              {cursos.map((curso) => (
                  <option key={curso.idCurso} value={curso.idCurso}>
                    {curso.nome}
                  </option>
              ))}
            </select>
          </div>

          {/* Professor */}
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
            <button type="submit" className="btn btn-primary">Salvar</button>
            <button type="button" onClick={onCancel} className="btn btn-secondary">Cancelar</button>
          </div>
        </form>
      </div>
  );
};

export default CreateDiscipline;