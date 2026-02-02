import React, { useState } from "react";
import Header from '../../components/layout/Header';
import UserManager from '../../components/UserManager';
import CourseManager from '../../components/CourseManager';
import DisciplineManager from '../../components/DisciplineManager';
import { generateId, confirmDelete } from '../../utils/helpers';
import { filterUsersByMatricula } from '../../utils/filters';
import { testUsers, testCourses, testDisciplines, testEvaluations } from '../../data';

export default function AdminPage({ userData, onLogout }) {
  const [usuarios, setUsuarios] = useState(testUsers);
  const [avaliacoes, setAvaliacoes] = useState(testEvaluations);
  const [activeTab, setActiveTab] = useState('usuarios');
  const [searchMatricula, setSearchMatricula] = useState('');
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [showEditUser, setShowEditUser] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [cursos, setCursos] = useState(testCourses);
  const [disciplinas, setDisciplinas] = useState(testDisciplines);

  const filteredUsuarios = filterUsersByMatricula(usuarios, searchMatricula);

  const handleCreateUser = (userData) => {
    const newUser = { id: generateId(), ...userData };
    setUsuarios([...usuarios, newUser]);
    alert('Usuário criado com sucesso!');
    setShowCreateUser(false);
  };

  const handleUpdateUser = (userData) => {
    setUsuarios(usuarios.map(u => u.id === editingUser.id ? { ...u, ...userData } : u));
    alert('Usuário atualizado com sucesso!');
    setEditingUser(null);
    setShowEditUser(false);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setShowEditUser(true);
  };

  const handleDeleteUser = (id) => {
    if (confirmDelete('Tem certeza que deseja excluir este usuário?')) {
      setUsuarios(usuarios.filter(u => u.id !== id));
    }
  };

  const handleDeleteAvaliacao = (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta avaliação?')) {
      setAvaliacoes(avaliacoes.filter(av => av.id !== id));
    }
  };

  const handleAddCurso = (cursoData) => {
    const curso = { id: generateId(), ...cursoData };
    setCursos([...cursos, curso]);
    alert('Curso adicionado com sucesso!');
  };

  const handleDeleteCurso = (id) => {
    if (confirmDelete('Tem certeza que deseja excluir este curso?')) {
      setCursos(cursos.filter(c => c.id !== id));
    }
  };

  const handleAddDisciplina = (disciplinaData) => {
    const disciplina = { id: generateId(), ...disciplinaData };
    setDisciplinas([...disciplinas, disciplina]);
    alert('Disciplina adicionada com sucesso!');
  };

  const handleDeleteDisciplina = (id) => {
    if (confirmDelete('Tem certeza que deseja excluir esta disciplina?')) {
      setDisciplinas(disciplinas.filter(d => d.id !== id));
    }
  };

  return (
    <div className="home-container">
      <div className="home-content" style={{maxWidth: '1400px', margin: '3rem auto', padding: '3rem'}}>
        <Header 
          title="Painel Administrativo" 
          userName={userData.nome} 
          onLogout={onLogout} 
        />

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '3rem',
          padding: '1rem',
          background: 'rgba(0, 168, 89, 0.1)',
          borderRadius: '15px'
        }}>
          <div style={{display: 'flex', gap: '0.5rem'}}>
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
            onCancelEdit={() => {
              setShowEditUser(false);
              setEditingUser(null);
            }}
          />
        )}

        {activeTab === 'avaliacoes' && (
          <div className="avaliacoes-admin">
            {avaliacoes.map(avaliacao => (
              <div key={avaliacao.id} className="avaliacao-card">
                <h3>{avaliacao.disciplina} - {avaliacao.curso}</h3>
                <p>Nota: {avaliacao.nota}/5</p>
                <p>Comentário: {avaliacao.comentario}</p>
                <p>{avaliacao.anonima ? 'Avaliação anônima' : `Matrícula: ${avaliacao.matricula}`}</p>
                <button 
                  onClick={() => handleDeleteAvaliacao(avaliacao.id)}
                  className="btn btn-danger"
                  style={{marginTop: '10px'}}
                >
                  Excluir
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'cursos' && (
          <CourseManager 
            cursos={cursos}
            onAddCurso={handleAddCurso}
            onDeleteCurso={handleDeleteCurso}
          />
        )}

        {activeTab === 'disciplinas' && (
          <DisciplineManager 
            disciplinas={disciplinas}
            cursos={cursos}
            onAddDisciplina={handleAddDisciplina}
            onDeleteDisciplina={handleDeleteDisciplina}
          />
        )}
      </div>
    </div>
  );
}