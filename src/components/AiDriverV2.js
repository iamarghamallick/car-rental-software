import React, { useState, useEffect } from 'react';
import { FaStar, FaPhone, FaEnvelope, FaMapMarkerAlt, FaCar, FaCalendarAlt, FaHistory } from 'react-icons/fa';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import dynamic from 'next/dynamic';

const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

const AiDriverV2 = () => {
    const [requests, setRequests] = useState([
        { id: '1', customer: 'John Doe', pickup: 'Central Park', dropoff: 'Times Square', fare: '$25' },
        { id: '2', customer: 'Jane Smith', pickup: 'Brooklyn Bridge', dropoff: 'Empire State Building', fare: '$30' },
        { id: '3', customer: 'Mike Johnson', pickup: 'Statue of Liberty', dropoff: 'One World Trade Center', fare: '$35' },
    ]);

    const [notifications, setNotifications] = useState([
        { id: '1', message: 'New ride request from John Doe' },
        { id: '2', message: 'Your next ride starts in 30 minutes' },
    ]);

    const [availability, setAvailability] = useState(true);
    const [selectedFilter, setSelectedFilter] = useState('all');

    const onDragEnd = (result) => {
        if (!result.destination) return;

        const newRequests = Array.from(requests);
        const [reorderedItem] = newRequests.splice(result.source.index, 1);
        newRequests.splice(result.destination.index, 0, reorderedItem);

        setRequests(newRequests);
    };

    const handleAccept = (id) => {
        setRequests(requests.filter(request => request.id !== id));
        setNotifications([...notifications, { id: Date.now().toString(), message: `Ride ${id} accepted` }]);
    };

    const handleDecline = (id) => {
        setRequests(requests.filter(request => request.id !== id));
        setNotifications([...notifications, { id: Date.now().toString(), message: `Ride ${id} declined` }]);
    };

    const handleAvailabilityToggle = () => {
        setAvailability(!availability);
    };

    const handleFilterChange = (filter) => {
        setSelectedFilter(filter);
    };

    const filteredRequests = () => {
        switch (selectedFilter) {
            case 'nearest':
                return [...requests].sort((a, b) => a.pickup.localeCompare(b.pickup));
            case 'highest_fare':
                return [...requests].sort((a, b) => parseFloat(b.fare.slice(1)) - parseFloat(a.fare.slice(1)));
            default:
                return requests;
        }
    };

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true); // Only true on the client side
    }, []);

    return (
        <div className="bg-gray-100 min-h-screen p-8">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <img
                                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
                                alt="Driver"
                                className="w-16 h-16 rounded-full object-cover"
                            />
                            <div>
                                <h2 className="text-2xl font-bold">Alex Johnson</h2>
                                <div className="flex items-center mt-1">
                                    <FaStar className="text-yellow-400 mr-1" />
                                    <span className="text-gray-600">4.8 (245 rides)</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                                <FaPhone className="text-gray-400 mr-2" />
                                <span className="text-gray-600">+1 (555) 123-4567</span>
                            </div>
                            <div className="flex items-center">
                                <FaEnvelope className="text-gray-400 mr-2" />
                                <span className="text-gray-600">alex.johnson@example.com</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="col-span-2">
                        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                            <h3 className="text-xl font-semibold mb-4">Ride Requests</h3>
                            <div className="flex justify-between mb-4">
                                <div className="flex items-center">
                                    <span className="mr-2">Filter by:</span>
                                    <select
                                        className="border rounded p-2"
                                        value={selectedFilter}
                                        onChange={(e) => handleFilterChange(e.target.value)}
                                    >
                                        <option value="all">All</option>
                                        <option value="nearest">Nearest</option>
                                        <option value="highest_fare">Highest Fare</option>
                                    </select>
                                </div>
                                <button
                                    className={`px-4 py-2 rounded ${availability ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
                                    onClick={handleAvailabilityToggle}
                                >
                                    {availability ? 'Available' : 'Unavailable'}
                                </button>
                            </div>
                            <DragDropContext onDragEnd={onDragEnd}>
                                <Droppable droppableId="requests">
                                    {(provided) => (
                                        <ul {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                                            {filteredRequests().map((request, index) => (
                                                <Draggable key={request.id} draggableId={request.id} index={index}>
                                                    {(provided) => (
                                                        <li
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            className="bg-gray-50 p-4 rounded-lg shadow flex justify-between items-center"
                                                        >
                                                            <div>
                                                                <h4 className="font-semibold">{request.customer}</h4>
                                                                <p className="text-sm text-gray-600">
                                                                    <FaMapMarkerAlt className="inline mr-1" /> {request.pickup} to {request.dropoff}
                                                                </p>
                                                                <p className="text-sm font-semibold text-green-600">{request.fare}</p>
                                                            </div>
                                                            <div className="flex space-x-2">
                                                                <button
                                                                    onClick={() => handleAccept(request.id)}
                                                                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                                                                >
                                                                    Accept
                                                                </button>
                                                                <button
                                                                    onClick={() => handleDecline(request.id)}
                                                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                                                                >
                                                                    Decline
                                                                </button>
                                                            </div>
                                                        </li>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </ul>
                                    )}
                                </Droppable>
                            </DragDropContext>
                        </div>

                        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                            <h3 className="text-xl font-semibold mb-4">Nearby Rides</h3>
                            <div className="h-96 rounded-lg overflow-hidden">
                                <div className="h-96 rounded-lg overflow-hidden">
                                    {isClient && (
                                        <MapContainer center={[40.7128, -74.0060]} zoom={13} style={{ height: '100%', width: '100%' }}>
                                            <TileLayer
                                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                            />
                                            <Marker position={[40.7128, -74.0060]}>
                                                <Popup>You are here</Popup>
                                            </Marker>
                                        </MapContainer>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                            <h3 className="text-xl font-semibold mb-4">Notifications</h3>
                            <ul className="space-y-4">
                                {notifications.map((notification) => (
                                    <li key={notification.id} className="bg-blue-50 p-3 rounded-lg">
                                        {notification.message}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                            <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <button className="bg-blue-500 text-white p-3 rounded-lg flex items-center justify-center">
                                    <FaCar className="mr-2" /> Start Shift
                                </button>
                                <button className="bg-purple-500 text-white p-3 rounded-lg flex items-center justify-center">
                                    <FaCalendarAlt className="mr-2" /> Schedule
                                </button>
                                <button className="bg-green-500 text-white p-3 rounded-lg flex items-center justify-center">
                                    <FaHistory className="mr-2" /> Ride History
                                </button>
                                <button className="bg-yellow-500 text-white p-3 rounded-lg flex items-center justify-center">
                                    <FaStar className="mr-2" /> Ratings
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AiDriverV2;
