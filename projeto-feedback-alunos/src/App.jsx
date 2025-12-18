import { useState } from 'react'
import './styles/App.css'
import logoIfpb from './assets/logo-ifpb.png'
import StudentPage from './screens/student/StudentPage'
import TeacherPage from './screens/teacher/TeacherPage'
import AdminPage from './screens/admin/AdminPage'

function App() {
  const [matricula, setMatricula] = useState('')
  const [senha, setSenha] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userType, setUserType] = useState(null)
  const [userData, setUserData] = useState(null)
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setErro('')
    setCarregando(true)
    
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const usuarios = {
      '202315020035': { tipo: 'aluno', nome: 'João Silva', senha: 'Aluno123!' },
      '202015030025': { tipo: 'professor', nome: 'Prof. Maria Santos', senha: 'Prof123!' },
      '999999999999': { tipo: 'admin', nome: 'Administrador', senha: 'Admin123!' }
    }
    
    const usuario = usuarios[matricula.trim()]
    
    if (!usuario) {
      setErro('Usuário não encontrado.')
    } else if (usuario.senha !== senha.trim()) {
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

  if (isLoggedIn) {
    switch (userType) {
      case 'aluno':
        return <StudentPage userData={userData} onLogout={handleLogout} />
      case 'professor':
        return <TeacherPage userData={userData} onLogout={handleLogout} />
      case 'admin':
        return <AdminPage userData={userData} onLogout={handleLogout} />
      default:
        return null
    }
  }

  return (
    <div className="login-container">
      <img src={logoIfpb} alt="Logo IFPB" className="logo" />
      <h1 className="login-title">Login</h1>
      
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