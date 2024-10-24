"use client"
import BookedCarDetails from '@/components/BookedCarDetails';
import BookingDetails from '@/components/BookingDetails';
import { verifyToken } from '@/utils/auth';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { BeatLoader } from 'react-spinners';
import { IoMdArrowBack } from "react-icons/io";
import { AiOutlinePrinter } from "react-icons/ai";
import CustomerInfo from '@/components/CustomerInfo';
import DriverInfo from '@/components/DriverInfo';

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
            const { valid, decodedToken, error } = verifyToken(token, "customer");
            if (valid && (decodedToken.user_data.userType === "customer" || decodedToken.user_data.userType === "driver")) {
                console.log(decodedToken);
                setUserId(decodedToken.user_data.id);
                setValidUser(true);
            } else {
                route.push('/login');
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

    const handleCancelBooking = async (booking) => {
        console.log(booking);
        setLoading(true);
        try {
            const res = await fetch('/api/bookings', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...booking, status: "cancelled" }),
            });
            const data = await res.json();
            if (res.ok) {
                setStatus(data.message);
                console.log(data);
            } else {
                console.log("Some Error Occured!");
                setStatus("Something went wrong!");
            }
        } catch (error) {
            console.log("Error:", error);
            setStatus("Something went wrong!");
        } finally {
            setLoading(false);
            await getBooking();
        }
    }

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
                <BeatLoader className={`${loading ? "" : "invisible"} text-center`} color="blue" />
                {booking && <section className='container grid grid-cols-2 gap-8'>
                    <BookingDetails booking={booking} />
                    <BookedCarDetails carDetails={booking.carDetails} />
                </section>}
                {booking && userdata.userType === "customer" && <button
                    disabled={booking.status === "cancelled"}
                    onClick={() => handleCancelBooking(booking)}
                    class={`${booking.status === "cancelled" ? "" : "hover:bg-red-700 hover:shadow-lg"} m-8 bg-red-600 text-white font-bold py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-all duration-300`}>
                    {booking.status === "cancelled" ? "You have Cancelled This Booking" : "Cancel Booking"}
                </button>}
                {booking && <section className='container grid grid-cols-2 gap-8 my-8'>
                    <CustomerInfo customer={booking.customerDetails} />
                    <DriverInfo driver={booking.driverDetails} />
                </section>}
            </main>}
        </>
    )
}

export default Page