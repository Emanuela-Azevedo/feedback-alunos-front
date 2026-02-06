import { useState, useEffect } from "react";
import logoIfpb from "../../assets/logo-ifpb.png";
import ListAvaliacoes from "../../components/avaliacoes/ListAvaliacoes";
import CreateAvaliacao from "../../components/avaliacoes/CreateAvaliacao";
import EditAvaliacao from "../../components/avaliacoes/EditAvaliacao";
import AvaliacaoDisciplinaAPI from "../../services/AvaliacaoDisciplina";
import AvaliacaoProfessorAPI from "../../services/AvaliacaoProfessor";

export default function StudentPage({ userData, onLogout }) {
    const [avaliacoes, setAvaliacoes] = useState([]);
    const [showCreate, setShowCreate] = useState(false);
    const [editando, setEditando] = useState(null); // {id, tipo}

    // Carregar avaliações ao montar
    useEffect(() => {
        async function carregarAvaliacoes() {
            try {
                const [disciplinasResponse, professoresResponse] = await Promise.all([
                    AvaliacaoDisciplinaAPI.listarAvaliacoes(),
                    AvaliacaoProfessorAPI.listarAvaliacoes(),
                ]);

                const disciplinas = disciplinasResponse.data.map((a) => ({
                    ...a,
                    tipoAvaliacao: "disciplina",
                }));

                const professores = professoresResponse.data.map((a) => ({
                    ...a,
                    tipoAvaliacao: "professor",
                }));

                setAvaliacoes([...disciplinas, ...professores]);
            } catch (error) {
                console.error("Erro ao carregar avaliações:", error);
            }
        }
        carregarAvaliacoes();
    }, []);

    // Excluir avaliação
    async function handleDelete(avaliacao) {
        try {
            if (avaliacao.tipoAvaliacao === "disciplina") {
                await AvaliacaoDisciplinaAPI.excluirAvaliacao(avaliacao.id);
            } else {
                await AvaliacaoProfessorAPI.excluirAvaliacao(avaliacao.id);
            }
            setAvaliacoes(avaliacoes.filter((a) => a.id !== avaliacao.id));
        } catch (error) {
            console.error("Erro ao excluir avaliação:", error);
        }
    }

    // Atualizar lista após edição
    function handleUpdated(nova) {
        setAvaliacoes(
            avaliacoes.map((a) => (a.id === nova.id ? { ...nova, tipoAvaliacao: a.tipoAvaliacao } : a))
        );
        setEditando(null);
    }

    // Atualizar lista após criação
    function handleCreated(nova) {
        setAvaliacoes([...avaliacoes, nova]);
        setShowCreate(false);
    }

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
                        <h1 style={{ color: "#00a859" }}>Portal do Aluno</h1>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <span style={{ fontWeight: 600 }}>Olá, {userData.nome}</span>
                        <button onClick={onLogout} className="btn btn-danger">
                            Sair
                        </button>
                    </div>
                </div>

                {/* Botão Criar Avaliação alinhado à esquerda */}
                <div style={{ marginBottom: "2rem", textAlign: "left" }}>
                    <button
                        className="btn btn-success"
                        onClick={() => setShowCreate(!showCreate)}
                    >
                        {showCreate ? "Cancelar" : "Criar Avaliação"}
                    </button>
                </div>

                {/* Formulário de criação */}
                {showCreate && (
                    <CreateAvaliacao
                        userData={userData}
                        onCancel={() => setShowCreate(false)}
                        onCreated={handleCreated}
                    />
                )}

                {/* Formulário de edição */}
                {editando && (
                    <EditAvaliacao
                        id={editando.id}
                        tipo={editando.tipoAvaliacao}
                        onCancel={() => setEditando(null)}
                        onUpdated={handleUpdated}
                    />
                )}

                {/* Lista de avaliações */}
                <ListAvaliacoes
                    avaliacoes={avaliacoes}
                    onEdit={(av) => setEditando(av)}
                    onDelete={handleDelete}
                />
            </div>
        </div>
    );
}