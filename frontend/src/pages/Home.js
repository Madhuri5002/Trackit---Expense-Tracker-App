import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Items from '../components/Items';
import { Chartss } from '../components/Chartss';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import LoadingBar from 'react-top-loading-bar';
import { createExpense, getUserExpenses } from '../utils/renders';
import NavBar from '../components/NavBar';

function Home() {
  const navigate = useNavigate();
  const [selectDate, setSelectedDate] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [userdata] = useState(JSON.parse(localStorage.getItem('User')));
  const [userexp, setUserexp] = useState([]);
  const ref = useRef(null);

  document.title = 'Home';

  useEffect(() => {
    if (!localStorage.getItem('User')) {
      navigate('/login');
    }
    getUserExpenses(userdata._id).then((data) => setUserexp(data));
  }, [userdata._id, navigate]);

  const getTotal = () => userexp.reduce((sum, item) => sum + item.amount, 0);

  const handleCreateExpense = () => {
    if (!amount || !category || !selectDate) return;
    const expInfo = {
      usersid: userdata._id,
      category,
      date: selectDate,
      amount: Number(amount)
    };
    ref.current.staticStart();
    createExpense(expInfo).then(() => {
      getUserExpenses(userdata._id).then((data) => {
        setUserexp(data);
        ref.current.complete();
      });
    });
  };

  return (
    <div className='min-h-screen w-full font-mont bg-[#0d0d0d]'>
      <LoadingBar color='#a855f7' ref={ref} />
      <NavBar data={userexp} />

      <div className='Feed w-[90%] mx-auto relative h-[calc(100%-6rem)] flex flex-col lg:flex-row gap-8 pt-4 pb-8'>

        {/* Left - Chart */}
        <div className='w-full lg:w-1/2 h-full p-4'>
          <div className='bg-[#1f1b2e] p-6 rounded-2xl shadow-xl h-full'>
            <Chartss exdata={userexp} />
          </div>
        </div>

        {/* Right - Form and List */}
        <div className='w-full lg:w-1/2 flex flex-col gap-8'>

          {/* Create Transaction */}
          <div className='bg-[#1f1b2e] rounded-2xl p-6 shadow-lg'>
            <h2 className='text-2xl font-bold text-white text-center mb-4'>Create Transaction</h2>

            <div className='flex flex-col sm:flex-row gap-4 mb-4'>
              <input
                type='number'
                onChange={(e) => setAmount(e.target.value)}
                placeholder='Amount'
                className='w-full sm:w-1/2 text-sm placeholder-gray-300 text-white bg-[#2a223d] border border-gray-600 p-3 rounded-xl outline-none focus:ring-2 focus:ring-purple-500'
              />
              <select
                onChange={(e) => setCategory(e.target.value)}
                defaultValue=""
                className="w-full sm:w-1/2 bg-[#2a223d] border text-white border-gray-600 text-sm rounded-xl p-3 outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">--Select Category--</option>
                <option value="Grocery">Grocery</option>
                <option value="Vehicle">Vehicle</option>
                <option value="Shopping">Shopping</option>
                <option value="Travel">Travel</option>
                <option value="Food">Food</option>
                <option value="Fun">Fun</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className='flex flex-col sm:flex-row gap-4'>
              <DatePicker
                selected={selectDate}
                onChange={(date) => setSelectedDate(date)}
                className="w-full sm:w-1/2 p-3 rounded-xl bg-[#2a223d] text-white border border-gray-600 placeholder-gray-300 outline-none focus:ring-2 focus:ring-purple-500"
                placeholderText="Select Date"
                showYearDropdown
              />
              <button
                onClick={handleCreateExpense}
                className="w-full sm:w-1/2 relative text-center rounded-xl px-5 py-2 overflow-hidden group bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold transition-all ease-out duration-300 shadow-md hover:ring-2 hover:ring-offset-2 hover:ring-purple-500"
              >
                <span className="absolute right-0 w-8 h-10 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                <span className="relative text-xl">Add</span>
              </button>
            </div>
          </div>

          {/* Expense List */}
          <div className='bg-[#1f1b2e] p-6 rounded-2xl border border-gray-700 shadow-inner max-h-[400px] overflow-y-auto'>
            <div className='text-xl text-white font-bold mb-4'>Total Expense: ₹ {getTotal()}</div>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              {userexp.map((item) => (
                <Items key={item._id} data={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

