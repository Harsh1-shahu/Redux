'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';


const Checkout = () => {
    const router = useRouter();


    const cart = useSelector((state) => state.counter.cart);

    const totalAmount = cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );


    return (
        <div className="min-h-screen bg-gray-900 text-white pb-20 px-10 pt-28">
            <h2 className="text-3xl font-bold mb-6 text-center">Confirm Your Order</h2>

            {cart.length === 0 ? (
                <p className="text-lg text-gray-400">Your cart is empty.</p>
            ) : (
                <>
                    <div className="bg-zinc-800 p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr>
                                    <th className="border-b border-gray-700 py-2">Item</th>
                                    <th className="border-b border-gray-700 py-2">Qty</th>
                                    <th className="border-b border-gray-700 py-2">Price</th>
                                    <th className="border-b border-gray-700 py-2">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map((item) => (
                                    <tr key={item.id} className="border-b border-gray-700">
                                        <td className="py-2">{item.name}</td>
                                        <td className="py-2">{item.quantity}</td>
                                        <td className="py-2">₹{item.price}</td>
                                        <td className="py-2">₹{item.price * item.quantity}</td>
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
                                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
                            >
                                Proceed to Pay
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Checkout;
