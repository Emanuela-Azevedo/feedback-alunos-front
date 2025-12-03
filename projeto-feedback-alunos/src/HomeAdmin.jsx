import React, { useState } from "react";
import "./Home.css";
import logoIfpb from './assets/logo-ifpb.png'

export default function HomeAdmin({ userData, onLogout }) {
  const [usuarios, setUsuarios] = useState([
    { id: 1, nome: 'João Silva', matricula: '202315020035', tipo: 'aluno' },
    { id: 2, nome: 'Prof. Maria Santos', matricula: '202015030025', tipo: 'professor' }
  ])

  const [avaliacoes, setAvaliacoes] = useState([
    { id: 1, professor: 'Prof. Maria Santos', disciplina: 'Matemática', nota: 4, aluno: 'João Silva' },
    { id: 2, professor: 'Prof. Carlos Lima', disciplina: 'Programação', nota: 5, aluno: 'Anônimo' }
  ])

  const [activeTab, setActiveTab] = useState('usuarios')
  const [searchMatricula, setSearchMatricula] = useState('')
  
  const handleDeleteUser = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      setUsuarios(usuarios.filter(user => user.id !== id))
    }
  }
  
  const handleDeleteAvaliacao = (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta avaliação?')) {
      setAvaliacoes(avaliacoes.filter(av => av.id !== id))
    }
  }
  
  const filteredUsuarios = usuarios.filter(user => 
    searchMatricula === '' || user.matricula.includes(searchMatricula)
  )

  return (
    <div className="login-container">
      <img src={logoIfpb} alt="Logo IFPB" className="logo" />
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
            <div className="form-group" style={{marginBottom: '20px'}}>
              <input
                type="text"
                placeholder="Buscar por matrícula..."
                value={searchMatricula}
                onChange={(e) => setSearchMatricula(e.target.value)}
              />
            </div>
            {filteredUsuarios.map(usuario => (
              <div key={usuario.id} className="usuario-card">
                <h3>{usuario.nome}</h3>
                <p>Matrícula: {usuario.matricula}</p>
                <p>Tipo: {usuario.tipo}</p>
                <button 
                  onClick={() => handleDeleteUser(usuario.id)}
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
      
      <div className="back-link" style={{marginTop: '30px'}}>
        <a href="#" onClick={(e) => { e.preventDefault(); onLogout(); }}>Sair</a>
      </div>
    </div>
  );
}