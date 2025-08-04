'use client';

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '@/app/Redux/counterSlice';
import { motion, useScroll, AnimatePresence } from 'motion/react';
import Navbar from '../Navbar/page';
import Footer from '../Footer/page';

const HomePage = () => {

    const [activeIndex, setActiveIndex] = useState(0);
    const totalSlides = 3; 

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


    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex(prev => (prev + 1) % totalSlides);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const dispatch = useDispatch();

    const cartItems = useSelector((state) => state.counter.cart);

    const scrollYProgress = useScroll().scrollYProgress


    return (
        <div className="bg-gray-900 text-white">
            {/* Navbar */}
            <Navbar />

            {/* Product Grid */}
            <div className="pt-28 px-2 md:px-6">
                <motion.div
                    style={{
                        scaleX: scrollYProgress
                    }}
                    className='bg-yellow-300 origin-left w-full rounded-b-full h-1 fixed z-20 top-16 left-0'></motion.div>

                <div
                    className="w-full md:h-142 rounded-xl border border-gray-500 mb-10 bg-cover bg-center text-white flex items-center justify-center overflow-hidden"
                    style={{ backgroundImage: "url('/bg-banner1.jpg')" }}
                >
                    <div className="w-full flex flex-col md:flex-row md:justify-between md:items-center">
                        {/* Text + Image Data */}
                        <AnimatePresence mode="wait">
                            {(() => {
                                const slides = [
                                    {
                                        key: "first",
                                        title: "Trendy Fashion",
                                        subtitle: "DRESSED IN THE LATEST TREND",
                                        image: "/model.avif",
                                    },
                                    {
                                        key: "second",
                                        title: "Fashion Forward Always",
                                        subtitle: "OUTFITS THAT SPEAK LOUD",
                                        image: "/model1.avif",
                                    },
                                    {
                                        key: "third",
                                        title: "On-Trend Always",
                                        subtitle: "WHERE GRACE MEETS GLAMOUR",
                                        image: "/model2.avif",
                                    },
                                ];

                                const { key, title, subtitle, image } = slides[activeIndex];

                                return (
                                    <>
                                        {/* Animated Text */}
                                        <motion.div
                                            key={`text-${key}`}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ duration: 0.8 }}
                                            className="max-w-md mx-auto mb-6 p-4 md:mb-0 md:max-w-none md:flex-1"
                                        >
                                            <h1 className="text-3xl md:text-6xl font-bold mb-6 text-orange-200">{title}</h1>
                                            <p className="text-2xl md:text-7xl tracking-wider text-yellow-50">{subtitle}</p>
                                        </motion.div>

                                        {/* Animated Image */}
                                        <motion.img
                                            key={`image-${key}`}
                                            src={image}
                                            alt="Fashion Model"
                                            className="w-full h-60 object-cover md:w-1/2 md:h-142 rounded-md"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ duration: 0.8 }}
                                        />
                                    </>
                                );
                            })()}
                        </AnimatePresence>
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
                                className="bg-zinc-800 py-3 rounded-lg shadow-lg text-center"
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
                                        className="bg-red-600 hover:bg-red-700 cursor-pointer rounded px-2 py-1 disabled:opacity-50"
                                    >
                                        Remove
                                    </button>
                                    <button
                                        onClick={() => dispatch(addToCart(product))}
                                        className="bg-green-600 hover:bg-green-700 cursor-pointer rounded px-2 py-1"
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
