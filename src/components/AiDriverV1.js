import React, { useState } from 'react';
import { FaCar, FaHistory, FaBell, FaUser, FaMapMarkerAlt, FaStar, FaPhone, FaEnvelope } from 'react-icons/fa';
import { MdDirections } from 'react-icons/md';

const AiDriverV1 = () => {
    const [activeTab, setActiveTab] = useState('bookings');
    const [notifications, setNotifications] = useState(3);

    const driverDetails = {
        name: 'John Doe',
        profilePicture: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80',
        phone: '+1 (555) 123-4567',
        email: 'john.doe@example.com',
        rating: 4.8
    };

    const bookingRequests = [
        { id: 1, pickup: '123 Main St', dropoff: '456 Elm St', passenger: 'Alice Smith' },
        { id: 2, pickup: '789 Oak Ave', dropoff: '321 Pine Rd', passenger: 'Bob Johnson' },
    ];

    const rideRequests = [
        { id: 1, pickup: '555 Cedar Ln', dropoff: '777 Maple Dr', passenger: 'Carol Williams' },
        { id: 2, pickup: '999 Birch Blvd', dropoff: '111 Spruce Ct', passenger: 'David Brown' },
    ];

    const tripHistory = [
        { id: 1, date: '2023-05-15', earnings: 25.50, rating: 5, feedback: 'Great service!' },
        { id: 2, date: '2023-05-14', earnings: 18.75, rating: 4, feedback: 'Good ride' },
    ];

    const handleAcceptBooking = (id) => {
        console.log(`Accepted booking ${id}`);
    };

    const handleAcceptRide = (id) => {
        console.log(`Accepted ride ${id}`);
    };

    const handleRejectRide = (id) => {
        console.log(`Rejected ride ${id}`);
    };

    return (
        <div className="bg-gray-100 min-h-screen p-4">
            <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Header */}
                <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Driver Dashboard</h1>
                    <div className="flex items-center space-x-4">
                        <button className="relative" onClick={() => setNotifications(0)}>
                            <FaBell className="text-2xl" />
                            {notifications > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {notifications}
                                </span>
                            )}
                        </button>
                        <img
                            src={driverDetails.profilePicture}
                            alt="Driver"
                            className="w-10 h-10 rounded-full object-cover"
                        />
                    </div>
                </header>

                {/* Main Content */}
                <div className="flex flex-col md:flex-row">
                    {/* Sidebar */}
                    <aside className="w-full md:w-1/4 bg-gray-50 p-4">
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-2">{driverDetails.name}</h2>
                            <div className="flex items-center mb-2">
                                <FaStar className="text-yellow-400 mr-1" />
                                <span>{driverDetails.rating}</span>
                            </div>
                            <div className="flex items-center mb-2">
                                <FaPhone className="mr-2" />
                                <span>{driverDetails.phone}</span>
                            </div>
                            <div className="flex items-center">
                                <FaEnvelope className="mr-2" />
                                <span>{driverDetails.email}</span>
                            </div>
                        </div>
                        <nav>
                            <button
                                className={`w-full text-left p-2 mb-2 rounded ${activeTab === 'bookings' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-200'}`}
                                onClick={() => setActiveTab('bookings')}
                            >
                                <FaCar className="inline-block mr-2" /> Bookings
                            </button>
                            <button
                                className={`w-full text-left p-2 mb-2 rounded ${activeTab === 'rides' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-200'}`}
                                onClick={() => setActiveTab('rides')}
                            >
                                <FaMapMarkerAlt className="inline-block mr-2" /> Ride Requests
                            </button>
                            <button
                                className={`w-full text-left p-2 mb-2 rounded ${activeTab === 'history' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-200'}`}
                                onClick={() => setActiveTab('history')}
                            >
                                <FaHistory className="inline-block mr-2" /> Trip History
                            </button>
                        </nav>
                    </aside>

                    {/* Main Panel */}
                    <main className="w-full md:w-3/4 p-4">
                        {activeTab === 'bookings' && (
                            <div>
                                <h2 className="text-2xl font-semibold mb-4">Booking Requests</h2>
                                {bookingRequests.map((booking) => (
                                    <div key={booking.id} className="bg-white p-4 rounded-lg shadow mb-4">
                                        <h3 className="font-semibold mb-2">Booking #{booking.id}</h3>
                                        <p><strong>Pickup:</strong> {booking.pickup}</p>
                                        <p><strong>Dropoff:</strong> {booking.dropoff}</p>
                                        <p><strong>Passenger:</strong> {booking.passenger}</p>
                                        <button
                                            className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                            onClick={() => handleAcceptBooking(booking.id)}
                                        >
                                            Accept Booking
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'rides' && (
                            <div>
                                <h2 className="text-2xl font-semibold mb-4">Ride Requests</h2>
                                {rideRequests.map((ride) => (
                                    <div key={ride.id} className="bg-white p-4 rounded-lg shadow mb-4">
                                        <h3 className="font-semibold mb-2">Ride Request #{ride.id}</h3>
                                        <p><strong>Pickup:</strong> {ride.pickup}</p>
                                        <p><strong>Dropoff:</strong> {ride.dropoff}</p>
                                        <p><strong>Passenger:</strong> {ride.passenger}</p>
                                        <div className="mt-2 space-x-2">
                                            <button
                                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                                onClick={() => handleAcceptRide(ride.id)}
                                            >
                                                Accept
                                            </button>
                                            <button
                                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                                onClick={() => handleRejectRide(ride.id)}
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'history' && (
                            <div>
                                <h2 className="text-2xl font-semibold mb-4">Trip History</h2>
                                <table className="w-full bg-white rounded-lg shadow">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="p-2 text-left">Date</th>
                                            <th className="p-2 text-left">Earnings</th>
                                            <th className="p-2 text-left">Rating</th>
                                            <th className="p-2 text-left">Feedback</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tripHistory.map((trip) => (
                                            <tr key={trip.id} className="border-t">
                                                <td className="p-2">{trip.date}</td>
                                                <td className="p-2">${trip.earnings.toFixed(2)}</td>
                                                <td className="p-2">
                                                    <div className="flex items-center">
                                                        <FaStar className="text-yellow-400 mr-1" />
                                                        {trip.rating}
                                                    </div>
                                                </td>
                                                <td className="p-2">{trip.feedback}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </main>
                </div>
            </div>

            {/* Navigation Modal */}
            <div className="fixed bottom-4 right-4">
                <button
                    className="bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    onClick={() => console.log('Open navigation')}
                >
                    <MdDirections className="text-2xl" />
                </button>
            </div>
        </div>
    );
};

export default AiDriverV1;
