import React from 'react';
import { useCart } from '../context/CartContext.jsx';
import Button from './common/Button.jsx';

const ProductCard = ({ product }) => {
  const { name, price, _id } = product; // Ensure _id is destructured
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    // --- CORRECTED CALL ---
    // Pass only the product's ID to the context function
    addToCart(_id); 
  };

  return (
    <div className="border border-gray-200 rounded-2xl p-6 shadow-lg bg-white text-center transform transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:-translate-y-2 overflow-hidden relative">
      <div 
        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-400"
        style={{
          boxShadow: '0 2px 8px rgba(251, 146, 60, 0.3)'
        }}
      ></div>
      <div className="mb-6 mt-2">
        <h3 
          className="text-xl font-extrabold text-gray-800 mb-3"
          style={{
            letterSpacing: '0.3px'
          }}
        >
          {name}
        </h3>
        <p 
          className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent"
          style={{
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          ${price.toFixed(2)}
        </p>
      </div>
      <Button onClick={handleAddToCart}>
        Add to Cart
      </Button>
    </div>
  );
};

export default ProductCard;
