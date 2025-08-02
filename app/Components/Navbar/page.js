'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/app/Redux/counterSlice'; // adjust path if needed
import { useRouter } from 'next/navigation';
import { HiMiniShoppingCart } from 'react-icons/hi2';

const Navbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.counter.user);
  const cartItems = useSelector((state) => state.counter.cart);

  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-700 z-10">
      <div className="flex items-center justify-between px-10 py-4">
        <h1
          className="text-xl font-bold text-yellow-400 cursor-pointer"
          onClick={() => router.push('/')}
        >
          My Shop
        </h1>

        <div className="flex space-x-6 items-center">
          <span
            onClick={() => router.push('/')}
            className="text-yellow-100 font-semibold hover:underline cursor-pointer"
          >
            Home
          </span>

          <span
            onClick={() => router.push('/Components/AboutUs')}
            className="text-yellow-100 font-semibold hover:underline cursor-pointer"
          >
            About
          </span>

          <div
            onClick={() => router.push('/Components/Cart')}
            className="relative cursor-pointer"
          >
            <HiMiniShoppingCart size={28} />
            {totalCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalCount}
              </span>
            )}
          </div>

          {user && (
            <span className="text-sm text-yellow-300 font-medium">
              Welcome, {user.name || user.email}
            </span>
          )}

          <button
            onClick={() => {
              dispatch(logout());
              router.push('/Components/Login');
            }}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
