import { useState } from 'react';
import axios from '../api/axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Assuming you have an auth context

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // Assuming your auth context has a login function

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // 1. Register the user
      const response = await axios.post('/auth/register', form);
      
      // 2. Automatically log in the user
      // Assuming the response contains tokens or user data
      const { token, user } = response.data;
      
      // Store the token and user data (implementation depends on your auth system)
      localStorage.setItem('token', token);
      login(user); // Update auth context
      
      // 3. Redirect to dashboard or home page
      navigate('/dashboard'); // or wherever you want to redirect
      
    } catch (error) {
      alert(error.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="flex justify-center font-mono p-8">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Create Account</h2>
        
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 mb-2">Full Name</label>
          <input
            id="name"
            type="text"
            placeholder="John Doe"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={e => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
          <input
            id="email"
            type="email"
            placeholder="your@email.com"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={e => setForm({ ...form, password: e.target.value })}
            required
            minLength="6"
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-200 mb-4 flex justify-center items-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Registering...
            </>
          ) : (
            'Register'
          )}
        </button>

        <div className="text-center text-gray-600 mb-4">Already have an account?</div>

        <Link 
          to="/login" 
          className="w-full block text-center bg-gray-100 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-200 transition duration-200 mb-4"
        >
          Login to your account
        </Link>

        <div className="text-center mt-4">
          <Link to="/forgot-password" className="text-blue-600 hover:underline">
            Forgot password?
          </Link>
        </div>
      </form>
    </div>
  );
}