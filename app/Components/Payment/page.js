'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { checkout } from '../../Redux/counterSlice';
import {
    FaGooglePay,
    FaPhoneAlt,
    FaCreditCard,
    FaUniversity,
    FaWallet
} from 'react-icons/fa';
import { RiCashFill } from "react-icons/ri";
import { SiUpwork, SiPaytm } from 'react-icons/si';
import Navbar from '../Navbar/page';
import Footer from '../Footer/page';

const Payment = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const cart = useSelector((state) => state.counter.cart);

    const [selectedMethod, setSelectedMethod] = useState('');
    const [selectedUPIMethod, setSelectedUPIMethod] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handleConfirmPayment = () => {
        if (cart.length === 0) {
            setSuccessMessage('🛒 Your cart is empty! Redirecting...');
            setShowModal(true);
            setTimeout(() => {
                setShowModal(false);
                router.push('/Components/Cart');
            }, 2000);
            return;
        }

        const paymentMethod =
            selectedMethod === 'UPI' ? `UPI - ${selectedUPIMethod}` : selectedMethod;

        dispatch(checkout({
            paymentMethod: paymentMethod, // includes UPI sub-method if selected
        }));

        setSuccessMessage(`🎉 Payment successful via ${paymentMethod}! Thank you for your purchase.`);
        setShowModal(true);

        setTimeout(() => {
            setShowModal(false);
            router.push('/Components/HomePage');
        }, 3000);
    };

    useEffect(() => {
        console.log('Cart updated:', cart);
    }, [cart]);

    return (
        <div className="min-h-screen text-white pt-28 ">
            <Navbar/>
            <h2 className="text-3xl font-bold mb-6 text-center text-yellow-400">Payment Page</h2>

            {cart.length === 0 ? (
                <p className="text-center text-lg">
                    Purchase is completed, Cart is empty. Redirecting to Home...
                </p>
            ) : (
                <div className="bg-zinc-800 p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
                    {/* Cart Table */}
                    <table className="w-full text-left border-collapse mb-6">
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
                                    <td className="py-2 px-2 md:px-0">{item.quantity}</td>
                                    <td className="py-2">₹{item.price}</td>
                                    <td className="py-2">₹{item.price * item.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <p className="text-xl font-bold text-center text-green-400 mb-4">
                        Total Amount: ₹{totalAmount}
                    </p>

                    {/* Payment Methods */}
                    <div className="mt-8">
                        <h3 className="text-xl font-semibold mb-4">Select Payment Method</h3>
                        <div className="space-y-3">
                            {/* UPI Main Option */}
                            <label className="flex items-center space-x-4 bg-gray-700 rounded px-4 py-2 cursor-pointer hover:bg-gray-600">
                                <input
                                    type="radio"
                                    name="payment"
                                    value="UPI"
                                    checked={selectedMethod === 'UPI'}
                                    onChange={() => {
                                        setSelectedMethod('UPI');
                                        setSelectedUPIMethod('PhonePe'); // default UPI
                                    }}
                                    className="accent-yellow-400"
                                />
                                <div className="flex items-center space-x-2">
                                    <SiUpwork className="text-xl" />
                                    <span>UPI</span>
                                </div>
                            </label>

                            {/* UPI Sub-methods */}
                            {selectedMethod === 'UPI' && (
                                <div className="space-y-2 flex flex-col md:flex-row justify-around gap-3">
                                    {[
                                        { name: 'PhonePe', icon: <FaPhoneAlt className="text-purple-400" /> },
                                        { name: 'Google Pay', icon: <FaGooglePay className="text-blue-400 text-xl" /> },
                                        { name: 'Paytm', icon: <SiPaytm className="text-blue-400 text-xl" /> }
                                    ].map(({ name, icon }) => (
                                        <label
                                            key={name}
                                            className={`flex items-center space-x-3 px-4 py-2 rounded bg-gray-600 cursor-pointer hover:bg-gray-500 ${selectedUPIMethod === name ? 'ring-2 ring-yellow-400' : ''
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                name="upi"
                                                value={name}
                                                checked={selectedUPIMethod === name}
                                                onChange={() => setSelectedUPIMethod(name)}
                                                className="accent-yellow-400"
                                            />
                                            <div className="flex items-center space-x-2">
                                                {icon}
                                                <span>{name}</span>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            )}

                            {/* Other Payment Methods */}
                            {[
                                { name: 'Credit/Debit Card', icon: <FaCreditCard className="text-yellow-300 text-xl" /> },
                                { name: 'Net Banking', icon: <FaUniversity className="text-indigo-300 text-xl" /> },
                                { name: 'Wallet', icon: <FaWallet className="text-pink-300 text-xl" /> },
                                { name: 'COD (Cash On Delivery)', icon: <RiCashFill className="text-green-600 text-xl" /> }
                            ].map(({ name, icon }) => (
                                <label
                                    key={name}
                                    className="flex items-center space-x-4 bg-gray-700 rounded px-4 py-2 cursor-pointer hover:bg-gray-600"
                                >
                                    <input
                                        type="radio"
                                        name="payment"
                                        value={name}
                                        checked={selectedMethod === name}
                                        onChange={() => {
                                            setSelectedMethod(name);
                                            setSelectedUPIMethod('');
                                        }}
                                        className="accent-yellow-400"
                                    />
                                    <div className="flex items-center space-x-2">
                                        {icon}
                                        <span>{name}</span>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Confirm Payment Button */}
                    <div className="text-center mt-8">
                        <button
                            onClick={handleConfirmPayment}
                            disabled={!selectedMethod || (selectedMethod === 'UPI' && !selectedUPIMethod)}
                            className={`px-8 py-3 rounded transition-all duration-200 
        ${(!selectedMethod || (selectedMethod === 'UPI' && !selectedUPIMethod))
                                    ? 'bg-gray-600 cursor-not-allowed'
                                    : 'bg-green-600 hover:bg-green-700 text-white'}`}
                        >
                            Confirm & Pay ₹{totalAmount}
                        </button>

                    </div>
                </div>
            )}

            {/* Payment Confirmation Modal */}
            {showModal && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    onClick={() => setShowModal(false)}
                >
                    <div
                        className="bg-white text-black p-6 rounded-xl shadow-xl w-[90%] max-w-md mx-auto text-center animate-fade-in"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-2xl font-bold text-green-600 mb-3">✅ Payment Status</h2>
                        <p className="text-gray-700 text-base">{successMessage}</p>
                        <button
                            onClick={() => setShowModal(false)}
                            className="mt-5 px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-full transition"
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}
            <Footer/>
        </div>
    );
};

export default Payment;
