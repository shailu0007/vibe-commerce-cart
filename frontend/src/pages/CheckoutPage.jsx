import React, { useState } from 'react';
// 1. Import the API function and the correct context hook
import { useCart } from '../context/CartContext.jsx';
import { checkoutApi } from '../api/cart.jsx'; 
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button.jsx';
import Modal from '../components/common/Modal.jsx';

const CheckoutPage = () => {
  // 2. Use the new 'cart' object and add 'isProcessing' state
  const { cart, clearCart } = useCart();
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  // 3. Get the total price directly from the backend-driven cart object
  const totalPrice = cart.total;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 4. Convert handleSubmit to an async function to call the API
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert('Please fill out all fields.');
      return;
    }
    setIsProcessing(true); // Show loading state

    try {
      // 5. Call the real checkout API with the cart items
      const apiReceipt = await checkoutApi({ cartItems: cart.items });
      
      // 6. Set the receipt using the response from the server
      setReceipt({ ...apiReceipt, customerName: formData.name });
      setIsModalOpen(true);
    } catch (error) {
      console.error("Checkout failed:", error);
      alert('There was an error processing your order. Please try again.');
    } finally {
      setIsProcessing(false); // Hide loading state
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    clearCart(); // This now clears the cart via the context
    navigate('/');
  };
  
  // 7. Check `cart.items` length instead of `cartItems`
  if (cart.items.length === 0 && !isModalOpen) {
    return (
      <div className="text-center py-16">
        <div className="mb-8 text-gray-300" style={{ fontSize: '120px', lineHeight: '1' }}>
          🛒
        </div>
        <h1 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
          Your cart is empty
        </h1>
        <p className="text-gray-600 text-lg">Please add products to your cart before checking out.</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-4xl font-extrabold mb-10 text-center bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
        Checkout
      </h1>
      <form 
        onSubmit={handleSubmit} 
        className="bg-white p-10 rounded-2xl shadow-2xl max-w-lg mx-auto border border-gray-100"
      >
        {/* Form inputs remain the same */}
        <div className="mb-6">
          <label htmlFor="name" className="block text-gray-800 font-bold mb-3 text-lg">
            Full Name
          </label>
          <input
            type="text" id="name" name="name" value={formData.name} onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300"
            placeholder="John Doe" required
          />
        </div>
        <div className="mb-8">
          <label htmlFor="email" className="block text-gray-800 font-bold mb-3 text-lg">
            Email Address
          </label>
          <input
            type="email" id="email" name="email" value={formData.email} onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300"
            placeholder="john@example.com" required
          />
        </div>
        {/* 8. The Button is now disabled while processing */}
        <Button type="submit" className="w-full text-lg" disabled={isProcessing}>
          {isProcessing ? 'Processing...' : `Place Order for $${totalPrice.toFixed(2)}`}
        </Button>
      </form>

      {/* The Modal logic remains largely the same, but the data is now real */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {receipt && (
          <div>
            <div className="text-center mb-6">
              <div className="text-green-500 mb-4" style={{ fontSize: '60px', lineHeight: '1' }}>
                ✓
              </div>
              <h2 className="text-3xl font-extrabold mb-2 bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
                Order Successful!
              </h2>
              <p className="text-gray-600 text-lg">
                Thank you, <strong className="text-orange-500">{receipt.customerName}</strong>
              </p>
            </div>
            
            <div className="border-t-2 border-gray-100 my-6"></div>
            
            <h3 className="text-xl font-bold mb-4 text-gray-800">Order Summary</h3>
            <div className="space-y-3 mb-6 max-h-48 overflow-y-auto bg-gray-50 p-4 rounded-xl">
              {receipt.items.map(item => (
                // 9. Use a unique key, like the item name for the receipt display
                <div key={item.name} className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm">
                  <span className="font-medium text-gray-700">
                    {item.name} <span className="text-orange-500 font-bold">×{item.quantity}</span>
                  </span>
                </div>
              ))}
            </div>
            
            <div className="border-t-2 border-gray-100 my-6"></div>
            
            <div className="flex justify-between items-center p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl mb-4">
              <span className="text-2xl font-extrabold text-gray-800">Total</span>
              <span className="text-3xl font-extrabold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
                ${receipt.total.toFixed(2)}
              </span>
            </div>
            
            <p className="text-sm text-gray-500 text-center mb-6">
              Order placed: {new Date(receipt.timestamp).toLocaleString()}
            </p>
            
            <Button onClick={handleCloseModal} className="w-full text-lg">
              Continue Shopping
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CheckoutPage;
