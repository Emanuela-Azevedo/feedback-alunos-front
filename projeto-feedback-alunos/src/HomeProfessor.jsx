import React, { useState } from "react";
import "./Home.css";
import logoIfpb from './assets/logo-ifpb.png'

export default function HomeProfessor({ userData, onLogout }) {
  const [avaliacoes] = useState([
    { id: 1, disciplina: 'Matemática', curso: 'Engenharia', nota: 4, comentario: 'Boa didática', anonima: true },
    { id: 2, disciplina: 'Programação', curso: 'ADS', nota: 5, comentario: 'Excelente professor', anonima: false, matricula: '202315020035' }
  ])

  return (
    <div className="login-container">
      <img src={logoIfpb} alt="Logo IFPB" className="logo" />
      <h2 style={{fontSize: '1.8rem'}}>Portal do Professor - {userData.nome}</h2>

      <main>
        <h2 style={{textAlign: 'center', fontSize: '1.8rem'}}>Minhas Avaliações</h2>
        
        <div className="avaliacoes-list">
          {avaliacoes.map(avaliacao => (
            <div key={avaliacao.id} className="avaliacao-card">
              <h3>{avaliacao.disciplina} - {avaliacao.curso}</h3>
              <div className="nota">Nota: {avaliacao.nota}/5</div>
              <p>{avaliacao.comentario}</p>
              <small>
                {avaliacao.anonima ? 'Avaliação anônima' : `Matrícula: ${avaliacao.matricula}`}
              </small>
            </div>
          ))}
        </div>
      </main>
      
      <div className="back-link" style={{marginTop: '30px'}}>
        <a href="#" onClick={(e) => { e.preventDefault(); onLogout(); }}>Sair</a>
      </div>
    </div>
  );
}