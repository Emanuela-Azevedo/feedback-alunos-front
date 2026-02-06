import { useEffect, useState } from "react";
import AvaliacoesProfessor from "../../services/AvaliacoesProfessor";


export default function TeacherPage() {
    const [avaliacoes, setAvaliacoes] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function carregarAvaliacoes() {
            try {
                setLoading(true);

                const response = await AvaliacoesProfessor.listarAvaliacoes();
                setAvaliacoes(response.data);
                setCurrentIndex(0);

            } catch (err) {
                console.error(err);
                setError("Erro ao buscar avaliações");
            } finally {
                setLoading(false);
            }
        }

        carregarAvaliacoes();
    }, []);

    if (loading) return <p>Carregando avaliações...</p>;
    if (error) return <p>{error}</p>;
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

            <div className="avaliacao-card">
                <p>
                    <strong>Aluno:</strong>{" "}
                    {avaliacaoAtual.anonima ? "Anônimo" : avaliacaoAtual.usuarioId}
                </p>

                <p><strong>Nota:</strong> {avaliacaoAtual.nota}</p>

                <p><strong>Comentário:</strong></p>
                <p>{avaliacaoAtual.comentario || "Sem comentário"}</p>
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
