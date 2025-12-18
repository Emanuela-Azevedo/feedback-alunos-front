import React from 'react';
import styles from './Button.module.css';

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
    const baseClass = styles.btn;
    const variantClass = styles[`btn${variant.charAt(0).toUpperCase() + variant.slice(1)}`];
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