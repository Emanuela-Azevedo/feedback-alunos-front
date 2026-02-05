import { useState } from 'react'
import logoIfpb from '../assets/logo-ifpb.png'

function Login({ onLogin }) {
  const [matricula, setMatricula] = useState('')
  const [senha, setSenha] = useState('')

const handleLogin = async (e) => {
  e.preventDefault()

  try {
    const response = await fetch('http://localhost:8081/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        matricula: matricula,
        senha: senha
      })
    })

    if (!response.ok) {
      if (response.status === 401) {
        alert('Matrícula ou senha inválidas')
      } else {
        alert('Erro ao realizar login')
      }
      return
    }

    const data = await response.json()

    const token = data.token

    localStorage.setItem('token', token)

    onLogin("admin")

  } catch (error) {
    console.error(error)
    alert('Erro de conexão com o servidor')
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