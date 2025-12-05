import React, { useState } from "react";
import "./Home.css";
import logoIfpb from './assets/logo-ifpb.png';

export default function HomeAluno({ userData, onLogout }) {
  const [view, setView] = useState('menu'); // menu, novaAvaliacao, minhasAvaliacoes
  const [avaliacoes, setAvaliacoes] = useState([
    { id: 1, tipoAvaliacao: 'professor', professor: 'Prof. Maria Santos', disciplina: null, curso: null, nota: 4, comentario: 'Boa didática', data: '2024-01-15T10:30:00' },
    { id: 2, tipoAvaliacao: 'todos', professor: 'Prof. Carlos Lima', disciplina: 'Programação', curso: 'ADS', nota: 5, comentario: 'Excelente professor e disciplina', data: '2024-01-10T14:20:00' }
  ]);

  // Estados do formulário
  const [form, setForm] = useState({
    tipoAvaliacao: '',
    professor: '',
    disciplina: '',
    curso: '',
    nota: '',
    comentario: '',
    anonima: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const novaAvaliacao = {
      ...form,
      professor: (form.tipoAvaliacao === 'professor' || form.tipoAvaliacao === 'todos') ? form.professor : null,
      disciplina: (form.tipoAvaliacao === 'disciplina' || form.tipoAvaliacao === 'todos') ? form.disciplina : null,
      curso: (form.tipoAvaliacao === 'curso' || form.tipoAvaliacao === 'todos') ? form.curso : null,
      matriculaAluno: form.anonima ? null : userData.matricula,
      data: new Date().toISOString(),
      id: Date.now()
    };
    setAvaliacoes([novaAvaliacao, ...avaliacoes]);
    alert('Avaliação enviada com sucesso!');
    setForm({ tipoAvaliacao: '', professor: '', disciplina: '', curso: '', nota: '', comentario: '', anonima: false });
    setView('menu');
  };

  // Componente para renderizar cada avaliação
  const AvaliacaoCard = ({ avaliacao }) => (
    <div className="avaliacao-card">
      <h3>
        {avaliacao.tipoAvaliacao === 'professor' && `Professor: ${avaliacao.professor}`}
        {avaliacao.tipoAvaliacao === 'disciplina' && `Disciplina: ${avaliacao.disciplina}`}
        {avaliacao.tipoAvaliacao === 'curso' && `Curso: ${avaliacao.curso}`}
        {avaliacao.tipoAvaliacao === 'todos' && `${avaliacao.professor} - ${avaliacao.disciplina} - ${avaliacao.curso}`}
      </h3>
      <div className="nota">Nota: {avaliacao.nota}/5</div>
      <p>{avaliacao.comentario}</p>
      <small>Data: {new Date(avaliacao.data).toLocaleDateString('pt-BR')}</small>
    </div>
  );

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
      <h2 style={{textAlign: 'center'}}>Portal do Aluno - {userData.nome}</h2>

      <main>
        <h2 style={{textAlign: 'center', fontSize: '1.8rem'}}>Sistema de Avaliação</h2>

        {view === 'menu' && (
          <div className="menu-opcoes">
            <button className="opcao-btn" onClick={() => setView('novaAvaliacao')}>Nova Avaliação</button>
            <button className="opcao-btn" onClick={() => setView('minhasAvaliacoes')}>Minhas Avaliações</button>
          </div>
        )}

        {view === 'novaAvaliacao' && (
          <div className="avaliacao-form">
            <h2>Nova Avaliação</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>O que deseja avaliar:</label>
                <select name="tipoAvaliacao" value={form.tipoAvaliacao} onChange={handleChange} required>
                  <option value="">Selecione</option>
                  <option value="professor">Apenas Professor</option>
                  <option value="disciplina">Apenas Disciplina</option>
                  <option value="curso">Apenas Curso</option>
                  <option value="todos">Professor, Disciplina e Curso</option>
                </select>
              </div>

              {(form.tipoAvaliacao === 'professor' || form.tipoAvaliacao === 'todos') && (
                <div className="form-group">
                  <label>Professor:</label>
                  <input type="text" name="professor" value={form.professor} onChange={handleChange} required />
                </div>
              )}

              {(form.tipoAvaliacao === 'disciplina' || form.tipoAvaliacao === 'todos') && (
                <div className="form-group">
                  <label>Disciplina:</label>
                  <input type="text" name="disciplina" value={form.disciplina} onChange={handleChange} required />
                </div>
              )}

              {(form.tipoAvaliacao === 'curso' || form.tipoAvaliacao === 'todos') && (
                <div className="form-group">
                  <label>Curso:</label>
                  <input type="text" name="curso" value={form.curso} onChange={handleChange} required />
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
      </main>
    </div>
  );
}