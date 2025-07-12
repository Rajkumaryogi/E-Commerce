import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Footer from './components/footer';
import About from './pages/About';
import Contact from './pages/Contact';
import Collection from './pages/Collection';
import ProductDetails from './components/ProductDetails';
import AdminLogin from './pages/AdminLogin'; // Importing AdminLogin for admin authentication
import AdminDashboard from './admin/AdminDashboard'; 
import AddProduct from './admin/AddProduct'; // Importing AddProduct for admin product management
import EditProduct from './admin/EditProduct'; // Importing EditProduct for editing products

export default function App() {
  return (
    <>
      <Navbar />
      {/* ToastContainer must be placed here at the root level */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"  // Added for better visibility
        style={{ marginTop: '70px' }}  // Adjust based on your navbar height
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/products/add" element={<AddProduct />} />
        <Route path="/admin/products/edit/:productId" element={<EditProduct />} />


        {/* Add more routes as needed */}
      </Routes>
      <Footer />
    </>
  );
}