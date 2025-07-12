import { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaUser, FaShoppingCart } from "react-icons/fa";
import { HiMenuAlt3 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import logo from "../assets/logo_chlothzy.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  const token = localStorage.getItem("token");
  return (
    <nav className="bg-white font-mono shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        {/* Desktop Navbar - shown only on lg (1024px) and above */}
        <div className="hidden lg:flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="CHLOTHZY Logo" className="h-10 mr-2" />
            <span className="text-xl font-bold text-gray-800">CHLOTHZY</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-indigo-600 font-medium transition"
            >
              HOME
            </Link>
            <Link
              to="/collection"
              className="text-gray-700 hover:text-indigo-600 font-medium transition"
            >
              COLLECTION
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-indigo-600 font-medium transition"
            >
              ABOUT
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-indigo-600 font-medium transition"
            >
              CONTACT
            </Link>
          </div>

          {/* Search, User, Cart */}
          <div className="flex items-center space-x-6">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="pl-4 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-3 top-2 text-gray-500 hover:text-indigo-600"
              >
                <FaSearch />
              </button>
            </form>

            {/* User Login/Profile Dropdown */}
            <div className="relative group">
              <button className="text-gray-700 hover:text-indigo-600 focus:outline-none">
                <FaUser size={20} />
              </button>
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity z-50">
                {token ? (
                  <>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-indigo-50"
                    >
                      My Profile
                    </Link>
                    <button
                      onClick={() => {
                        localStorage.removeItem("token");
                        window.location.reload();
                      }}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-50"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-gray-700 hover:bg-indigo-50"
                  >
                    Login/Register
                  </Link>
                )}
              </div>
            </div>
            <Link
              to="/cart"
              className="text-gray-700 hover:text-indigo-600 relative"
            >
              <FaShoppingCart size={20} />
              <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </Link>
          </div>
        </div>

        {/* Mobile Navbar - shown below lg (1024px) */}
        <div className="lg:hidden flex items-center justify-between">
          {/* Logo and Hamburger Menu */}
          <div className="flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 mr-4"
            >
              {isMenuOpen ? (
                <AiOutlineClose size={24} />
              ) : (
                <HiMenuAlt3 size={24} />
              )}
            </button>
            <Link to="/" className="flex items-center">
              <img src={logo} alt="CHLOTHZY Logo" className="h-8 mr-2" />
              <span className="text-lg font-bold text-gray-800">CHLOTHZY</span>
            </Link>
          </div>

          {/* Mobile Icons */}
          <div className="flex items-center space-x-4">
            <Link to="/search" className="text-gray-700">
              <FaSearch size={18} />
            </Link>
            {token ? (
              // If logged in, show dropdown for profile/logout
              <div className="relative group">
                <button className="text-gray-700 hover:text-indigo-600 focus:outline-none">
                  <FaUser size={18} />
                </button>
                <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity z-50">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-indigo-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Profile
                  </Link>
                  <button
                    onClick={() => {
                      localStorage.removeItem("token");
                      window.location.reload();
                    }}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-50"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              // If not logged in, clicking icon goes directly to login
                <Link to="/login" className="text-gray-700">
                <FaUser size={18} />
                </Link>
              )}
              <Link to="/cart" className="text-gray-700 relative">
                <FaShoppingCart size={18} />
                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {JSON.parse(localStorage.getItem("cart") || "[]").length}
                </span>
              </Link>
              </div>
            </div>

            {/* Mobile Menu - shown below lg (1024px) */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white py-4 px-4 shadow-lg rounded-lg mt-2">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-gray-700 hover:text-indigo-600 font-medium transition"
                onClick={() => setIsMenuOpen(false)}
              >
                HOME
              </Link>
              <Link
                to="/collection"
                className="text-gray-700 hover:text-indigo-600 font-medium transition"
                onClick={() => setIsMenuOpen(false)}
              >
                COLLECTION
              </Link>
              <Link
                to="/about"
                className="text-gray-700 hover:text-indigo-600 font-medium transition"
                onClick={() => setIsMenuOpen(false)}
              >
                ABOUT
              </Link>
              <Link
                to="/contact"
                className="text-gray-700 hover:text-indigo-600 font-medium transition"
                onClick={() => setIsMenuOpen(false)}
              >
                CONTACT
              </Link>
            </div>

            {/* Mobile Search Form */}
            <form onSubmit={handleSearch} className="mt-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute right-3 top-2 text-gray-500 hover:text-indigo-600"
                >
                  <FaSearch />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
