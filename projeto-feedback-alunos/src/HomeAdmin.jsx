import React, { useState } from "react";
import "./App.css";
import logoIfpb from './assets/logo-ifpb.png';
import CadastroUsuarios from './CadastroUsuarios';

export default function HomeAdmin({ userData, onLogout }) {
  const [usuarios, setUsuarios] = useState([
    { id: 1, nome: 'João Silva', matricula: '202315020035', tipo: 'aluno', curso: 'Análise e Desenvolvimento de Sistemas' },
    { id: 2, nome: 'Prof. Maria Santos', matricula: '202015030025', tipo: 'professor', especialidade: 'Matemática' }
  ]);

  const [avaliacoes, setAvaliacoes] = useState([
    { id: 1, professor: 'Prof. Maria Santos', disciplina: 'Matemática', nota: 4, aluno: 'João Silva' },
    { id: 2, professor: 'Prof. Carlos Lima', disciplina: 'Programação', nota: 5, aluno: 'Anônimo' }
  ]);

  const [activeTab, setActiveTab] = useState('usuarios');
  const [searchMatricula, setSearchMatricula] = useState('');
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const [cursos, setCursos] = useState([
    { id: 1, nome: 'Engenharia Civil', codigo: 'EC001' },
    { id: 2, nome: 'Análise e Desenvolvimento de Sistemas', codigo: 'ADS001' }
  ]);

  const [disciplinas, setDisciplinas] = useState([
    { id: 1, nome: 'Matemática', codigo: 'MAT001', curso: 'Engenharia Civil' },
    { id: 2, nome: 'Programação', codigo: 'PROG001', curso: 'Análise e Desenvolvimento de Sistemas' }
  ]);

  const [novoCurso, setNovoCurso] = useState({ nome: '', codigo: '' });
  const [novaDisciplina, setNovaDisciplina] = useState({ nome: '', codigo: '', curso: '' });

  const filteredUsuarios = usuarios.filter(user => 
    searchMatricula === '' || user.matricula.includes(searchMatricula)
  );

  const handleSaveUser = (userData) => {
    if (editingUser) {
      setUsuarios(usuarios.map(u => u.id === editingUser.id ? { ...u, ...userData } : u));
      alert('Usuário atualizado com sucesso!');
    } else {
      const newUser = { id: Date.now(), ...userData };
      setUsuarios([...usuarios, newUser]);
      alert('Usuário criado com sucesso!');
    }
    setEditingUser(null);
    setShowCreateUser(false);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setShowCreateUser(true);
  };

  const handleDeleteUser = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      setUsuarios(usuarios.filter(u => u.id !== id));
    }
  };

  const handleDeleteAvaliacao = (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta avaliação?')) {
      setAvaliacoes(avaliacoes.filter(av => av.id !== id));
    }
  };

  const handleAddCurso = (e) => {
    e.preventDefault();
    if (novoCurso.nome && novoCurso.codigo) {
      const curso = { id: Date.now(), ...novoCurso };
      setCursos([...cursos, curso]);
      setNovoCurso({ nome: '', codigo: '' });
      alert('Curso adicionado com sucesso!');
    }
  };

  const handleDeleteCurso = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este curso?')) {
      setCursos(cursos.filter(c => c.id !== id));
    }
  };

  const handleAddDisciplina = (e) => {
    e.preventDefault();
    if (novaDisciplina.nome && novaDisciplina.codigo && novaDisciplina.curso) {
      const disciplina = { id: Date.now(), ...novaDisciplina };
      setDisciplinas([...disciplinas, disciplina]);
      setNovaDisciplina({ nome: '', codigo: '', curso: '' });
      alert('Disciplina adicionada com sucesso!');
    }
  };

  const handleDeleteDisciplina = (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta disciplina?')) {
      setDisciplinas(disciplinas.filter(d => d.id !== id));
    }
  };

  return (
    <div className="home-container">
      <div className="home-content" style={{maxWidth: '1400px', margin: '3rem auto', padding: '3rem'}}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          marginBottom: '2rem',
          paddingBottom: '1rem',
          borderBottom: '2px solid #00a859'
        }}>
          <img src={logoIfpb} alt="Logo IFPB" style={{width: '60px', height: 'auto'}} />
          <h1 style={{color: '#00a859', margin: 0, fontSize: '2rem', fontWeight: '700'}}>Painel Administrativo</h1>
        </div>

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
            <button 
              onClick={() => setActiveTab('usuarios')}
              style={{
                background: activeTab === 'usuarios' ? '#00a859' : 'transparent',
                color: activeTab === 'usuarios' ? 'white' : '#00a859',
                border: '2px solid #00a859',
                padding: '8px 16px',
                borderRadius: '20px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '0.9rem',
                transition: 'all 0.3s ease'
              }}
            >
              Usuários
            </button>
            <button 
              onClick={() => setActiveTab('avaliacoes')}
              style={{
                background: activeTab === 'avaliacoes' ? '#00a859' : 'transparent',
                color: activeTab === 'avaliacoes' ? 'white' : '#00a859',
                border: '2px solid #00a859',
                padding: '8px 16px',
                borderRadius: '20px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '0.9rem',
                transition: 'all 0.3s ease'
              }}
            >
              Avaliações
            </button>
            <button 
              onClick={() => setActiveTab('cursos')}
              style={{
                background: activeTab === 'cursos' ? '#00a859' : 'transparent',
                color: activeTab === 'cursos' ? 'white' : '#00a859',
                border: '2px solid #00a859',
                padding: '8px 16px',
                borderRadius: '20px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '0.9rem',
                transition: 'all 0.3s ease'
              }}
            >
              Cursos
            </button>
            <button 
              onClick={() => setActiveTab('disciplinas')}
              style={{
                background: activeTab === 'disciplinas' ? '#00a859' : 'transparent',
                color: activeTab === 'disciplinas' ? 'white' : '#00a859',
                border: '2px solid #00a859',
                padding: '8px 16px',
                borderRadius: '20px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '0.9rem',
                transition: 'all 0.3s ease'
              }}
            >
              Disciplinas
            </button>
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <span style={{color: '#333', fontSize: '1rem', fontWeight: '600'}}>
              Olá, {userData.nome}
            </span>
            <button 
              onClick={onLogout}
              style={{
                background: '#dc3545',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '25px',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              Sair
            </button>
          </div>
        </div>

        {activeTab === 'usuarios' && (
          <div className="usuarios-list">
            <div style={{display: 'flex', gap: '10px', marginBottom: '20px', alignItems: 'center'}}>
              <input
                type="text"
                placeholder="Buscar por matrícula..."
                value={searchMatricula}
                onChange={(e) => setSearchMatricula(e.target.value)}
                style={{width: '300px', padding: '.7rem', borderRadius: '10px', border: '1px solid #ccc', backgroundColor: '#f8f9fa'}}
              />
              <button 
                onClick={() => setShowCreateUser(true)}
                className="btn btn-primary"
              >
                {editingUser ? 'Editar Usuário' : 'Criar Usuário'}
              </button>
            </div>

            {showCreateUser && (
              <CadastroUsuarios
                initialUser={editingUser}
                onSave={handleSaveUser}
                onCancel={() => {
                  setShowCreateUser(false);
                  setEditingUser(null);
                }}
              />
            )}

            {!showCreateUser && filteredUsuarios.map(usuario => (
              <div key={usuario.id} className="avaliacao-card">
                <h3>{usuario.nome}</h3>
                <p>Matrícula: {usuario.matricula}</p>
                <p>Tipo: {usuario.tipo}</p>
                {usuario.curso && <p>Curso: {usuario.curso}</p>}
                {usuario.especialidade && <p>Especialidade: {usuario.especialidade}</p>}
                <div style={{display: 'flex', gap: '8px', marginTop: '10px'}}>
                  <button 
                    onClick={() => handleEditUser(usuario)}
                    className="btn btn-primary"
                  >
                    Editar
                  </button>
                  <button 
                    onClick={() => handleDeleteUser(usuario.id)}
                    className="btn btn-danger"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'avaliacoes' && (
          <div className="avaliacoes-admin">
            {avaliacoes.map(avaliacao => (
              <div key={avaliacao.id} className="avaliacao-card">
                <h3>{avaliacao.disciplina}</h3>
                <p>Professor: {avaliacao.professor}</p>
                <p>Nota: {avaliacao.nota}/5</p>
                <p>Aluno: {avaliacao.aluno}</p>
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
          <div>
            <form onSubmit={handleAddCurso} style={{marginBottom: '20px', padding: '20px', background: 'rgba(255,255,255,0.95)', borderRadius: '15px'}}>
              <h3 style={{color: '#00a859', marginBottom: '15px'}}>Adicionar Novo Curso</h3>
              <div style={{display: 'flex', gap: '10px', marginBottom: '10px'}}>
                <input
                  type="text"
                  placeholder="Nome do curso"
                  value={novoCurso.nome}
                  onChange={(e) => setNovoCurso({...novoCurso, nome: e.target.value})}
                  style={{width: '250px', padding: '.5rem', borderRadius: '10px', border: '1px solid #ccc', backgroundColor: '#f8f9fa'}}
                  required
                />
                <input
                  type="text"
                  placeholder="Código"
                  value={novoCurso.codigo}
                  onChange={(e) => setNovoCurso({...novoCurso, codigo: e.target.value})}
                  style={{width: '100px', padding: '.5rem', borderRadius: '10px', border: '1px solid #ccc', backgroundColor: '#f8f9fa'}}
                  required
                />
                <button type="submit" className="btn btn-primary">Adicionar</button>
              </div>
            </form>
            
            <div className="usuarios-list">
              {cursos.map(curso => (
                <div key={curso.id} className="avaliacao-card">
                  <h3>{curso.nome}</h3>
                  <p>Código: {curso.codigo}</p>
                  <button 
                    onClick={() => handleDeleteCurso(curso.id)}
                    className="btn btn-danger"
                  >
                    Excluir
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'disciplinas' && (
          <div>
            <form onSubmit={handleAddDisciplina} style={{marginBottom: '20px', padding: '20px', background: 'rgba(255,255,255,0.95)', borderRadius: '15px'}}>
              <h3 style={{color: '#00a859', marginBottom: '15px'}}>Adicionar Nova Disciplina</h3>
              <div style={{display: 'flex', gap: '10px', marginBottom: '10px'}}>
                <input
                  type="text"
                  placeholder="Nome da disciplina"
                  value={novaDisciplina.nome}
                  onChange={(e) => setNovaDisciplina({...novaDisciplina, nome: e.target.value})}
                  style={{width: '200px', padding: '.5rem', borderRadius: '10px', border: '1px solid #ccc', backgroundColor: '#f8f9fa'}}
                  required
                />
                <input
                  type="text"
                  placeholder="Código"
                  value={novaDisciplina.codigo}
                  onChange={(e) => setNovaDisciplina({...novaDisciplina, codigo: e.target.value})}
                  style={{width: '100px', padding: '.5rem', borderRadius: '10px', border: '1px solid #ccc', backgroundColor: '#f8f9fa'}}
                  required
                />
                <select
                  value={novaDisciplina.curso}
                  onChange={(e) => setNovaDisciplina({...novaDisciplina, curso: e.target.value})}
                  style={{width: '180px', padding: '.5rem', borderRadius: '10px', border: '1px solid #ccc', backgroundColor: '#f8f9fa', color: '#333'}}
                  required
                >
                  <option value="">Selecione o curso</option>
                  {cursos.map(curso => (
                    <option key={curso.id} value={curso.nome}>{curso.nome}</option>
                  ))}
                </select>
                <button type="submit" className="btn btn-primary">Adicionar</button>
              </div>
            </form>
            
            <div className="usuarios-list">
              {disciplinas.map(disciplina => (
                <div key={disciplina.id} className="avaliacao-card">
                  <h3>{disciplina.nome}</h3>
                  <p>Código: {disciplina.codigo}</p>
                  <p>Curso: {disciplina.curso}</p>
                  <button 
                    onClick={() => handleDeleteDisciplina(disciplina.id)}
                    className="btn btn-danger"
                  >
                    Excluir
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}