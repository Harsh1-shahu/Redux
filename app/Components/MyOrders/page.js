'use client';

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../Navbar/page';
import Footer from '../Footer/page';

const getStatusColor = (status) => {
    switch (status) {
        case 'Delivered':
            return 'text-green-400';
        case 'Shipped':
            return 'text-blue-400';
        case 'Cancelled':
            return 'text-red-400';
        case 'Pending':
        default:
            return 'text-yellow-400';
    }
};

const MyOrders = () => {
    const orders = useSelector((state) => state.counter.orders);

    useEffect(() => {
        // 🔥 TEMP for dev only
        localStorage.removeItem('orders');
    }, []);

    return (
        <div className="text-white min-h-screen flex flex-col">
            <Navbar />

            <div className="flex-grow container mx-auto pt-28 pb-16 px-4">
                <h1 className="text-3xl font-bold text-yellow-400 mb-6 text-center">🧾 My Orders</h1>

                {orders.length === 0 ? (
                    <p className="text-center text-gray-400 text-lg">You haven't placed any orders yet.</p>
                ) : (
                    <div className="space-y-8">
                        {orders.map((order) => (
                            <div key={order.id} className="bg-zinc-800 rounded-lg shadow p-6">
                                <div className="mb-4 border-b border-gray-700 pb-2 space-y-1">
                                    <p className="text-sm text-gray-400">
                                        Order ID: <span className='text-white font-light'>{order.id}</span>
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        Placed on: <span className='text-white font-light'>{new Date(order.date).toLocaleString()}</span>
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        Payment Method: <span className="text-white font-medium">{order.paymentMethod || 'N/A'}</span>
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        Delivery Status: <span className={`font-medium ${getStatusColor(order.deliveryStatus)}`}>
                                            {order.deliveryStatus || 'Pending'}
                                        </span>
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        Delivery Address: <span className="text-white font-light">{order.address || 'N/A'}</span>
                                    </p>
                                </div>

                                <table className="w-full text-left text-sm mb-4">
                                    <thead>
                                        <tr>
                                            <th className="pb-2">Item</th>
                                            <th className="pb-2 px-1 md:px-0">Qty</th>
                                            <th className="pb-2">Price</th>
                                            <th className="pb-2">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order.items.map((item) => (
                                            <tr key={item.uid || `${order.id}-${item.id}`} className="border-b border-gray-700">
                                                <td className="py-2 flex items-center space-x-3">
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="w-12 h-12 object-cover rounded"
                                                    />
                                                    <span>{item.name}</span>
                                                </td>
                                                <td className="py-2 px-2 md:px-0">{item.quantity}</td>
                                                <td className="py-2">₹{item.price}</td>
                                                <td className="py-2">₹{item.price * item.quantity}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                <p className="text-right text-green-400 font-semibold">
                                    Total: ₹{order.total}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default MyOrders;
