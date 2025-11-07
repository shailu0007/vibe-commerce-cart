import axios from 'axios';

// Create a reusable, configured instance of axios
const apiClient = axios.create({
  /**
   * The `baseURL` is the most important part. It tells axios the root URL 
   * of your backend API. Now, whenever you make a request, you only need 
   * to provide the endpoint (e.g., '/products'), not the full URL.
   */
  baseURL: 'http://localhost:5000/api',

  /**
   * This header tells the backend server that the data we are sending 
   * in the request body (for POST or PUT requests) is in JSON format.
   */
  headers: {
    'Content-Type': 'application/json',
  },
});

// Exporting this configured instance allows you to use it anywhere in your app
export default apiClient;
