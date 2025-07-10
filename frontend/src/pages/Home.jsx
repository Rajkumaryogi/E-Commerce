import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

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

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/products');
        setProducts(response.data);
      } catch (err) {
        setError(err.message);
        console.error('API Error:', {
          message: err.message,
          code: err.code,
          config: err.config,
          response: err.response
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="p-8"
    >
      <motion.h2 
        className="text-2xl font-bold mb-6"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Products
      </motion.h2>
      
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
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
            className="border rounded-lg shadow-md p-4 bg-white"
          >
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-600">${product.price}</p>
            {product.imageUrl && (
              <motion.img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-48 object-cover mt-2 rounded"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              />
            )}
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}