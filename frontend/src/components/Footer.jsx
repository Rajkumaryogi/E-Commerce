import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { MdOutlineLocalShipping, MdPayment, MdSupportAgent } from 'react-icons/md';
import Subscribe from './Subscribe';

const Footer = () => {
  return (
    <footer className="bg-gray-100 font-mono pt-12">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4">
        {/* Newsletter Section */}
        <div className="mb-12">
          <Subscribe />
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About Us */}
          <div>
            <h3 className="text-xl font-bold mb-4">CHLOTHZY</h3>
            <p className="text-gray-600 mb-4">
              Your premier destination for trendy and comfortable clothing since 2023.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/raj.yogi.1811" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-black-500 transition">
                <FaFacebook size={20} />
              </a>
              <a href="https://www.instagram.com/raj__yogii/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-500 transition">
                <FaInstagram size={20} />
              </a>
              <a href="https://x.com/rajkumar6777y" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-black-400 transition">
                <FaTwitter size={20} />
              </a>
              <a href="https://www.youtube.com/channel/UC5xLJOFefyvaL_cjLcvB_QQ" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500 transition">
                <FaYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-black transition">Home</a></li>
              <li><a href="/collection" className="text-gray-400 hover:text-black transition">Shop</a></li>
              <li><a href="/about" className="text-gray-400 hover:text-black transition">About Us</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-black transition">Contact</a></li>
              <li><a href="/collection" className="text-gray-400 hover:text-black transition">Blog</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-xl font-bold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><a href="/faq" className="text-gray-400 hover:text-black transition">FAQs</a></li>
              <li><a href="/shipping" className="text-gray-400 hover:text-black transition">Shipping Policy</a></li>
              <li><a href="/returns" className="text-gray-400 hover:text-black transition">Return Policy</a></li>
              <li><a href="/privacy" className="text-gray-400 hover:text-black transition">Privacy Policy</a></li>
              <li><a href="/terms" className="text-gray-400 hover:text-black transition">Terms of Service</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <address className="not-italic text-gray-600 space-y-2">
              <p>123 Fashion Street</p>
              <p>New York, NY 10001</p>
              <p>Email: info@chlothzy.com</p>
              <p>Phone: (123) 456-7890</p>
            </address>
            <a href="/admin" className="w-full bg-gradient-to-r from-zinc-500 to-zinc-200 text-black font-medium py-3 px-6 rounded-lg flex items-center justify-center">Admin Login</a>
          </div>
        </div>

        {/* Features Bar */}
        <div className="bg-gray-300 rounded-lg p-4 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <MdOutlineLocalShipping size={24} className="text-indigo-400" />
              <div>
                <h4 className="font-semibold">Free Shipping</h4>
                <p className="text-sm text-black">On orders over $50</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <MdPayment size={24} className="text-indigo-400" />
              <div>
                <h4 className="font-semibold">Secure Payment</h4>
                <p className="text-sm text-black">100% protected</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <MdSupportAgent size={24} className="text-indigo-400" />
              <div>
                <h4 className="font-semibold">24/7 Support</h4>
                <p className="text-sm text-black">Dedicated support</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="bg-gray-950 py-4">
        <div className="container mx-auto px-4 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} CHLOTHZY. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;