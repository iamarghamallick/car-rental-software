"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { BeatLoader } from 'react-spinners';

const SignupForm = () => {
    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        password: '',
        userType: 'customer',
        phone: '',
        licenseNumber: '', // only for driver
        licenseVerified: '', // only for driver
        region: '', // only for driver
        status: 'not active', // only for driver
        active: 'false', // only for driver
    });

    const [confirmPassword, setConfirmPassword] = useState('');
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newUser.password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch('/api/sign-up', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            });
            const data = await res.json();
            if (res.ok) {
                setStatus(data.message);
                console.log(data);
                setTimeout(() => {
                    router.push(`/login`, { scroll: false });
                }, 100);
            } else {
                console.log("Some Error Occured!");
                setStatus("Something went wrong!");
            }
        } catch (error) {
            console.log("Error:", error);
            setStatus("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 rounded md:min-w-96 max-w-sm my-4">
            <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
            <p className={`${status ? '' : 'invisible'} my-1 text-center`}>{status ? status : "Signup Status"}</p>
            <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
                <input
                    type="text"
                    id="name"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    required
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 mb-2">Email Address</label>
                <input
                    type="email"
                    id="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    required
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="userType" className="block text-gray-700 mb-2">Sign Up as</label>
                <select
                    id="userType"
                    value={newUser.userType}
                    onChange={(e) => setNewUser({ ...newUser, userType: e.target.value })}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                    <option value="customer">Customer</option>
                    <option value="driver">Driver</option>
                    <option value="manager">Manager</option>
                </select>
            </div>

            <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
                <input
                    type="password"
                    id="password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    required
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
            </div>

            <div className="mb-6">
                <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">Confirm Password</label>
                <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 flex items-center justify-center">
                {loading ? <BeatLoader color='white' /> : "Sign Up"}
            </button>
            <div className='flex justify-between gap-4 my-2'>
                <h1>Already have an account?</h1>
                <Link className='text-blue-600 underline underline-offset-2' href="/login">Login</Link>
            </div>
        </form>
    );
};

export default SignupForm;
