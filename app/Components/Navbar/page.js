'use client';

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/app/Redux/counterSlice';
import { useRouter } from 'next/navigation';
import { HiMiniShoppingCart } from 'react-icons/hi2';
import { HiOutlineMenu, HiX } from 'react-icons/hi';
import { FcShop } from 'react-icons/fc';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggleButton from '@/components/ui/theme-toggle-button';

const Navbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const reduxUser = useSelector((state) => state.counter.user);
  const cartItems = useSelector((state) => state.counter.cart);
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    router.push('/Components/Login');
    setMenuOpen(false);
  };

  useEffect(() => {
    if (reduxUser) {
      setUser(reduxUser);
    } else {
      const local = localStorage.getItem('user');
      if (local) {
        try {
          setUser(JSON.parse(local));
        } catch (e) {
          console.error('Invalid user in localStorage');
        }
      }
    }
  }, [reduxUser]);

  const renderProfile = () => {
    if (!user) return null;

    const profilePic = user.profilePicture;
    const initial = user.name ? user.name.charAt(0).toUpperCase() : 'U';

    return (
      <span
        onClick={() => router.push('/Components/Profile')}
        className="text-sm text-yellow-300 font-medium cursor-pointer flex items-center gap-2"
      >
        {profilePic ? (
          <img
            src={profilePic}
            alt="Profile"
            className="w-6 h-6 rounded-full object-cover border border-yellow-400"
          />
        ) : (
          <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center text-gray-900 font-bold text-xs">
            {initial}
          </div>
        )}
        Welcome, {user.name || user.email || 'User'}
      </span>
    );
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-700 z-60">
      <div className="relative flex items-center justify-between px-4 md:px-10 py-4">
        {/* Logo */}
        <h1 className="text-xl font-bold text-yellow-400 flex items-center gap-2">
          <FcShop />
          My Shop
        </h1>
        <div className='absolute left-60 hidden md:flex space-x-10'>
          <span
            onClick={() => router.push('/Components/HomePage')}
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

          <span
            onClick={() => router.push('/Components/MyOrders')}
            className="text-yellow-100 font-semibold hover:underline cursor-pointer"
          >
            My Orders
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">

          <ThemeToggleButton
            variant="circle-blur" start="top-right"
            className="w-9 h-9 rounded-full"
          />

          {/* Cart Section */}
          <div
            onClick={() => router.push('/Components/Cart')}
            className="relative cursor-pointer"
          >
            <HiMiniShoppingCart size={28} className="text-white" />
            {totalCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalCount}
              </span>
            )}
          </div>

          {renderProfile()}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex gap-10 py-0.5">
          <div
            onClick={() => {
              router.push('/Components/Cart');
              setMenuOpen(false);
            }}
            className="relative"
          >
            <HiMiniShoppingCart size={28} className="text-white" />
            {totalCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalCount}
              </span>
            )}
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)}>
            <AnimatePresence mode="wait">
              {menuOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, scale: 0.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.1 }}
                  transition={{ duration: 0.1 }}
                >
                  <HiX size={28} className="text-white" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, scale: 1.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.5 }}
                  transition={{ duration: 0.1 }}
                >
                  <HiOutlineMenu size={28} className="text-white" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="relative flex flex-col md:hidden bg-gray-800 px-4 pb-4 space-y-4 py-2">

          <div onClick={() => { setMenuOpen(false) }}
            className='absolute right-4'>
            <ThemeToggleButton
              showLabel variant="circle-blur" start="top-right"
              className="w-9 h-9 rounded-full"
            />
          </div>

          <span
            onClick={() => {
              router.push('/Components/HomePage');
              setMenuOpen(false);
            }}
            className="text-yellow-100 text-center font-semibold hover:underline cursor-pointer"
          >
            Home
          </span>

          <span
            onClick={() => {
              router.push('/Components/AboutUs');
              setMenuOpen(false);
            }}
            className="text-yellow-100 text-center font-semibold hover:underline cursor-pointer"
          >
            About
          </span>

          <span
            onClick={() => {
              router.push('/Components/MyOrders');
              setMenuOpen(false);
            }}
            className="text-yellow-100 text-center font-semibold hover:underline cursor-pointer"
          >
            My Orders
          </span>


          <div className='flex justify-center'>
            {renderProfile()}
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
          >
            Logout
          </button>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
