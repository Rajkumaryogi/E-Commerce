import { useState } from 'react';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const token= localStorage.getItem('token');

  useEffect(()=>{
    if (token) {
      login(token);
      window.location.href = '/'; // Redirect to home page if already logged in
    }
  })

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setIsLoading(true);
    try {
      const res = await API.post('/api/auth/login', form);
      login(res.data.token);
      toast.success('Logged in successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center font-mono p-8">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Login</h2>
        
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
          <input
            id="email"
            type="email"
            placeholder="your@email.com"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black-500"
            onChange={e => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black-500"
            onChange={e => setForm({ ...form, password: e.target.value })}
            required
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-gradient-to-r from-zinc-500 to-zinc-200 text-black font-medium py-3 px-6 rounded-lg flex items-center justify-center transition duration-300"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Logging in...
            </>
          ) : (
            'Login'
          )}
        </button>

        <div className="text-center text-gray-600 mb-4">- OR -</div>

        <Link 
          to="/register" 
          className="w-full block text-center bg-gray-100 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-200 transition duration-200"
        >
          Create New Account
        </Link>

        <div className="text-center mt-6">
          <Link to="/forgot-password" className="text-black-600 hover:underline">
            Forgot password?
          </Link>
        </div>
      </form>
    </div>
  );
}