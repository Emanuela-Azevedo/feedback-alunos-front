import React, { useState } from "react";
import "./Home.css";
import logoIfpb from './assets/logo-ifpb.png'

export default function HomeAluno({ userData, onLogout }) {
  const [showAvaliacaoForm, setShowAvaliacaoForm] = useState(false)
  const [showMinhasAvaliacoes, setShowMinhasAvaliacoes] = useState(false)
  const [tipoAvaliacao, setTipoAvaliacao] = useState('')
  const [professor, setProfessor] = useState('')
  const [disciplina, setDisciplina] = useState('')
  const [curso, setCurso] = useState('')
  const [nota, setNota] = useState('')
  const [comentario, setComentario] = useState('')
  const [anonima, setAnonima] = useState(false)
  
  const [minhasAvaliacoes] = useState([
    { id: 1, tipoAvaliacao: 'professor', professor: 'Prof. Maria Santos', disciplina: null, curso: null, nota: 4, comentario: 'Boa didática', data: '2024-01-15T10:30:00' },
    { id: 2, tipoAvaliacao: 'todos', professor: 'Prof. Carlos Lima', disciplina: 'Programação', curso: 'ADS', nota: 5, comentario: 'Excelente professor e disciplina', data: '2024-01-10T14:20:00' }
  ])

  const handleSubmitAvaliacao = (e) => {
    e.preventDefault()
    
    const avaliacao = {
      tipoAvaliacao,
      professor: tipoAvaliacao === 'professor' || tipoAvaliacao === 'todos' ? professor : null,
      disciplina: tipoAvaliacao === 'disciplina' || tipoAvaliacao === 'todos' ? disciplina : null,
      curso: tipoAvaliacao === 'curso' || tipoAvaliacao === 'todos' ? curso : null,
      nota,
      comentario,
      anonima,
      matriculaAluno: anonima ? null : userData.matricula,
      dataAvaliacao: new Date().toISOString()
    }
    
    console.log('Avaliação enviada:', avaliacao)
    alert('Avaliação enviada com sucesso!')
    
    // Limpar formulário
    setTipoAvaliacao('')
    setProfessor('')
    setDisciplina('')
    setCurso('')
    setNota('')
    setComentario('')
    setAnonima(false)
    setShowAvaliacaoForm(false)
  }

  return (
    <div className="login-container">
      {!showAvaliacaoForm && !showMinhasAvaliacoes && (
        <>
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
          <h2 style={{textAlign: 'center'}}>Portal do Aluno - {userData.nome}</h2>
        </>
      )}

      <main>
        <h2 style={{textAlign: 'center', fontSize: '1.8rem'}}>Sistema de Avaliação</h2>
        
        {!showAvaliacaoForm && !showMinhasAvaliacoes ? (
          <div className="menu-opcoes">
            <button 
              className="opcao-btn"
              onClick={() => setShowAvaliacaoForm(true)}
            >
              Nova Avaliação
            </button>
            <button 
              className="opcao-btn"
              onClick={() => setShowMinhasAvaliacoes(true)}
            >
              Minhas Avaliações
            </button>
          </div>
        ) : showMinhasAvaliacoes ? (
          <div>
            <h2 style={{textAlign: 'center', fontSize: '1.8rem'}}>Minhas Avaliações</h2>
            <div className="avaliacoes-list">
              {minhasAvaliacoes.map(avaliacao => (
                <div key={avaliacao.id} className="avaliacao-card">
                  <h3>
                    {avaliacao.tipoAvaliacao === 'professor' && `Professor: ${avaliacao.professor}`}
                    {avaliacao.tipoAvaliacao === 'disciplina' && `Disciplina: ${avaliacao.disciplina}`}
                    {avaliacao.tipoAvaliacao === 'curso' && `Curso: ${avaliacao.curso}`}
                    {avaliacao.tipoAvaliacao === 'todos' && `${avaliacao.professor} - ${avaliacao.disciplina}`}
                  </h3>
                  <div className="nota">Nota: {avaliacao.nota}/5</div>
                  <p>{avaliacao.comentario}</p>
                  <small>Data: {new Date(avaliacao.data).toLocaleDateString('pt-BR')}</small>
                </div>
              ))}
            </div>
            <div className="back-link" style={{marginTop: '20px'}}>
              <a href="#" onClick={(e) => { e.preventDefault(); setShowMinhasAvaliacoes(false); }}>Voltar</a>
            </div>
          </div>
        ) : (
          <div className="avaliacao-form">
            <h2>Nova Avaliação</h2>
            <form onSubmit={handleSubmitAvaliacao}>
              <div className="form-group">
                <label>O que deseja avaliar:</label>
                <select
                  value={tipoAvaliacao}
                  onChange={(e) => setTipoAvaliacao(e.target.value)}
                  required
                >
                  <option value="">Selecione</option>
                  <option value="professor">Apenas Professor</option>
                  <option value="disciplina">Apenas Disciplina</option>
                  <option value="curso">Apenas Curso</option>
                  <option value="todos">Professor, Disciplina e Curso</option>
                </select>
              </div>
              
              {(tipoAvaliacao === 'professor' || tipoAvaliacao === 'todos') && (
                <div className="form-group">
                  <label>Professor:</label>
                  <input
                    type="text"
                    value={professor}
                    onChange={(e) => setProfessor(e.target.value)}
                    required
                  />
                </div>
              )}
              
              {(tipoAvaliacao === 'disciplina' || tipoAvaliacao === 'todos') && (
                <div className="form-group">
                  <label>Disciplina:</label>
                  <input
                    type="text"
                    value={disciplina}
                    onChange={(e) => setDisciplina(e.target.value)}
                    required
                  />
                </div>
              )}
              
              {(tipoAvaliacao === 'curso' || tipoAvaliacao === 'todos') && (
                <div className="form-group">
                  <label>Curso:</label>
                  <input
                    type="text"
                    value={curso}
                    onChange={(e) => setCurso(e.target.value)}
                    required
                  />
                </div>
              )}
              
              <div className="form-group">
                <label>Nota (1-5):</label>
                <select
                  value={nota}
                  onChange={(e) => setNota(e.target.value)}
                  required
                >
                  <option value="">Selecione</option>
                  <option value="1">1 - Muito Ruim</option>
                  <option value="2">2 - Ruim</option>
                  <option value="3">3 - Regular</option>
                  <option value="4">4 - Bom</option>
                  <option value="5">5 - Excelente</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Comentário:</label>
                <textarea
                  value={comentario}
                  onChange={(e) => setComentario(e.target.value)}
                  rows="4"
                  placeholder="Deixe seu comentário sobre a disciplina, professor ou curso..."
                />
              </div>
              
              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    checked={anonima}
                    onChange={(e) => setAnonima(e.target.checked)}
                  />
                  Avaliação anônima (não mostrar matrícula)
                </label>
              </div>
              
              <div className="form-buttons">
                <button type="submit" className="submit-btn">
                  Enviar Avaliação
                </button>
              </div>
            </form>
            <div className="back-link" style={{marginTop: '20px'}}>
              <a href="#" onClick={(e) => { e.preventDefault(); setShowAvaliacaoForm(false); }}>Voltar</a>
            </div>
          </div>
        )}
      </main>
      

    </div>
  );
}