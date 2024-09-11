import React, { useState } from 'react';
import { FaCar, FaUser, FaChartBar, FaCog, FaPlus, FaSearch, FaTrash, FaEdit } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AiManagerV2 = () => {
    const [activeTab, setActiveTab] = useState('cars');
    const [cars, setCars] = useState([
        { id: 1, name: 'Tesla Model S', status: 'Available', image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80' },
        { id: 2, name: 'BMW X5', status: 'Rented', image: 'https://images.unsplash.com/photo-1574638280836-1dbee1f2a3e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80' },
        { id: 3, name: 'Mercedes-Benz E-Class', status: 'Maintenance', image: 'https://images.unsplash.com/photo-1596720426673-e4e14290f0cc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80' },
    ]);
    const [drivers, setDrivers] = useState([
        { id: 1, name: 'John Doe', status: 'Available' },
        { id: 2, name: 'Jane Smith', status: 'On Trip' },
        { id: 3, name: 'Mike Johnson', status: 'Off Duty' },
    ]);
    const [searchTerm, setSearchTerm] = useState('');

    const statsData = [
        { name: 'Jan', rentals: 65, revenue: 4000 },
        { name: 'Feb', rentals: 59, revenue: 3000 },
        { name: 'Mar', rentals: 80, revenue: 5000 },
        { name: 'Apr', rentals: 81, revenue: 5500 },
        { name: 'May', rentals: 56, revenue: 3500 },
        { name: 'Jun', rentals: 55, revenue: 3200 },
    ];

    const handleAddCar = () => {
        const newCar = {
            id: cars.length + 1,
            name: 'New Car',
            status: 'Available',
            image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1164&q=80',
        };
        setCars([...cars, newCar]);
    };

    const handleDeleteCar = (id) => {
        setCars(cars.filter((car) => car.id !== id));
    };

    const handleAddDriver = () => {
        const newDriver = {
            id: drivers.length + 1,
            name: 'New Driver',
            status: 'Available',
        };
        setDrivers([...drivers, newDriver]);
    };

    const handleDeleteDriver = (id) => {
        setDrivers(drivers.filter((driver) => driver.id !== id));
    };

    const filteredCars = cars.filter((car) =>
        car.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredDrivers = drivers.filter((driver) =>
        driver.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-white shadow-md">
                <div className="p-4">
                    <h2 className="text-2xl font-semibold text-gray-800">Car Rental Dashboard</h2>
                </div>
                <nav className="mt-4">
                    <a
                        href="#"
                        className={`flex items-center px-4 py-2 text-gray-700 ${activeTab === 'cars' ? 'bg-gray-200' : ''
                            }`}
                        onClick={() => setActiveTab('cars')}
                    >
                        <FaCar className="mr-2" />
                        Cars
                    </a>
                    <a
                        href="#"
                        className={`flex items-center px-4 py-2 text-gray-700 ${activeTab === 'drivers' ? 'bg-gray-200' : ''
                            }`}
                        onClick={() => setActiveTab('drivers')}
                    >
                        <FaUser className="mr-2" />
                        Drivers
                    </a>
                    <a
                        href="#"
                        className={`flex items-center px-4 py-2 text-gray-700 ${activeTab === 'stats' ? 'bg-gray-200' : ''
                            }`}
                        onClick={() => setActiveTab('stats')}
                    >
                        <FaChartBar className="mr-2" />
                        Statistics
                    </a>
                    <a
                        href="#"
                        className={`flex items-center px-4 py-2 text-gray-700 ${activeTab === 'settings' ? 'bg-gray-200' : ''
                            }`}
                        onClick={() => setActiveTab('settings')}
                    >
                        <FaCog className="mr-2" />
                        Settings
                    </a>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-x-hidden overflow-y-auto">
                <div className="container mx-auto px-6 py-8">
                    <h3 className="text-3xl font-medium text-gray-700">
                        {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                    </h3>

                    <div className="mt-8">
                        {/* Search Bar */}
                        <div className="flex mb-4">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <FaSearch />
                            </button>
                        </div>

                        {activeTab === 'cars' && (
                            <div>
                                <button
                                    className="mb-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    onClick={handleAddCar}
                                >
                                    <FaPlus className="inline-block mr-2" /> Add Car
                                </button>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {filteredCars.map((car) => (
                                        <div key={car.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                            <img src={car.image} alt={car.name} className="w-full h-48 object-cover" />
                                            <div className="p-4">
                                                <h4 className="text-xl font-semibold mb-2">{car.name}</h4>
                                                <p className="text-gray-600 mb-2">Status: {car.status}</p>
                                                <div className="flex justify-end">
                                                    <button className="text-blue-500 hover:text-blue-700 mr-2">
                                                        <FaEdit />
                                                    </button>
                                                    <button
                                                        className="text-red-500 hover:text-red-700"
                                                        onClick={() => handleDeleteCar(car.id)}
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'drivers' && (
                            <div>
                                <button
                                    className="mb-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    onClick={handleAddDriver}
                                >
                                    <FaPlus className="inline-block mr-2" /> Add Driver
                                </button>
                                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {filteredDrivers.map((driver) => (
                                                <tr key={driver.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap">{driver.name}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{driver.status}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <button className="text-blue-500 hover:text-blue-700 mr-2">
                                                            <FaEdit />
                                                        </button>
                                                        <button
                                                            className="text-red-500 hover:text-red-700"
                                                            onClick={() => handleDeleteDriver(driver.id)}
                                                        >
                                                            <FaTrash />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {activeTab === 'stats' && (
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h4 className="text-xl font-semibold mb-4">Rental Statistics</h4>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={statsData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                                        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                                        <Tooltip />
                                        <Legend />
                                        <Bar yAxisId="left" dataKey="rentals" fill="#8884d8" name="Rentals" />
                                        <Bar yAxisId="right" dataKey="revenue" fill="#82ca9d" name="Revenue ($)" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        )}

                        {activeTab === 'settings' && (
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h4 className="text-xl font-semibold mb-4">Settings</h4>
                                <p>Settings page content goes here.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AiManagerV2;