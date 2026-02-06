import React, { useState } from 'react';
import CreateCourse from './courses/CreateCourse';
import ListCourses from './courses/ListCourses';
import EditCourse from './courses/EditCourse';

const CourseManager = ({ cursos, onAddCurso, onDeleteCurso, onUpdateCurso }) => {
  const [editingCourseId, setEditingCourseId] = useState(null);

  const cursoEmEdicao = cursos.find(
      (curso) => curso.idCurso === editingCourseId
  );

  const handleEdit = (curso) => {
    setEditingCourseId(curso.idCurso);
  };

  const handleUpdate = (updatedCurso) => {
    if (!editingCourseId) return;

    onUpdateCurso(editingCourseId, updatedCurso);
    setEditingCourseId(null);
  };

  const handleCancelEdit = () => {
    setEditingCourseId(null);
  };

  return (
      <div>
        {!cursoEmEdicao && <CreateCourse onSave={onAddCurso} />}

        {cursoEmEdicao && (
            <EditCourse
                curso={cursoEmEdicao}
                onUpdate={handleUpdate}
                onCancel={handleCancelEdit}
            />
        )}

        <ListCourses
            cursos={cursos}
            onEdit={handleEdit}
            onDelete={onDeleteCurso}
        />
      </div>
  );
};

export default CourseManager;