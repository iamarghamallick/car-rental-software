import React, { useEffect, useState } from 'react'

const BookingForm = ({ user_id, car_id, title, imageUrl, fuel, mileage, space, year, price }) => {
    const [newBooking, setNewBooking] = useState({ user_id: user_id, car_id: car_id, driver_id: '', origin: '', dest: '', date: '', time: '', distance: 0, fare: 0, carDetails: {}, customerDetails: {}, driverDetails: {} });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");

    const calculateFare = () => {
        const farePerKm = price;
        return newBooking.distance * farePerKm;
    };

    useEffect(() => {
        setNewBooking({ ...newBooking, fare: calculateFare(newBooking.distance) })
    }, [newBooking.distance]);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(newBooking);
        setLoading(true);

        try {
            const carDetails = await getCarDetails(newBooking.car_id);
            const customerDetails = await getCustomerDetails(newBooking.user_id);

            setNewBooking({
                ...newBooking,
                carDetails: carDetails,
                customerDetails: customerDetails
            });

            const res = await fetch('/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...newBooking,
                    carDetails: carDetails,
                    customerDetails: customerDetails
                }),
            });
            const data = await res.json();
            if (res.ok) {
                setStatus(data.message);
                setNewBooking({ user_id: user_id, car_id: car_id, origin: '', dest: '', date: '', time: '', distance: 0, fare: 0 });
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
        }
    };

    return (
        <div className="p-6 bg-gray-50 rounded-lg shadow-inner">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">{status ? status : "Rent This Car"}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="origin" className="block text-sm font-medium text-gray-700">Origin</label>
                    <input
                        type="text"
                        id="origin"
                        value={newBooking.origin}
                        onChange={(e) => setNewBooking({ ...newBooking, origin: e.target.value })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="destination" className="block text-sm font-medium text-gray-700">Destination</label>
                    <input
                        type="text"
                        id="destination"
                        value={newBooking.dest}
                        onChange={(e) => setNewBooking({ ...newBooking, dest: e.target.value })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                    <input
                        type="date"
                        id="date"
                        value={newBooking.date}
                        onChange={(e) => setNewBooking({ ...newBooking, date: e.target.value })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label>
                    <input
                        type="time"
                        id="time"
                        value={newBooking.time}
                        onChange={(e) => setNewBooking({ ...newBooking, time: e.target.value })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="distance" className="block text-sm font-medium text-gray-700">Distance (in km)</label>
                    <input
                        type="number"
                        id="distance"
                        value={newBooking.distance}
                        onChange={(e) => {
                            setNewBooking({ ...newBooking, distance: e.target.value })
                            calculateFare();
                        }}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="fare" className="block text-sm font-medium text-gray-700">Fare</label>
                    <input
                        type="text"
                        id="fare"
                        value={`₹${newBooking.fare}`}
                        readOnly
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-200"
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                        {loading ? "In Progress..." : "Confirm Booking"}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default BookingForm