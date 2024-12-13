"use client";
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { verifyToken } from '@/utils/auth';
import { BeatLoader } from 'react-spinners';
import CustomerHeader from '@/components/CustomerHeader';
import CarList from '@/components/CarList';
import Link from 'next/link';

const Page = () => {
    const route = useRouter();
    const [validUser, setValidUser] = useState(false);
    const [userId, setUserId] = useState(null);
    const [userdata, setUserdata] = useState(null);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");

    useEffect(() => {
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
            {!validUser && <main className='flex flex-col min-h-screen items-center justify-center'>
                <h1 className='text-xl font-bold m-4'>Please wait a moment</h1>
                <BeatLoader color='blue' />
            </main>}

            {validUser && <main className='flex flex-col min-h-screen items-center px-1'>
                <CustomerHeader />

                <section className="rounded-lg w-full h-[400px] bg-[url('/assets/all-images/cars-img/tesla.jpg')] bg-cover bg-center relative flex justify-center items-center">
                    <div className="absolute inset-0 rounded-lg bg-blue-950 opacity-50"></div>
                    <div className='relative flex flex-col justify-center items-start gap-8 px-2 md:pl-24 md:w-[1440px]'>
                        {loading && <h1 className="text-white text-xl font-bold">Loading User Details...</h1>}
                        {userdata && <h1 className="text-white text-xl font-bold">Welcome {userdata.name}</h1>}
                        <h1 className="text-white text-4xl font-bold">Reserve Now and get instance 20% off</h1>
                        <div className='flex gap-6'>
                            <Link href='/customer-dashboard#reserve' className='p-2 px-4 bg-white rounded-lg text-blue-950 font-bold text-xl'>Reserve a car</Link>
                            <Link href='/my-bookings' className='p-2 px-4 bg-gray-700 rounded-lg text-white font-bold text-xl border border-white'>My Bookings</Link>
                        </div>
                    </div>
                </section>

                <section id='reserve' className='my-6'>
                    <h1 className="text-4xl font-bold text-center mb-8">Available Cars</h1>
                    <CarList />
                </section>
            </main>}
        </>
    )
}

export default Page