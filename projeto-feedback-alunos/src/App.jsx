import { useState } from 'react'
import './App.css'
import logoIfpb from './assets/logo-ifpb.png'
import HomeAluno from './HomeAluno'
import HomeProfessor from './HomeProfessor'
import HomeAdmin from './HomeAdmin'

function App() {
  // ESTADOS PARA CONTROLE DE LOGIN
  const [matricula, setMatricula] = useState('')
  const [senha, setSenha] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userType, setUserType] = useState(null)
  const [userData, setUserData] = useState(null)

  // ESTADOS PARA FEEDBACK VISUAL
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  // FUNÇÃO DE AUTENTICAÇÃO
  const handleLogin = async (e) => {
    e.preventDefault()
    setErro('')
    setCarregando(true)
    
    // Simula delay de autenticação
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // BASE DE USUÁRIOS PARA DEMONSTRAÇÃO
    const usuarios = {
      '202315020035': { tipo: 'aluno', nome: 'João Silva', senha: 'Aluno123!' },
      '202015030025': { tipo: 'professor', nome: 'Prof. Maria Santos', senha: 'Prof123!' },
      '999999999999': { tipo: 'admin', nome: 'Administrador', senha: 'Admin123!' }
    }
    
    const matriculaLimpa = matricula.trim()
    const senhaLimpa = senha.trim()
    
    const usuario = usuarios[matriculaLimpa]
    
    if (!usuario) {
      setErro('Usuário não encontrado. Entre em contato com o administrador.')
    } else if (usuario.senha !== senhaLimpa) {
      setErro('Senha incorreta!')
    } else {
      setUserData(usuario)
      setUserType(usuario.tipo)
      setIsLoggedIn(true)
    }
    
    setCarregando(false)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserType(null)
    setUserData(null)
    setMatricula('')
    setSenha('')
  }

  // ROTEAMENTO BASEADO NO TIPO DE USUÁRIO
  if (isLoggedIn) {
    switch (userType) {
      case 'aluno':
        return <HomeAluno userData={userData} onLogout={handleLogout} />
      case 'professor':
        return <HomeProfessor userData={userData} onLogout={handleLogout} />
      case 'admin':
        return <HomeAdmin userData={userData} onLogout={handleLogout} />
      default:
        return null
    }
  }

  // TELA DE LOGIN
  return (
    <div className="login-container">
      {/* LOGO COM ANIMAÇÃO */}
      <img src={logoIfpb} alt="Logo IFPB" className="logo" />
      <h1 className="login-title">Login</h1>
      
      {/* FORMULÁRIO DE LOGIN */}
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <label htmlFor="matricula">Matrícula:</label>
          <input 
            type="text" 
            id="matricula" 
            value={matricula}
            onChange={(e) => setMatricula(e.target.value)}
            placeholder="Digite sua matrícula"
            required 
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="senha">Senha:</label>
          <input 
            type="password" 
            id="senha" 
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Digite sua senha"
            required 
          />
        </div>
        
        {erro && (
          <div className="error-message" style={{textAlign: 'center', marginBottom: '1rem'}}>
            {erro}
          </div>
        )}
        
        <button type="submit" className={`login-button ${carregando ? 'loading' : ''}`} disabled={carregando}>
          {carregando ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </div>
  )
}

export default App