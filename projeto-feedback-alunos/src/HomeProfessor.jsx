import React, { useState } from "react";
import "./App.css";
import logoIfpb from "./assets/logo-ifpb.png";

export default function HomeProfessor({ userData, onLogout }) {
  const [view, setView] = useState("menu");

  // Dados simulados de avaliações recebidas
  const [avaliacoes] = useState([
    {
      id: 1,
      tipo: "professor",
      aluno: "João Silva",
      nota: 4,
      comentario: "Excelente didática e clareza nas explicações.",
      data: "2024-01-15",
      anonima: false
    },
    {
      id: 2,
      tipo: "professor", 
      aluno: "Anônimo",
      nota: 5,
      comentario: "Professor muito dedicado e atencioso.",
      data: "2024-01-10",
      anonima: true
    }
  ]);

  const AvaliacaoCard = ({ avaliacao }) => (
    <div className="avaliacao-card">
      <h3>Avaliação de {avaliacao.anonima ? "Aluno Anônimo" : avaliacao.aluno}</h3>
      <div className="nota">Nota: {avaliacao.nota}/5</div>
      <p>{avaliacao.comentario}</p>
      <small style={{color: '#666', display: 'block', marginTop: '10px'}}>
        Data: {new Date(avaliacao.data).toLocaleDateString('pt-BR')}
      </small>
    </div>
  );

  return (
    <div className="home-container">
      <div className="home-content" style={{ maxWidth: "1400px", margin: "3rem auto", padding: "3rem" }}>
        
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <img src={logoIfpb} alt="Logo" style={{ width: "50px" }} />
            <h1 style={{ color: "#00a859" }}>Portal do Professor</h1>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <span style={{ color: "#333", fontSize: "1rem", fontWeight: "600" }}>
              Olá, {userData.nome}
            </span>
            <button onClick={onLogout} className="btn btn-danger">
              Sair
            </button>
          </div>
        </div>

        <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
          <button onClick={() => setView("avaliacoes")} className="btn btn-primary">
            Ver Avaliações
          </button>
          <button onClick={() => setView("estatisticas")} className="btn btn-secondary">
            Estatísticas
          </button>
        </div>

        {view === "avaliacoes" && (
          <>
            <h2>Avaliações Recebidas</h2>
            {avaliacoes.length > 0 ? (
              <div style={{ display: 'grid', gap: '1rem' }}>
                {avaliacoes.map(avaliacao => (
                  <AvaliacaoCard key={avaliacao.id} avaliacao={avaliacao} />
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
                <h3>Nenhuma avaliação encontrada</h3>
                <p>Você ainda não recebeu avaliações.</p>
              </div>
            )}
            <button onClick={() => setView("menu")} className="btn btn-secondary" style={{ marginTop: "20px" }}>
              Voltar
            </button>
          </>
        )}

        {view === "estatisticas" && (
          <>
            <h2>Estatísticas</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div className="avaliacao-card">
                <h3>Nota Média</h3>
                <div className="nota" style={{ fontSize: '2rem' }}>
                  {(avaliacoes.reduce((acc, av) => acc + av.nota, 0) / avaliacoes.length).toFixed(1)}/5
                </div>
              </div>
              <div className="avaliacao-card">
                <h3>Total de Avaliações</h3>
                <div className="nota" style={{ fontSize: '2rem' }}>{avaliacoes.length}</div>
              </div>
            </div>
            <button onClick={() => setView("menu")} className="btn btn-secondary" style={{ marginTop: "20px" }}>
              Voltar
            </button>
          </>
        )}

        {view === "menu" && (
          <div>
            <h2>Bem-vindo, {userData.nome}</h2>
            <p>Use o menu acima para navegar pelas opções disponíveis.</p>
          </div>
        )}
      </div>
    </div>
  );
}