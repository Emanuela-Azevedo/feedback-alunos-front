export const validatePassword = (password) => {
  const requirements = {
    length: password.length >= 6,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /\d/.test(password),
    special: /[@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
  };

  const validCount = Object.values(requirements).filter(Boolean).length;
  
  let strength = 'weak';
  if (validCount >= 5) strength = 'strong';
  else if (validCount >= 4) strength = 'good';
  else if (validCount >= 3) strength = 'fair';

  return {
    requirements,
    strength,
    isValid: Object.values(requirements).every(Boolean)
  };
};

export const createPasswordRequirements = () => {
  return `
    <div class="password-requirements">
      <h4>Requisitos da senha:</h4>
      <div class="requirement pending" data-requirement="length">
        <span class="requirement-icon">•</span>
        Mínimo 6 caracteres
      </div>
      <div class="requirement pending" data-requirement="lowercase">
        <span class="requirement-icon">•</span>
        Uma letra minúscula (a-z)
      </div>
      <div class="requirement pending" data-requirement="uppercase">
        <span class="requirement-icon">•</span>
        Uma letra maiúscula (A-Z)
      </div>
      <div class="requirement pending" data-requirement="number">
        <span class="requirement-icon">•</span>
        Um número (0-9)
      </div>
      <div class="requirement pending" data-requirement="special">
        <span class="requirement-icon">•</span>
        Um caractere especial (@#$%^&*)
      </div>
    </div>
    <div class="password-strength">
      <div class="strength-bar">
        <div class="strength-fill"></div>
      </div>
      <div class="strength-text">Digite uma senha</div>
    </div>
  `;
};

export const updatePasswordValidation = (password, container) => {
  const validation = validatePassword(password);
  
  Object.entries(validation.requirements).forEach(([requirement, isValid]) => {
    const element = container.querySelector(`[data-requirement="${requirement}"]`);
    if (element) {
      element.className = `requirement ${isValid ? 'valid' : 'invalid'}`;
      element.querySelector('.requirement-icon').textContent = isValid ? '✓' : '✗';
    }
  });

  const strengthContainer = container.querySelector('.password-strength');
  const strengthText = {
    weak: 'Fraca',
    fair: 'Razoável', 
    good: 'Boa',
    strong: 'Forte'
  };

  strengthContainer.className = `password-strength strength-${validation.strength}`;
  strengthContainer.querySelector('.strength-text').textContent = 
    password ? strengthText[validation.strength] : 'Digite uma senha';

  return validation.isValid;
};

export const validatePasswordConfirmation = (password, confirmPassword) => {
  const isEmpty = !confirmPassword;
  const isMatching = password === confirmPassword;
  
  return {
    isEmpty,
    isMatching,
    isValid: !isEmpty && isMatching
  };
};

export const updatePasswordConfirmation = (password, confirmPassword, inputElement) => {
  const validation = validatePasswordConfirmation(password, confirmPassword);
  const formGroup = inputElement.closest('.form-group');
  
  formGroup.classList.remove('error', 'success');
  
  const existingError = formGroup.querySelector('.error-message');
  if (existingError) {
    existingError.remove();
  }
  
  if (!validation.isEmpty) {
    if (validation.isMatching) {
      formGroup.classList.add('success');
    } else {
      formGroup.classList.add('error');
      const errorMessage = document.createElement('div');
      errorMessage.className = 'error-message';
      errorMessage.textContent = 'As senhas não coincidem';
      formGroup.appendChild(errorMessage);
    }
  }
  
  return validation.isValid;
};