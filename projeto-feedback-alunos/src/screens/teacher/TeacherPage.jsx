import { useState, useEffect } from "react";
import logoIfpb from "../../assets/logo-ifpb.png";
import AvaliacaoProfessorAPI from "../../services/AvaliacoesProfessor";
import AvaliacaoDisciplinaAPI from "../../services/AvaliaoesDisciplina";
import { calcularMedia, calcularMediaPorDisciplina } from "../../utils/calculoAvaliacoes";
import ListAvaliacoes from "../../components/avaliacoes/ListAvaliacoes.jsx";

export default function TeacherPage({ userData, onLogout }) {
    const [avaliacoes, setAvaliacoes] = useState([]);
    const [mediaGeral, setMediaGeral] = useState(0);
    const [mediasDisciplina, setMediasDisciplina] = useState([]);

    useEffect(() => {
        async function carregarAvaliacoes() {
            try {
                const [profResponse, discResponse] = await Promise.all([
                    AvaliacaoProfessorAPI.listarAvaliacoes(),
                    AvaliacaoDisciplinaAPI.listarAvaliacoes(),
                ]);

                const profs = (profResponse.data || []).map((a) => ({
                    ...a,
                    tipoAvaliacao: "professor",
                }));

                const discs = (discResponse.data || []).map((a) => ({
                    ...a,
                    tipoAvaliacao: "disciplina",
                }));

                // 🔹 Filtrar só avaliações do professor logado
                const minhasAvaliacoes = [
                    ...profs.filter(av => av.professorId === userData.id),
                    ...discs.filter(av => av.professorId === userData.id),
                ];

                setAvaliacoes(minhasAvaliacoes);
                setMediaGeral(calcularMedia(minhasAvaliacoes));
                setMediasDisciplina(calcularMediaPorDisciplina(minhasAvaliacoes));

                console.log("Avaliações recebidas:", minhasAvaliacoes);
            } catch (error) {
                console.error("Erro ao carregar avaliações:", error);
            }
        }
        carregarAvaliacoes();
    }, [userData]);

    return (
        <div style={{ backgroundColor: "#00a859", minHeight: "100vh", padding: "2rem" }}>
            <div style={{ maxWidth: "1200px", margin: "0 auto", backgroundColor: "#fff", borderRadius: "10px", padding: "2rem" }}>

                {/* Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <img src={logoIfpb} alt="Logo" style={{ width: "50px" }} />
                        <h1 style={{ color: "#00a859", margin: 0 }}>Minhas Avaliações</h1>
                    </div>
                    <button onClick={onLogout} className="btn btn-danger">Sair</button>
                </div>

                {/* Lista de avaliações com médias */}
                <ListAvaliacoes
                    avaliacoes={avaliacoes}
                    mediasDisciplina={mediasDisciplina}
                    mediaGeral={mediaGeral}
                    onEdit={(av) => console.log("Editar", av)}
                    onDelete={(av) => console.log("Excluir", av)}
                />
            </div>
        </div>
    );
}