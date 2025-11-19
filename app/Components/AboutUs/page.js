'use client';

import React from 'react';
import { FaShippingFast, FaStar, FaSmile, FaUndoAlt } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import Navbar from '../Navbar/page';
import ImageCursorTrail from '@/components/ui/image-cursortrail';


const AboutUs = () => {
    const router = useRouter();


    const images = [
        "https://media.istockphoto.com/id/665032164/photo/flat-lay-of-modern-mens-clothing-on-a-wooden-background.jpg?s=612x612&w=0&k=20&c=CVqFStPc5EDNHIqnpYKPm-DaImQVf2VDjl54oPBavK4=",
        "https://i.pinimg.com/236x/4d/b5/19/4db519823684a6fac366cce641c8de93.jpg",
        "https://i.pinimg.com/236x/23/2e/c3/232ec319b92ec4e4c1ca397f861a4c14.jpg",
        "https://i.pinimg.com/originals/b4/5a/60/b45a60e8cda8c10c0669126a7f2e1542.jpg",
        "https://i.pinimg.com/236x/04/d8/aa/04d8aa397a9469f8d562dce9cc5d0147.jpg",
        "https://i.pinimg.com/236x/04/f6/39/04f639c450995e99b34b1b40376620c4.jpg",
        "https://i.pinimg.com/236x/7a/27/1a/7a271a30ecf2dabe5114c48d26c22e0a.jpg",
        "https://i.pinimg.com/236x/fc/11/89/fc11899f615aa01a795bca1eabc43fb4.jpg",
        "https://i.pinimg.com/236x/52/7e/1e/527e1e156680b70394ab7914f33d67d4.jpg",
        "https://i.pinimg.com/564x/19/9d/1c/199d1cfc26939f0f95e6c5e32a00eb4c.jpg",
    ]

    return (
        <div className="">
            <Navbar />
            {/* Hero Section */}
            <section className="relative bg-[url('/fashion-Banner.jpg')] bg-cover bg-center h-50 md:h-[40vh] flex items-center justify-center mt-16">
                {/* RGBA Overlay */}
                <div className="absolute inset-0 bg-[rgba(0,0,0,0.4)] z-0" />

                {/* Heading */}
                <h1 className="absolute z-5 text-4xl md:text-5xl text-yellow-400 font-extrabold text-center drop-shadow-lg">
                    About <span className="text-white">My Shop</span>
                </h1>
            </section>

            {/* Intro */}
            <section className="max-w-6xl mx-auto px-6 py-16 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-black bg-amber-400 rounded-xl w-fit mb-8 mx-auto p-2">Our Vision</h2>

                {/* ImageCursorTrail Animation */}
                <ImageCursorTrail
                    items={images}
                    maxNumberOfImages={5}
                    distance={25}
                    imgClass="sm:w-40 w-28 sm:h-48 h-36"
                    className="relative max-w-7xl mx-auto rounded-3xl border-5"
                >
                    <article className="relative z-50 flex flex-col items-center justify-center ">
                        <h1 className="max-w-2xl text-center text-2xl md:text-5xl font-semibold tracking-tight ">
                            At <span className="font-semibold">My Shop</span>, we believe fashion is a form of self-expression.
                            Our mission is to make high-quality, trendy apparel accessible and enjoyable for everyone.
                        </h1>
                    </article>
                    {/* Bottom overlay */}

                </ImageCursorTrail>
            </section>

            {/* Mission and Features */}
            <section className="max-w-6xl mx-auto bg-gray-800 text-white rounded-xl mb-4 px-6 py-10 grid md:grid-cols-2 gap-10">
                <div>
                    <h3 className="text-2xl font-semibold mb-4">🌟 Our Mission</h3>
                    <p className="leading-loose">
                        We aim to redefine affordable fashion by delivering quality products with unmatched service.
                        Whether you're dressing up for a party or lounging at home, our collection ensures you're always in style.
                    </p>
                </div>

                <div>
                    <h3 className="text-2xl font-semibold mb-4">✅ Why Customers Love Us</h3>
                    <ul className="space-y-4">
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
            <section className="bg-yellow-500 py-12 text-center">
                <h2 className="text-3xl font-bold mb-4">Join the My Shop Family!</h2>
                <p className="text-lg max-w-2xl mx-auto">
                    Experience affordable fashion like never before. Sign up today and stay updated with exclusive offers and new arrivals.
                </p>
                <button
                    onClick={() => router.push('/Components/HomePage#Shop')}
                    className="mt-6 bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition">
                    Shop Now
                </button>
            </section>

            {/* Footer-like Closing Note */}
            <div className="text-center text-sm py-6 border-t border-gray-800">
                &copy; {new Date().getFullYear()} My Shop • Designed with ❤️ for fashion lovers
            </div>
        </div>
    );
};

export default AboutUs;
