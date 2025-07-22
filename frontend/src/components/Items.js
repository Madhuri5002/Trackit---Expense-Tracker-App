import React from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { deleteExpense } from '../utils/renders'
import { motion } from 'framer-motion'

function Items(props) {
  const exp = props.data

  function getDate() {
    const dater = new Date(Date.parse(exp.date))
    const txt = dater.toString()
    return txt.substring(8, 10) + " " + txt.substring(4, 7)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, type: 'spring' }}
      className='flex flex-col w-full p-5 gap-6 bg-[#f0f8ff] rounded-2xl shadow-lg font-mont'
    >
      <div className='flex justify-between items-center'>
        <p className='text-[#1f2937] font-bold text-2xl'>₹ {exp.amount}</p>
        <p className='border border-gray-200 bg-white text-[#1f2937] rounded-full px-3 py-1 text-sm font-medium'>{getDate()}</p>
      </div>

      <div className='flex justify-between items-center'>
        <div className='bg-white text-[#1f2937] text-sm border border-gray-300 rounded-full px-3 py-1 font-semibold'>
          {exp.category}
        </div>

        <a
          onClick={() => {
            const datar = {
              expenseId: exp._id,
              userId: exp.usersid
            }
            deleteExpense(datar)
          }}
          href="#_"
          className="relative px-3.5 py-2 m-1 overflow-hidden group cursor-pointer border border-blue-500 bg-white text-[#1f2937] rounded-md"
        >
          <span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-blue-400 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
          <span className="relative transition duration-300 group-hover:text-white ease"><AiFillDelete size={18} /></span>
        </a>
      </div>
    </motion.div>
  )
}

export default Items

