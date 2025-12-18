import React, { useState } from 'react';
import CreateCourse from './CourseForm/CreateCourse';
import EditCourse from './CourseForm/EditCourse';
import ListCourses from './CoursesList/ListCourses';

const CourseManager = ({ cursos, onAddCurso, onUpdateCurso, onDeleteCurso }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [editingCurso, setEditingCurso] = useState(null);

  const handleEdit = (curso) => {
    setEditingCurso(curso);
    setShowEdit(true);
  };

  const handleUpdate = (cursoData) => {
    onUpdateCurso(editingCurso.id, cursoData);
    setShowEdit(false);
    setEditingCurso(null);
  };

  return (
    <div>
      {!showEdit && <CreateCourse onSave={onAddCurso} />}
      
      {showEdit && (
        <EditCourse
          curso={editingCurso}
          onSave={handleUpdate}
          onCancel={() => {
            setShowEdit(false);
            setEditingCurso(null);
          }}
        />
      )}
      
      {!showEdit && (
        <ListCourses 
          cursos={cursos} 
          onEdit={handleEdit}
          onDelete={onDeleteCurso} 
        />
      )}
    </div>
  );
};

export default CourseManager;