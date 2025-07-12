import { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    inquiry: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Form submitted:', formData);
    toast.success('Thank you for your message! We will get back to you soon.');
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      inquiry: ''
    });
    setIsSubmitting(false);
  };

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

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-7xl font-mono mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      {/* Hero Section */}
      <motion.div 
        variants={itemVariants}
        className="flex flex-col md:flex-row items-center gap-12 mb-16"
      >
        <div className="md:w-1/2">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Need to get in touch with us? Fill out the form with your inquiry or find the 
            department you'd like to contact below.
          </p>
          <div className="border-t border-gray-200 pt-6 space-y-4">
            <motion.div 
              whileHover={{ x: 5 }}
              className="flex items-start gap-4"
            >
              <div className="p-2 bg-indigo-100 rounded-full">
                <FaEnvelope className="text-black text-lg" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Email</h3>
                <a href="mailto:support@chlothzy.com" className="text-black hover:underline">
                  support@chlothzy.com
                </a>
              </div>
            </motion.div>
            <motion.div 
              whileHover={{ x: 5 }}
              className="flex items-start gap-4"
            >
              <div className="p-2 bg-indigo-100 rounded-full">
                <FaPhone className="text-black text-lg" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Phone</h3>
                <a href="tel:+1234567890" className="text-black hover:underline">
                  (123) 456-7890
                </a>
              </div>
            </motion.div>
            <motion.div 
              whileHover={{ x: 5 }}
              className="flex items-start gap-4"
            >
              <div className="p-2 bg-indigo-100 rounded-full">
                <FaMapMarkerAlt className="text-black text-lg" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Address</h3>
                <p className="text-gray-600">123 Fashion Street, New York, NY 10001</p>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Contact Form - Moved to where the image was */}
        <div className="md:w-1/2">
          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-xl shadow-2xl p-8 border border-gray-100"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FaPaperPlane className="text-black" />
              Send us a message
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <motion.div variants={itemVariants}>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    First name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Last name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  />
                </motion.div>
              </div>
              <motion.div variants={itemVariants} className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                />
              </motion.div>
              <motion.div variants={itemVariants} className="mb-6">
                <label htmlFor="inquiry" className="block text-sm font-medium text-gray-700 mb-1">
                  What can we help you with? *
                </label>
                <textarea
                  id="inquiry"
                  name="inquiry"
                  value={formData.inquiry}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                ></textarea>
              </motion.div>
              <motion.div variants={itemVariants}>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                  className={`w-full bg-gradient-to-r from-zinc-500 to-zinc-200 text-black font-medium py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2 ${
                    isSubmitting ? 'opacity-80' : 'hover:shadow-lg'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      Submit Message
                    </>
                  )}
                </motion.button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </motion.div>

      {/* Departments Section */}
      <motion.div variants={itemVariants} className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          <span className="text-4xl font-bold text-gray-900 mb-6">
            Contact Our Departments
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Customer Support",
              email: "support@chlothzy.com",
              description: "For order inquiries, returns, and general questions",
              icon: <FaEnvelope className="text-black text-xl" />
            },
            {
              title: "Wholesale Inquiries",
              email: "wholesale@chlothzy.com",
              description: "For bulk orders and partnership opportunities",
              icon: <FaPhone className="text-black text-xl" />
            },
            {
              title: "Press & Media",
              email: "press@chlothzy.com",
              description: "For media inquiries and collaborations",
              icon: <FaMapMarkerAlt className="text-black text-xl" />
            }
          ].map((department, index) => (
            <motion.div 
              key={index}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-indigo-100 rounded-full">
                  {department.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900">{department.title}</h3>
              </div>
              <a 
                href={`mailto:${department.email}`} 
                className="text-black hover:underline block mb-3 font-medium"
              >
                {department.email}
              </a>
              <p className="text-gray-600">{department.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Contact;