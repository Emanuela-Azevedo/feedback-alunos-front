import React, { useState } from 'react';

const CadastroSimples = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({});

  // Validar senha
  const validatePassword = (password) => {
    console.log('Testando senha:', password);
    
    const hasLength = password.length >= 6;
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[@#$%^&*!]/.test(password);
    
    console.log('Resultados:', {
      hasLength,
      hasLower,
      hasUpper, 
      hasNumber,
      hasSpecial
    });
    
    const isValid = hasLength && hasLower && hasUpper && hasNumber && hasSpecial;
    console.log('Senha válida?', isValid);
    
    return isValid;
  };

  // Verificar se senhas coincidem
  const checkPasswordMatch = () => {
    if (formData.confirmPassword && formData.password !== formData.confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: 'As senhas não coincidem' }));
    } else {
      setErrors(prev => ({ ...prev, confirmPassword: '' }));
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setFormData(prev => ({ ...prev, password: newPassword }));
    
    // Validar senha em tempo real
    if (newPassword.length > 0) {
      const isValid = validatePassword(newPassword);
      if (!isValid) {
        setErrors(prev => ({ ...prev, password: 'A senha não atende aos requisitos' }));
      } else {
        setErrors(prev => ({ ...prev, password: '' }));
      }
    } else {
      setErrors(prev => ({ ...prev, password: '' }));
    }
    
    if (formData.confirmPassword) {
      setTimeout(() => {
        if (formData.confirmPassword && newPassword !== formData.confirmPassword) {
          setErrors(prev => ({ ...prev, confirmPassword: 'As senhas não coincidem' }));
        } else {
          setErrors(prev => ({ ...prev, confirmPassword: '' }));
        }
      }, 100);
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setFormData(prev => ({ ...prev, confirmPassword: newConfirmPassword }));
    
    // Validar confirmação em tempo real
    setTimeout(() => {
      if (newConfirmPassword && formData.password !== newConfirmPassword) {
        setErrors(prev => ({ ...prev, confirmPassword: 'As senhas não coincidem' }));
      } else {
        setErrors(prev => ({ ...prev, confirmPassword: '' }));
      }
    }, 100);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = {};
    
    // Validar senha
    if (!validatePassword(formData.password)) {
      newErrors.password = 'A senha não atende aos requisitos';
    }
    
    // Validar confirmação
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem';
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      alert('Cadastro realizado com sucesso!');
      console.log('Dados:', formData);
    }
  };

  return (
    <div className="login-container">
      <h1>Cadastro</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            placeholder="Digite seu email"
            required
          />
        </div>

        <div className={`form-group password ${errors.password ? 'error' : ''}`}>
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handlePasswordChange}
            placeholder="Digite sua senha"
            required
          />
          {errors.password && <div className="error-message">{errors.password}</div>}
          
          <div className="password-requirements">
            <h4>Requisitos da senha:</h4>
            <div className="requirement">• Mínimo 6 caracteres</div>
            <div className="requirement">• Uma letra minúscula (a-z)</div>
            <div className="requirement">• Uma letra maiúscula (A-Z)</div>
            <div className="requirement">• Um número (0-9)</div>
            <div className="requirement">• Um caractere especial (@#$%^&*)</div>
          </div>
        </div>

        <div className={`form-group password-confirm ${
          errors.confirmPassword ? 'error' : 
          formData.confirmPassword && formData.password === formData.confirmPassword ? 'success' : ''
        }`}>
          <label htmlFor="confirmPassword">Confirmar Senha</label>
          <input
            type="password"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleConfirmPasswordChange}
            placeholder="Digite a senha novamente"
            required
          />
          {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
        </div>

        <button type="submit" className="login-button">
          Cadastrar
        </button>
        
      </form>
    </div>
  );
};

export default CadastroSimples;