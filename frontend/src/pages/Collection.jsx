import { useState, useEffect } from 'react';
import axios from 'axios';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';

// Animation variants
const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 1 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100, damping: 10 }
  }
};

const Collection = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const { category } = useParams();

  const filters = [
    { id: 'all', name: 'All Products' },
    { id: 'men', name: 'Men' },
    { id: 'women', name: 'Women' },
    { id: 'accessories', name: 'Accessories' },
    { id: 'footwear', name: 'Footwear' },
    { id: 'kids', name: 'Kids' }
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`);
        console.log('Fetched products:', res.data);
        setProducts(res.data);
        setFilteredProducts(res.data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (category) {
      const lower = category.toLowerCase();
      setActiveFilter(lower);
      filterProducts(lower);
    }
  }, [category, products]);

  const filterProducts = (filter) => {
    setActiveFilter(filter);
    if (filter === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((p) => p.category.toLowerCase() === filter.toLowerCase())
      );
    }
  };

  useEffect(()=>{
    console.warn('Filtered products:', filteredProducts);
    
  })

  if (loading)
    return (
      <motion.div className="flex items-center justify-center h-64" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full"
        />
      </motion.div>
    );

  if (error)
    return (
      <motion.div className="p-8 text-center text-red-500" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        Error: {error}
      </motion.div>
    );

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="container font-mono mx-auto px-4 py-8"
    >
      {/* Header */}
      <motion.div className="text-center mb-12" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          {activeFilter !== 'all'
            ? `${activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)} Collection`
            : 'Our Collection'}
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Explore our latest products across categories.
        </p>
      </motion.div>

      {/* Filter Buttons */}
      <motion.div
        className="flex flex-wrap justify-center gap-2 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {filters.map((f) => (
          <motion.button
            key={f.id}
            onClick={() => filterProducts(f.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              activeFilter === f.id
                ? 'bg-black text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {f.name}
          </motion.button>
        ))}
      </motion.div>

      {/* Product Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        // variants={containerVariants}
      >
        {filteredProducts.map((product) => (
          <motion.div
            key={product._id}
            variants={itemVariants}
            whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
            className="bg-gray-100 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="relative h-64">
              <motion.img
                src={product.imageUrl || 'https://via.placeholder.com/300x400?text=No+Image'}
                alt={product.name}
                className="w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              />
              {product.onSale && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded"
                >
                  SALE
                </motion.div>
              )}
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-lg text-gray-900">{product.name}</h3>
                <div className="text-right">
                  <span
                    className={`text-lg font-bold ${
                      product.onSale ? 'text-red-500' : 'text-gray-900'
                    }`}
                  >
                    ₹{product.price}
                  </span>
                  {product.onSale && (
                    <div className="text-xs text-gray-400 line-through">
                      ₹{product.originalPrice}
                    </div>
                  )}
                </div>
              </div>
              <p className="text-gray-500 text-sm mt-1">{product.category}</p>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full mt-4 bg-black text-white py-2 rounded-lg text-sm font-medium"
              >
                Add to Cart
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {filteredProducts.length === 0 && (
        <motion.div className="text-center py-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h3 className="text-xl font-medium text-gray-500">
            No products found in this collection
          </h3>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Collection;
