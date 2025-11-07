import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4 backdrop-blur-sm">
      <div 
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md relative transform transition-all duration-300 scale-100 animate-fadeIn"
        style={{
          border: '1px solid rgba(255,255,255,0.2)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-all duration-200 hover:scale-110 hover:rotate-90 text-3xl font-light w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100"
          style={{
            lineHeight: '1'
          }}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;