import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { sortCategoryWise } from '../utils/seperator';

ChartJS.register(ArcElement, Tooltip, Legend);

export function Chartss({ exdata }) {
  const categories = ['Grocery', 'Vehicle', 'Shopping', 'Travel', 'Food', 'Fun', 'Other'];
  const totalexp = sortCategoryWise(exdata, categories);

  const data = {
    labels: categories,
    datasets: [
      {
        label: 'Amount (₹)',
        data: totalexp,
        backgroundColor: [
          '#FF6384', // Grocery
          '#36A2EB', // Vehicle
          '#FFCE56', // Shopping
          '#4BC0C0', // Travel
          '#9966FF', // Food
          '#FF6B6B', // Fun
          '#FFA600', // Other
        ],
        borderColor: '#1e1e2f',
        borderWidth: 2,
        hoverOffset: 12, // animation on hover
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: {
            size: 14,
            weight: 'bold',
          },
          color: '#f1f1f1',
        },
      },
      tooltip: {
        backgroundColor: '#2a2a3b',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#444',
        borderWidth: 1,
        callbacks: {
          label: context => `${context.label}: ₹${context.raw}`,
        },
      },
    },
    animation: {
      animateRotate: true,
      animateScale: true,
    },
  };

  return (
    <div className="w-full h-[400px] bg-[#1a1a2e] rounded-2xl p-4 shadow-md shadow-[#00000080]">
      <Doughnut data={data} options={options} />
    </div>
  );
}




