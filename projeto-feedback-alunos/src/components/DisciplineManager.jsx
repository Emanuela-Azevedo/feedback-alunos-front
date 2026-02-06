import React, { useState, useEffect } from "react";
import CreateDiscipline from "./disciplines/CreateDiscipline";
import EditDiscipline from "./disciplines/EditDiscipline";
import ListDisciplines from "./disciplines/ListDisciplines";
import useUsuarios from "../services/usuarios"; // hook para buscar professores

export default function DisciplineManager({
                                              disciplinas = [],
                                              cursos = [],
                                              onAddDisciplina,
                                              onUpdateDisciplina,
                                              onDeleteDisciplina
                                          }) {
    const [showCreate, setShowCreate] = useState(false);
    const [editingDisciplina, setEditingDisciplina] = useState(null);
    const [professores, setProfessores] = useState([]);

    const { listarUsuarios } = useUsuarios();

    // 🔹 Carregar todos os professores uma vez
    useEffect(() => {
        listarUsuarios()
            .then((data) => {
                const onlyProfessores = data.filter((u) => u.perfil?.nomePerfil === "ROLE_PROFESSOR");
                setProfessores(onlyProfessores);
            })
            .catch((err) => console.error("Erro ao carregar professores:", err));
    }, []);

    // 🔹 Criar disciplina
    const handleCreate = async (disciplinaData) => {
        await onAddDisciplina(disciplinaData);
        setShowCreate(false);
    };

    // 🔹 Editar disciplina
    const handleEdit = (disciplina) => {
        setEditingDisciplina(disciplina);
    };

    // 🔹 Atualizar disciplina
    const handleUpdate = async (disciplinaData) => {
        await onUpdateDisciplina(editingDisciplina.idDisciplina, disciplinaData);
        setEditingDisciplina(null);
    };

    return (
        <div>
            <h2 style={{ color: "#00a859", marginBottom: "1rem" }}>
                Gerenciar Disciplinas
            </h2>

            {/* Botão para criar disciplina */}
            {!showCreate && !editingDisciplina && (
                <button
                    onClick={() => setShowCreate(true)}
                    className="btn btn-primary"
                    style={{ marginBottom: "1rem" }}
                >
                    Nova Disciplina
                </button>
            )}

            {/* Formulário de criação */}
            {showCreate && (
                <CreateDiscipline
                    onSave={handleCreate}
                    onCancel={() => setShowCreate(false)}
                />
            )}

            {/* Formulário de edição */}
            {editingDisciplina && (
                <EditDiscipline
                    disciplina={editingDisciplina}
                    cursos={cursos}
                    professores={professores}
                    onSave={handleUpdate}
                    onCancel={() => setEditingDisciplina(null)}
                />
            )}

            {/* Lista de disciplinas */}
            {!showCreate && !editingDisciplina && (
                <ListDisciplines
                    disciplinas={disciplinas}
                    cursos={cursos}
                    professores={professores}
                    onEdit={handleEdit}
                    onDelete={onDeleteDisciplina}
                />
            )}
        </div>
    );
}