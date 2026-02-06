import React, { useState, useEffect } from "react";
import Header from "../../components/layout/Header";
import UserManager from "../../components/UserManager";
import CourseManager from "../../components/CourseManager";
import DisciplineManager from "../../components/DisciplineManager";
import { confirmDelete } from "../../utils/helpers";

import useUsuarios from "../../services/Usuarios";
import useCursos from "../../services/Cursos";
import useDisciplinas from "../../services/Disciplinas";

import AvaliacaoDisciplinaAPI from "../../services/AvaliaoesDisciplina";
import AvaliacaoProfessorAPI from "../../services/AvaliacoesProfessor";

export default function AdminPage({ userData, onLogout }) {
  const [usuarios, setUsuarios] = useState([]);
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [disciplinas, setDisciplinas] = useState([]);

  const [activeTab, setActiveTab] = useState("usuarios");
  const [searchMatricula, setSearchMatricula] = useState("");

  const [showCreateUser, setShowCreateUser] = useState(false);
  const [showEditUser, setShowEditUser] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const { listarUsuarios, criarUsuario, atualizarUsuario, excluirUsuario } =
      useUsuarios();

  const { listarCursos, criarCurso, excluirCurso, atualizarCurso } =
      useCursos();

  const {
    listarDisciplinas,
    criarDisciplina,
    excluirDisciplina,
    atualizarDisciplina,
  } = useDisciplinas();

  // -------------------- LOAD DADOS --------------------
  useEffect(() => {
    async function fetchData() {
      try {
        const usuariosRes = await listarUsuarios();
        setUsuarios(usuariosRes || []);

        const cursosRes = await listarCursos();
        setCursos(cursosRes || []);

        const disciplinasRes = await listarDisciplinas();
        setDisciplinas(disciplinasRes || []);
      } catch (err) {
        console.error(err);
        alert("Erro ao carregar dados do backend");
      }
    }
    fetchData();
  }, []);

  // -------------------- LOAD AVALIAÇÕES --------------------
  useEffect(() => {
    async function fetchAvaliacoes() {
      try {
        const [disciplinasRes, professoresRes] = await Promise.all([
          AvaliacaoDisciplinaAPI.listarAvaliacoes(),
          AvaliacaoProfessorAPI.listarAvaliacoes(),
        ]);

        const disciplinas = (disciplinasRes?.data || []).map((a) => ({
          ...a,
          tipoAvaliacao: "disciplina",
        }));

        const professores = (professoresRes?.data || []).map((a) => ({
          ...a,
          tipoAvaliacao: "professor",
        }));

        setAvaliacoes([...disciplinas, ...professores]);
      } catch (err) {
        console.error(err);
        alert("Erro ao carregar avaliações");
      }
    }

    fetchAvaliacoes();
  }, []);

  // -------------------- USUÁRIOS --------------------
  const handleCreateUser = async (data) => {
    const res = await criarUsuario(data);
    setUsuarios((prev) => [...prev, res]);
    setShowCreateUser(false);
  };

  const handleUpdateUser = async (data) => {
    const res = await atualizarUsuario(editingUser.idUsuario, data);
    setUsuarios((prev) =>
        prev.map((u) =>
            u.idUsuario === editingUser.idUsuario ? res : u
        )
    );
    setEditingUser(null);
    setShowEditUser(false);
  };

  const handleDeleteUser = async (id) => {
    if (!confirmDelete("Deseja excluir este usuário?")) return;
    await excluirUsuario(id);
    setUsuarios((prev) =>
        prev.filter((u) => u.idUsuario !== id)
    );
  };

  // -------------------- CURSOS --------------------
  const handleAddCurso = async (data) => {
    const res = await criarCurso(data);
    setCursos((prev) => [...prev, res]);
  };

  const handleUpdateCurso = async (id, data) => {
    const res = await atualizarCurso(id, data);
    setCursos((prev) =>
        prev.map((c) => (c.idCurso === id ? res : c))
    );
  };

  const handleDeleteCurso = async (id) => {
    if (!confirmDelete("Deseja excluir este curso?")) return;
    await excluirCurso(id);
    setCursos((prev) =>
        prev.filter((c) => c.idCurso !== id)
    );
  };

  // -------------------- DISCIPLINAS --------------------
  const handleAddDisciplina = async (data) => {
    const res = await criarDisciplina(data);
    setDisciplinas((prev) => [...prev, res]);
  };

  const handleUpdateDisciplina = async (id, data) => {
    const res = await atualizarDisciplina(id, data);
    setDisciplinas((prev) =>
        prev.map((d) =>
            d.idDisciplina === id ? res : d
        )
    );
  };

  const handleDeleteDisciplina = async (id) => {
    if (!confirmDelete("Deseja excluir esta disciplina?")) return;
    await excluirDisciplina(id);
    setDisciplinas((prev) =>
        prev.filter((d) => d.idDisciplina !== id)
    );
  };

  // -------------------- AVALIAÇÕES --------------------
  const handleDeleteAvaliacao = async (id, tipo) => {
    if (!confirmDelete("Deseja excluir esta avaliação?")) return;

    if (tipo === "disciplina") {
      await AvaliacaoDisciplinaAPI.excluirAvaliacao(id);
    } else {
      await AvaliacaoProfessorAPI.excluirAvaliacao(id);
    }

    setAvaliacoes((prev) =>
        prev.filter((a) => a.id !== id)
    );
  };

  // -------------------- RENDER --------------------
  return (
      <div className="home-container">
        <div
            className="home-content"
            style={{ maxWidth: "1400px", margin: "3rem auto", padding: "3rem" }}
        >
          <Header
              title="Painel Administrativo"
              userName={userData?.nome || userData?.matricula || "Usuário"}
              onLogout={onLogout}
          />

          {/* ABAS */}
          <div
              style={{
                display: "flex",
                gap: "0.5rem",
                marginBottom: "3rem",
                padding: "1rem",
                background: "rgba(0,168,89,0.1)",
                borderRadius: "15px",
              }}
          >
            {["usuarios", "avaliacoes", "cursos", "disciplinas"].map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    style={{
                      background: activeTab === tab ? "#00a859" : "transparent",
                      color: activeTab === tab ? "white" : "#00a859",
                      border: "2px solid #00a859",
                      padding: "8px 16px",
                      borderRadius: "20px",
                      cursor: "pointer",
                      fontWeight: "600",
                      textTransform: "capitalize",
                    }}
                >
                  {tab}
                </button>
            ))}
          </div>

          {/* CONTEÚDO */}
          {activeTab === "usuarios" && (
              <UserManager
                  usuarios={usuarios}
                  searchValue={searchMatricula}
                  onSearchChange={setSearchMatricula}
                  showCreateUser={showCreateUser}
                  showEditUser={showEditUser}
                  editingUser={editingUser}
                  onCreateClick={() => setShowCreateUser(true)}
                  onCreateUser={handleCreateUser}
                  onUpdateUser={handleUpdateUser}
                  onEditUser={(u) => {
                    setEditingUser(u);
                    setShowEditUser(true);
                  }}
                  onDeleteUser={handleDeleteUser}
                  onCancelCreate={() => setShowCreateUser(false)}
                  onCancelEdit={() => {
                    setShowEditUser(false);
                    setEditingUser(null);
                  }}
              />
          )}

          {activeTab === "avaliacoes" && (
              <div className="avaliacoes-admin">
                {avaliacoes.length === 0 && (
                    <p>Nenhuma avaliação encontrada.</p>
                )}

                {avaliacoes.map((a) => (
                    <div
                        key={`${a.tipoAvaliacao}-${a.id}`}
                        className="avaliacao-card"
                        style={{
                          background: "#fff",
                          padding: "1.5rem",
                          borderRadius: "12px",
                          marginBottom: "1.5rem",
                          boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                        }}
                    >
                      <h4>
                        {a.professorNome && (
                            <>
                              Professor avaliado:{" "}
                              <strong>{a.professorNome}</strong>
                            </>
                        )}
                        {a.disciplinaNome && (
                            <>
                              Disciplina avaliada:{" "}
                              <strong>{a.disciplinaNome}</strong>
                            </>
                        )}
                      </h4>

                      <p style={{ fontStyle: "italic" }}>
                        {a.anonima
                            ? "Avaliação anônima"
                            : `Avaliado por: ${a.usuarioNome}`}
                      </p>

                      <p>
                        <strong>Nota:</strong> {a.nota}/5
                      </p>

                      <p>{a.comentario}</p>

                      <button
                          className="btn btn-danger"
                          onClick={() =>
                              handleDeleteAvaliacao(a.id, a.tipoAvaliacao)
                          }
                      >
                        Excluir
                      </button>
                    </div>
                ))}
              </div>
          )}

          {activeTab === "cursos" && (
              <CourseManager
                  cursos={cursos}
                  onAddCurso={handleAddCurso}
                  onDeleteCurso={handleDeleteCurso}
                  onUpdateCurso={handleUpdateCurso}
              />
          )}

          {activeTab === "disciplinas" && (
              <DisciplineManager
                  disciplinas={disciplinas}
                  cursos={cursos}
                  onAddDisciplina={handleAddDisciplina}
                  onUpdateDisciplina={handleUpdateDisciplina}
                  onDeleteDisciplina={handleDeleteDisciplina}
              />
          )}
        </div>
      </div>
  );
}