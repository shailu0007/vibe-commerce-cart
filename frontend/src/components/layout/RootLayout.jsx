import React from 'react';
import { Outlet, Link } from 'react-router-dom';
// The import is correct
import { useCart } from '../../context/CartContext.jsx'; 

const RootLayout = () => {
  // 1. Get the 'cart' object from the context
  const { cart } = useCart();

  // 2. Calculate totalItems using the 'items' array inside the cart object
  const totalItems = cart.items.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="bg-gradient-to-br from-gray-50 via-orange-50 to-yellow-50 min-h-screen">
      <header className="bg-gradient-to-r from-orange-500 via-orange-600 to-yellow-500 text-white shadow-2xl sticky top-0 z-40">
        <nav className="container mx-auto px-6 py-5 flex justify-between items-center">
          <Link 
            to="/" 
            className="text-3xl font-extrabold hover:scale-105 transform transition-all duration-300"
            style={{
              textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
              letterSpacing: '0.5px'
            }}
          >
            Vibe Commerce
          </Link>
          <div className="flex space-x-8 items-center">
            <Link 
              to="/" 
              className="text-lg font-semibold hover:text-yellow-200 transition-all duration-200 hover:scale-110 transform relative group"
            >
              Products
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-200 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              to="/cart" 
              className="relative text-lg font-semibold hover:text-yellow-200 transition-all duration-200 hover:scale-110 transform group"
            >
              <span className="flex items-center gap-2">
                Cart
                {/* This logic is perfect and will work with the corrected totalItems */}
                {totalItems > 0 && (
                  <span 
                    className="bg-yellow-400 text-orange-900 rounded-full px-3 py-1 text-sm font-bold shadow-lg animate-pulse"
                    style={{
                      boxShadow: '0 4px 6px rgba(0,0,0,0.2)'
                    }}
                  >
                    {totalItems}
                  </span>
                )}
              </span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-200 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-6 py-10">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
