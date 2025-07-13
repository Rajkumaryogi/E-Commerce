import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API from '../api/axios';

const ResetPassword = () => {
 const [password, setPassword] = useState('');
 const [confirmPassword, setConfirmPassword] = useState('');
 const [isLoading, setIsLoading] = useState(false);
 const [tokenError] = useState(''); // Optional: You can implement token validation later
 const { token } = useParams();
 const navigate = useNavigate();

 const handleSubmit = async (e) => {
   e.preventDefault();

   if (password.length < 6) {
     toast.error('Password must be at least 6 characters');
     return;
   }

   if (password !== confirmPassword) {
     toast.error('Passwords do not match');
     return;
   }

   try {
     setIsLoading(true);
     const response = await API.post(`/api/admin/forgot-password/${token}`, { password });
     console.log(response.data);

     if (response.data.success) {
       toast.success('Password reset successfully! Redirecting to login...');
       setTimeout(() => navigate('/admin'), 2000);
     } else {
       toast.error(response.data.message || 'Failed to reset password');
     }
   } catch (error) {
     console.error('Password reset error:', error);
     toast.error(error.response?.data?.message || ' Invalid token or Failed to reset password. Please try again.');
   } finally {
     setIsLoading(false);
   }
 };

 if (tokenError) {
   return (
     <div className="flex items-center justify-center min-h-screen bg-red-50">
       <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full border border-red-400">
         <h2 className="text-2xl font-semibold text-red-600 mb-4">Password Reset Failed</h2>
         <p className="text-red-500 mb-6">{tokenError}</p>
         <button
           onClick={() => navigate('/admin/forgot-password')}
           className="w-full py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded mb-3"
         >
           Request New Reset Link
         </button>
         <button
           onClick={() => navigate('/admin')}
           className="w-full py-2 px-4 bg-gray-500 hover:bg-gray-600 text-white rounded"
         >
           Back to Login
         </button>
       </div>
     </div>
   );
 }

 return (
   <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
     <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
       <h2 className="text-2xl font-bold text-center text-gray-600 mb-4">Reset Your Password</h2>
       <p className="text-gray-600 text-sm text-center mb-6">Enter your new password below</p>

       <form onSubmit={handleSubmit} className="space-y-4">
         <div>
           <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
             New Password
           </label>
           <input
             type="password"
             id="password"
             value={password}
             onChange={(e) => setPassword(e.target.value)}
             placeholder="At least 6 characters"
             required
             minLength="6"
             className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
           />
         </div>

         <div>
           <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
             Confirm Password
           </label>
           <input
             type="password"
             id="confirmPassword"
             value={confirmPassword}
             onChange={(e) => setConfirmPassword(e.target.value)}
             placeholder="Re-enter your new password"
             required
             minLength="6"
             className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
           />
         </div>

         <button
           type="submit"
           className={`w-full py-2 px-4 text-white font-semibold rounded ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-600 hover:bg-gray-700'}`}
           disabled={isLoading}
         >
           {isLoading ? 'Resetting...' : 'Reset Password'}
         </button>
       </form>
     </div>
   </div>
 );
};

export default ResetPassword;

