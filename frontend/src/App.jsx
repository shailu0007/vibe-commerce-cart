import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import router from './routes/AppRoutes';

const App = () => {
  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
};

export default App;
