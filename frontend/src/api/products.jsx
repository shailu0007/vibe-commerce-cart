// You import your own configured client, not the default axios library
import apiClient from './axiosConfig';

export const getProducts = async () => {
  try {
    // You only need to specify the endpoint, not the full URL.
    // apiClient automatically makes the request to:
    // http://localhost:5000/api/products
    const response = await apiClient.get('/products');
    
    return response.data; 
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
