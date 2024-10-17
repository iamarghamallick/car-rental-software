"use client";
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { verifyToken } from '@/utils/auth';
import { BeatLoader } from 'react-spinners';
import CustomerHeader from '@/components/CustomerHeader';
import FindCarForm from '@/components/FindCarForm';
import CarList from '@/components/CarList';

const Page = () => {
    const route = useRouter();
    const [validUser, setValidUser] = useState(false);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const { valid, decodedToken, error } = verifyToken(token, "customer");
        if (!valid || error) {
            route.push('/login');
        } else {
            console.log(decodedToken);
            setUserId(decodedToken.user_data.id);
            setValidUser(true);
        }
    }, [])

    return (
        <>
            {!validUser && <main className='flex flex-col min-h-screen items-center justify-center'>
                <h1 className='text-xl font-bold m-4'>Please wait a moment</h1>
                <BeatLoader color='blue' />
            </main>}

            {validUser && <main className='flex flex-col min-h-screen items-center'>
                <CustomerHeader />

                <section className="w-full h-[400px] bg-[url('/assets/all-images/cars-img/tesla.jpg')] bg-cover bg-center relative flex justify-center items-center">
                    <div className="absolute inset-0 bg-blue-950 opacity-50"></div>
                    <div className='relative flex flex-col justify-center items-start gap-8 pl-24 w-[1440px]'>
                        <h1 className="text-white font-bold">Welcome {userId}</h1>
                        <h1 className="text-white text-4xl font-bold">Reserve Now and get instance 20% off</h1>
                        <button className='p-2 px-4 bg-white rounded-lg text-blue-950 font-bold text-xl'>Reverse a car</button>
                    </div>
                </section>

                {/* <FindCarForm /> */}

                <CarList />
            </main>}
        </>
    )
}

export default Page