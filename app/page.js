'use client';

import React from 'react';
import { HiMiniShoppingCart } from "react-icons/hi2";
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './Redux/counterSlice';

const Page = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  function handleAddToCart() {
    dispatch(increment());
  }

  function handleRemoveFromCart() {
    if (count > 0) {
      dispatch(decrement());
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white text-2xl pb-20">
      {/* Navbar */}
      <nav className='fixed top-0 left-0 w-full bg-gray-600 z-10'>
        <div className='flex items-center justify-between px-10 py-4'>
          <h1 className='text-xl'>My Shop</h1>
          <div className='flex space-x-10 items-center'>
            <a href="/" className='hover:underline'>Home</a>
            <a href="/about" className='hover:underline'>About</a>
            {/* Cart Icon with Badge */}
            <div className="relative">
              <HiMiniShoppingCart size={28} />
              {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-sm rounded-full w-5 h-5 flex items-center justify-center">
                  {count}
                </span>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className='flex flex-col items-center justify-center h-screen pt-20'>
        <h1 className='mb-4 text-3xl'>Awesome Product</h1>
        
        {/* Placeholder product */}
        <div className="bg-zinc-800 p-8 rounded-lg shadow-lg flex flex-col items-center">
          <img
            src="/T-shirt.webp"
            alt="product"
            className="w-40 h-40 object-cover rounded mb-4"
          />
          <p className="text-lg mb-2">Stylish T-Shirt</p>
          <p className="text-sm text-gray-400 mb-4">₹499</p>

          <div className="flex space-x-4">
            <button
              onClick={handleRemoveFromCart}
              disabled={count === 0}
              className='bg-red-600 hover:bg-red-700 rounded px-4 py-2 disabled:opacity-50'
            >
              Remove
            </button>
            <button
              onClick={handleAddToCart}
              className='bg-green-600 hover:bg-green-700 rounded px-4 py-2'
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
