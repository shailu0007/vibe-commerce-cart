import apiClient from './axiosConfig';

// GET /api/cart - Fetches the current cart from the server
export const getCartApi = async () => {
  const { data } = await apiClient.get('/cart');
  return data;
};

// POST /api/cart - Adds an item to the cart
export const addToCartApi = async (productId, qty = 1) => {
  const { data } = await apiClient.post('/cart/add-cart', { productId, qty });
  return data;
};

// DELETE /api/cart/:id - Removes an item from the cart
export const removeFromCartApi = async (productId) => {
  const { data } = await apiClient.delete(`/cart/${productId}`);
  return data;
};

// POST /api/cart/checkout - Processes the checkout
export const checkoutApi = async (cartData) => {
  const { data } = await apiClient.post('/cart/checkout', cartData);
  return data;
};
