"use client";
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { verifyToken } from '@/utils/auth';
import AiDriverV2 from '@/components/AiDriverV2';
import AiDriverV1 from '@/components/AiDriverV1';
import AiDriverV3 from '@/components/AiDriverV3';

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
        <section className='flex flex-col min-h-screen items-center justify-center'>
            {validUser && <main>
                {/* <h1>Driver Dashboard</h1>
                <h2>{userId}</h2> */}
                {/* <AiDriverV1 /> */}
                <AiDriverV2 />
                {/* <AiDriverV3 /> */}
            </main>}
        </section>
    )
}

export default Page