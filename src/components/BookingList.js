import { capitalize } from '@/utils/utility';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';

const BookingList = ({ userdata }) => {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");
    const [bookingList, setBookingList] = useState(null);

    const getCustomerDetails = async (_id) => {
        const res = await fetch(`/api/users?_id=${_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();
        return data.user;
    }

    const getCarDetails = async (_id) => {
        const res = await fetch(`/api/cars?_id=${_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();
        return data.car;
    }

    const getDriverDetails = async (_id) => {
        const res = await fetch(`/api/users?_id=${_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();
        return data.user;
    }

    const getAllBookings = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/bookings', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await res.json();
            console.log(data);
            if (res.ok) {
                const updatedBookings = await Promise.all(data.bookings.map(async (booking) => ({
                    ...booking,
                    customerDetails: booking.customerDetails || await getCustomerDetails(booking.user_id),
                    carDetails: booking.carDetails || await getCarDetails(booking.car_id),
                    driverDetails: booking.driverDetails || await getDriverDetails(booking.driver_id)
                })));
                console.log("Updated Booking", updatedBookings);
                setBookingList(updatedBookings);
                setStatus(data.message);
            } else {
                console.log("Some Error Occurred!");
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
        getAllBookings();
    }, []);

    const trimString = (str) => {
        if (str.length > 35) {
            return str.slice(0, 35) + '...';
        }
        return str;
    }

    const generateOTP = () => {
        return Math.floor(1000 + Math.random() * 9000);
    }

    const handleAcceptBooking = async (booking, userdata) => {
        console.log(booking);
        setLoading(true);
        try {
            const res = await fetch('/api/bookings', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...booking, otp: generateOTP(), driver_id: userdata._id, driverDetails: userdata }),
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
            await getAllBookings();
        }
    }

    const handleDeclineBooking = async (booking, userdata) => {
        console.log(booking);
        setLoading(true);
        try {
            const res = await fetch('/api/bookings', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...booking, driver_id: '', driverDetails: {} }),
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
            await getAllBookings();
        }
    }

    return (
        <div className='container'>
            <BeatLoader className={`${loading ? "" : "invisible"} text-center`} color="blue" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {bookingList && bookingList.map((booking) => (
                    <div key={booking._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <img
                            src={booking.carDetails ? booking.carDetails.imageUrl : "/assets/all-images/car-loading.jpg"}
                            alt="Car"
                            className="w-full h-24 object-cover"
                        />
                        <div className="p-6">
                            <h2 className="text-base font-semibold mb-2">{booking.carDetails ? trimString(booking.carDetails.title) : "Not Found This Car"}</h2>
                            <div className='flex justify-between'>
                                <p className="text-gray-700 mb-4">{booking.origin.locationName}</p>
                                <p className="text-gray-700 mb-4 mx-4">-</p>
                                <p className="text-gray-700 mb-4">{booking.dest.locationName}</p>
                            </div>
                            <div className='flex justify-between'>
                                <p className="text-gray-700 mb-4">On {booking.date}</p>
                                <p className="text-gray-700 mb-4">At {booking.time}</p>
                            </div>
                            <div className='flex justify-between'>
                                <p className="text-gray-700 mb-4">{booking.distance} km</p>
                                <p className="text-gray-700 mb-4 font-semibold">₹{booking.fare}</p>
                            </div>
                            <p className="text-gray-700 mb-4">Booked By {booking.customerDetails ? booking.customerDetails.name : "User Not Found"}</p>
                            <p className='bg-slate-200 text-lg w-full text-center p-2 rounded-lg font-semibold'>{capitalize(booking.status)}</p>
                            {userdata.userType === "driver" && <div className="flex justify-between mt-4">
                                <button
                                    disabled={booking.driverDetails._id === userdata._id || booking.status === "cancelled"}
                                    onClick={() => handleAcceptBooking(booking, userdata)} className={`bg-green-500 ${booking.driverDetails._id === userdata._id ? "" : "hover:bg-green-600"} text-white font-bold py-2 px-4 rounded-full ${booking.status === "cancelled" ? "invisible" : ""}`}>
                                    {`${booking.driverDetails._id === userdata._id ? "Accepted" : "Accept"}`}
                                </button>
                                {booking.driverDetails._id === userdata._id && <Link
                                    href={`/bookingdetails/${booking._id}`}
                                    className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full'
                                >View</Link>}
                                {booking.driverDetails._id === userdata._id && booking.status !== "journey started" && <button
                                    disabled={booking.status === "cancelled"}
                                    onClick={() => handleDeclineBooking(booking, userdata)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full">
                                    Decline
                                </button>}
                            </div>}
                            {userdata.userType === "customer" && <div className="flex justify-center mt-4">
                                {booking.customerDetails._id === userdata._id && <Link href={`/bookingdetails/${booking._id}`} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full">
                                    View Details
                                </Link>}
                            </div>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default BookingList;
