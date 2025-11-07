import React from 'react';

const Button = ({ onClick, children, className = '', variant = 'primary' }) => {
  const baseStyles = 'font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-opacity-50';

  const styles = {
    primary: 'bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white focus:ring-yellow-300',
    secondary: 'bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-800 focus:ring-gray-300 border border-gray-300',
    danger: 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white focus:ring-red-300',
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${styles[variant]} ${className}`}
      style={{
        letterSpacing: '0.5px',
        textShadow: variant === 'secondary' ? 'none' : '0 1px 2px rgba(0,0,0,0.1)'
      }}
    >
      {children}
    </button>
  );
};

export default Button;