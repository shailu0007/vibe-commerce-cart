import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../api/products';

const ProductsPage = () => {
 const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // This now calls the REAL API
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div 
          className="animate-spin rounded-full border-8 border-gray-200 border-t-orange-500 mb-6"
          style={{
            width: '80px',
            height: '80px'
          }}
        ></div>
        <p 
          className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent"
          style={{
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Loading products...
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 
        className="text-5xl font-extrabold mb-10 text-center bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent"
        style={{
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '0.5px'
        }}
      >
        Our Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map(product => (
          <ProductCard key={`${product.id}-${product.name}`} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;