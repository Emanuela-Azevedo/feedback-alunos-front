import React, { useState } from "react";
import "./Home.css";
import logoIfpb from './assets/logo-ifpb.png'

export default function HomeAdmin({ userData, onLogout }) {
  const [usuarios, setUsuarios] = useState([
    { id: 1, nome: 'João Silva', matricula: '202315020035', tipo: 'aluno', curso: 'Análise e Desenvolvimento de Sistemas' },
    { id: 2, nome: 'Prof. Maria Santos', matricula: '202015030025', tipo: 'professor', especialidade: 'Matemática' }
  ])

  const [avaliacoes, setAvaliacoes] = useState([
    { id: 1, professor: 'Prof. Maria Santos', disciplina: 'Matemática', nota: 4, aluno: 'João Silva' },
    { id: 2, professor: 'Prof. Carlos Lima', disciplina: 'Programação', nota: 5, aluno: 'Anônimo' }
  ])

  const [activeTab, setActiveTab] = useState('usuarios')
  const [searchMatricula, setSearchMatricula] = useState('')
  const [showCreateUser, setShowCreateUser] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  

  const [novoUsuario, setNovoUsuario] = useState({
    nome: '',
    matricula: '',
    senha: '',
    tipo: 'aluno',
    curso: '',
    especialidade: ''
  })
  
  const [errors, setErrors] = useState({})
  
  const handleDeleteUser = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      setUsuarios(usuarios.filter(user => user.id !== id))
    }
  }
  
  const handleEditUser = (user) => {
    setEditingUser(user)
    setNovoUsuario({
      nome: user.nome,
      matricula: user.matricula,
      senha: '',
      tipo: user.tipo,
      curso: user.curso || '',
      especialidade: user.especialidade || ''
    })
    setShowCreateUser(true)
  }
  
  const handleUpdateUser = (e) => {
    e.preventDefault()
    
    const newErrors = {}
    
    if (!validateNome(novoUsuario.nome)) {
      newErrors.nome = 'Digite nome e sobrenome completos'
    }
    
    if (!validateMatricula(novoUsuario.matricula)) {
      newErrors.matricula = 'Matrícula deve ter 12 dígitos'
    }
    

    if (novoUsuario.senha && !validatePassword(novoUsuario.senha)) {
      newErrors.senha = 'Senha deve ter 6+ caracteres, maiúscula, minúscula, número e especial'
    }
    
    if (novoUsuario.tipo === 'aluno' && !novoUsuario.curso) {
      newErrors.curso = 'Curso é obrigatório para alunos'
    }
    

    if (usuarios.some(u => u.matricula === novoUsuario.matricula && u.id !== editingUser.id)) {
      newErrors.matricula = 'Matrícula já existe'
    }
    
    setErrors(newErrors)
    
    if (Object.keys(newErrors).length === 0) {
      const updatedUser = {
        ...editingUser,
        nome: novoUsuario.nome,
        matricula: novoUsuario.matricula,
        tipo: novoUsuario.tipo,
        curso: novoUsuario.curso,
        especialidade: novoUsuario.especialidade
      }
      

      if (novoUsuario.senha) {
        updatedUser.senha = novoUsuario.senha
      }
      
      setUsuarios(usuarios.map(u => u.id === editingUser.id ? updatedUser : u))
      setNovoUsuario({
        nome: '',
        matricula: '',
        senha: '',
        tipo: 'aluno',
        curso: '',
        especialidade: ''
      })
      setErrors({})
      setShowCreateUser(false)
      setEditingUser(null)
      alert('Usuário atualizado com sucesso!')
    }
  }
  
  const handleDeleteAvaliacao = (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta avaliação?')) {
      setAvaliacoes(avaliacoes.filter(av => av.id !== id))
    }
  }
  

  const validatePassword = (password) => {
    const hasLength = password.length >= 6;
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[@#$%^&*!]/.test(password);
    return hasLength && hasLower && hasUpper && hasNumber && hasSpecial;
  };

  const validateMatricula = (matricula) => {
    return /^\d{12}$/.test(matricula);
  };

  const validateNome = (nome) => {
    return nome.trim().split(' ').length >= 2;
  };


  
  const handleCreateUser = (e) => {
    e.preventDefault()
    
    const newErrors = {}
    
    if (!validateNome(novoUsuario.nome)) {
      newErrors.nome = 'Digite nome e sobrenome completos'
    }
    

    
    if (!validateMatricula(novoUsuario.matricula)) {
      newErrors.matricula = 'Matrícula deve ter 12 dígitos'
    }
    
    if (!validatePassword(novoUsuario.senha)) {
      newErrors.senha = 'Senha deve ter 6+ caracteres, maiúscula, minúscula, número e especial'
    }
    
    if (novoUsuario.tipo === 'aluno' && !novoUsuario.curso) {
      newErrors.curso = 'Curso é obrigatório para alunos'
    }
    

    if (!editingUser && usuarios.some(u => u.matricula === novoUsuario.matricula)) {
      newErrors.matricula = 'Matrícula já existe'
    }
    
    setErrors(newErrors)
    
    if (Object.keys(newErrors).length === 0) {
      const newUser = {
        id: Date.now(),
        ...novoUsuario
      }
      
      setUsuarios([...usuarios, newUser])
      setNovoUsuario({
        nome: '',
        matricula: '',
        senha: '',
        tipo: 'aluno',
        curso: '',
        especialidade: ''
      })
      setErrors({})
      setShowCreateUser(false)
      setEditingUser(null)
      alert('Usuário criado com sucesso!')
    }
  }
  
  const filteredUsuarios = usuarios.filter(user => 
    searchMatricula === '' || user.matricula.includes(searchMatricula)
  )

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
                Criar Usuário
              </button>
            </div>
            
            {showCreateUser && (
              <div className="create-user-form" style={{
                background: 'rgba(255,255,255,0.95)',
                padding: '20px',
                borderRadius: '15px',
                marginBottom: '20px',
                border: '2px solid #00a859'
              }}>
                <h3 style={{textAlign: 'center', color: '#00a859'}}>
                  {editingUser ? 'Editar Usuário' : 'Criar Novo Usuário'}
                </h3>
                <form onSubmit={editingUser ? handleUpdateUser : handleCreateUser} className="login-form">
                  <div className={`form-group ${errors.nome ? 'error' : ''}`}>
                    <label>Nome Completo:</label>
                    <input 
                      type="text"
                      value={novoUsuario.nome}
                      onChange={(e) => setNovoUsuario({...novoUsuario, nome: e.target.value})}
                      placeholder="Digite nome e sobrenome"
                      required
                    />
                    {errors.nome && <div className="error-message">{errors.nome}</div>}
                  </div>
                  

                  
                  <div className={`form-group ${errors.matricula ? 'error' : ''}`}>
                    <label>Matrícula:</label>
                    <input 
                      type="text"
                      value={novoUsuario.matricula}
                      onChange={(e) => setNovoUsuario({...novoUsuario, matricula: e.target.value.replace(/\D/g, '')})}
                      placeholder="202315020035"
                      maxLength="12"
                      required
                    />
                    {errors.matricula && <div className="error-message">{errors.matricula}</div>}
                  </div>
                  
                  <div className={`form-group password ${errors.senha ? 'error' : ''}`}>
                    <label>Senha{editingUser ? ' (deixe em branco para manter atual)' : ''}:</label>
                    <input 
                      type="password"
                      value={novoUsuario.senha}
                      onChange={(e) => setNovoUsuario({...novoUsuario, senha: e.target.value})}
                      placeholder={editingUser ? "Nova senha (opcional)" : "Digite a senha"}
                      required={!editingUser}
                    />
                    {errors.senha && <div className="error-message">{errors.senha}</div>}
                    <div className="password-requirements">
                      <h4>Requisitos da senha:</h4>
                      <div className="requirement">• Mínimo 6 caracteres</div>
                      <div className="requirement">• Uma letra minúscula (a-z)</div>
                      <div className="requirement">• Uma letra maiúscula (A-Z)</div>
                      <div className="requirement">• Um número (0-9)</div>
                      <div className="requirement">• Um caractere especial (@#$%^&*!)</div>
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label>Tipo:</label>
                    <select 
                      value={novoUsuario.tipo}
                      onChange={(e) => setNovoUsuario({...novoUsuario, tipo: e.target.value})}
                      className="form-select"
                    >
                      <option value="aluno">Aluno</option>
                      <option value="professor">Professor</option>
                      <option value="admin">Administrador</option>
                    </select>
                  </div>
                  
                  {novoUsuario.tipo === 'aluno' && (
                    <div className={`form-group ${errors.curso ? 'error' : ''}`}>
                      <label>Curso:</label>
                      <select 
                        value={novoUsuario.curso}
                        onChange={(e) => setNovoUsuario({...novoUsuario, curso: e.target.value})}
                        className="form-select"
                        required
                      >
                        <option value="">Selecione um curso</option>
                        <option value="Engenharia Civil">Engenharia Civil</option>
                        <option value="Análise e Desenvolvimento de Sistemas">Análise e Desenvolvimento de Sistemas</option>
                      </select>
                      {errors.curso && <div className="error-message">{errors.curso}</div>}
                    </div>
                  )}
                  
                  {novoUsuario.tipo === 'professor' && (
                    <div className="form-group">
                      <label>Especialidade:</label>
                      <input 
                        type="text"
                        value={novoUsuario.especialidade}
                        onChange={(e) => setNovoUsuario({...novoUsuario, especialidade: e.target.value})}
                        placeholder="Digite a especialidade"
                      />
                    </div>
                  )}
                  
                  <div style={{display: 'flex', gap: '10px'}}>
                    <button type="submit" className="login-button" style={{flex: 1}}>
                      {editingUser ? 'Atualizar' : 'Criar'} Usuário
                    </button>
                    <button 
                      type="button" 
                      onClick={() => {
                        setShowCreateUser(false)
                        setEditingUser(null)
                        setNovoUsuario({
                          nome: '',
                          matricula: '',
                          senha: '',
                          tipo: 'aluno',
                          curso: '',
                          especialidade: ''
                        })
                        setErrors({})
                      }}
                      className="cadastro-button"
                      style={{flex: 1}}
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
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