import React from 'react';
import { FaLeaf, FaHandshake, FaRocket } from 'react-icons/fa';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import aboutHero from '../assets/image.png'; // Replace with your image

const About = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8 }
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-7xl font-mono mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      {/* Hero Section */}
      <motion.div 
        className="flex flex-col md:flex-row items-center gap-12 mb-16"
        variants={containerVariants}
      >
        <motion.div className="md:w-1/2" variants={itemVariants}>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">About Us</h1>
          <p className="text-xl text-gray-600 mb-8">
            CHLOTHZY's brand and culture are carefully crafted, not cobbled together, 
            to deliver a delightful experience for our customers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-black hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300"
            >
              Shop Now
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-6 rounded-lg transition duration-300"
            >
              Contact Us
            </motion.button>
          </div>
        </motion.div>
        <motion.div 
          className="md:w-1/2"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <img 
            src={aboutHero} 
            alt="CHLOTHZY team" 
            className="rounded-lg shadow-xl w-full h-auto border-4 border-white transform rotate-1"
          />
        </motion.div>
      </motion.div>

      <motion.div 
        className="border-t border-gray-200 my-12"
        variants={fadeIn}
      ></motion.div>

      {/* Mission Section */}
      <motion.div 
        className="text-center mb-16"
        variants={itemVariants}
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Our Mission: Helping People Dress Better
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We believe not just in looking good, but in feeling good about what you wear. 
          And feeling good means aligning your personal style with comfort and sustainability. 
          A win for you and a win for the planet!
        </p>
      </motion.div>

      {/* Values Section */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        variants={containerVariants}
      >
        <motion.div 
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          variants={itemVariants}
          whileHover={{ y: -5 }}
        >
          <div className="text-black mb-4">
            <FaLeaf size={32} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">Sustainable Fashion</h3>
          <p className="text-gray-600">
            We're committed to eco-friendly materials and ethical manufacturing processes 
            that reduce our environmental impact.
          </p>
        </motion.div>

        <motion.div 
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          variants={itemVariants}
          whileHover={{ y: -5 }}
        >
          <div className="text-black mb-4">
            <FaHandshake size={32} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">Customer First</h3>
          <p className="text-gray-600">
            Your satisfaction is our priority. We stand behind our products with 
            a 100% satisfaction guarantee.
          </p>
        </motion.div>

        <motion.div 
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          variants={itemVariants}
          whileHover={{ y: -5 }}
        >
          <div className="text-black mb-4">
            <FaRocket size={32} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">Innovative Design</h3>
          <p className="text-gray-600">
            Our team of designers constantly pushes boundaries to create unique, 
            trend-setting styles you'll love.
          </p>
        </motion.div>
      </motion.div>

      {/* Team Section */}
      <motion.div 
        className="mb-16"
        variants={itemVariants}
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Meet Our Team</h2>
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
          variants={containerVariants}
        >
          {[1, 2, 3, 4].map((item) => (
            <motion.div 
              key={item} 
              className="text-center"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <div className="bg-gray-200 rounded-full w-32 h-32 mx-auto mb-4 overflow-hidden">
                {/* Replace with actual team member images */}
                <div className="w-full h-full bg-gray-300"></div>
              </div>
              <h3 className="font-bold text-gray-900">Team Member {item}</h3>
              <p className="text-gray-600">Position/Role</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default About;