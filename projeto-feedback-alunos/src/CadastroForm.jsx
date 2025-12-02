import React, { useState } from 'react';
import PasswordInput from './PasswordInput';

const CadastroForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handlePasswordChange = (e) => {
    setFormData(prev => ({
      ...prev,
      password: e.target.value
    }));
  };

  const handleConfirmPasswordChange = (e) => {
    setFormData(prev => ({
      ...prev,
      confirmPassword: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validar se as senhas coincidem
    if (formData.password !== formData.confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }
    
    // Validar força da senha
    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      alert('A senha não atende aos requisitos mínimos!');
      return;
    }
    
    console.log('Formulário válido:', formData);
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

        <PasswordInput
          value={formData.password}
          onChange={handlePasswordChange}
          confirmValue={formData.confirmPassword}
          onConfirmChange={handleConfirmPasswordChange}
          showRequirements={true}
          showConfirmation={true}
        />

        <button type="submit" className="login-button">
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default CadastroForm;