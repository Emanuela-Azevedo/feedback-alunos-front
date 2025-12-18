import { useState } from 'react'
import logoIfpb from '../../../assets/logo-ifpb.png'
import { testUsers } from '../../../data'
import styles from './Login.module.css'

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
    <div className={styles.loginContainer}>
      <img src={logoIfpb} alt="Logo IFPB" className={styles.logo} />
      <h1 className={styles.loginTitle}>Login</h1>
      
      <form onSubmit={handleLogin} className={styles.loginForm}>
        <div className={styles.formGroup}>
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
        
        <div className={styles.formGroup}>
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
        
        <button type="submit" className={styles.loginButton}>
          Entrar
        </button>
      </form>
    </div>
  )
}

export default Login