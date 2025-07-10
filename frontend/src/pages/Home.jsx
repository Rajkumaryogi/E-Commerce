import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useCart } from '../context/CartContext';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/products');
        
        // Check if response.data exists and is an array
        if (response.data && Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          throw new Error('Invalid data format received');
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err.message || 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="font-mono p-8 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="font-mono p-8 text-center text-red-500">
        <p>Error: {error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="font-mono p-8 text-center">
        <p>No products available</p>
      </div>
    );
  }

  return (
    <div className="font-mono p-8">
      <h2 className="text-2xl font-bold mb-6">Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(prod => (
          <div key={prod._id} className="border rounded-lg shadow-md p-4 flex flex-col items-center hover:shadow-lg transition-shadow">
            <img 
              src={prod.imageUrl} 
              alt={prod.name} 
              className="w-32 h-32 object-cover mb-4 rounded"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/150'; // Fallback image
              }}
            />
            <h4 className="text-lg font-semibold text-center">{prod.name}</h4>
            <p className="text-gray-700 mb-2">${prod.price.toFixed(2)}</p>
            <button
              onClick={() => addToCart(prod)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Add to cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}