import React, { createContext, useState, useContext, useEffect } from 'react';
import {
  getCartApi,
  addToCartApi,
  removeFromCartApi,
} from '../api/cart.jsx';

// 1. Create the context
const CartContext = createContext();

// 2. Create a custom hook for easy access
export const useCart = () => {
  return useContext(CartContext);
};

// 3. Create the Provider component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);

  // Fetch the initial cart from the backend when the app loads
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const initialCart = await getCartApi();
        setCart(initialCart);
      } catch (error) {
        console.error("Failed to fetch cart:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  // --- CORRECTED FUNCTION ---
  const addToCart = async (productId) => { // Accepts productId directly
    try {
      // Passes productId directly to the API
      const updatedCart = await addToCartApi(productId, 1);
      setCart(updatedCart);
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const updatedCart = await removeFromCartApi(productId);
      setCart(updatedCart);
    } catch (error) {
      console.error("Failed to remove from cart:", error);
    }
  };

  const clearCart = () => {
    // This can be updated later to call an API endpoint if needed
    setCart({ items: [], total: 0 });
  };
  
  const value = {
    cart,
    loading,
    addToCart,
    removeFromCart,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
