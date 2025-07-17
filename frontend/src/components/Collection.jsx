import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axios';
import { FaStar, FaFilter, FaSearch } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const Collection = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: 'all',
    sortBy: 'featured'
  });
  const [searchTerm, setSearchTerm] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await API.get('/api/products');
        setProducts(response.data);
        setFilteredProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let results = [...products];
    
    // Apply search filter
    if (searchTerm) {
      results = results.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (filters.category !== 'all') {
      results = results.filter(product => product.category === filters.category);
    }

    // Apply price filter
    if (filters.priceRange !== 'all') {
      const [min, max] = filters.priceRange.split('-').map(Number);
      results = results.filter(product => {
        if (max) return product.price >= min && product.price <= max;
        return product.price >= min;
      });
    }

    // Apply sorting
    switch (filters.sortBy) {
      case 'price-low':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        results.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        results.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'newest':
        results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default: // 'featured'
        results.sort((a, b) => (b.isFeatured || 0) - (a.isFeatured || 0));
    }

    setFilteredProducts(results);
  }, [products, filters, searchTerm]);

  const handleAddToCart = (product) => {
    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.imageUrl || product.images?.[0], // Handle both imageUrl and images array
      quantity: 1
    });
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error) return <div className="text-center py-20 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Collection Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Our Collection</h1>
        <p className="text-gray-600">Discover our latest clothing styles</p>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>

        <div className="flex flex-wrap gap-4 w-full md:w-auto">
          <select
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={filters.category}
            onChange={(e) => setFilters({...filters, category: e.target.value})}
          >
            <option value="all">All Categories</option>
            <option value="men">Men's Clothing</option>
            <option value="women">Women's Clothing</option>
            <option value="kids">Kids' Clothing</option>
            <option value="accessories">Accessories</option>
          </select>

          <select
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={filters.priceRange}
            onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
          >
            <option value="all">All Prices</option>
            <option value="0-50">₹0 - ₹50</option>
            <option value="50-100">₹50 - ₹100</option>
            <option value="100-200">₹100 - ₹200</option>
            <option value="200-">₹200+</option>
          </select>

          <select
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={filters.sortBy}
            onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
            <option value="newest">Newest Arrivals</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <Link to={`/product/${product._id}`}>
              <div className="relative pb-[120%] overflow-hidden">
                <img
                  src={product.imageUrl || product.images?.[0] || "https://via.placeholder.com/300"}
                  alt={product.name}
                  className="absolute h-full w-full object-cover hover:scale-105 transition-transform"
                />
                {product.isNew && (
                  <span className="absolute top-2 right-2 bg-black text-white text-xs font-bold px-2 py-1 rounded-full">
                    NEW
                  </span>
                )}
              </div>
            </Link>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <Link to={`/product/${product._id}`} className="font-semibold text-gray-900 hover:text-black">
                  {product.name}
                </Link>
                <span className="font-bold text-gray-900">₹{product.price}</span>
              </div>
              <div className="flex items-center mb-3">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={i < (product.rating || 0) ? 'fill-current' : 'fill-gray-300'} />
                  ))}
                </div>
                <span className="text-gray-500 text-sm ml-2">({product.reviewCount || 0})</span>
              </div>
              <button
                onClick={() => handleAddToCart(product)}
                className="w-full bg-black text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default Collection;