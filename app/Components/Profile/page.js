'use client';

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfilePicture, setUserData } from '@/app/Redux/counterSlice';
import Navbar from '../Navbar/page';
import Footer from '../Footer/page';
import { logout } from '@/app/Redux/counterSlice';
import { useRouter } from 'next/navigation';

const Profile = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const reduxUser = useSelector((state) => state.counter.user);

    const [preview, setPreview] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
    });

    const handleLogout = () => {
        dispatch(logout());
        router.push('/Components/Login');
    };

    useEffect(() => {
        if (reduxUser) {
            setPreview(reduxUser.profilePicture || null);
            setFormData({
                name: reduxUser.name || '',
                email: reduxUser.email || '',
                phone: reduxUser.phone || '',
                address: reduxUser.address || '',
            });
        }
    }, [reduxUser]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
                dispatch(updateProfilePicture(reader.result));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = () => {
        dispatch(setUserData(formData));
        alert('Profile updated successfully!');
    };

    if (!reduxUser) {
        return <p className="text-center mt-10">Loading user info...</p>;
    }

    return (
        <div className="pt-24 text-white">
            <Navbar />

            <div className="max-w-xl mx-1 sm:mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-6 text-center">User Profile</h1>

                {/* Profile Picture Upload */}
                <div className="flex flex-col items-center mb-6">
                    <img
                        src={preview || '/trendy-model.avif'}
                        alt={formData.name ? `${formData.name}'s profile` : 'Profile Picture'}
                        className="w-24 h-24 rounded-full border border-gray-500 object-cover"
                    />
                    <label
                        htmlFor="profile-upload"
                        className="mt-3 bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded cursor-pointer"
                    >
                        Upload New Picture
                    </label>
                    <input
                        id="profile-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                    />
                </div>

                {/* Editable User Info Form */}
                <div className="space-y-4">
                    {[
                        { label: 'Name', name: 'name', type: 'text' },
                        { label: 'Email', name: 'email', type: 'email' },
                        { label: 'Phone', name: 'phone', type: 'tel' },
                        { label: 'Address', name: 'address', type: 'text' },
                    ].map(({ label, name, type }) => (
                        <div key={name} className="flex flex-col">
                            <label className="mb-1 font-semibold">{label}</label>
                            <input
                                type={type}
                                name={name}
                                value={formData[name]}
                                onChange={handleChange}
                                className="bg-gray-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                placeholder={`Enter your ${label.toLowerCase()}`}
                            />
                        </div>
                    ))}
                </div>

                <button
                    onClick={handleSave}
                    className="mt-6 w-full bg-yellow-400 hover:bg-yellow-50 font-semibold py-2 rounded transition"
                >
                    Save Profile
                </button>
            </div>
            <div className='flex justify-center mt-8'>
            <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 font-semibold rounded-lg cursor-pointer"
            >
                Logout
            </button>
            </div>
            <Footer />
        </div>
    );
};

export default Profile;
