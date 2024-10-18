"use client";
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { verifyToken } from '@/utils/auth';
import Driver from '@/components/Driver';

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
                console.log(data);
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
        const { valid, decodedToken, error } = verifyToken(token, "driver");
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
        <section className='flex flex-col min-h-screen items-center justify-center'>
            {validUser && userdata && <main>
                <Driver
                    driver_id={userdata._id}
                    name={userdata.name}
                    email={userdata.email}
                />
            </main>}
        </section>
    )
}

export default Page