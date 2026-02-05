import React from 'react';
import CreateUser from './users/CreateUser';
import EditUser from './users/EditUser';
import ListUsers from './users/ListUsers';
import SearchUser from './users/SearchUser.jsx';

const UserManager = ({
                       usuarios = [], // garante array padrão
                       searchValue = '',
                       onSearchChange = () => {},
                       showCreateUser = false,
                       showEditUser = false,
                       editingUser = null,
                       onCreateClick = () => {},
                       onCreateUser = () => {},
                       onUpdateUser = () => {},
                       onEditUser = () => {},
                       onDeleteUser = () => {},
                       onCancelCreate = () => {},
                       onCancelEdit = () => {}
                     }) => {
  return (
      <div className="user-manager">
        {/* Busca e botão de criar */}
        <SearchUser
            searchValue={searchValue}
            onSearchChange={onSearchChange}
            onCreateClick={onCreateClick}
        />

        {/* Criação de usuário */}
        {showCreateUser && (
            <CreateUser
                onSave={onCreateUser}
                onCancel={onCancelCreate}
            />
        )}

        {/* Edição de usuário */}
        {showEditUser && editingUser && (
            <EditUser
                user={editingUser}
                onSave={onUpdateUser}
                onCancel={onCancelEdit}
            />
        )}

        {/* Lista de usuários */}
        {!showCreateUser && !showEditUser && (
            <ListUsers
                usuarios={usuarios}
                onEdit={onEditUser}
                onDelete={onDeleteUser}
            />
        )}
      </div>
  );
};

export default UserManager;