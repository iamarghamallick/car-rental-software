"use client";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { BeatLoader } from 'react-spinners';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('customer');
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Email:', email);
        console.log('Password:', password);
        console.log('Login as:', userType);

        setLoading(true);

        try {
            const res = await fetch('/api/log-in', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    userType: userType
                }),
            });
            const data = await res.json();
            if (res.ok) {
                console.log(data);
                localStorage.setItem('token', data.token);
                setStatus(data.message + ". Redirecting to Dashboard...");
                setTimeout(() => {
                    router.push(`/${userType}-dashboard`, { scroll: false });
                }, 100);
            } else {
                console.log("Some Error Occured!", data);
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
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
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
                    <label htmlFor="userType" className="block text-gray-700 mb-2">Login as</label>
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

                <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 flex justify-center items-center">
                    {loading ? <BeatLoader color='white' /> : "Login"}
                </button>

                <p className="my-6 text-center">{status}</p>
            </form>
        </div>
    );
};

export default LoginForm;
