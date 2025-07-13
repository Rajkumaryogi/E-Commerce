import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom"; // Added useLocation
import { FaSearch, FaUser, FaShoppingCart } from "react-icons/fa";
import { HiMenuAlt3 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import logo from "../assets/logo_C.png";
import { getCart } from "../services/cartService";
import { toast } from 'react-toastify';
import { useContext } from "react";
import { UserContext } from "../context/userContext";


const Navbar = () => {
  const location = useLocation(); // Get current route location
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const [currentTermIndex, setCurrentTermIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const {cartCount,setCartCount} = useContext(UserContext)

  const searchTerms = [
    "Search products...",
    "Find by name...",
    "Look by category...",
    "Search brands...",
    "Filter by price...",
  ];

  // Typewriter effect for search placeholder
  useEffect(() => {
    let timeout;
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseBetween = 1500;

    if (isTyping) {
      if (currentCharIndex < searchTerms[currentTermIndex].length) {
        timeout = setTimeout(() => {
          setPlaceholder(
            (prev) => prev + searchTerms[currentTermIndex][currentCharIndex]
          );
          setCurrentCharIndex((prev) => prev + 1);
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => {
          setIsTyping(false);
          setIsDeleting(true);
        }, pauseBetween);
      }
    } else if (isDeleting) {
      if (currentCharIndex > 0) {
        timeout = setTimeout(() => {
          setPlaceholder((prev) => prev.slice(0, -1));
          setCurrentCharIndex((prev) => prev - 1);
        }, deletingSpeed);
      } else {
        setIsDeleting(false);
        setCurrentTermIndex((currentTermIndex + 1) % searchTerms.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [currentCharIndex, currentTermIndex, isTyping, isDeleting]);

    const fetchCart = async () => {
      try {
        const data = await getCart();        
        if (data) {
          setCartCount(data.length);
        }
      } catch (err) {
        console.error("Error fetching cart:", err);
      }
    };
    useEffect(() => {
      fetchCart();
    }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  // Helper function to check if link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  const token = localStorage.getItem("token");
  return (
    <nav className="bg-white font-mono shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        {/* Desktop Navbar */}
        <div className="hidden lg:flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="CHLOTHZY" className="h-20 mr-2" />
          </Link>

          {/* Navigation Links with active state */}
          <div className="flex space-x-8">
            <Link
              to="/"
              className={`${
                isActive("/")
                  ? "text-black border-b-2 border-black"
                  : "text-gray-700 hover:text-black"
              } font-medium transition pb-1`}
            >
              HOME
            </Link>
            <Link
              to="/collection"
              className={`${
                isActive("/collection")
                  ? "text-black border-b-2 border-black"
                  : "text-gray-700 hover:text-black"
              } font-medium transition pb-1`}
            >
              COLLECTION
            </Link>
            <Link
              to="/about"
              className={`${
                isActive("/about")
                  ? "text-black border-b-2 border-black"
                  : "text-gray-700 hover:text-black"
              } font-medium transition pb-1`}
            >
              ABOUT
            </Link>
            <Link
              to="/contact"
              className={`${
                isActive("/contact")
                  ? "text-black border-b-2 border-black"
                  : "text-gray-700 hover:text-black"
              } font-medium transition pb-1`}
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
                placeholder={placeholder}
                className="pl-4 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-3 top-2 text-gray-500 hover:text-black"
              >
                <FaSearch />
              </button>
            </form>

            {/* User Login/Profile Dropdown */}
            <div className="relative group">
              <button
                className={`${
                  isActive("/profile") || isActive("/login")
                    ? "text-black"
                    : "text-gray-700"
                } hover:text-black focus:outline-none`}
              >
                <FaUser size={20} />
              </button>
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity z-50">
                {token ? (
                  <>
                    <Link
                      to="/profile"
                      className={`block px-4 py-2 ${
                        isActive("/profile")
                          ? "bg-indigo-50 text-black"
                          : "text-gray-700 hover:bg-indigo-50"
                      }`}
                    >
                      My Profile
                    </Link>
                    <button
                      onClick={() => {
                        localStorage.removeItem("token");
                        window.location.href = "/";
                      }}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-50"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className={`block px-4 py-2 ${
                      isActive("/login")
                        ? "bg-indigo-50 text-black"
                        : "text-gray-700 hover:bg-indigo-50"
                    }`}
                  >
                    Login/Register
                  </Link>
                )}
              </div>
            </div>
            <Link
              to="/cart"
              className={`${
                isActive("/cart") ? "text-black" : "text-gray-700"
              } hover:text-black relative`}
            >
              <FaShoppingCart size={20} />
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            </Link>
          </div>
        </div>

        {/* Mobile Navbar */}
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
            <Link
              to="/search"
              className={`${
                isActive("/search") ? "text-black" : "text-gray-700"
              }`}
            >
              <FaSearch size={18} />
            </Link>
            {token ? (
              <div className="relative group">
                <button
                  className={`${
                    isActive("/profile") ? "text-black" : "text-gray-700"
                  } hover:text-black focus:outline-none`}
                >
                  <FaUser size={18} />
                </button>
                <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity z-50">
                  <Link
                    to="/profile"
                    className={`block px-4 py-2 ${
                      isActive("/profile")
                        ? "bg-indigo-50 text-black"
                        : "text-gray-700 hover:bg-indigo-50"
                    }`}
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
              <Link
                to="/login"
                className={`${
                  isActive("/login") ? "text-black" : "text-gray-700"
                }`}
              >
                <FaUser size={18} />
              </Link>
            )}
            <Link
              to="/cart"
              className={`${
                isActive("/cart") ? "text-black" : "text-gray-700"
              } relative`}
            >
              <FaShoppingCart size={18} />
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {JSON.parse(localStorage.getItem("cart") || "[]").length}
              </span>
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white py-4 px-4 shadow-lg rounded-lg mt-2">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className={`${
                  isActive("/")
                    ? "text-black font-semibold"
                    : "text-gray-700"
                } hover:text-black transition`}
              >
                HOME
              </Link>
              <Link
                to="/collection"
                className={`${
                  isActive("/collection")
                    ? "text-black font-semibold"
                    : "text-gray-700"
                } hover:text-black transition`}
              >
                COLLECTION
              </Link>
              <Link
                to="/about"
                className={`${
                  isActive("/about")
                    ? "text-black font-semibold"
                    : "text-gray-700"
                } hover:text-black transition`}
              >
                ABOUT
              </Link>
              <Link
                to="/contact"
                className={`${
                  isActive("/contact")
                    ? "text-black font-semibold"
                    : "text-gray-700"
                } hover:text-black transition`}
              >
                CONTACT
              </Link>
            </div>

            {/* Mobile Search Form */}
            <form onSubmit={handleSearch} className="mt-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder={placeholder}
                  className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute right-3 top-2 text-gray-500 hover:text-black"
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
