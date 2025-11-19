'use client';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '@/app/Redux/counterSlice';
import { useRouter } from 'next/navigation';
import { FcShop } from 'react-icons/fc';
import { IoEye, IoEyeOff } from "react-icons/io5";

const Register = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const [fieldErrors, setFieldErrors] = useState({ name: '', email: '', password: '', confirmPassword: '' });

    const validateForm = () => {
        let isValid = true;
        const errors = { name: '', email: '', password: '', confirmPassword: '' };

        if (!name.trim()) {
            errors.name = 'Name is required.';
            isValid = false;
        }

        if (!email) {
            errors.email = 'Email is required.';
            isValid = false;
        } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            errors.email = 'Invalid email format.';
            isValid = false;
        }

        if (!password) {
            errors.password = 'Password is required.';
            isValid = false;
        } else if (password.length < 6) {
            errors.password = 'Password must be at least 6 characters.';
            isValid = false;
        }

        if (confirmPassword !== password) {
            errors.confirmPassword = 'Passwords do not match.';
            isValid = false;
        }

        setFieldErrors(errors);
        return isValid;
    };

    const handleRegister = (e) => {
        e.preventDefault();
        setError('');

        if (!validateForm()) return;

        // For now, directly store in redux & redirect
        dispatch(login({ name, email }));
        router.push('/Components/HomePage'); // Or redirect to login
    };

    return (
        <div className="flex flex-col items-center justify-center gap-10 min-h-screen bg-gray-900 text-white px-4">
            {/* Logo */}
            <h1 className="text-2xl font-bold text-yellow-400 flex items-center gap-2">
                <FcShop />
                My Shop
            </h1>

            <div className="bg-zinc-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6 text-center">Register</h2>

                <form onSubmit={handleRegister} className="space-y-4">
                    {/* Name */}
                    <div>
                        <label className="block text-sm mb-1">Name</label>
                        <input
                            type="text"
                            className={`w-full px-4 py-2 rounded bg-gray-700 text-white outline-none focus:ring-2 ${fieldErrors.name ? 'ring-red-400' : 'ring-yellow-400'}`}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        {fieldErrors.name && <p className="text-red-400 text-xs mt-1">{fieldErrors.name}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm mb-1">Email</label>
                        <input
                            type="email"
                            className={`w-full px-4 py-2 rounded bg-gray-700 text-white outline-none focus:ring-2 ${fieldErrors.email ? 'ring-red-400' : 'ring-yellow-400'}`}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {fieldErrors.email && <p className="text-red-400 text-xs mt-1">{fieldErrors.email}</p>}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm mb-1">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className={`w-full px-4 py-2 pr-10 rounded bg-gray-700 text-white outline-none focus:ring-2 ${fieldErrors.password ? 'ring-red-400' : 'ring-yellow-400'}`}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <span
                                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-300 hover:text-white"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <IoEyeOff size={20} /> : <IoEye size={20} />}
                            </span>
                        </div>
                        {fieldErrors.password && <p className="text-red-400 text-xs mt-1">{fieldErrors.password}</p>}
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-sm mb-1">Confirm Password</label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                className={`w-full px-4 py-2 pr-10 rounded bg-gray-700 text-white outline-none focus:ring-2 ${fieldErrors.confirmPassword ? 'ring-red-400' : 'ring-yellow-400'}`}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <span
                                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-300 hover:text-white"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <IoEyeOff size={20} /> : <IoEye size={20} />}
                            </span>
                        </div>
                        {fieldErrors.confirmPassword && <p className="text-red-400 text-xs mt-1">{fieldErrors.confirmPassword}</p>}
                    </div>

                    {error && <p className="text-red-400 text-sm text-center">{error}</p>}

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 rounded"
                    >
                        Register
                    </button>

                    {/* Link to Login */}
                    <p className="text-sm text-center">
                        Already have an account?{' '}
                        <span
                            onClick={() => router.push('/Components/Login')}
                            className="text-yellow-400 font-semibold cursor-pointer hover:underline"
                        >
                            Login
                        </span>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;
