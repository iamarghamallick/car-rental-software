"use client"
import BookedCarDetails from '@/components/BookedCarDetails';
import BookingDetails from '@/components/BookingDetails';
import { verifyToken } from '@/utils/auth';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { BeatLoader } from 'react-spinners';
import { IoMdArrowBack } from "react-icons/io";
import { AiOutlinePrinter } from "react-icons/ai";

const Page = ({ params }) => {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");
    const [booking, setBooking] = useState(null);

    const route = useRouter();
    const [validUser, setValidUser] = useState(false);
    const [userId, setUserId] = useState(null);
    const [userdata, setUserdata] = useState(null);

    const getBooking = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/bookings?_id=${params.slug}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await res.json();
            if (res.ok) {
                setBooking(data.booking);
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

    useEffect(() => {
        try {
            const token = localStorage.getItem('token');
            const { valid, decodedToken, error } = verifyToken(token, "driver");
            if (!valid || error) {
                route.push('/login');
            } else {
                console.log(decodedToken);
                setUserId(decodedToken.user_data.id);
                setValidUser(true);
            }

            getBooking();
            fetchUserDetails(decodedToken.user_data.id);
        } catch {
            route.push('/login');
        }
    }, [])

    const handlePrint = () => {
        window.print();
    };

    return (
        <>
            {!validUser && <main className='flex flex-col min-h-screen items-center justify-center'>
                <h1 className='text-xl font-bold m-4'>Please wait a moment</h1>
                <BeatLoader color='blue' />
            </main>}

            {validUser && <main className='bg-gray-100 flex flex-col min-h-screen items-center pt-8'>
                <div className="container bg-white p-4 rounded-lg flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">Booking Details</h1>
                    <div className="flex space-x-4">
                        <button
                            onClick={() => window.history.back()}
                            className="flex items-center text-blue-600 hover:text-blue-800 transition duration-300 ease-in-out"
                            aria-label="Go back"
                        >
                            <IoMdArrowBack className="mr-2" />
                            Back
                        </button>
                        <button
                            onClick={handlePrint}
                            className="flex items-center text-green-600 hover:text-green-800 transition duration-300 ease-in-out"
                            aria-label="Print booking details"
                        >
                            <AiOutlinePrinter className="mr-2" />
                            Print
                        </button>
                    </div>
                </div>
                {loading && <h1>Loading Booking Details...</h1>}
                {booking && <section className='container grid grid-cols-2 gap-8'>
                    <BookingDetails booking={booking} />
                    <BookedCarDetails carDetails={booking.carDetails} />
                </section>}
            </main>}
        </>
    )
}

export default Page