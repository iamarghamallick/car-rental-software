"use client";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { BeatLoader } from 'react-spinners';

const SignupForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [userType, setUserType] = useState('customer');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
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
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                    userType: userType
                }),
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
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-sm my-4">
                <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 mb-2">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="userType" className="block text-gray-700 mb-2">Sign Up as</label>
                    <select
                        id="userType"
                        value={userType}
                        onChange={(e) => setUserType(e.target.value)}
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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

                <p className="my-6 text-center">{status}</p>
            </form>
        </div>
    );
};

export default SignupForm;
