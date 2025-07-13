import { useEffect, useState } from "react";
import { getCart, removeFromCart, updateCartItem } from "../services/cartService";
import { FaTrash, FaPlus, FaMinus, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await getCart();
        if (data?.items) {
          setCart(data.items);
        } else if (Array.isArray(data)) {
          setCart(data);
        } else if (data) {
          setCart([data]);
        } else {
          setCart([]);
        }
      } catch (err) {
        setError("Login required to load cart.");
        console.error("Error fetching cart:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  const handleRemoveItem = async (productId) => {
    try {
      await removeFromCart(productId);
      setCart(cart.filter(item => item.product._id !== productId));
    } catch (err) {
      console.error("Error removing item:", err);
      setError("Failed to remove item.");
    }
  };

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await updateCartItem(productId, newQuantity);
      setCart(cart.map(item =>
        item.product._id === productId ? { ...item, quantity: newQuantity } : item
      ));
    } catch (err) {
      console.error("Error updating quantity:", err);
      setError("Failed to update quantity.");
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const price = item.product?.price || item.price;
      return total + (price * item.quantity);
    }, 0).toFixed(2);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-semibold">Loading your cart...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="text-2xl font-semibold mb-4">Your cart is empty</div>
        <Link to="/collection" className="bg-black text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Shopping Cart</h1>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="divide-y divide-gray-200">
            {cart.map(item => {
              const product = item.product || item;
              const price = product.price;
              const totalPrice = (price * item.quantity).toFixed(2);

              return (
                <div key={item._id || product._id} className="p-6 flex flex-col sm:flex-row">
                  <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
                    <img
                      className="h-24 w-24 rounded-md object-cover"
                      src={product.imageUrl || "https://via.placeholder.com/150"}
                      alt={product.name}
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                        <p className="text-sm text-gray-500">{product.brand}</p>
                      </div>
                      <div className="flex flex-col items-end">
                        <p className="text-lg font-semibold text-gray-900">₹{totalPrice}</p>
                        <p className="text-sm text-gray-500">₹{price.toFixed(2)} × {item.quantity}</p>
                      </div>
                    </div>

                    <p className="mt-1 text-sm text-gray-500">{product.description}</p>

                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <div className="flex items-center border border-gray-300 rounded-md">
                        <button
                          onClick={() => handleQuantityChange(product._id, item.quantity - 1)}
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                          disabled={item.quantity <= 1}
                        >
                          <FaMinus size={12} />
                        </button>
                        <span className="px-4 py-1 w-12 text-center">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(product._id, item.quantity + 1)}
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                          disabled={item.quantity >= product.stock}
                        >
                          <FaPlus size={12} />
                        </button>
                      </div>

                      <Link
                        to={`/products/${product._id}`}
                        className="flex items-center px-3 py-2 text-black hover:text-black border border-black hover:bg-indigo-50 rounded-md transition"
                      >
                        <FaEye className="mr-2" />
                        <span className="text-sm">View Details</span>
                      </Link>

                      <button
                        onClick={() => handleRemoveItem(product._id)}
                        className="flex items-center px-3 py-2 text-red-500 hover:text-red-700 border border-red-500 hover:bg-red-50 rounded-md transition"
                      >
                        <FaTrash className="mr-2" />
                        <span className="text-sm">Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="border-t border-gray-200 px-6 py-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Order Summary</h3>
              <p className="text-xl font-semibold text-gray-900">₹{calculateTotal()}</p>
            </div>

            <div className="mt-6">
              <Link
                to="/checkout"
                className="block w-full text-center bg-black text-white py-3 px-4 rounded-md text-base font-medium hover:bg-indigo-700"
              >
                Proceed to Checkout
              </Link>
            </div>

            <div className="mt-4 flex justify-center">
              <Link to="/collection" className="text-black hover:text-indigo-500 text-sm font-medium">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
