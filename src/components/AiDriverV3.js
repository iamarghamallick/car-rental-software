import React, { useState, useEffect } from 'react';
import { FaCar, FaHistory, FaBell, FaUser, FaMap, FaStar } from 'react-icons/fa';
import { MdDirectionsCar, MdLocationOn } from 'react-icons/md';

const AiDriverV3 = () => {
    const [activeTab, setActiveTab] = useState('bookings');
    const [notifications, setNotifications] = useState([]);
    const [bookingRequests, setBookingRequests] = useState([]);
    const [rideRequests, setRideRequests] = useState([]);
    const [tripHistory, setTripHistory] = useState([]);

    useEffect(() => {
        // Simulating fetching data
        setNotifications([
            { id: 1, message: 'New booking request received' },
            { id: 2, message: 'Your last trip was rated 5 stars!' },
        ]);
        setBookingRequests([
            { id: 1, pickup: '123 Main St', dropoff: '456 Elm St', passenger: 'John Doe' },
            { id: 2, pickup: '789 Oak Ave', dropoff: '321 Pine Rd', passenger: 'Jane Smith' },
        ]);
        setRideRequests([
            { id: 1, pickup: '555 Beach Blvd', dropoff: '777 Mountain View', passenger: 'Alice Johnson' },
            { id: 2, pickup: '999 River St', dropoff: '111 Lake Ave', passenger: 'Bob Williams' },
        ]);
        setTripHistory([
            { id: 1, date: '2023-05-01', earnings: 50, rating: 5 },
            { id: 2, date: '2023-05-02', earnings: 45, rating: 4 },
        ]);
    }, []);

    const handleAcceptBooking = (id) => {
        setBookingRequests(bookingRequests.filter(request => request.id !== id));
    };

    const handleAcceptRide = (id) => {
        setRideRequests(rideRequests.filter(request => request.id !== id));
    };

    return (
        <div className="bg-gray-100 min-h-screen p-4">
            <header className="bg-white rounded-lg shadow-md p-4 mb-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <img
                            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80"
                            alt="Driver"
                            className="w-16 h-16 rounded-full object-cover"
                        />
                        <div>
                            <h1 className="text-2xl font-bold">John Driver</h1>
                            <p className="text-gray-600">john.driver@example.com</p>
                            <div className="flex items-center mt-1">
                                <FaStar className="text-yellow-400 mr-1" />
                                <span>4.8</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition">
                            <FaBell className="inline-block mr-2" />
                            Notifications ({notifications.length})
                        </button>
                    </div>
                </div>
            </header>

            <nav className="bg-white rounded-lg shadow-md p-4 mb-4">
                <ul className="flex space-x-4">
                    <li>
                        <button
                            className={`px-4 py-2 rounded-md ${activeTab === 'bookings' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                            onClick={() => setActiveTab('bookings')}
                        >
                            <FaCar className="inline-block mr-2" />
                            Bookings
                        </button>
                    </li>
                    <li>
                        <button
                            className={`px-4 py-2 rounded-md ${activeTab === 'rides' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                            onClick={() => setActiveTab('rides')}
                        >
                            <MdDirectionsCar className="inline-block mr-2" />
                            Ride Requests
                        </button>
                    </li>
                    <li>
                        <button
                            className={`px-4 py-2 rounded-md ${activeTab === 'history' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                            onClick={() => setActiveTab('history')}
                        >
                            <FaHistory className="inline-block mr-2" />
                            Trip History
                        </button>
                    </li>
                    <li>
                        <button
                            className={`px-4 py-2 rounded-md ${activeTab === 'navigation' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                            onClick={() => setActiveTab('navigation')}
                        >
                            <FaMap className="inline-block mr-2" />
                            Navigation
                        </button>
                    </li>
                </ul>
            </nav>

            <main className="bg-white rounded-lg shadow-md p-4">
                {activeTab === 'bookings' && (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Booking Requests</h2>
                        {bookingRequests.map((request) => (
                            <div key={request.id} className="border-b border-gray-200 py-4">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="font-semibold">{request.passenger}</p>
                                        <p className="text-sm text-gray-600">
                                            <MdLocationOn className="inline-block mr-1" />
                                            Pickup: {request.pickup}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            <MdLocationOn className="inline-block mr-1" />
                                            Dropoff: {request.dropoff}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => handleAcceptBooking(request.id)}
                                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition"
                                    >
                                        Accept
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'rides' && (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Available Ride Requests</h2>
                        {rideRequests.map((request) => (
                            <div key={request.id} className="border-b border-gray-200 py-4">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="font-semibold">{request.passenger}</p>
                                        <p className="text-sm text-gray-600">
                                            <MdLocationOn className="inline-block mr-1" />
                                            Pickup: {request.pickup}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            <MdLocationOn className="inline-block mr-1" />
                                            Dropoff: {request.dropoff}
                                        </p>
                                    </div>
                                    <div>
                                        <button
                                            onClick={() => handleAcceptRide(request.id)}
                                            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition mr-2"
                                        >
                                            Accept
                                        </button>
                                        <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition">
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'history' && (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Trip History</h2>
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="py-2 px-4 text-left">Date</th>
                                    <th className="py-2 px-4 text-left">Earnings</th>
                                    <th className="py-2 px-4 text-left">Rating</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tripHistory.map((trip) => (
                                    <tr key={trip.id} className="border-b border-gray-200">
                                        <td className="py-2 px-4">{trip.date}</td>
                                        <td className="py-2 px-4">${trip.earnings}</td>
                                        <td className="py-2 px-4">
                                            <div className="flex items-center">
                                                <FaStar className="text-yellow-400 mr-1" />
                                                {trip.rating}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'navigation' && (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Navigation</h2>
                        <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.30591910525!2d-74.25986652089843!3d40.69714776708241!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1651271878073!5m2!1sen!2s"
                                width="100%"
                                height="450"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Navigation Map"
                            ></iframe>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default AiDriverV3;
