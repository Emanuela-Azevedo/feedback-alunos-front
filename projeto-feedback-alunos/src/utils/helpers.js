export const generateId = () => {
  return Date.now();
};

export const confirmDelete = (message = 'Tem certeza que deseja excluir?') => {
  return window.confirm(message);
};