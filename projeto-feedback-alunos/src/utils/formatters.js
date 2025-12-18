export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('pt-BR');
};

export const formatDateToInput = () => {
  return new Date().toISOString().split('T')[0];
};