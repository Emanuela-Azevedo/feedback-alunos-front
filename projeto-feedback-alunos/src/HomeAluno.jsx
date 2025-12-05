import React, { useState } from "react";
import "./App.css";
import logoIfpb from "./assets/logo-ifpb.png";

export default function HomeAluno({ userData, onLogout }) {
  const [view, setView] = useState("menu");
  const [editando, setEditando] = useState(null);

  const [avaliacoes, setAvaliacoes] = useState([
    { id: 1, tipoAvaliacao: 'professor', professor: 'Prof. Maria Santos', disciplina: null, nota: 4, comentario: 'Boa didática', data: new Date().toISOString() },
    { id: 2, tipoAvaliacao: 'disciplina', professor: null, disciplina: 'Programação', nota: 5, comentario: 'Excelente disciplina', data: new Date(Date.now() - 86400000).toISOString() }
  ]);

  const professoresCadastrados = [
    { nome: 'Prof. Maria Santos', matricula: '202015030025' },
    { nome: 'Prof. Carlos Lima', matricula: '202015030026' }
  ];

  const [form, setForm] = useState({
    tipoAvaliacao: "",
    professor: "",
    disciplina: "",
    nota: "",
    comentario: "",
    anonima: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const novaAvaliacao = {
      ...form,
      professor: form.tipoAvaliacao === 'professor' ? form.professor : null,
      disciplina: form.tipoAvaliacao === 'disciplina' ? form.disciplina : null,
      matriculaAluno: form.anonima ? null : userData.matricula,
      data: new Date().toISOString(),
      id: Date.now()
    };
    setAvaliacoes([novaAvaliacao, ...avaliacoes]);
    alert('Avaliação enviada com sucesso!');
    setForm({ tipoAvaliacao: '', professor: '', disciplina: '', nota: '', comentario: '', anonima: false });
    setView('menu');
  };

  const AvaliacaoCard = ({ avaliacao }) => (
    <div className="avaliacao-card">
      <h3>
        {avaliacao.tipoAvaliacao === 'professor' && `Professor: ${avaliacao.professor}`}
        {avaliacao.tipoAvaliacao === 'disciplina' && `Disciplina: ${avaliacao.disciplina}`}
      </h3>
      <div className="nota">Nota: {avaliacao.nota}/5</div>
      <p>{avaliacao.comentario}</p>
      <small>Data: {new Date(avaliacao.data).toLocaleDateString('pt-BR')} às {new Date(avaliacao.data).toLocaleTimeString('pt-BR', {hour: '2-digit', minute: '2-digit'})}</small>
    </div>
  );

  return (
    <div className="home-container">
      <div className="home-content" style={{maxWidth: '1400px', margin: '3rem auto', padding: '3rem'}}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          marginBottom: '2rem',
          paddingBottom: '1rem',
          borderBottom: '2px solid #00a859'
        }}>
          <img src={logoIfpb} alt="Logo IFPB" style={{width: '60px', height: 'auto'}} />
          <h1 style={{color: '#00a859', margin: 0, fontSize: '2rem', fontWeight: '700'}}>Portal do Aluno</h1>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '3rem',
          padding: '1rem',
          background: 'rgba(0, 168, 89, 0.1)',
          borderRadius: '15px'
        }}>
          <div style={{display: 'flex', gap: '1rem'}}>
            <button 
              onClick={() => setView('menu')}
              style={{
                background: view === 'menu' ? '#00a859' : 'transparent',
                color: view === 'menu' ? 'white' : '#00a859',
                border: '2px solid #00a859',
                padding: '10px 20px',
                borderRadius: '25px',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'all 0.3s ease'
              }}
            >
              Dashboard
            </button>
            <button 
              onClick={() => setView('novaAvaliacao')}
              style={{
                background: view === 'novaAvaliacao' ? '#00a859' : 'transparent',
                color: view === 'novaAvaliacao' ? 'white' : '#00a859',
                border: '2px solid #00a859',
                padding: '10px 20px',
                borderRadius: '25px',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'all 0.3s ease'
              }}
            >
              Nova Avaliação
            </button>
            <button 
              onClick={() => setView('minhasAvaliacoes')}
              style={{
                background: view === 'minhasAvaliacoes' ? '#00a859' : 'transparent',
                color: view === 'minhasAvaliacoes' ? 'white' : '#00a859',
                border: '2px solid #00a859',
                padding: '10px 20px',
                borderRadius: '25px',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'all 0.3s ease'
              }}
            >
              Minhas Avaliações
            </button>
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <span style={{color: '#333', fontSize: '1rem', fontWeight: '600'}}>
              Olá, {userData.nome}
            </span>
            <button 
              onClick={onLogout}
              style={{
                background: '#dc3545',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '25px',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              Sair
            </button>
          </div>
        </div>

        {view === 'menu' && (
          <div style={{textAlign: 'center', padding: '2rem'}}>
            <h2 style={{color: '#00a859', marginBottom: '1rem'}}>Bem-vindo ao Sistema de Avaliação</h2>
            <p style={{color: '#666', fontSize: '1.1rem'}}>Use a navegação acima para acessar as funcionalidades do sistema.</p>
          </div>
        )}

        {view === 'novaAvaliacao' && (
          <div className="avaliacao-form">
            <h2>Nova Avaliação</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Tipo de Avaliação:</label>
                <select name="tipoAvaliacao" value={form.tipoAvaliacao} onChange={handleChange} required>
                  <option value="">Selecione</option>
                  <option value="professor">Professor</option>
                  <option value="disciplina">Disciplina</option>
                </select>
              </div>

              {form.tipoAvaliacao === 'professor' && (
                <div className="form-group">
                  <label>Professor:</label>
                  <select name="professor" value={form.professor} onChange={handleChange} className="form-select" required>
                    <option value="">Selecione um professor</option>
                    {professoresCadastrados.map((prof, index) => (
                      <option key={index} value={prof.nome}>{prof.nome}</option>
                    ))}
                  </select>
                </div>
              )}

              {form.tipoAvaliacao === 'disciplina' && (
                <div className="form-group">
                  <label>Disciplina:</label>
                  <input type="text" name="disciplina" value={form.disciplina} onChange={handleChange} required />
                </div>
              )}

              <div className="form-group">
                <label>Nota (1-5):</label>
                <select name="nota" value={form.nota} onChange={handleChange} required>
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
                <textarea name="comentario" value={form.comentario} onChange={handleChange} rows="4" placeholder="Deixe seu comentário..." />
              </div>

              <div className="form-group checkbox-group">
                <label>
                  <input type="checkbox" name="anonima" checked={form.anonima} onChange={handleChange} />
                  Avaliação anônima (não mostrar matrícula)
                </label>
              </div>

              <div className="form-buttons">
                <button type="submit" className="submit-btn">Enviar Avaliação</button>
                <button type="button" className="back-btn" onClick={() => setView('menu')} style={{marginLeft: '10px'}}>Voltar</button>
              </div>
            </form>
          </div>
        )}

        {view === 'minhasAvaliacoes' && (
          <div>
            <h2 style={{textAlign: 'center', fontSize: '1.8rem'}}>Minhas Avaliações</h2>
            <div className="avaliacoes-list">
              {avaliacoes.map(av => <AvaliacaoCard key={av.id} avaliacao={av} />)}
            </div>
            <div className="back-link" style={{marginTop: '20px'}}>
              <button className="back-btn" onClick={() => setView('menu')}>Voltar</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}