import React, { useEffect, useState } from 'react';

const BookingList = () => {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");
    const [bookingList, setBookingList] = useState(null);

    useEffect(() => {
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
                        customerDetails: await getCustomerDetails(booking.user_id),
                        carDetails: await getCarDetails(booking.car_id),
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
        getAllBookings();
    }, []);

    const trimString = (str) => {
        if (str.length > 40) {
            return str.slice(0, 40) + '...';
        }
        return str;
    }

    return (
        <div className='container'>
            {loading && <h1 className='text-center'>Loading bookings...</h1>}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {bookingList && bookingList.map((booking) => (
                    <div key={booking._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <img
                            src={booking.carDetails.imageUrl}
                            alt="Car"
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-6">
                            <h2 className="text-2xl font-semibold mb-2">{trimString(booking.carDetails.title)}</h2>
                            <div className='flex justify-around'>
                                <p className="text-gray-700 mb-4">{booking.origin}</p>
                                <p className="text-gray-700 mb-4">-</p>
                                <p className="text-gray-700 mb-4">{booking.dest}</p>
                            </div>
                            <div className='flex justify-around'>
                                <p className="text-gray-700 mb-4">On {booking.date}</p>
                                <p className="text-gray-700 mb-4">At {booking.time}</p>
                            </div>
                            <div className='flex justify-around'>
                                <p className="text-gray-700 mb-4">{booking.distance} km</p>
                                <p className="text-gray-700 mb-4">₹{booking.fare}</p>
                            </div>
                            <p className="text-gray-700 mb-4">Booked By {booking.customerDetails.name}</p>
                            <div className="flex justify-between mt-4">
                                <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full">
                                    Accept
                                </button>
                                <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full">
                                    Decline
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default BookingList;
