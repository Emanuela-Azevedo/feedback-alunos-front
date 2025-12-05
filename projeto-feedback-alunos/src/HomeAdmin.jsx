import React, { useState } from "react";
import "./Home.css";
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

  // Filtra usuários pela matrícula
  const filteredUsuarios = usuarios.filter(user => 
    searchMatricula === '' || user.matricula.includes(searchMatricula)
  );

  // Salva ou atualiza um usuário
  const handleSaveUser = (userData) => {
    if (editingUser) {
      // Atualiza
      setUsuarios(usuarios.map(u => u.id === editingUser.id ? { ...u, ...userData } : u));
      alert('Usuário atualizado com sucesso!');
    } else {
      // Cria novo
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

  return (
    <div className="login-container">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: '1rem'}}>
        <img src={logoIfpb} alt="Logo IFPB" className="logo" style={{margin: 0}} />
        <button 
          onClick={onLogout}
          style={{
            background: '#dc3545',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '0.9rem'
          }}
        >
          Sair
        </button>
      </div>
      <h2 style={{textAlign: 'center', fontSize: '2.2rem'}}>Painel Administrativo</h2>

      <main>
        <div className="admin-tabs">
          <button 
            className={activeTab === 'usuarios' ? 'tab active' : 'tab'}
            onClick={() => setActiveTab('usuarios')}
            style={{color: activeTab === 'usuarios' ? '#00a859' : '#333'}}
          >
            Usuários
          </button>
          <button 
            className={activeTab === 'avaliacoes' ? 'tab active' : 'tab'}
            onClick={() => setActiveTab('avaliacoes')}
            style={{color: activeTab === 'avaliacoes' ? '#00a859' : '#333'}}
          >
            Avaliações
          </button>
        </div>

        {activeTab === 'usuarios' && (
          <div className="usuarios-list">
            <div style={{display: 'flex', gap: '10px', marginBottom: '20px', alignItems: 'center'}}>
              <input
                type="text"
                placeholder="Buscar por matrícula..."
                value={searchMatricula}
                onChange={(e) => setSearchMatricula(e.target.value)}
                style={{flex: 1}}
              />
              <button 
                onClick={() => setShowCreateUser(true)}
                className="login-button"
                style={{padding: '0.8rem 1.5rem', fontSize: '0.9rem', margin: 0}}
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

            {filteredUsuarios.map(usuario => (
              <div key={usuario.id} className="usuario-card">
                <h3>{usuario.nome}</h3>
                <p>Matrícula: {usuario.matricula}</p>
                <p>Tipo: {usuario.tipo}</p>
                {usuario.curso && <p>Curso: {usuario.curso}</p>}
                {usuario.especialidade && <p>Especialidade: {usuario.especialidade}</p>}
                <div style={{display: 'flex', gap: '8px', marginTop: '10px'}}>
                  <button 
                    onClick={() => handleEditUser(usuario)}
                    style={{
                      background: '#28a745',
                      color: 'white',
                      border: 'none',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.8rem'
                    }}
                  >
                    Editar
                  </button>
                  <button 
                    onClick={() => handleDeleteUser(usuario.id)}
                    style={{
                      background: '#dc3545',
                      color: 'white',
                      border: 'none',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.8rem'
                    }}
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
                  style={{
                    background: '#dc3545',
                    color: 'white',
                    border: 'none',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    marginTop: '10px',
                    fontSize: '0.8rem'
                  }}
                >
                  Excluir
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}