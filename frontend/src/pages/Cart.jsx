import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cart, removeFromCart } = useCart();

  return (
    <div className="font-mono p-8">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map(item => (
            <div key={item._id} className="border p-4 rounded flex justify-between items-center">
              <h4 className="font-semibold">{item.name}</h4>
              <button
                onClick={() => removeFromCart(item._id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
