'use client';

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '@/app/Redux/counterSlice';
import { motion, useScroll, AnimatePresence, useInView } from 'motion/react';
import Navbar from '../Navbar/page';
import Footer from '../Footer/page';
import { useRef } from "react";
import { CardCarousel } from "@/components/ui/card-carousel"
import { TextScroll } from '@/components/ui/text-scroll';
import {
    PopoverForm,
    PopoverFormButton,
    PopoverFormCutOutLeftIcon,
    PopoverFormCutOutRightIcon,
    PopoverFormSeparator,
    PopoverFormSuccess,
} from '@/components/ui/popover-form';


const HomePage = () => {
    const ref = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const totalSlides = 3;
    const [open, setOpen] = useState(false);
    const [feedback, setFeedback] = useState("");
    const [formState, setFormState] = useState("idle");
    const [showSuccess, setShowSuccess] = useState(false);

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

    const images = [
        {
            src: "/outfit1.jpg",
            alt: "Fashion Outfit 1",
        },
        {
            src: "/outfit2.jpg",
            alt: "Stylish Outfit 2",
        },
        {
            src: "/outfit3.jpg",
            alt: "Casual Look 3",
        },
        {
            src: "/outfit4.jpg",
            alt: "Casual Look 4",
        }
    ];

    const submit = () => {
        setFormState("loading");

        setTimeout(() => {
            setFormState("idle");
            setShowSuccess(true);
            setFeedback("");

            // ✅ Close the popover automatically after 1.5s
            setTimeout(() => {
                setOpen(false); // this triggers the reset in useEffect
            }, 1500);
        }, 1000);
    };

    // reset after close
    useEffect(() => {
        if (!open) {
            setShowSuccess(false);
            setFormState("idle");
            setFeedback("");
        }
    }, [open]);


    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex(prev => (prev + 1) % totalSlides);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const dispatch = useDispatch();

    const cartItems = useSelector((state) => state.counter.cart);

    const globalScrollY = useScroll().scrollYProgress;

    const isInView = useInView(ref, {
        once: false,              // ⬅️ This allows re-trigger on scroll
        margin: "-20% 0px -20% 0px" // ⬅️ Optional: fine-tunes viewport trigger
    });

    return (
        <div>
            {/* Navbar */}
            <Navbar />

            {/* Scrolling Progress Bar */}
            <motion.div
                style={{
                    scaleX: globalScrollY
                }}
                className='bg-yellow-300 origin-left w-full h-1 fixed z-20 top-16 md:top-17 left-0' />

            {/* Image Animation Grid */}
            <div className="pt-24 px-2">
                <div
                    className="w-full md:h-148 rounded-xl border border-gray-500 mb-10 bg-cover bg-center flex items-center justify-center overflow-hidden"
                    style={{ backgroundImage: "url('/bg-banner1.jpg')" }}
                >
                    <div className="w-full flex flex-col md:flex-row justify-between items-center">
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
                                            <h1 className="text-3xl md:text-7xl font-bold mb-6 text-orange-200">{title}</h1>
                                            <p className="text-2xl md:text-6xl tracking-wider text-yellow-50">{subtitle}</p>
                                        </motion.div>

                                        {/* Animated Image */}
                                        <motion.img
                                            key={`image-${key}`}
                                            src={image}
                                            alt="Fashion Model"
                                            className="w-full h-60 object-cover md:w-1/2 md:h-147 rounded-md"
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

                <h2 id='Shop' className="text-2xl md:text-3xl mb-5 text-center font-bold bg-yellow-400 rounded-lg w-fit mx-auto p-1">
                    Browse Our Products
                </h2>

                {/* Text Animation */}
                <TextScroll
                    className="font-serif text-2xl mb-8 font-semibold tracking-tighter bg-gray-600 text-white md:text-4xl md:leading-[5rem]"
                    text="Choose our trendy products that suit you."
                    default_velocity={3}
                />

                {/* Product Grid */}
                <div className="grid gap-8 md:grid-cols-2 text-white lg:grid-cols-3">
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

            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5 }}
                className="mt-8 px-2 md:p-6"
            >
                <div
                    className="w-full h-auto rounded-xl border border-gray-600 bg-cover bg-center mb-4 bg-no-repeat"
                    style={{ backgroundImage: `url('/bg-banner1.jpg')` }}
                >
                    <CardCarousel
                        images={images}
                        autoplayDelay={2000}
                        showPagination={false}
                        showNavigation={false}
                    />
                </div>
            </motion.div>

            <PopoverForm
                title="Feedback"
                open={open}
                setOpen={setOpen}
                width="364px"
                height="192px"
                showCloseButton={!showSuccess}
                showSuccess={showSuccess}
                openChild={
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (!feedback) return;
                            submit(); // sets formState to loading and showSuccess to true after delay
                        }}
                    >
                        <div className="relative">
                            <textarea
                                autoFocus
                                placeholder="Feedback"
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                className="h-32 w-full resize-none rounded-t-lg p-3 text-sm outline-none"
                                required
                            />
                        </div>
                        <div className="relative flex h-12 items-center px-[10px]">
                            <PopoverFormSeparator />
                            <div className="absolute left-0 top-0 -translate-x-[1.5px] -translate-y-1/2">
                                <PopoverFormCutOutLeftIcon />
                            </div>
                            <div className="absolute right-0 top-0 translate-x-[1.5px] -translate-y-1/2 rotate-180">
                                <PopoverFormCutOutRightIcon />
                            </div>
                            <PopoverFormButton loading={formState === "loading"} />
                        </div>
                    </form>
                }
                successChild={
                    <PopoverFormSuccess
                        title="Feedback Received"
                        description="Thank you for supporting our project!"
                    />
                }
            />

            <Footer />
        </div>
    );
};

export default HomePage;
