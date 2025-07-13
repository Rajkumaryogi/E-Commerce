import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Footer from "./components/footer";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Collection from "./pages/Collection";
import ProductDetails from "./components/ProductDetails";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import AddProduct from "./admin/AddProduct";
import EditProduct from "./admin/EditProduct";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

// Main Layout component for regular pages
const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

// Admin Layout component
const AdminLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

// Create the router configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
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
          theme="colored"
          style={{ marginTop: "70px" }}
        />
        <MainLayout />
      </>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "collection",
        element: <Collection />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "products/:productId",
        element: <ProductDetails />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <>
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
          theme="colored"
          style={{ marginTop: "70px" }}
        />
        <AdminLayout />
      </>
    ),
    children: [
      {
        index: true,
        element: <AdminLogin />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "reset-password/:token",
        element: <ResetPassword />,
      },
      {
        path: "dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "products/add",
        element: <AddProduct />,
      },
      {
        path: "porducts/edit/:productId",
        element: <EditProduct />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
