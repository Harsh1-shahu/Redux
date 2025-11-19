'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { checkout } from '@/app/Redux/counterSlice'; // ✅ Make sure this path is correct!
import Navbar from '../Navbar/page';
import Footer from '../Footer/page';

const Checkout = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.counter.cart);
    const user = useSelector((state) => state.counter.user);

    const totalAmount = cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    return (
        <div className="min-h-screen text-white pt-28">
            <Navbar/>
            <h2 className="text-3xl font-bold text-yellow-400 mb-6 text-center">Confirm Your Order</h2>

            {/* 🏠 Delivery Address */}
            {user && (
                <div className="bg-zinc-800 p-4 rounded-lg shadow-md max-w-3xl mx-auto mb-6">
                    <h3 className="text-lg font-semibold mb-2">📦 Delivery Address</h3>
                    <p>
                        <strong>Name:</strong> {user.name || 'N/A'}<br />
                        <strong>Address:</strong> {user.address || 'N/A'}
                    </p>

                    {!user.address && (
                        <p className="text-yellow-400 mt-2 text-sm">
                            ⚠️ Please update your address in your{' '}
                            <span
                                className="underline cursor-pointer text-blue-400 hover:text-blue-500"
                                onClick={() => router.push('/Components/Profile')}
                            >
                                profile
                            </span>{' '}
                            before proceeding.
                        </p>
                    )}

                </div>
            )}

            {/* 🛒 Cart Summary */}
            {cart.length === 0 ? (
                <p className="text-lg text-center">Your cart is empty.</p>
            ) : (
                <div className="bg-zinc-800 p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr>
                                <th className="border-b border-gray-700 py-2">Item</th>
                                <th className="border-b border-gray-700 py-2 px-1 md:px-0">Qty</th>
                                <th className="border-b border-gray-700 py-2">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((item) => (
                                <tr key={item.id} className="border-b border-gray-700">
                                    <td className="py-2">{item.name}</td>
                                    <td className="py-2 px-3 md:px-0">{item.quantity}</td>
                                    <td className="py-2">₹{item.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <p className="text-xl font-bold text-center mt-4">
                        Grand Total: ₹{totalAmount}
                    </p>

                    <div className="text-center mt-6">
                        <button
                            onClick={() => router.push("/Components/Payment")}
                            className={`px-6 py-2 rounded font-semibold ${user.address ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-600 cursor-not-allowed'
                                }`}
                            disabled={!user.address}
                        >
                            Confirm & Place Order
                        </button>
                    </div>
                </div>
            )}
            <Footer/>
        </div>
    );
};

export default Checkout;
