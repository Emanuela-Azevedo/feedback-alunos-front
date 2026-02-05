import React, { useState } from 'react';
import CreateCourse from './courses/CreateCourse';
import ListCourses from './courses/ListCourses';
import EditCourse from './courses/EditCourse';

const CourseManager = ({ cursos, onAddCurso, onDeleteCurso, onUpdateCurso }) => {
  const [editingCourse, setEditingCourse] = useState(null);

  const handleEdit = (curso) => {
    setEditingCourse(curso);
  };

  const handleUpdate = (updatedCurso) => {
    if (!editingCourse) return;
    // usa idCurso do DTO
    onUpdateCurso(editingCourse.idCurso, updatedCurso);
    setEditingCourse(null);
  };

  const handleCancelEdit = () => {
    setEditingCourse(null);
  };

  return (
      <div>
        {!editingCourse && <CreateCourse onSave={onAddCurso} />}
        {editingCourse && (
            <EditCourse
                curso={editingCourse}
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