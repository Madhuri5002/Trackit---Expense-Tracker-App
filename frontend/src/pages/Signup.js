import React, { useEffect, useState, useRef } from 'react';
import { axiosClient } from '../utils/axiosClient';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

function Signup() {
  document.title = 'SignUp';
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
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
      await axiosClient.post('/auth/signup', {
        username,
        email,
        password,
      });
      toast.success('Registered Successfully!');
      ref.current.complete();
      navigate('/login');
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="w-screen h-screen flex font-sans">
      <LoadingBar color="#a855f7" ref={ref} />

      {/* Left section */}
      <div className="w-2/5 relative h-full bg-black text-white flex items-center justify-center overflow-hidden">
       
        <div className="z-10 px-10 animate-trackitFade">
          <h1 className="text-6xl font-extrabold text-purple-500 mb-6 drop-shadow-md">
            Trackit
          </h1>
          <p className="text-lg leading-relaxed text-white space-y-2">
            ✦ Effortlessly manage your daily expenses<br />
            ✦ Get smart insights & visual summaries<br />
            ✦ Keep your savings on track with ease<br />
            ✦ All in a clean and modern interface
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="w-0.5 bg-purple-800" />

      {/* Signup form */}
      <div className="w-3/5 flex items-center justify-center bg-gradient-to-br from-black via-purple-950 to-black">
        <form
          onSubmit={submitForm}
          className="bg-black bg-opacity-40 rounded-2xl p-10 shadow-2xl flex flex-col gap-6 w-96 text-white animate-fade-in"
        >
          <h2 className="text-3xl font-bold text-purple-400 text-center mb-2">
            Create Account
          </h2>

          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            className="bg-black bg-opacity-60 border border-purple-700 focus:ring-2 focus:ring-purple-500 focus:outline-none rounded-xl p-3 text-white placeholder-gray-400"
            required
          />
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="bg-black bg-opacity-60 border border-purple-700 focus:ring-2 focus:ring-purple-500 focus:outline-none rounded-xl p-3 text-white placeholder-gray-400"
            required
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="bg-black bg-opacity-60 border border-purple-700 focus:ring-2 focus:ring-purple-500 focus:outline-none rounded-xl p-3 text-white placeholder-gray-400"
            required
          />

          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 transition-all duration-300 font-semibold rounded-xl py-3"
          >
            Sign Up
          </button>

          <p className="text-sm text-center mt-2">
            Already registered?{' '}
            <a href="/login" className="text-purple-300 underline hover:text-purple-400">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
