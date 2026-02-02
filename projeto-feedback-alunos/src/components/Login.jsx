import { useState } from 'react'
import logoIfpb from '../assets/logo-ifpb.png'
import { testUsers } from '../data'

function Login({ onLogin }) {
  const [matricula, setMatricula] = useState('')
  const [senha, setSenha] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    
    const usuarios = testUsers.reduce((acc, user) => {
      acc[user.matricula] = { tipo: user.tipo, nome: user.nome, senha: user.senha }
      return acc
    }, {})
    
    const usuario = usuarios[matricula]
    
    if (!usuario) {
      alert('Usuário não encontrado. Entre em contato com o administrador para criar sua conta.')
    } else if (usuario.senha !== senha) {
      alert('Senha incorreta!')
    } else {
      onLogin(usuario)
    }
  }

  return (
    <div className="login-container">
      <img src={logoIfpb} alt="Logo IFPB" className="logo" />
      <h1 style={{color: '#000', fontFamily: 'Comic Sans MS, cursive', fontSize: '2.5rem'}}>Login</h1>
      
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
    </div>
  )
}

export default Login