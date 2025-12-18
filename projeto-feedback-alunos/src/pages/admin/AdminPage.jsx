import React, { useState } from "react";
import Header from '../../components/Header/Header';
import UserManager from '../../components/UserManager';
import CourseManager from '../../components/CourseManager';
import DisciplineManager from '../../components/DisciplineManager';
import { generateId, confirmDelete } from '../../utils/helpers';
import { filterUsersByMatricula } from '../../utils/filters';
import { testUsers, testCourses, testDisciplines, testEvaluations } from '../../data';
import styles from './AdminPage.module.css';

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

  const handleUpdateCurso = (id, cursoData) => {
    setCursos(cursos.map(c => c.id === id ? { ...c, ...cursoData } : c));
    alert('Curso atualizado com sucesso!');
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

  const handleUpdateDisciplina = (id, disciplinaData) => {
    setDisciplinas(disciplinas.map(d => d.id === id ? { ...d, ...disciplinaData } : d));
    alert('Disciplina atualizada com sucesso!');
  };

  const handleDeleteDisciplina = (id) => {
    if (confirmDelete('Tem certeza que deseja excluir esta disciplina?')) {
      setDisciplinas(disciplinas.filter(d => d.id !== id));
    }
  };

  return (
    <div className={styles.homeContainer}>
      <div className={styles.homeContent}>
        <Header 
          title="Painel Administrativo" 
          userName={userData.nome} 
          onLogout={onLogout} 
        />

        <div className={styles.tabNavigation}>
          <div className={styles.tabButtons}>
            {['usuarios', 'avaliacoes', 'cursos', 'disciplinas'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`${styles.tabButton} ${activeTab === tab ? styles.active : styles.inactive}`}
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
          <div className={styles.avaliacoesAdmin}>
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
            onUpdateCurso={handleUpdateCurso}
            onDeleteCurso={handleDeleteCurso}
          />
        )}

        {activeTab === 'disciplinas' && (
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