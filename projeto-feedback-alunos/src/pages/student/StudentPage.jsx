import React, { useState } from "react";
import logoIfpb from "../../assets/logo-ifpb.png";
import { generateId } from '../../utils/helpers';
import { formatDate, formatDateToInput } from '../../utils/formatters';
import { testProfessors, testDisciplines } from '../../data';
import styles from './StudentPage.module.css';

export default function StudentPage({ userData, onLogout }) {
  const [view, setView] = useState("menu");
  const [editando, setEditando] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [avaliacoes, setAvaliacoes] = useState([]);

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
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editando) {
      setAvaliacoes((prev) =>
        prev.map((av) =>
          av.id === editando ? { ...av, ...form } : av
        )
      );
      setEditando(null);
    } else {
      const novaAvaliacao = {
        ...form,
        id: generateId(),
        data: formatDateToInput(),
      };
      setAvaliacoes([novaAvaliacao, ...avaliacoes]);
    }

    setForm({
      tipoAvaliacao: "",
      professor: "",
      disciplina: "",
      nota: "",
      comentario: "",
      anonima: false,
    });

    setView("minhasAvaliacoes");
  };

  const excluirAvaliacao = (id) => {
    if (window.confirm("Deseja realmente excluir esta avaliação?")) {
      setAvaliacoes((prev) => {
        const newAvaliacoes = prev.filter((av) => av.id !== id);
        if (currentIndex >= newAvaliacoes.length && newAvaliacoes.length > 0) {
          setCurrentIndex(newAvaliacoes.length - 1);
        } else if (newAvaliacoes.length === 0) {
          setCurrentIndex(0);
        }
        return newAvaliacoes;
      });
    }
  };

  const editarAvaliacao = (avaliacao) => {
    setForm(avaliacao);
    setEditando(avaliacao.id);
    setView("novaAvaliacao");
  };

  const AvaliacaoCard = ({ avaliacao }) => (
    <div className={styles.avaliacaoCard}>
      <div className={styles.cardActions}>
        <button onClick={() => editarAvaliacao(avaliacao)} className="btn btn-primary btn-sm">
          ✏️
        </button>
        <button onClick={() => excluirAvaliacao(avaliacao.id)} className="btn btn-danger btn-sm">
          🗑️
        </button>
      </div>

      <h3>
        {avaliacao.tipoAvaliacao === "professor"
          ? `Professor: ${avaliacao.professor}`
          : `Disciplina: ${avaliacao.disciplina}`}
      </h3>

      <div className={styles.nota}>Nota: {avaliacao.nota}/5</div>
      <p>{avaliacao.comentario}</p>
      <small style={{color: '#666', display: 'block', marginTop: '10px'}}>Data: {formatDate(avaliacao.data)}</small>
    </div>
  );

  return (
    <div className={styles.homeContainer}>
      <div className={styles.homeContent}>

        <div className={styles.header}>
          <div className={styles.logoSection}>
            <img src={logoIfpb} alt="Logo" className={styles.logo} />
            <h1 className={styles.title}>Portal do Aluno</h1>
          </div>

          <div className={styles.userSection}>
            <span className={styles.userName}>
              Olá, {userData.nome}
            </span>
            <button onClick={onLogout} className="btn btn-danger">
              Sair
            </button>
          </div>
        </div>

        <div className={styles.navigation}>
          <button onClick={() => setView("novaAvaliacao")} className="btn btn-primary">
            Nova Avaliação
          </button>
          <button onClick={() => setView("minhasAvaliacoes")} className="btn btn-secondary">
            Minhas Avaliações
          </button>
        </div>

        {view === "novaAvaliacao" && (
          <>
            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label>Tipo de Avaliação:</label>
                <select name="tipoAvaliacao" value={form.tipoAvaliacao} onChange={handleChange} required>
                  <option value="">Selecione</option>
                  <option value="professor">Professor</option>
                  <option value="disciplina">Disciplina</option>
                </select>
              </div>

              {form.tipoAvaliacao === "professor" && (
                <div className="form-group">
                  <label>Professor:</label>
                  <select name="professor" value={form.professor} onChange={handleChange} required>
                    <option value="">Selecione o professor</option>
                    {testProfessors.map((p) => (
                      <option key={p.matricula} value={p.nome}>
                        {p.nome}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {form.tipoAvaliacao === "disciplina" && (
                <div className="form-group">
                  <label>Disciplina:</label>
                  <select name="disciplina" value={form.disciplina} onChange={handleChange} required>
                    <option value="">Selecione a disciplina</option>
                    {testDisciplines.map((d) => (
                      <option key={d.codigo} value={d.nome}>
                        {d.nome}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="form-group">
                <label>Nota (1-5):</label>
                <select name="nota" value={form.nota} onChange={handleChange} required>
                  <option value="">Selecione a nota</option>
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
                  name="comentario"
                  value={form.comentario}
                  onChange={handleChange}
                  placeholder="Deixe seu comentário sobre a avaliação"
                  rows="4"
                />
              </div>

              <div className="form-group">
                <label>
                  <input 
                    type="checkbox" 
                    name="anonima" 
                    checked={form.anonima} 
                    onChange={handleChange}
                    style={{width: 'auto', marginRight: '8px'}}
                  />
                  Avaliação anônima
                </label>
              </div>

              <button type="submit" className="btn btn-primary" style={{alignSelf: 'flex-start'}}>
                {editando ? "Atualizar" : "Enviar"}
              </button>
            </form>

            <button onClick={() => setView("menu")} className="btn btn-secondary" style={{ marginTop: "15px" }}>
              Voltar
            </button>
          </>
        )}

        {view === "minhasAvaliacoes" && (
          <>
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
                <p>Você ainda não fez nenhuma avaliação.</p>
              </div>
            )}

            <button onClick={() => setView("menu")} className="btn btn-secondary" style={{ marginTop: "20px" }}>
              Voltar
            </button>
          </>
        )}

      </div>
    </div>
  );
}