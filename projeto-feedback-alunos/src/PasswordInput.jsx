import React, { useState, useEffect } from 'react';
import { validatePassword, createPasswordRequirements, updatePasswordValidation } from './passwordValidation';

const PasswordInput = ({ value, onChange, showRequirements = true }) => {
  const [validation, setValidation] = useState({ isValid: false, requirements: {} });

  useEffect(() => {
    if (value) {
      const result = validatePassword(value);
      setValidation(result);
      
      const container = document.querySelector('.password-validation-container');
      if (container) {
        updatePasswordValidation(value, container);
      }
    }
  }, [value]);

  return (
    <div className="form-group password">
      <label htmlFor="password">Senha</label>
      <input
        type="password"
        id="password"
        value={value}
        onChange={onChange}
        placeholder="Digite sua senha"
        className={validation.isValid ? 'valid' : ''}
      />
      
      {showRequirements && (
        <div 
          className="password-validation-container"
          dangerouslySetInnerHTML={{ __html: createPasswordRequirements() }}
        />
      )}
    </div>
  );
};

export default PasswordInput;