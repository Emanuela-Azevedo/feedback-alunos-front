import { useState, useEffect } from "react";
import logoIfpb from "../../assets/logo-ifpb.png";
import AvaliacaoProfessorAPI from "../../services/AvaliacoesProfessor";
import AvaliacaoDisciplinaAPI from "../../services/AvaliaoesDisciplina";
import ListAvaliacoes from "../../components/avaliacoes/ListAvaliacoes.jsx";

export default function TeacherPage({ userData, onLogout }) {
    const [avaliacoes, setAvaliacoes] = useState([]);

    useEffect(() => {
        console.log("🟢 TeacherPage montado");
        console.log("👤 Professor logado:", userData);

        async function carregarAvaliacoes() {
            try {
                console.log("📡 Buscando avaliações de PROFESSOR...");
                const profResponse = await AvaliacaoProfessorAPI.listarAvaliacoes();
                console.log("✅ Resposta professor:", profResponse.data);

                console.log("📡 Buscando avaliações de DISCIPLINA...");
                const discResponse = await AvaliacaoDisciplinaAPI.listarAvaliacoes();
                console.log("✅ Resposta disciplina:", discResponse.data);

                // Normalização
                const profs = (profResponse.data || []).map((a) => ({
                    ...a,
                    tipoAvaliacao: "professor",
                }));

                const discs = (discResponse.data || []).map((a) => ({
                    ...a,
                    tipoAvaliacao: "disciplina",
                }));

                console.log("📦 Professor (normalizado):", profs);
                console.log("📦 Disciplina (normalizado):", discs);

                // 🔥 CORREÇÃO AQUI 🔥
                const filtradas = [
                    ...profs.filter((a) => {
                        console.log(
                            "🔍 Comparando professorId:",
                            a.professorId,
                            "===",
                            userData.usuarioId
                        );
                        return a.professorId === userData.usuarioId;
                    }),
                    ...discs.filter((a) => {
                        console.log(
                            "🔍 Comparando professorId:",
                            a.professorId,
                            "===",
                            userData.usuarioId
                        );
                        return a.professorId === userData.usuarioId;
                    }),
                ];

                console.log("🎯 Avaliações FILTRADAS:", filtradas);

                setAvaliacoes(filtradas);
            } catch (error) {
                console.error("❌ Erro ao carregar avaliações:", error);
            }
        }

        carregarAvaliacoes();
    }, [userData]);

    return (
        <div
            style={{
                backgroundColor: "#00a859",
                minHeight: "100vh",
                padding: "2rem",
            }}
        >
            <div
                style={{
                    maxWidth: "1200px",
                    margin: "0 auto",
                    backgroundColor: "#fff",
                    borderRadius: "10px",
                    padding: "2rem",
                }}
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
                        <h1 style={{ color: "#00a859", margin: 0 }}>
                            Minhas avaliações
                        </h1>
                    </div>
                    <button onClick={onLogout} className="btn btn-danger">
                        Sair
                    </button>
                </div>

                {/* Lista */}
                <ListAvaliacoes
                    avaliacoes={avaliacoes}
                    onEdit={(av) => console.log("✏️ Editar:", av)}
                    onDelete={(av) => console.log("🗑️ Excluir:", av)}
                />
            </div>
        </div>
    );
}