'use client';
import React from 'react';
import { FaShippingFast, FaStar, FaSmile, FaUndoAlt } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const AboutUs = () => {
    const router = useRouter();
    return (
        <div className="bg-gray-900 text-gray-100">
            {/* Hero Section */}
            <section className="relative bg-[url('/fashion-Banner.jpg')] bg-cover bg-center h-[50vh] flex items-center justify-center">
                {/* RGBA Overlay */}
                <div className="absolute inset-0 bg-[rgba(0,0,0,0.4)] z-0" />

                {/* Heading */}
                <h1 className="relative z-10 text-4xl md:text-5xl font-extrabold text-yellow-400 text-center drop-shadow-lg">
                    About <span className="text-white">My Shop</span>
                </h1>
            </section>

            {/* Intro */}
            <section className="max-w-6xl mx-auto px-6 py-16 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-yellow-300">Our Vision</h2>
                <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
                    At <span className="text-white font-semibold">My Shop</span>, we believe fashion is a form of self-expression.
                    Our mission is to make high-quality, trendy apparel accessible and enjoyable for everyone.
                </p>
            </section>

            {/* Mission and Features */}
            <section className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-10">
                <div>
                    <h3 className="text-2xl font-semibold text-yellow-300 mb-4">🌟 Our Mission</h3>
                    <p className="text-gray-400 leading-loose">
                        We aim to redefine affordable fashion by delivering quality products with unmatched service.
                        Whether you're dressing up for a party or lounging at home, our collection ensures you're always in style.
                    </p>
                </div>

                <div>
                    <h3 className="text-2xl font-semibold text-yellow-300 mb-4">✅ Why Customers Love Us</h3>
                    <ul className="space-y-4 text-gray-300">
                        <li className="flex items-center gap-3">
                            <FaStar className="text-yellow-400" /> Trendy and curated fashion collections
                        </li>
                        <li className="flex items-center gap-3">
                            <FaShippingFast className="text-green-400" /> Fast and reliable delivery
                        </li>
                        <li className="flex items-center gap-3">
                            <FaUndoAlt className="text-pink-400" /> Easy returns and refunds
                        </li>
                        <li className="flex items-center gap-3">
                            <FaSmile className="text-blue-400" /> Dedicated customer support
                        </li>
                    </ul>
                </div>
            </section>

            {/* Call to Action */}
            <section className="bg-yellow-500 text-gray-900 py-12 text-center">
                <h2 className="text-3xl font-bold mb-4">Join the My Shop Family!</h2>
                <p className="text-lg max-w-2xl mx-auto">
                    Experience affordable fashion like never before. Sign up today and stay updated with exclusive offers and new arrivals.
                </p>
                <button
                    onClick={() => router.push("/")}
                    className="mt-6 bg-gray-900 text-yellow-400 px-6 py-3 rounded-lg hover:bg-gray-800 transition">
                    Shop Now
                </button>
            </section>

            {/* Footer-like Closing Note */}
            <div className="text-center text-sm text-gray-500 py-6 border-t border-gray-800">
                &copy; {new Date().getFullYear()} My Shop • Designed with ❤️ for fashion lovers
            </div>
        </div>
    );
};

export default AboutUs;
