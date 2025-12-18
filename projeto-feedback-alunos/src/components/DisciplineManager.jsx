import React, { useState } from 'react';
import CreateDiscipline from './DisciplineForm/CreateDiscipline';
import EditDiscipline from './DisciplineForm/EditDiscipline';
import ListDisciplines from './DisciplinesList/ListDisciplines';

const DisciplineManager = ({ disciplinas, cursos, onAddDisciplina, onUpdateDisciplina, onDeleteDisciplina }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [editingDisciplina, setEditingDisciplina] = useState(null);

  const handleEdit = (disciplina) => {
    setEditingDisciplina(disciplina);
    setShowEdit(true);
  };

  const handleUpdate = (disciplinaData) => {
    onUpdateDisciplina(editingDisciplina.id, disciplinaData);
    setShowEdit(false);
    setEditingDisciplina(null);
  };

  return (
    <div>
      {!showEdit && <CreateDiscipline cursos={cursos} onSave={onAddDisciplina} />}
      
      {showEdit && (
        <EditDiscipline
          disciplina={editingDisciplina}
          cursos={cursos}
          onSave={handleUpdate}
          onCancel={() => {
            setShowEdit(false);
            setEditingDisciplina(null);
          }}
        />
      )}
      
      {!showEdit && (
        <ListDisciplines 
          disciplinas={disciplinas} 
          onEdit={handleEdit}
          onDelete={onDeleteDisciplina} 
        />
      )}
    </div>
  );
};

export default DisciplineManager;