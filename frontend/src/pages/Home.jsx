import { useEffect, useState } from 'react';
import axios from 'axios';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addToCart } from '../services/cartService';
import { FaShoppingCart, FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import image1 from '../assets/image1.png';
import image2 from '../assets/image2.png';
import image3 from '../assets/image3.png';

// New Arrivals Slider Component
const NewArrivalsSlider = () => {
  const categories = [
    { label: 'Men', image: image3 },
    { label: 'Women', image: image1 },
    { label: 'Kids', image: image2 },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % categories.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row h-auto lg:h-[90vh] min-h-[400px] w-full overflow-hidden p-5">
      {/* Left Side Text - Now on top for mobile, left for desktop */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center lg:items-start p-6 md:p-10 bg-white order-1 lg:order-none">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-center lg:text-left">
          New Arrivals
        </h1>
        <AnimatePresence mode="wait">
          <motion.h2
            key={categories[index].label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-700 text-center lg:text-left"
          >
            {categories[index].label}'s Fashion
          </motion.h2>
        </AnimatePresence>
      </div>

      {/* Right Side Image - Now full width on mobile, half on desktop */}
      <div className="w-full lg:w-1/2 relative h-64 md:h-80 lg:h-full order-0 lg:order-none">
        <AnimatePresence mode="wait">
          <motion.img
            key={categories[index].label}
            src={categories[index].image}
            alt={categories[index].label}
            className="absolute w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          />
        </AnimatePresence>
      </div>
    </div>
  );
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10
    }
  }
};

const loadingVariants = {
  animate: {
    scale: [1, 1.1, 1],
    transition: {
      repeat: Infinity,
      duration: 1.5,
      ease: 'easeInOut'
    }
  }
};

const categoryColors = {
  Men: 'bg-white text-black-800',
  Women: 'bg-white text-black-800',
  Accessories: 'bg-white text-black-800',
  Footwear: 'bg-white text-black-800',
  Kids: 'bg-white text-black-800'
};

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedProduct, setExpandedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/products');
        setProducts(response.data);
      } catch (err) {
        setError(err.message);
        console.error('API Error:', err);
        toast.error('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (productId) => {
    try {
      await addToCart(productId, 1);
      toast.success('Added to cart!');
    } catch (err) {
      toast.error('Failed to add to cart : Login required');
      console.error('Add to cart error:', err);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <motion.div
        variants={loadingVariants}
        animate="animate"
        className="text-2xl font-semibold text-gray-600"
      >
        Loading...
      </motion.div>
    </div>
  );

  if (error) return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-8 text-center text-red-500"
    >
      Error: {error}
    </motion.div>
  );

  return (
    <div className="font-mono">
      {/* New Arrivals Slider at the top */}
      <NewArrivalsSlider />

      {/* Products Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="p-4 md:p-8"
      >
        <motion.h2 
          className="text-3xl font-bold mb-8 text-gray-800"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Our Products
        </motion.h2>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          variants={containerVariants}
        >
          {products.map(product => (
            <motion.div
              key={product._id}
              variants={itemVariants}
              whileHover={{ 
                y: -5,
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                transition: { duration: 0.2 }
              }}
              className="border rounded-xl overflow-hidden shadow-md bg-white transition-all duration-200"
            >
              <div className="relative">
                <Link to={`/products/${product._id}`} className="block">
                  {product.imageUrl ? (
                    <motion.img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-64 object-cover"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    />
                  ) : (
                    <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">No Image</span>
                    </div>
                  )}
                </Link>
                <span className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold ${categoryColors[product.category]}`}>
                  {product.category}
                </span>
                {product.stock < 5 && product.stock > 0 && (
                  <span className="absolute top-2 left-2 px-2 py-1 rounded-full bg-red-100 text-red-800 text-xs font-semibold">
                    Only {product.stock} left!
                  </span>
                )}
                {product.stock === 0 && (
                  <span className="absolute top-2 left-2 px-2 py-1 rounded-full bg-gray-200 text-gray-800 text-xs font-semibold">
                    Out of stock
                  </span>
                )}
              </div>

              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <Link to={`/products/${product._id}`} className="text-lg font-bold text-gray-800 hover:text-black">
                    {product.name}
                  </Link>
                  <p className="text-lg font-bold text-black">${(product.price).toFixed(2)}</p>
                </div>

                {product.brand && (
                  <p className="text-sm text-gray-500 mb-2">Brand: {product.brand}</p>
                )}

                <AnimatePresence>
                  {expandedProduct === product._id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                      {product.seller && (
                        <p className="text-xs text-gray-500">Sold by: {product.seller}</p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex justify-between items-center mt-4 space-x-2">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setExpandedProduct(expandedProduct === product._id ? null : product._id)}
                      className="text-sm text-black hover:text-black transition-colors"
                    >
                      {expandedProduct === product._id ? 'Show less' : 'Show more'}
                    </button>
                    
                    <Link 
                      to={`/products/${product._id}`}
                      className="flex items-center text-sm text-black hover:text-black transition-colors"
                    >
                      <FaEye className="mr-1" />
                      Details
                    </Link>
                  </div>
                  
                  <motion.button
                    onClick={() => handleAddToCart(product._id)}
                    disabled={product.stock === 0}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center px-3 py-1 rounded-md text-sm font-medium ${product.stock === 0 ? 
                      'bg-gray-300 text-gray-500 cursor-not-allowed' : 
                      'bg-black text-white hover:bg-gray-500'}`}
                  >
                    <FaShoppingCart className="mr-1" />
                    {product.stock === 0 ? 'Out of stock' : 'Add'}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {products.length === 0 && !loading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 text-gray-500"
          >
            No products available
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}