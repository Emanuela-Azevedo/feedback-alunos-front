import React, { useState } from "react";
import logoIfpb from '../../assets/logo-ifpb.png';
import { calcularMedia, calcularMediaPorDisciplina } from '../../utils/calculoAvaliacoes';
import { formatDate } from '../../utils/formatters';
import { testEvaluations } from '../../data';
import styles from './TeacherPage.module.css';

export default function TeacherPage({ userData, onLogout }) {
  const [view, setView] = useState("menu");
  const [currentIndex, setCurrentIndex] = useState(0);

  const [avaliacoes, setAvaliacoes] = useState(testEvaluations);

  const AvaliacaoCard = ({ avaliacao }) => (
    <div className="avaliacao-card">
      <h3>{avaliacao.disciplina} - {avaliacao.curso}</h3>
      <div className="nota">Nota: {avaliacao.nota}/5</div>
      <p>{avaliacao.comentario}</p>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px'}}>
        <small>{avaliacao.anonima ? 'Avaliação anônima' : `Matrícula: ${avaliacao.matricula}`}</small>
        <small style={{color: '#666'}}>Data: {formatDate(avaliacao.data)}</small>
      </div>
    </div>
  );

  return (
    <div className={styles.homeContainer}>
      <div className={styles.homeContent}>

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
            <div className="estatisticas" style={{ marginBottom: "20px", textAlign: "center" }}>
              <h3 style={{ color: "#00a859" }}>Estatísticas das Avaliações</h3>
              <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "15px" }}>
                <div style={{ background: "#00a859", color: "white", padding: "15px", borderRadius: "10px", minWidth: "120px" }}>
                  <div style={{ fontSize: "2rem", fontWeight: "bold" }}>{calcularMedia(avaliacoes)}</div>
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
                  {calcularMediaPorDisciplina(avaliacoes).map((item, index) => (
                    <div key={index} style={{ background: "#f8f9fa", padding: "10px 15px", borderRadius: "8px", border: "2px solid #00a859", color: "#333" }}>
                      <strong style={{ color: "#00a859" }}>{item.disciplina}</strong><br/>
                      <span style={{ color: "#333", fontWeight: "600" }}>Média: {item.media} ({item.avaliacoes} avaliações)</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="avaliacoes-list">
              {avaliacoes.length > 0 ? (
                <div style={{ position: 'relative', maxWidth: '600px', margin: '0 auto' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button 
                      onClick={() => setCurrentIndex(prev => prev > 0 ? prev - 1 : avaliacoes.length - 1)}
                      className="btn btn-primary"
                      style={{ fontSize: '1.2rem', padding: '8px 12px' }}
                    >
                      ←
                    </button>
                    
                    <div style={{ flex: 1 }}>
                      <AvaliacaoCard avaliacao={avaliacoes[currentIndex]} />
                    </div>
                    
                    <button 
                      onClick={() => setCurrentIndex(prev => prev < avaliacoes.length - 1 ? prev + 1 : 0)}
                      className="btn btn-primary"
                      style={{ fontSize: '1.2rem', padding: '8px 12px' }}
                    >
                      →
                    </button>
                  </div>
                  
                  <div style={{ textAlign: 'center', marginTop: '1rem', color: '#666' }}>
                    {currentIndex + 1} de {avaliacoes.length}
                  </div>
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
                  <h3>Nenhuma avaliação encontrada</h3>
                  <p>Você ainda não recebeu nenhuma avaliação.</p>
                </div>
              )}
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