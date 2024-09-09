"use client";
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { verifyToken } from '@/utils/auth';

const page = () => {
    const route = useRouter();
    const [validUser, setValidUser] = useState(false);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const { valid, decodedToken, error } = verifyToken(token, "manager");
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
                <h1>Manager Dashboard</h1>
                <h2>{userId}</h2>
            </main>}
        </section>
    )
}

export default page