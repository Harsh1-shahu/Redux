'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '@/app/Redux/counterSlice';
import { motion, useScroll } from 'motion/react';
import Navbar from '../Navbar/page';
import Footer from '../Footer/page';


const products = [
    { id: 1, name: 'Stylish T-Shirt', image: '/T-shirt.webp', price: 499 },
    { id: 2, name: 'Classic Hoodie', image: '/hoodie.webp', price: 999 },
    { id: 3, name: 'Modern Cap', image: '/cap.jpg', price: 299 },
    { id: 4, name: 'Rain-Coat', image: '/raincoat.jpg', price: 699 },
    { id: 5, name: 'Half Pant', image: '/halfPant.webp', price: 899 },
    { id: 6, name: 'Ethnic Kurta', image: '/kurta.webp', price: 1999 },
    { id: 7, name: 'Stylish Shirt', image: '/shirt.jpg', price: 199 },
    { id: 8, name: 'Cargo Pant', image: '/cargoPant.jpg', price: 399 },
    { id: 9, name: 'Modern Belt', image: '/belt.jpg', price: 599 },
];

const HomePage = () => {

    const dispatch = useDispatch();

    const cartItems = useSelector((state) => state.counter.cart);

    const scrollYProgress = useScroll().scrollYProgress


    return (
        <div className="bg-gray-900 text-white pb-20">
            {/* Navbar */}
            <Navbar />

            {/* Product Grid */}
            <div className="pt-28 px-6">
                <motion.div
                    style={{
                        scaleX: scrollYProgress
                    }}
                    className='bg-yellow-300 origin-left w-full rounded-full h-1 fixed z-20 top-16 left-0'></motion.div>

                <div
                    className="w-full h-142 rounded-xl border border-gray-500 mb-10 bg-cover bg-center text-white flex items-center justify-center overflow-hidden"
                    style={{ backgroundImage: "url('/bg-banner1.jpg')" }}
                >
                    <div className="w-full flex justify-between items-center ">
                        {/* Text Content */}
                        <div className="max-w-md mx-auto">
                            <h1 className="text-6xl font-bold mb-10 text-orange-200">Trendy Fashion</h1>
                            <p className="text-7xl mb-4 tracking-wider text-yellow-50">DRESSED IN THE LATEST TREND</p>
                        </div>

                        {/* Image */}
                        <img
                            src="/model.avif"
                            alt="Fashion Model"
                            className="w-1/2 h-142"
                        />
                    </div>
                </div>


                <h2 className="text-3xl mb-10 text-center font-semibold">
                    Browse Our Products
                </h2>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {products.map((product) => {
                        const item = cartItems.find((i) => i.id === product.id);
                        const quantity = item ? item.quantity : 0;

                        return (
                            <div
                                key={product.id}
                                className="bg-zinc-800 p-6 rounded-lg shadow-lg text-center"
                            >
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-40 h-40 object-cover mx-auto mb-4 rounded"
                                />
                                <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                                <p className="text-gray-400 text-sm mb-4">₹{product.price}</p>
                                <div className="flex justify-center space-x-4">
                                    <button
                                        onClick={() => dispatch(removeFromCart({ id: product.id }))}
                                        disabled={quantity === 0}
                                        className="bg-red-600 hover:bg-red-700 cursor-pointer rounded px-4 py-2 disabled:opacity-50"
                                    >
                                        Remove
                                    </button>
                                    <button
                                        onClick={() => dispatch(addToCart(product))}
                                        className="bg-green-600 hover:bg-green-700 cursor-pointer rounded px-4 py-2"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                                {quantity > 0 && (
                                    <p className="mt-2 text-sm text-green-400">
                                        In cart: {quantity}
                                    </p>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default HomePage;
