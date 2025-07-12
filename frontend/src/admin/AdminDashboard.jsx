// import { useState } from 'react';
// import axios from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { useEffect } from 'react';

export default function Login() {
  const { login } = useAuth();
  const token= localStorage.getItem('token');

  useEffect(()=>{
    if (token) {
      login(token);
      window.location.href = '/admin/dashboard'; // Redirect to home page if already logged in
    }else {
      window.location.href = '/admin/login'; // Redirect to admin login if not logged in
    }
  }, [token, login]); // Added dependencies to useEffect to avoid infinite loop and ensure proper execution 

  return (
    <div className='flex justify-center items-center h-screen font-mono mt-12 text-black'>
    <h2>Admin dashboard Page</h2>
    </div>
  );
}