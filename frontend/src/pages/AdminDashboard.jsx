import { useState } from 'react';
import axios from '../api/axios';

export default function AdminDashboard() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    imageUrl: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/products', {
      ...form,
      price: parseFloat(form.price),
      stock: parseInt(form.stock)
    });
    alert('Product added!');
  };

  return (
    <div className="flex justify-center font-mono p-8">
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white shadow rounded p-6">
        <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
        <input
          placeholder="Name"
          className="w-full border p-2 mb-4 rounded"
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Description"
          className="w-full border p-2 mb-4 rounded"
          onChange={e => setForm({ ...form, description: e.target.value })}
        />
        <input
          placeholder="Price"
          className="w-full border p-2 mb-4 rounded"
          onChange={e => setForm({ ...form, price: e.target.value })}
        />
        <input
          placeholder="Category"
          className="w-full border p-2 mb-4 rounded"
          onChange={e => setForm({ ...form, category: e.target.value })}
        />
        <input
          placeholder="Stock"
          className="w-full border p-2 mb-4 rounded"
          onChange={e => setForm({ ...form, stock: e.target.value })}
        />
        <input
          placeholder="Image URL"
          className="w-full border p-2 mb-4 rounded"
          onChange={e => setForm({ ...form, imageUrl: e.target.value })}
        />
        <button className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700">
          Add Product
        </button>
      </form>
    </div>
  );
}
