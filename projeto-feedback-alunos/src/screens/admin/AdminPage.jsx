import React, { useState, useEffect } from "react";
import Header from '../../components/layout/Header';
import UserManager from '../../components/UserManager';
import CourseManager from '../../components/CourseManager';
import DisciplineManager from '../../components/DisciplineManager';
import { confirmDelete } from '../../utils/helpers';
import { filterUsersByMatricula } from '../../utils/filters';
import useUsuarios from "../../services/usuarios";
import useCursos from "../../services/cursos";
import useDisciplinas from "../../services/Disciplinas.js";

export default function AdminPage({ userData, onLogout }) {
  const [usuarios, setUsuarios] = useState([]);
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [disciplinas, setDisciplinas] = useState([]);

  const [activeTab, setActiveTab] = useState('usuarios');
  const [searchMatricula, setSearchMatricula] = useState('');

  const [showCreateUser, setShowCreateUser] = useState(false);
  const [showEditUser, setShowEditUser] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const { listarUsuarios, criarUsuario, atualizarUsuario, excluirUsuario } = useUsuarios();
  const { listarCursos, criarCurso, excluirCurso, atualizarCurso } = useCursos();
  const { listarDisciplinas, criarDisciplina, excluirDisciplina } = useDisciplinas();

  // --- Carregar dados do backend ---
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
        console.error("Erro ao carregar dados do backend:", err);
        alert("Não foi possível carregar os dados. Verifique o backend.");
      }
    }
    fetchData();
  }, []);

  // --- Filtro seguro de usuários ---
  const filteredUsuarios = filterUsersByMatricula(usuarios || [], searchMatricula);

  // --- Handlers Usuários ---
  const handleCreateUser = async (userData) => {
    try {
      const res = await criarUsuario(userData);
      setUsuarios(prev => [...prev, res].filter(Boolean));
      alert('Usuário criado com sucesso!');
      setShowCreateUser(false);
    } catch (err) {
      console.error(err);
      alert('Erro ao criar usuário');
    }
  };

  const handleUpdateUser = async (userData) => {
    try {
      const res = await atualizarUsuario(editingUser.idUsuario, userData);
      setUsuarios(prev => prev.map(u => u.idUsuario === editingUser.idUsuario ? res || u : u));
      alert('Usuário atualizado com sucesso!');
      setEditingUser(null);
      setShowEditUser(false);
    } catch (err) {
      console.error(err);
      alert('Erro ao atualizar usuário');
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setShowEditUser(true);
  };

  const handleDeleteUser = async (idUsuario) => {
    if (!confirmDelete('Tem certeza que deseja excluir este usuário?')) return;
    try {
      await excluirUsuario(idUsuario);
      setUsuarios(prev => prev.filter(u => u.idUsuario !== idUsuario));
    } catch (err) {
      console.error(err);
      alert('Erro ao excluir usuário');
    }
  };

  // --- Handlers Cursos ---
  const handleAddCurso = async (cursoData) => {
    try {
      const res = await criarCurso(cursoData);
      setCursos(prev => [...prev, res].filter(Boolean));
      alert('Curso adicionado com sucesso!');
    } catch (err) {
      console.error(err);
      alert(err.message || 'Erro ao adicionar curso');
    }
  };

  const handleUpdateCurso = async (idCurso, cursoData) => {
    try {
      const res = await atualizarCurso(idCurso, cursoData);
      setCursos(prev => prev.map(c => c.idCurso === idCurso ? res || c : c));
      alert('Curso atualizado com sucesso!');
    } catch (err) {
      console.error(err);
      alert(err.message || 'Erro ao atualizar curso');
    }
  };

  const handleDeleteCurso = async (idCurso) => {
    if (!confirmDelete('Tem certeza que deseja excluir este curso?')) return;
    try {
      await excluirCurso(idCurso);
      setCursos(prev => prev.filter(c => c.idCurso !== idCurso));
      alert('Curso excluído com sucesso!');
    } catch (err) {
      console.error(err);
      alert(err.message || 'Erro ao excluir curso');
    }
  };

  // --- Handlers Disciplinas ---
  const handleAddDisciplina = async (disciplinaData) => {
    try {
      const res = await criarDisciplina(disciplinaData);
      setDisciplinas(prev => [...prev, res].filter(Boolean));
      alert('Disciplina adicionada com sucesso!');
    } catch (err) {
      console.error(err);
      alert('Erro ao adicionar disciplina');
    }
  };

  const handleDeleteDisciplina = async (idDisciplina) => {
    if (!confirmDelete('Tem certeza que deseja excluir esta disciplina?')) return;
    try {
      await excluirDisciplina(idDisciplina);
      setDisciplinas(prev => prev.filter(d => d.idDisciplina !== idDisciplina));
    } catch (err) {
      console.error(err);
      alert('Erro ao excluir disciplina');
    }
  };

  // --- Handlers Avaliações ---
  const handleDeleteAvaliacao = (id) => {
    if (!confirmDelete('Tem certeza que deseja excluir esta avaliação?')) return;
    setAvaliacoes(prev => prev.filter(av => av.id !== id));
  };

  return (
      <div className="home-container">
        <div className="home-content" style={{ maxWidth: '1400px', margin: '3rem auto', padding: '3rem' }}>
          <Header
              title="Painel Administrativo"
              userName={userData?.nome || userData?.matricula || "Usuário"}
              onLogout={onLogout}
          />

          {/* Abas */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '3rem',
            padding: '1rem',
            background: 'rgba(0, 168, 89, 0.1)',
            borderRadius: '15px'
          }}>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {['usuarios', 'avaliacoes', 'cursos', 'disciplinas'].map(tab => (
                  <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      style={{
                        background: activeTab === tab ? '#00a859' : 'transparent',
                        color: activeTab === tab ? 'white' : '#00a859',
                        border: '2px solid #00a859',
                        padding: '8px 16px',
                        borderRadius: '20px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '0.9rem',
                        transition: 'all 0.3s ease',
                        textTransform: 'capitalize'
                      }}
                  >
                    {tab}
                  </button>
              ))}
            </div>
          </div>

          {/* Conteúdo das abas */}
          {activeTab === 'usuarios' && (
              <UserManager
                  usuarios={filteredUsuarios}
                  searchValue={searchMatricula}
                  onSearchChange={setSearchMatricula}
                  showCreateUser={showCreateUser}
                  showEditUser={showEditUser}
                  editingUser={editingUser}
                  onCreateClick={() => setShowCreateUser(true)}
                  onCreateUser={handleCreateUser}
                  onUpdateUser={handleUpdateUser}
                  onEditUser={handleEditUser}
                  onDeleteUser={handleDeleteUser}
                  onCancelCreate={() => setShowCreateUser(false)}
                  onCancelEdit={() => { setShowEditUser(false); setEditingUser(null); }}
              />
          )}

          {activeTab === 'avaliacoes' && (
              <div className="avaliacoes-admin">
                {(avaliacoes || []).map(avaliacao => (
                    <div key={avaliacao.id} className="avaliacao-card">
                      <h3>{avaliacao.disciplina} - {avaliacao.curso}</h3>
                      <p>Nota: {avaliacao.nota}/5</p>
                      <p>Comentário: {avaliacao.comentario}</p>
                      <p>{avaliacao.anonima ? 'Avaliação anônima' : `Matrícula: ${avaliacao.matricula}`}</p>
                      <button
                          onClick={() => handleDeleteAvaliacao(avaliacao.id)}
                          className="btn btn-danger"
                          style={{ marginTop: '10px' }}
                      >
                        Excluir
                      </button>
                    </div>
                ))}
              </div>
          )}

          {activeTab === 'cursos' && (
              <CourseManager
                  cursos={cursos || []}
                  onAddCurso={handleAddCurso}
                  onDeleteCurso={handleDeleteCurso}
                  onUpdateCurso={handleUpdateCurso}   // agora incluído
              />
          )}

          {activeTab === 'disciplinas' && (
              <DisciplineManager
                  disciplinas={disciplinas || []}
                  cursos={cursos || []}
                  onAddDisciplina={handleAddDisciplina}
                  onDeleteDisciplina={handleDeleteDisciplina}
              />
          )}
        </div>
      </div>
  );
}