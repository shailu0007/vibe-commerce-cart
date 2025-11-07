import React from 'react';
import { useCart } from '../context/CartContext.jsx';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button.jsx';

const CartPage = () => {
  const { cart, loading, removeFromCart, addToCart, clearCart } = useCart();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div 
          className="animate-spin rounded-full border-8 border-gray-200 border-t-orange-500 mb-6"
          style={{ width: '80px', height: '80px' }}
        ></div>
        <p className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
          Loading Your Cart...
        </p>
      </div>
    );
  }
  
  const { items: cartItems, total: totalPrice } = cart;

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="mb-8 text-gray-300" style={{ fontSize: '120px', lineHeight: '1' }}>
          🛒
        </div>
        <h1 className="text-4xl font-extrabold mb-6 bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
          Your Cart is Empty
        </h1>
        <p className="text-gray-600 mb-8 text-lg">Start adding some amazing products!</p>
        <Link to="/">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-4xl font-extrabold mb-8 bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
        Your Shopping Cart
      </h1>
      
      <div className="space-y-4 mb-6">
        {cartItems.map(item => (
          <div 
            key={item.productId} 
            className="flex items-center justify-between bg-white p-6 rounded-2xl shadow-lg border border-gray-100"
          >
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-1">{item.name}</h2>
              <p className="text-lg font-semibold bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
                ${item.price.toFixed(2)}
              </p>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-2 border border-gray-200">
                <span className="font-bold text-lg min-w-[30px] text-center">Qty: {item.quantity}</span>
                {/* --- CORRECTED CALL --- */}
                <Button onClick={() => addToCart(item.productId)} variant="secondary" className="px-3 py-1 text-lg">+</Button>
              </div>
              <p className="font-bold text-2xl w-28 text-right bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
              <Button onClick={() => removeFromCart(item.productId)} variant="danger">
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-gradient-to-r from-white to-orange-50 p-8 rounded-2xl shadow-xl border border-orange-100">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
            Total: ${totalPrice.toFixed(2)}
          </h2>
          <div className="flex gap-4">
            <Button onClick={clearCart} variant="secondary">
              Clear Cart
            </Button>
            <Link to="/checkout">
              <Button>Proceed to Checkout</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
