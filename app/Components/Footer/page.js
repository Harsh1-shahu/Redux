'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { FaInstagram, FaFacebookF, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
    const router = useRouter();

    return (
        <footer className="bg-gray-800 text-gray-300 py-10 px-6 mt-10">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* About */}
                <div>
                    <h3 className="text-lg font-semibold mb-3 text-yellow-100">About Us</h3>
                    <p className="text-sm">
                        My Shop brings you stylish clothing and accessories at affordable prices. Designed for comfort, built for confidence.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-3 text-yellow-100">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li className="w-fit hover:text-white font-semibold hover:underline cursor-pointer" onClick={() => router.push('/')}>Home</li>
                        <li className="w-fit hover:text-white font-semibold hover:underline cursor-pointer" onClick={() => router.push('/about')}>About</li>
                        <li className="w-fit hover:text-white font-semibold hover:underline cursor-pointer" onClick={() => router.push('/Components/Cart')}>Cart</li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h3 className="text-lg font-semibold mb-3 text-yellow-100">Contact</h3>
                    <p className="text-sm"><strong>Email:</strong> support@myshop.com</p>
                    <p className="text-sm"><strong>Phone:</strong> +91 9876543210</p>
                    <p className="text-sm"><strong>Location:</strong> Nagpur, India</p>
                </div>

                {/* Social Media */}
                <div>
                    <h3 className="text-lg font-semibold mb-3 text-yellow-100">Follow Us</h3>
                    <div className="flex space-x-4 mt-4">
                        <FaInstagram className="hover:text-pink-500 text-lg cursor-pointer" />
                        <FaFacebookF className="hover:text-blue-500 text-lg cursor-pointer" />
                        <FaTwitter className="hover:text-blue-400 text-lg cursor-pointer" />
                        <FaYoutube className="hover:text-red-500 text-lg cursor-pointer" />
                    </div>
                </div>
            </div>

            <div className="text-center text-sm text-gray-500 mt-8 border-t border-gray-700 pt-4">
                &copy; {new Date().getFullYear()} My Shop. All rights reserved.<br /> Designed & Developed by - <strong onClick={() => router.push('https://github.com/Harsh1-shahu')} className='text-yellow-400 cursor-pointer'>Harsh Shahu</strong>
            </div>

        </footer>
    );
};

export default Footer;
