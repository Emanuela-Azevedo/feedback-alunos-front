import { useEffect, useState } from "react";
import logoIfpb from "../../assets/logo-ifpb.png";
import { formatDate } from "../../utils/formatters";
import api from "../../services/Authentication";

function AvaliacaoCard({ avaliacao }) {
    return (
        <div className="avaliacao-card">
            <h3>
                {avaliacao.tipoAvaliacao === "professor"
                    ? `Professor: ${avaliacao.professor}`
                    : `Disciplina: ${avaliacao.disciplina}`}
            </h3>

            <div className="nota">Nota: {avaliacao.nota}/5</div>
            <p>{avaliacao.comentario}</p>

            <small style={{ color: "#666" }}>
                Data: {formatDate(avaliacao.data)}
            </small>
        </div>
    );
}

export default function TeacherPage({ userData, onLogout }) {
    const [avaliacoes, setAvaliacoes] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function carregarAvaliacoes() {
            try {
                const response = await api.get(
                    `/api/avaliacoes/professor?matricula=${userData.matricula}`
                );
                setAvaliacoes(response.data);
                setCurrentIndex(0);
            } catch (error) {
                console.error("Erro ao carregar avaliações:", error);
            } finally {
                setLoading(false);
            }
        }

        carregarAvaliacoes();
    }, [userData.matricula]);

    return (
        <div className="home-container">
            <div
                className="home-content"
                style={{ maxWidth: "1400px", margin: "3rem auto", padding: "3rem" }}
            >
                {/* Header */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "2rem",
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <img src={logoIfpb} alt="Logo" style={{ width: "50px" }} />
                        <h1 style={{ color: "#00a859" }}>Portal do Professor</h1>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <span style={{ fontWeight: 600 }}>
              Olá, {userData.nome}
            </span>
                        <button onClick={onLogout} className="btn btn-danger">
                            Sair
                        </button>
                    </div>
                </div>

                {/* Conteúdo */}
                {loading ? (
                    <p>Carregando avaliações...</p>
                ) : avaliacoes.length > 0 ? (
                    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "1rem",
                            }}
                        >
                            <button
                                className="btn btn-primary"
                                onClick={() =>
                                    setCurrentIndex((prev) =>
                                        prev > 0 ? prev - 1 : avaliacoes.length - 1
                                    )
                                }
                            >
                                ←
                            </button>

                            <div style={{ flex: 1 }}>
                                <AvaliacaoCard avaliacao={avaliacoes[currentIndex]} />
                            </div>

                            <button
                                className="btn btn-primary"
                                onClick={() =>
                                    setCurrentIndex((prev) =>
                                        prev < avaliacoes.length - 1 ? prev + 1 : 0
                                    )
                                }
                            >
                                →
                            </button>
                        </div>

                        <div
                            style={{
                                textAlign: "center",
                                marginTop: "1rem",
                                color: "#666",
                            }}
                        >
                            {currentIndex + 1} de {avaliacoes.length}
                        </div>
                    </div>
                ) : (
                    <div style={{ textAlign: "center", color: "#666" }}>
                        <h3>Nenhuma avaliação recebida</h3>
                        <p>Ainda não há avaliações para você.</p>
                    </div>
                )}
            </div>
        </div>
    );
}