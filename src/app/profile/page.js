"use client";
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { verifyToken } from '@/utils/auth';
import { BeatLoader } from 'react-spinners';
import UserProfile from '@/components/UserProfile';

const Page = () => {
    const route = useRouter();
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const { valid, decodedToken, error } = verifyToken(token, "manager");
        if (decodedToken) {
            console.log(decodedToken);
            setUserId(decodedToken.user_data.id);
        }
    }, [])

    return (
        <section className='flex flex-col min-h-screen items-center justify-center px-1'>
            {!userId && <main>
                <BeatLoader color='blue' />
            </main>}

            {userId && <UserProfile userId={userId} />}
        </section>
    )
}

export default Page