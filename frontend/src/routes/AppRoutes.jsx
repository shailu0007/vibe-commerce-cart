import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../components/layout/RootLayout';
import ProductsPage from '../pages/ProductsPage';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    // Child routes are rendered inside the Outlet
    children: [
      {
        index: true, // This makes ProductsPage the default child route for '/'
        element: <ProductsPage />,
      },
      {
        path: 'cart',
        element: <CartPage />,
      },
      {
        path: 'checkout',
        element: <CheckoutPage />,
      },
    ],
  },
]);

export default router;
