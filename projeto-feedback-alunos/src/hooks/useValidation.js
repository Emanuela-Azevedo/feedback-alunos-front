export const useValidation = () => {
  const validatePassword = (password) => {
    const hasLength = password.length >= 6;
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[@#$%^&*!]/.test(password);
    return hasLength && hasLower && hasUpper && hasNumber && hasSpecial;
  };

  const validateMatricula = (matricula) => /^\d{12}$/.test(matricula);
  
  const validateNome = (nome) => nome.trim().split(' ').length >= 2;

  return {
    validatePassword,
    validateMatricula,
    validateNome
  };
};