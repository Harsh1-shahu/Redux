'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../../Redux/counterSlice';
import { useRouter } from 'next/navigation';
import Navbar from '../Navbar/page';
import Footer from '../Footer/page';

const Cart = () => {
  const router = useRouter();
  const cart = useSelector((state) => state.counter.cart);
  const dispatch = useDispatch();

  const totalAmount = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    router.push('/Components/Checkout');
  };

  return (
    <div className="flex flex-col min-h-screen text-white">
      {/* Navbar */}
      <Navbar />

      {/* Cart Content */}
      <main className="flex-grow pt-28 px-4 sm:px-10">
        <h2 className="text-3xl font-bold text-yellow-400 mb-6 text-center">Your Cart</h2>

        {cart.length === 0 ? (
          <p className="text-lg text-gray-400 text-center">Your cart is empty.</p>
        ) : (
          <div className="flex flex-col items-center">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-zinc-800 p-6 mb-6 rounded-lg shadow-lg w-full max-w-2xl"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-400">
                      ₹{item.price} x {item.quantity}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-lg font-semibold">
                    Total: ₹{item.price * item.quantity}
                  </p>
                  <button
                    onClick={() => dispatch(removeFromCart({ id: item.id }))}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                  >
                    Remove One
                  </button>
                </div>
              </div>
            ))}

            <div className="w-full max-w-2xl">
              <p className="text-xl font-bold text-right mt-6">
                Grand Total: ₹{totalAmount}
              </p>

              <div className="text-right">
                <button
                  onClick={handleCheckout}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded mt-4"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Cart;
