'use client';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '@/app/Redux/counterSlice';
import { useRouter } from 'next/navigation';
import { FcShop } from 'react-icons/fc';
import { IoEye, IoEyeOff } from "react-icons/io5";

const Login = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const user = useSelector((state) => state.counter.user);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // toggle state
    const [error, setError] = useState('');
    const [fieldErrors, setFieldErrors] = useState({ email: '', password: '' });

    const validateForm = () => {
        let isValid = true;
        const errors = { email: '', password: '' };

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

        setFieldErrors(errors);
        return isValid;
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');

        if (!validateForm()) return;

        if (email === 'harsh@example.com' && password === '123456') {
            dispatch(login({ name: 'Harsh', email }));
        } else {
            setError('Invalid email or password.');
        }
    };

    useEffect(() => {
        if (user) {
            router.push('/Components/HomePage');
        }
    }, [user, router]);

    return (
        <div className="flex flex-col items-center justify-center gap-10 min-h-screen bg-gray-900 text-white px-4">
            {/* Logo */}
            <h1 className="text-2xl font-bold text-yellow-400 flex items-center gap-2">
                <FcShop />
                My Shop
            </h1>

            <div className="bg-zinc-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>

                <form onSubmit={handleLogin} className="space-y-4">
                    {/* Email */}
                    <div>
                        <label className="block text-sm mb-1">Email</label>
                        <input
                            type="email"
                            className={`w-full px-4 py-2 rounded bg-gray-700 text-white outline-none focus:ring-2 ${fieldErrors.email ? 'ring-red-400' : 'ring-yellow-400'
                                }`}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {fieldErrors.email && (
                            <p className="text-red-400 text-xs mt-1">{fieldErrors.email}</p>
                        )}
                    </div>

                    {/* Password with toggle */}
                    <div>
                        <label className="block text-sm mb-1">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className={`w-full px-4 py-2 pr-10 rounded bg-gray-700 text-white outline-none focus:ring-2 ${fieldErrors.password ? 'ring-red-400' : 'ring-yellow-400'
                                    }`}
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
                        {fieldErrors.password && (
                            <p className="text-red-400 text-xs mt-1">{fieldErrors.password}</p>
                        )}
                    </div>

                    {error && <p className="text-red-400 text-sm text-center">{error}</p>}

                    <button
                        type="submit"
                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 rounded"
                    >
                        Login
                    </button>

                    <p className="text-sm text-center">
                        Don't have an account?{' '}
                        <span
                            onClick={() => router.push('/Components/Register')}
                            className="text-yellow-400 font-semibold cursor-pointer hover:underline"
                        >
                            Signup
                        </span>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
