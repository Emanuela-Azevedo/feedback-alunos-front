import { useState, useEffect } from "react";
import logoIfpb from "../../assets/logo-ifpb.png";
import ListAvaliacoes from "../../components/avaliacoes/ListAvaliacoes";
import CreateAvaliacao from "../../components/avaliacoes/CreateAvaliacao";
import EditAvaliacao from "../../components/avaliacoes/EditAvaliacao";
import AvaliacaoDisciplinaAPI from "../../services/AvaliaoesDisciplina";
import AvaliacaoProfessorAPI from "../../services/AvaliacoesProfessor";

export default function StudentPage({ userData, onLogout }) {
    const userDataNormalizado = {
        ...userData,
        usuarioId: userData?.usuarioId ?? userData?.id,
    };

    const [avaliacoes, setAvaliacoes] = useState([]);
    const [showCreate, setShowCreate] = useState(false);
    const [editando, setEditando] = useState(null);

    // Função centralizada para carregar avaliações
    async function carregarAvaliacoes() {
        try {
            const [disciplinasResponse, professoresResponse] = await Promise.all([
                AvaliacaoDisciplinaAPI.listarAvaliacoes(),
                AvaliacaoProfessorAPI.listarAvaliacoes(),
            ]);

            const disciplinas = (disciplinasResponse.data || []).map((a) => ({
                ...a,
                tipoAvaliacao: "disciplina",
            }));

            const professores = (professoresResponse.data || []).map((a) => ({
                ...a,
                tipoAvaliacao: "professor",
            }));

            setAvaliacoes([...disciplinas, ...professores]);
        } catch (error) {
            console.error("Erro ao carregar avaliações:", error);
        }
    }

    // Carregar ao montar
    useEffect(() => {
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
            // Recarregar lista do backend
            await carregarAvaliacoes();
        } catch (error) {
            console.error("Erro ao excluir avaliação:", error);
        }
    }

    // Atualizar lista após edição
    async function handleUpdated() {
        await carregarAvaliacoes();
        setEditando(null);
    }

    // Atualizar lista após criação
    async function handleCreated() {
        await carregarAvaliacoes();
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
                        <span style={{ fontWeight: 600 }}>Olá, {userDataNormalizado.nome}</span>
                        <button onClick={onLogout} className="btn btn-danger">
                            Sair
                        </button>
                    </div>
                </div>

                {/* Botão Criar Avaliação */}
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
                        userData={userDataNormalizado}
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