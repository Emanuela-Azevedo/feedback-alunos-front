import { useEffect, useState } from "react";

export default function TeacherPage() {
    const [avaliacoes, setAvaliacoes] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function carregarAvaliacoes() {
            try {
                setLoading(true);

                const response = await fetch("http://localhost:8080/avaliacoes");

                if (!response.ok) {
                    throw new Error("Erro ao buscar avaliações");
                }

                const data = await response.json();
                setAvaliacoes(data);
                setCurrentIndex(0);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        carregarAvaliacoes();
    }, []);

    if (loading) return <p>Carregando avaliações...</p>;
    if (error) return <p>Erro: {error}</p>;
    if (avaliacoes.length === 0)
        return <p>Não há avaliações para este professor.</p>;

    const avaliacaoAtual = avaliacoes[currentIndex];

    function proxima() {
        setCurrentIndex((prev) =>
            prev < avaliacoes.length - 1 ? prev + 1 : prev
        );
    }

    function anterior() {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
    }

    return (
        <div className="teacher-page">
            <h1>Avaliações dos Alunos</h1>

            {/* CARD DA AVALIAÇÃO */}
            <div className="avaliacao-card">
                <p><strong>Aluno:</strong> {avaliacaoAtual.aluno ?? "Anônimo"}</p>
                <p><strong>Disciplina:</strong> {avaliacaoAtual.disciplina}</p>
                <p><strong>Comentário:</strong></p>
                <p>{avaliacaoAtual.comentario}</p>
            </div>

            <div className="navigation-buttons">
                <button onClick={anterior} disabled={currentIndex === 0}>
                    Anterior
                </button>

                <span>
          {currentIndex + 1} / {avaliacoes.length}
        </span>

                <button
                    onClick={proxima}
                    disabled={currentIndex === avaliacoes.length - 1}
                >
                    Próxima
                </button>
            </div>
        </div>
    );
}