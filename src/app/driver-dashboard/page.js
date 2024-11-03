"use client";
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { verifyToken } from '@/utils/auth';
import Driver from '@/components/Driver';
import { BeatLoader } from 'react-spinners';

const Page = () => {
    const route = useRouter();
    const [validUser, setValidUser] = useState(false);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const { valid, decodedToken, error } = verifyToken(token, "driver");
        if (!valid || error) {
            route.push('/login');
        } else {
            console.log(decodedToken);
            setUserId(decodedToken.user_data.id);
            setValidUser(true);
        }
    }, [])

    return (
        <section className='flex flex-col min-h-screen items-center justify-center px-1'>
            {!validUser && <main className='flex flex-col min-h-screen items-center justify-center'>
                <h1 className='text-xl font-bold m-4'>Please wait a moment</h1>
                <BeatLoader color='blue' />
            </main>}
            {validUser && <main className='container'>
                <Driver
                    driver_id={userId}
                />
            </main>}
        </section>
    )
}

export default Page