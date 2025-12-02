export const validatePasswordMatch = (password, confirmPassword) => {
  if (!confirmPassword) return { isValid: true, message: '' };
  
  const isMatching = password === confirmPassword;
  return {
    isValid: isMatching,
    message: isMatching ? '' : 'As senhas não coincidem'
  };
};

export const addPasswordMatchValidation = (passwordInput, confirmInput) => {
  const validateMatch = () => {
    const validation = validatePasswordMatch(passwordInput.value, confirmInput.value);
    const formGroup = confirmInput.closest('.form-group');
    
    formGroup.classList.remove('error', 'success');
    
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) existingError.remove();
    
    if (confirmInput.value) {
      if (validation.isValid) {
        formGroup.classList.add('success');
      } else {
        formGroup.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = validation.message;
        formGroup.appendChild(errorDiv);
      }
    }
  };
  
  confirmInput.addEventListener('input', validateMatch);
  passwordInput.addEventListener('input', validateMatch);
};