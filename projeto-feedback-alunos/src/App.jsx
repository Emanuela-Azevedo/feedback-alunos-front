import { useState } from 'react'
import './App.css'
import logoIfpb from './assets/logo-ifpb.png'
import HomeAluno from './HomeAluno'
import HomeProfessor from './HomeProfessor'
import HomeAdmin from './HomeAdmin'

function App() {
  const [matricula, setMatricula] = useState('')
  const [senha, setSenha] = useState('')
  const [showCadastro, setShowCadastro] = useState(false)

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userType, setUserType] = useState(null)
  const [userData, setUserData] = useState(null)
  
  const [nome, setNome] = useState('')
  const [curso, setCurso] = useState('')
  const [especialidade, setEspecialidade] = useState('')
  const [perfil, setPerfil] = useState('aluno')
  const [senhaError, setSenhaError] = useState('')
  const [matriculaError, setMatriculaError] = useState('')
  const [nomeError, setNomeError] = useState('')
  const [cursoError, setCursoError] = useState('')
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false)


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

  const voltarLogin = () => {
    setShowCadastro(false)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserType(null)
    setUserData(null)
    setMatricula('')
    setSenha('')
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

  const limparFormulario = () => {
    setNome('');
    setMatricula('');
    setSenha('');
    setCurso('');
    setEspecialidade('');
    setPerfil('');
    setSenhaError('');
    setMatriculaError('');
    setNomeError('');
    setCursoError('');
    setEmailError('');
    setShowPasswordRequirements(false);
  };

  const handleSenhaChange = (e) => {
    const newSenha = e.target.value;
    setSenha(newSenha);
    
    if (newSenha.length > 0 && !validatePassword(newSenha)) {
      setSenhaError('A senha deve ter: 6+ caracteres, maiúscula, minúscula, número e especial (@#$%^&*!)');
    } else {
      setSenhaError('');
    }
  };


  const handleMatriculaChange = (e) => {
    const newMatricula = e.target.value.replace(/\D/g, '');
    setMatricula(newMatricula);
    
    if (newMatricula.length > 0 && !validateMatricula(newMatricula)) {
      setMatriculaError('Matrícula deve ter 12 dígitos (ex: 202315020035)');
    } else {
      setMatriculaError('');
    }
  };

  const handleNomeChange = (e) => {
    const newNome = e.target.value;
    setNome(newNome);
    
    if (newNome.length > 0 && !validateNome(newNome)) {
      setNomeError('Digite nome e sobrenome completos');
    } else {
      setNomeError('');
    }
  };

  const handleCursoChange = (e) => {
    const newCurso = e.target.value;
    setCurso(newCurso);
    
    if (perfil === 'aluno' && !newCurso) {
      setCursoError('Curso é obrigatório para alunos');
    } else {
      setCursoError('');
    }
  };

  const handlePerfilChange = (e) => {
    const newPerfil = e.target.value;
    setPerfil(newPerfil);
    
    if (newPerfil === 'aluno' && !curso) {
      setCursoError('Curso é obrigatório para alunos');
    } else {
      setCursoError('');
    }
  };

  const handleCadastroSubmit = (e) => {
    e.preventDefault()
    

    let hasErrors = false;
    
    if (!validateNome(nome)) {
      setNomeError('Digite nome e sobrenome completos');
      hasErrors = true;
    }
    
    if (!validateMatricula(matricula)) {
      setMatriculaError('Matrícula deve ter 12 dígitos (ex: 202315020035)');
      hasErrors = true;
    }
    
    if (!validatePassword(senha)) {
      setSenhaError('A senha deve ter: 6+ caracteres, maiúscula, minúscula, número e especial (@#$%^&*!)');
      hasErrors = true;
    }
    
    if (perfil === 'aluno' && !curso) {
      setCursoError('Curso é obrigatório para alunos');
      hasErrors = true;
    }
    
    if (hasErrors) return;
    
    const dadosCadastro = {
      nome,
      matricula,
      senha,
      curso,
      especialidade,
      perfilIds: perfil === 'aluno' ? [1] : perfil === 'professor' ? [2] : [3],
      superAdmin: perfil === 'administrador'
    }
    
    console.log('Dados do cadastro:', dadosCadastro)
    alert('Cadastro realizado com sucesso! Redirecionando para o login...')
    

    limparFormulario();
    setTimeout(() => {
      setShowCadastro(false);
    }, 1000);
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



  if (showCadastro) {
    return (
      <div className="login-container">
        <img src={logoIfpb} alt="Logo IFPB" className="logo" />
        <h1>Cadastro</h1>
        <form onSubmit={handleCadastroSubmit} className="login-form">
          <div className={`form-group ${nomeError ? 'error' : ''}`}>
            <label htmlFor="nome">Nome Completo:</label>
            <input 
              type="text" 
              id="nome" 
              value={nome}
              onChange={handleNomeChange}
              maxLength="100"
              placeholder="Digite seu nome e sobrenome"
              required 
            />
            {nomeError && <div className="error-message">{nomeError}</div>}
          </div>
          <div className={`form-group ${matriculaError ? 'error' : ''}`}>
            <label htmlFor="matricula">Matrícula:</label>
            <input 
              type="text" 
              id="matricula" 
              value={matricula}
              onChange={handleMatriculaChange}
              maxLength="12"
              placeholder="202315020035"
              required 
            />
            {matriculaError && <div className="error-message">{matriculaError}</div>}
          </div>
          <div className={`form-group password ${senhaError ? 'error' : ''}`}>
            <label htmlFor="senha">Senha:</label>
            <input 
              type="password" 
              id="senha" 
              value={senha}
              onChange={handleSenhaChange}
              onFocus={() => setShowPasswordRequirements(true)}
              onBlur={() => setShowPasswordRequirements(false)}
              required 
            />
            {senhaError && <div className="error-message">{senhaError}</div>}
            {showPasswordRequirements && (
              <div className="password-requirements">
                <h4>Requisitos da senha:</h4>
                <div className="requirement">• Mínimo 6 caracteres</div>
                <div className="requirement">• Uma letra minúscula (a-z)</div>
                <div className="requirement">• Uma letra maiúscula (A-Z)</div>
                <div className="requirement">• Um número (0-9)</div>
                <div className="requirement">• Um caractere especial (@#$%^&*!)</div>
              </div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="perfil">Perfil:</label>
            <select 
              id="perfil" 
              value={perfil}
              onChange={handlePerfilChange}
              className="form-select"
            >
              <option value="aluno">Aluno</option>
              <option value="professor">Professor</option>
            </select>
          </div>
          <div className={`form-group ${cursoError ? 'error' : ''}`}>
            <label htmlFor="curso">Curso{perfil === 'aluno' ? ' *' : ''}:</label>
            <select 
              id="curso" 
              value={curso}
              onChange={handleCursoChange}
              className="form-select"
              required={perfil === 'aluno'}
            >
              <option value="">Selecione um curso</option>
              <option value="Engenharia Civil">Engenharia Civil</option>
              <option value="Análise e Desenvolvimento de Sistemas">Análise e Desenvolvimento de Sistemas</option>
            </select>
            {cursoError && <div className="error-message">{cursoError}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="especialidade">Especialidade:</label>
            <input 
              type="text" 
              id="especialidade" 
              value={especialidade}
              onChange={(e) => setEspecialidade(e.target.value)}
              maxLength="100"
            />
          </div>
          <button type="submit" className="login-button">
            Cadastrar
          </button>
        </form>
        <button onClick={voltarLogin} className="forgot-password-button">
          Voltar ao Login
        </button>
      </div>
    )
  }

  return (
    <div className="login-container">
      <img src={logoIfpb} alt="Logo IFPB" className="logo" />
      <h1>Login</h1>
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <label htmlFor="matricula">Matrícula:</label>
          <input
            type="text"
            id="matricula"
            value={matricula}
            onChange={(e) => setMatricula(e.target.value)}
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

export default App
