import React from 'react';
import CreateUser from './UserForm/CreateUser';
import EditUser from './UserForm/EditUser';
import ListUsers from './UsersList/ListUsers';
import SearchUser from './SearchUser/SearchUser';

const UserManager = ({ 
  usuarios, 
  searchValue, 
  onSearchChange, 
  showCreateUser, 
  showEditUser, 
  editingUser,
  onCreateClick,
  onCreateUser,
  onUpdateUser,
  onEditUser,
  onDeleteUser,
  onCancelCreate,
  onCancelEdit
}) => {
  return (
    <div>
      <SearchUser 
        searchValue={searchValue}
        onSearchChange={onSearchChange}
        onCreateClick={onCreateClick}
      />

      {showCreateUser && (
        <CreateUser
          onSave={onCreateUser}
          onCancel={onCancelCreate}
        />
      )}

      {showEditUser && (
        <EditUser
          user={editingUser}
          onSave={onUpdateUser}
          onCancel={onCancelEdit}
        />
      )}

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