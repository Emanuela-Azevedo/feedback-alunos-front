import React, { useState } from "react";
import "./App.css";
import logoIfpb from './assets/logo-ifpb.png';

export default function HomeProfessor({ userData, onLogout }) {
  const [view, setView] = useState("menu");

  const [avaliacoes, setAvaliacoes] = useState([
    { id: 1, disciplina: 'Matemática', curso: 'Engenharia', nota: 4, comentario: 'Boa didática', anonima: true },
    { id: 2, disciplina: 'Programação', curso: 'ADS', nota: 5, comentario: 'Excelente professor', anonima: false, matricula: '202315020035' },
    { id: 3, disciplina: 'Matemática', curso: 'Engenharia', nota: 3, comentario: 'Pode melhorar', anonima: true },
    { id: 4, disciplina: 'Programação', curso: 'ADS', nota: 4, comentario: 'Bom conteúdo', anonima: true }
  ]);

  const calcularMedia = () => {
    if (!avaliacoes.length) return 0;
    const soma = avaliacoes.reduce((acc, av) => acc + av.nota, 0);
    return (soma / avaliacoes.length).toFixed(1);
  };

  const calcularMediaPorDisciplina = () => {
    const disciplinas = {};
    avaliacoes.forEach(av => {
      if (!disciplinas[av.disciplina]) disciplinas[av.disciplina] = { soma: 0, count: 0 };
      disciplinas[av.disciplina].soma += av.nota;
      disciplinas[av.disciplina].count += 1;
    });
    return Object.entries(disciplinas).map(([disciplina, data]) => ({
      disciplina,
      media: (data.soma / data.count).toFixed(1),
      avaliacoes: data.count
    }));
  };

  const AvaliacaoCard = ({ avaliacao }) => (
    <div className="avaliacao-card">
      <h3>{avaliacao.disciplina} - {avaliacao.curso}</h3>
      <div className="nota">Nota: {avaliacao.nota}/5</div>
      <p>{avaliacao.comentario}</p>
      <small>{avaliacao.anonima ? 'Avaliação anônima' : `Matrícula: ${avaliacao.matricula}`}</small>
    </div>
  );

  return (
    <div className="home-container">
      <div className="home-content" style={{ maxWidth: "1400px", margin: "3rem auto", padding: "3rem" }}>

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
          <h1 style={{color: '#00a859', margin: 0, fontSize: '2rem', fontWeight: '700'}}>Portal do Professor</h1>
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
              style={{
                background: '#00a859',
                color: 'white',
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
              onClick={() => setView("minhasAvaliacoes")}
              style={{
                background: 'transparent',
                color: '#00a859',
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
        {view === "menu" && (
          <div style={{ textAlign: "center" }}>
            <h2>Bem-vindo, {userData.nome}</h2>
            <p>Use os botões acima para navegar.</p>
          </div>
        )}

        {view === "minhasAvaliacoes" && (
          <>
            <div className="estatisticas" style={{ marginBottom: "20px" }}>
              <h3 style={{ color: "#00a859" }}>Estatísticas das Avaliações</h3>
              <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: "15px" }}>
                <div style={{ background: "#00a859", color: "white", padding: "15px", borderRadius: "10px", minWidth: "120px" }}>
                  <div style={{ fontSize: "2rem", fontWeight: "bold" }}>{calcularMedia()}</div>
                  <div style={{ fontSize: "0.9rem" }}>Média Geral</div>
                </div>
                <div style={{ background: "#28a745", color: "white", padding: "15px", borderRadius: "10px", minWidth: "120px" }}>
                  <div style={{ fontSize: "2rem", fontWeight: "bold" }}>{avaliacoes.length}</div>
                  <div style={{ fontSize: "0.9rem" }}>Total Avaliações</div>
                </div>
              </div>

              <div style={{ marginTop: "20px" }}>
                <h4 style={{ color: "#00a859" }}>Média por Disciplina:</h4>
                <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "10px" }}>
                  {calcularMediaPorDisciplina().map((item, index) => (
                    <div key={index} style={{ background: "#f8f9fa", padding: "10px 15px", borderRadius: "8px", border: "2px solid #00a859", color: "#333" }}>
                      <strong style={{ color: "#00a859" }}>{item.disciplina}</strong><br/>
                      <span style={{ color: "#333", fontWeight: "600" }}>Média: {item.media} ({item.avaliacoes} avaliações)</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="avaliacoes-list">
              {avaliacoes.map((av) => <AvaliacaoCard key={av.id} avaliacao={av} />)}
            </div>

            <button onClick={() => setView("menu")} className="btn btn-secondary" style={{ marginTop: "20px" }}>
              Voltar
            </button>
          </>
        )}

      </div>
    </div>
  );
}
