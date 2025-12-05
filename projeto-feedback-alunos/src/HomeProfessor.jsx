import React, { useState } from "react";
import "./Home.css";
import logoIfpb from './assets/logo-ifpb.png'

export default function HomeProfessor({ userData, onLogout }) {
  const [avaliacoes] = useState([
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

      <h2 style={{fontSize: '1.8rem', textAlign: 'center'}}>Portal do Professor - {userData.nome}</h2>

      <main>
        <div className="estatisticas" style={{
          background: 'rgba(255,255,255,0.9)',
          padding: '20px',
          borderRadius: '15px',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          <h3 style={{color: '#00a859', marginBottom: '15px'}}>Estatísticas das Avaliações</h3>
          <div style={{display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '15px'}}>
            <div style={{
              background: '#00a859',
              color: 'white',
              padding: '15px',
              borderRadius: '10px',
              minWidth: '120px'
            }}>
              <div style={{fontSize: '2rem', fontWeight: 'bold'}}>{calcularMedia()}</div>
              <div style={{fontSize: '0.9rem'}}>Média Geral</div>
            </div>
            <div style={{
              background: '#28a745',
              color: 'white',
              padding: '15px',
              borderRadius: '10px',
              minWidth: '120px'
            }}>
              <div style={{fontSize: '2rem', fontWeight: 'bold'}}>{avaliacoes.length}</div>
              <div style={{fontSize: '0.9rem'}}>Total Avaliações</div>
            </div>
          </div>

          <div style={{marginTop: '20px'}}>
            <h4 style={{color: '#00a859', marginBottom: '10px'}}>Média por Disciplina:</h4>
            <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '10px'}}>
              {calcularMediaPorDisciplina().map((item, index) => (
                <div key={index} style={{
                  background: '#f8f9fa',
                  padding: '10px 15px',
                  borderRadius: '8px',
                  border: '2px solid #00a859',
                  color: '#333'
                }}>
                  <strong style={{color: '#00a859'}}>{item.disciplina}</strong><br/>
                  <span style={{color: '#333', fontWeight: '600'}}>Média: {item.media} ({item.avaliacoes} avaliações)</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <h2 style={{textAlign: 'center', fontSize: '1.8rem'}}>Minhas Avaliações</h2>
        <div className="avaliacoes-list">
          {avaliacoes.map(av => <AvaliacaoCard key={av.id} avaliacao={av} />)}
        </div>
      </main>
    </div>
  );
}