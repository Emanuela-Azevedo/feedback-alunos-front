import { useState } from 'react'
import './App.css'
import logoIfpb from './assets/logo-ifpb.png'
import HomeAluno from './HomeAluno'
import HomeProfessor from './HomeProfessor'
import HomeAdmin from './HomeAdmin'

function App() {
  const [matricula, setMatricula] = useState('')
  const [senha, setSenha] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userType, setUserType] = useState(null)
  const [userData, setUserData] = useState(null)

  const handleLogin = (e) => {
    e.preventDefault()
    
    // Usuários para teste
    const usuarios = {
      '202315020035': { tipo: 'aluno', nome: 'João Silva', senha: 'Aluno123!' },
      '202015030025': { tipo: 'professor', nome: 'Prof. Maria Santos', senha: 'Prof123!' },
      '999999999999': { tipo: 'admin', nome: 'Administrador', senha: 'Admin123!' }
    }
    
    const usuario = usuarios[matricula]
    
    if (!usuario) {
      alert('Usuário não encontrado. Entre em contato com o administrador para criar sua conta.')
    } else if (usuario.senha !== senha) {
      alert('Senha incorreta!')
    } else {
      setUserData(usuario)
      setUserType(usuario.tipo)
      setIsLoggedIn(true)
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserType(null)
    setUserData(null)
    setMatricula('')
    setSenha('')
  }

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

  return (
    <div className="login-container">
      <img src={logoIfpb} alt="Logo IFPB" className="logo" />
      <h1>Sistema de Feedback</h1>
      
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
        
        <button type="submit" className="login-button">
          Entrar
        </button>
      </form>
      
      <div style={{marginTop: '2rem', padding: '1rem', background: 'rgba(0,168,89,0.1)', borderRadius: '10px'}}>
        <h4 style={{color: '#00a859', marginBottom: '0.5rem'}}>Usuários de teste:</h4>
        <p style={{fontSize: '0.8rem', margin: '0.2rem 0'}}>Aluno: 202315020035 / Aluno123!</p>
        <p style={{fontSize: '0.8rem', margin: '0.2rem 0'}}>Professor: 202015030025 / Prof123!</p>
        <p style={{fontSize: '0.8rem', margin: '0.2rem 0'}}>Admin: 999999999999 / Admin123!</p>
      </div>
    </div>
  )
}

export default App