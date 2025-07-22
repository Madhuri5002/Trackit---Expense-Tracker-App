import React, { useEffect, useState, useRef } from 'react';
import { axiosClient } from '../utils/axiosClient';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import LoadingBar from 'react-top-loading-bar';
import { motion } from 'framer-motion';

document.title = 'Login';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const ref = useRef(null);

  useEffect(() => {
    if (localStorage.getItem('User')) {
      navigate('/');
    }
  }, [navigate]);

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      ref.current.staticStart();
      const response = await axiosClient.post('/auth/login', { email, password });
      if (response.data.statusCode !== 201) {
        toast.error(response.data.message);
        return;
      }
      toast.success('Successfully Logged In !!');
      localStorage.setItem('User', JSON.stringify(response.data.message));
      ref.current.complete();
      navigate('/');
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <motion.div
      className="flex flex-col md:flex-row h-screen w-screen overflow-hidden bg-[#0d0d0d]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <LoadingBar color="#a855f7" ref={ref} />

      {/* Left Login Form */}
      <motion.div
        className="w-full md:w-1/2 flex items-center justify-center p-8 bg-[#1f1b2e]"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <form onSubmit={submitForm} className="w-full max-w-sm space-y-6 text-white">
          <motion.h2
            className="text-4xl font-bold"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Welcome Back
          </motion.h2>
          <p className="text-gray-300">Login to your account</p>

          <motion.input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-5 py-3 rounded-md bg-[#2a223d] text-white border border-gray-600 placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-purple-400 transition-all"
            whileFocus={{ scale: 1.02 }}
          />

          <motion.input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-5 py-3 rounded-md bg-[#2a223d] text-white border border-gray-600 placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-purple-400 transition-all"
            whileFocus={{ scale: 1.02 }}
          />

          <motion.button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-md font-semibold hover:bg-purple-500 transition-all"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Login
          </motion.button>

          <div className="text-sm text-gray-400 text-center">
            Don't have an account?{' '}
            <a href="/signup" className="text-purple-300 hover:underline">
              Register here
            </a>
          </div>
        </form>
      </motion.div>

      {/* Right Image */}
      <motion.div
        className="hidden md:block w-1/2"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <img
          src="https://dfi.wa.gov/sites/default/files/budget-16x9.jpg" 
          alt="Finance login visual"
          className="w-full h-full object-cover object-center"
        />
      </motion.div>
    </motion.div>
  );
}

export default Login;
