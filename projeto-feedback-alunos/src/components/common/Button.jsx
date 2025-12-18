import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  onClick, 
  type = 'button',
  disabled = false,
  style = {}
}) => {
  const getButtonClass = () => {
    const baseClass = 'btn';
    const variantClass = `btn-${variant}`;
    return `${baseClass} ${variantClass}`;
  };

  return (
    <button
      type={type}
      className={getButtonClass()}
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;