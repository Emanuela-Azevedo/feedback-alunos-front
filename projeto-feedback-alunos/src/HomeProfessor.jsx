import React, { useState } from "react";
import "./App.css";
import logoIfpb from './assets/logo-ifpb.png';

export default function HomeProfessor({ userData, onLogout }) {
  // CONTROLE DE NAVEGAÇÃO
  const [view, setView] = useState("menu");

  // DADOS DE AVALIAÇÕES PARA DEMONSTRAÇÃO
  const [avaliacoes, setAvaliacoes] = useState([
    { id: 1, disciplina: 'Matemática', curso: 'Engenharia', nota: 4, comentario: 'Boa didática', anonima: true },
    { id: 2, disciplina: 'Programação', curso: 'ADS', nota: 5, comentario: 'Excelente professor', anonima: false, matricula: '202315020035' },
    { id: 3, disciplina: 'Matemática', curso: 'Engenharia', nota: 3, comentario: 'Pode melhorar', anonima: true },
    { id: 4, disciplina: 'Programação', curso: 'ADS', nota: 4, comentario: 'Bom conteúdo', anonima: true }
  ]);

  // FUNÇÃO PARA CALCULAR MÉDIA GERAL
  const calcularMedia = () => {
    if (!avaliacoes.length) return 0;
    const soma = avaliacoes.reduce((acc, av) => acc + av.nota, 0);
    return (soma / avaliacoes.length).toFixed(1);
  };

  // FUNÇÃO PARA CALCULAR MÉDIA POR DISCIPLINA
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
              onClick={() => setView("minhasAvaliacoes")}
              className="btn btn-primary"
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
              className="btn btn-danger"
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
            {/* DASHBOARD COM ESTATÍSTICAS */}
            <div className="estatisticas" style={{ marginBottom: "30px" }}>
              <h3 style={{ color: "#00a859", marginBottom: "20px", textAlign: "center" }}>Estatísticas das Avaliações</h3>
              
              {/* CARDS DE MÉTRICA */}
              <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "20px", marginBottom: "30px" }}>
                <div style={{ background: "#00a859", color: "white", padding: "20px", borderRadius: "15px", minWidth: "150px", textAlign: "center", boxShadow: "0 4px 15px rgba(0, 168, 89, 0.3)" }}>
                  <div style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "5px" }}>{calcularMedia()}</div>
                  <div style={{ fontSize: "1rem", opacity: "0.9" }}>Média Geral</div>
                </div>
                <div style={{ background: "#28a745", color: "white", padding: "20px", borderRadius: "15px", minWidth: "150px", textAlign: "center", boxShadow: "0 4px 15px rgba(40, 167, 69, 0.3)" }}>
                  <div style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "5px" }}>{avaliacoes.length}</div>
                  <div style={{ fontSize: "1rem", opacity: "0.9" }}>Total Avaliações</div>
                </div>
              </div>

              <h4 style={{ color: "#00a859", marginBottom: "15px", textAlign: "center" }}>Média por Disciplina</h4>
              
              <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "15px" }}>
                {calcularMediaPorDisciplina().map((item, index) => (
                  <div key={index} style={{ 
                    background: "#f8f9fa", 
                    padding: "15px 20px", 
                    borderRadius: "12px", 
                    border: "2px solid #00a859", 
                    color: "#333",
                    textAlign: "center",
                    minWidth: "180px",
                    boxShadow: "0 2px 10px rgba(0, 168, 89, 0.1)"
                  }}>
                    <strong style={{ color: "#00a859", fontSize: "1.1rem", display: "block", marginBottom: "8px" }}>{item.disciplina}</strong>
                    <span style={{ color: "#333", fontWeight: "600", fontSize: "0.95rem" }}>Média: {item.media}</span>
                    <div style={{ color: "#666", fontSize: "0.85rem", marginTop: "4px" }}>({item.avaliacoes} avaliações)</div>
                  </div>
                ))}
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
