import React, { useState } from 'react';
import { FaPlus, FaMinus, FaUser, FaChartBar, FaBell, FaCar, FaTrash } from 'react-icons/fa';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import CarList from './CarList';
import AddCarForm from './AddCarForm';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const Manager = ({ manager }) => {
    const [activeTab, setActiveTab] = useState('stats');

    const [cars, setCars] = useState([
        { id: 1, make: 'Car1', model: 'model1', year: 2024, price: 50 },
        { id: 2, make: 'Car2', model: 'model2', year: 2021, price: 55 },
        { id: 3, make: 'Car3', model: 'model3', year: 2023, price: 80 },
    ]);

    const [drivers, setDrivers] = useState([
        { id: 1, name: 'Name here1', contact: '123-456-7890', license: 'LN12345' },
        { id: 2, name: 'Name here2', contact: '098-765-4321', license: 'LN67890' },
    ]);

    const [notifications, setNotifications] = useState([
        { id: 1, message: 'New booking received' },
        { id: 2, message: 'Low car availability' },
    ]);

    const [newDriver, setNewDriver] = useState({ name: '', contact: '', license: '' });

    const handleRemoveCar = (id) => {
        setCars(cars.filter(car => car.id !== id));
    };

    const handleAddDriver = (e) => {
        e.preventDefault();
        setDrivers([...drivers, { id: drivers.length + 1, ...newDriver }]);
        setNewDriver({ name: '', contact: '', license: '' });
    };

    const revenueData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Revenue',
                data: [12000, 19000, 15000, 22000, 18000, 25000],
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }
        ]
    };

    const bookingsData = {
        labels: ['Toyota', 'Honda', 'Ford', 'Chevrolet', 'Nissan'],
        datasets: [
            {
                label: 'Bookings',
                data: [65, 59, 80, 81, 56],
                backgroundColor: 'rgba(54, 162, 235, 0.5)'
            }
        ]
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow-lg">
                <div className="w-[1024px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <FaCar className="h-8 w-8 text-blue-500" />
                                <span className="ml-2 text-xl font-bold">Manager: {manager}</span>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                <FaBell className="h-6 w-6" />
                                <span className="sr-only">View notifications</span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="flex space-x-4 mb-4">
                    <button
                        onClick={() => setActiveTab('stats')}
                        className={`px-4 py-2 rounded-md ${activeTab === 'stats' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
                    >
                        <FaChartBar className="inline-block mr-2" />
                        Stats
                    </button>
                    <button
                        onClick={() => setActiveTab('cars')}
                        className={`px-4 py-2 rounded-md ${activeTab === 'cars' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
                    >
                        <FaCar className="inline-block mr-2" />
                        Cars
                    </button>
                    <button
                        onClick={() => setActiveTab('drivers')}
                        className={`px-4 py-2 rounded-md ${activeTab === 'drivers' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
                    >
                        <FaUser className="inline-block mr-2" />
                        Drivers
                    </button>
                </div>

                {activeTab === 'stats' && (
                    <div className="bg-white shadow overflow-hidden sm:rounded-lg p-4">
                        <h2 className="text-2xl font-bold mb-4">Dashboard Statistics</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <h3 className="text-lg font-semibold mb-2">Revenue</h3>
                                <Line data={revenueData} />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-2">Bookings by Car Make</h3>
                                <Bar data={bookingsData} />
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'cars' && (
                    <div className="bg-white shadow overflow-hidden sm:rounded-lg p-4">
                        <h2 className="text-2xl font-bold mb-4">Manage Cars</h2>
                        <AddCarForm />
                        <CarList />
                    </div>
                )}

                {activeTab === 'drivers' && (
                    <div className="bg-white shadow overflow-hidden sm:rounded-lg p-4">
                        <h2 className="text-2xl font-bold mb-4">Manage Drivers</h2>
                        <form onSubmit={handleAddDriver} className="mb-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={newDriver.name}
                                    onChange={(e) => setNewDriver({ ...newDriver, name: e.target.value })}
                                    className="border rounded-md px-3 py-2"
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Contact"
                                    value={newDriver.contact}
                                    onChange={(e) => setNewDriver({ ...newDriver, contact: e.target.value })}
                                    className="border rounded-md px-3 py-2"
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="License Number"
                                    value={newDriver.license}
                                    onChange={(e) => setNewDriver({ ...newDriver, license: e.target.value })}
                                    className="border rounded-md px-3 py-2"
                                    required
                                />
                            </div>
                            <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                                <FaPlus className="inline-block mr-2" />
                                Add Driver
                            </button>
                        </form>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">License</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {drivers.map((driver) => (
                                        <tr key={driver.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">{driver.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{driver.contact}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{driver.license}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            {/* <div className="fixed bottom-4 right-4">
                <div className="bg-white shadow-lg rounded-lg p-4 max-w-sm">
                    <h3 className="text-lg font-semibold mb-2">Notifications</h3>
                    <ul className="space-y-2">
                        {notifications.map((notification) => (
                            <li key={notification.id} className="text-sm">{notification.message}</li>
                        ))}
                    </ul>
                </div>
            </div> */}
        </div>
    );
};

export default Manager;