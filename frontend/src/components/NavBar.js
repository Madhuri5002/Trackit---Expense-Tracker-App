import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { BsSendFill } from 'react-icons/bs';
import { sendEmail } from '../utils/renders';
import LoadingBar from 'react-top-loading-bar';

function NavBar({ data }) {
  const [isPressed, setIsPressed] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const ref = useRef(null);
  const navigate = useNavigate();

  const logoutHandle = async () => {
    try {
      ref.current.staticStart();
      localStorage.removeItem('User');
      toast.success("Logged out successfully!");
      ref.current.complete();
      navigate('/login');
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <LoadingBar color='#a855f7' ref={ref} />

      <div className='flex justify-between items-center w-full px-6 py-4 bg-[#0d0d0d] border-b border-purple-800 shadow-md z-50'>

        {/* TrackIt Brand */}
        <div className='text-4xl font-handjet font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-400 animate-textGlow'>
          TrackIt
        </div>

        {/* Right-side controls */}
        <div className='flex items-center gap-6'>

          {/* Email Dropdown */}
          <div className='relative'>
            <button
              onClick={() => setIsPressed(!isPressed)}
              className='bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-5 py-2 rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all duration-300'
            >
              Send Email
            </button>

            <div className={`transition-all duration-300 ease-in-out transform ${isPressed ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'} origin-top-right absolute right-0 mt-3 backdrop-blur-xl bg-[#1f1b2ed9] p-4 rounded-xl shadow-2xl w-80 z-50`}>
              <div className='flex justify-between items-center mb-3'>
                <input
                  type='email'
                  placeholder='Your Email'
                  onChange={(e) => setUserEmail(e.target.value)}
                  className='flex-grow bg-[#2a223d] text-white placeholder-gray-400 border border-purple-500 p-2 rounded-lg outline-none mr-3 text-sm focus:ring-2 focus:ring-purple-500'
                />
                <button
                  onClick={() => sendEmail(userEmail, data)}
                  className='p-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition'
                >
                  <BsSendFill size={18} />
                </button>
              </div>
              <p className='text-xs text-center text-gray-300'>📩 Monthly expense report will be sent</p>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={logoutHandle}
            className="relative inline-flex items-center justify-center px-6 py-2 overflow-hidden font-semibold text-white rounded-full shadow-lg group border border-purple-600 transition-all"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
            <span className="relative z-10 group-hover:text-white transition-all duration-300">Logout</span>
          </button>
        </div>
      </div>

      {/* Custom CSS for text animation */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: -500px 0; }
          100% { background-position: 500px 0; }
        }
        .animate-textGlow {
          background-size: 200% auto;
          animation: shimmer 3s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default NavBar;

