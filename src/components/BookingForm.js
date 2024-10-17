import React, { useEffect, useState } from 'react'

const BookingForm = ({ title, imageUrl, fuel, mileage, space, year, price }) => {
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [distance, setDistance] = useState(0);
    const [fare, setFare] = useState(0);

    const calculateFare = () => {
        const farePerKm = price;
        return distance * farePerKm;
    };

    useEffect(() => {
        setFare(calculateFare(distance));
    }, [distance]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle booking logic here
        alert(`Booking confirmed from ${origin} to ${destination}!`);
    };
    return (
        <div className="p-6 bg-gray-50 rounded-lg shadow-inner">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Book Your Ride</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="origin" className="block text-sm font-medium text-gray-700">Origin</label>
                    <input
                        type="text"
                        id="origin"
                        value={origin}
                        onChange={(e) => setOrigin(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="destination" className="block text-sm font-medium text-gray-700">Destination</label>
                    <input
                        type="text"
                        id="destination"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label>
                    <input
                        type="time"
                        id="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="distance" className="block text-sm font-medium text-gray-700">Distance (in km)</label>
                    <input
                        type="number"
                        id="distance"
                        value={distance}
                        onChange={(e) => {
                            setDistance(e.target.value);
                            calculateFare(); // Update fare when distance changes
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
                        value={`₹${fare}`}
                        readOnly
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-200"
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                        Confirm Booking
                    </button>
                </div>
            </form>
        </div>
    )
}

export default BookingForm