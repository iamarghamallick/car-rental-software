"use client"
import React, { useEffect, useState } from 'react'
import BookingList from '@/components/BookingList'
import { useRouter } from 'next/navigation';
import { verifyToken } from '@/utils/auth';
import { BeatLoader } from 'react-spinners';
import Link from 'next/link';

const Page = () => {
    const route = useRouter();
    const [validUser, setValidUser] = useState(false);
    const [userId, setUserId] = useState(null);
    const [userdata, setUserdata] = useState(null);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");

    const fetchUserDetails = async (_id) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/users?_id=${_id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await res.json();
            if (res.ok) {
                setUserdata(data.user);
                setStatus(data.message);
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
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        const { valid, decodedToken, error } = verifyToken(token, "customer");
        if (!valid || error) {
            route.push('/login');
        } else {
            console.log(decodedToken);
            setUserId(decodedToken.user_data.id);
            setValidUser(true);

            // fetch user details
            fetchUserDetails(decodedToken.user_data.id);
        }
    }, [])

    return (
        <>
            {(!validUser || !userdata) && <main className='flex flex-col min-h-screen items-center justify-center'>
                <h1 className='text-xl font-bold m-4'>Please wait a moment</h1>
                <BeatLoader color='blue' />
            </main>}

            {userdata && <main className='flex flex-col min-h-screen items-center mb-4 px-1'>
                <div className="container p-4 rounded-lg flex justify-center items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 text-center">My Bookings</h1>
                </div>
                <BookingList userdata={userdata} />
            </main>}
        </>
    )
}

export default Page