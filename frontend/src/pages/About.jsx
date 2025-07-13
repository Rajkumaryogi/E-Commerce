import React from 'react';
import { FaLeaf, FaHandshake, FaRocket } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import aboutHero from '../assets/image.png';

const About = () => {
 const navigate = useNavigate();

 const containerVariants = {
   hidden: { opacity: 0 },
   visible: {
     opacity: 1,
     transition: { staggerChildren: 0.1, delayChildren: 0.2 }
   }
 };

 const itemVariants = {
   hidden: { y: 20, opacity: 0 },
   visible: {
     y: 0,
     opacity: 1,
     transition: { duration: 0.5 }
   }
 };

 const fadeIn = {
   hidden: { opacity: 0 },
   visible: {
     opacity: 1,
     transition: { duration: 0.8 }
   }
 };

 const teamImages = [
   'https://randomuser.me/api/portraits/women/44.jpg',
   'https://randomuser.me/api/portraits/men/32.jpg',
   'https://randomuser.me/api/portraits/women/68.jpg',
   'https://randomuser.me/api/portraits/men/19.jpg'
 ];

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
             onClick={() => navigate('/')}
             className="bg-black hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300"
           >
             Shop Now
           </motion.button>
           <motion.button
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
             onClick={() => navigate('/contact')}
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
     <motion.div className="text-center mb-16" variants={itemVariants}>
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
       {[{
         icon: <FaLeaf size={32} />,
         title: "Sustainable Fashion",
         desc: "We're committed to eco-friendly materials and ethical manufacturing processes that reduce our environmental impact."
       },
       {
         icon: <FaHandshake size={32} />,
         title: "Customer First",
         desc: "Your satisfaction is our priority. We stand behind our products with a 100% satisfaction guarantee."
       },
       {
         icon: <FaRocket size={32} />,
         title: "Innovative Design",
         desc: "Our designers constantly push boundaries to create unique, trend-setting styles you'll love."
       }].map((item, i) => (
         <motion.div
           key={i}
           className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
           variants={itemVariants}
           whileHover={{ y: -5 }}
         >
           <div className="text-black mb-4">{item.icon}</div>
           <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
           <p className="text-gray-600">{item.desc}</p>
         </motion.div>
       ))}
     </motion.div>

     {/* Team Section */}
     <motion.div className="mb-16" variants={itemVariants}>
       <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Meet Our Team</h2>
       <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-6" variants={containerVariants}>
         {teamImages.map((url, index) => (
           <motion.div
             key={index}
             className="text-center"
             variants={itemVariants}
             whileHover={{ scale: 1.05 }}
           >
             <div className="rounded-full w-32 h-32 mx-auto mb-4 overflow-hidden border-4 border-gray-300">
               <img src={url} alt={`Team member ${index + 1}`} className="w-full h-full object-cover" />
             </div>
             <h3 className="font-bold text-gray-900">Team Member {index + 1}</h3>
             <p className="text-gray-600">Position/Role</p>
           </motion.div>
         ))}
       </motion.div>
     </motion.div>
   </motion.div>
 );
};

export default About;