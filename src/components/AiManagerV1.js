import React, { useState } from 'react';
import { FaCar, FaUser, FaChartBar, FaPlus, FaMinus, FaSearch } from 'react-icons/fa';
import { IoMdSettings } from 'react-icons/io';

const AiManagerV1 = () => {
    const [activeTab, setActiveTab] = useState('cars');
    const [cars, setCars] = useState([
        { id: 1, make: 'Toyota', model: 'Camry', year: 2022, licensePlate: 'ABC123' },
        { id: 2, make: 'Honda', model: 'Civic', year: 2021, licensePlate: 'XYZ789' },
    ]);
    const [drivers, setDrivers] = useState([
        { id: 1, name: 'John Doe', licenseNumber: 'DL123456', contactNumber: '+1234567890' },
        { id: 2, name: 'Jane Smith', licenseNumber: 'DL789012', contactNumber: '+9876543210' },
    ]);

    const [newCar, setNewCar] = useState({ make: '', model: '', year: '', licensePlate: '' });
    const [newDriver, setNewDriver] = useState({ name: '', licenseNumber: '', contactNumber: '' });

    const handleAddCar = () => {
        setCars([...cars, { ...newCar, id: cars.length + 1 }]);
        setNewCar({ make: '', model: '', year: '', licensePlate: '' });
    };

    const handleRemoveCar = (id) => {
        setCars(cars.filter(car => car.id !== id));
    };

    const handleAddDriver = () => {
        setDrivers([...drivers, { ...newDriver, id: drivers.length + 1 }]);
        setNewDriver({ name: '', licenseNumber: '', contactNumber: '' });
    };

    const renderCarManagement = () => (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold">Car Management</h2>
            <div className="flex flex-wrap gap-4">
                <input
                    type="text"
                    placeholder="Make"
                    className="p-2 border rounded"
                    value={newCar.make}
                    onChange={(e) => setNewCar({ ...newCar, make: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Model"
                    className="p-2 border rounded"
                    value={newCar.model}
                    onChange={(e) => setNewCar({ ...newCar, model: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Year"
                    className="p-2 border rounded"
                    value={newCar.year}
                    onChange={(e) => setNewCar({ ...newCar, year: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="License Plate"
                    className="p-2 border rounded"
                    value={newCar.licensePlate}
                    onChange={(e) => setNewCar({ ...newCar, licensePlate: e.target.value })}
                />
                <button
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
                    onClick={handleAddCar}
                >
                    <FaPlus className="inline mr-2" /> Add Car
                </button>
            </div>
            <div className="mt-4">
                <h3 className="text-xl font-semibold mb-2">Car List</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {cars.map((car) => (
                        <div key={car.id} className="bg-white p-4 rounded shadow">
                            <h4 className="font-bold">{car.make} {car.model}</h4>
                            <p>Year: {car.year}</p>
                            <p>License Plate: {car.licensePlate}</p>
                            <button
                                className="mt-2 bg-red-500 text-white p-1 rounded hover:bg-red-600 transition duration-300"
                                onClick={() => handleRemoveCar(car.id)}
                            >
                                <FaMinus className="inline mr-1" /> Remove
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderDriverManagement = () => (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold">Driver Management</h2>
            <div className="flex flex-wrap gap-4">
                <input
                    type="text"
                    placeholder="Name"
                    className="p-2 border rounded"
                    value={newDriver.name}
                    onChange={(e) => setNewDriver({ ...newDriver, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="License Number"
                    className="p-2 border rounded"
                    value={newDriver.licenseNumber}
                    onChange={(e) => setNewDriver({ ...newDriver, licenseNumber: e.target.value })}
                />
                <input
                    type="tel"
                    placeholder="Contact Number"
                    className="p-2 border rounded"
                    value={newDriver.contactNumber}
                    onChange={(e) => setNewDriver({ ...newDriver, contactNumber: e.target.value })}
                />
                <button
                    className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition duration-300"
                    onClick={handleAddDriver}
                >
                    <FaPlus className="inline mr-2" /> Add Driver
                </button>
            </div>
            <div className="mt-4">
                <h3 className="text-xl font-semibold mb-2">Driver List</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {drivers.map((driver) => (
                        <div key={driver.id} className="bg-white p-4 rounded shadow">
                            <h4 className="font-bold">{driver.name}</h4>
                            <p>License: {driver.licenseNumber}</p>
                            <p>Contact: {driver.contactNumber}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderStatsMonitoring = () => (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold">Stats Monitoring</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded shadow">
                    <h3 className="font-bold text-lg mb-2">Total Bookings</h3>
                    <p className="text-3xl font-bold text-blue-500">1,234</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h3 className="font-bold text-lg mb-2">Revenue Generated</h3>
                    <p className="text-3xl font-bold text-green-500">$45,678</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h3 className="font-bold text-lg mb-2">Popular Car Model</h3>
                    <p className="text-3xl font-bold text-purple-500">Toyota Camry</p>
                </div>
            </div>
            <div className="bg-white p-4 rounded shadow">
                <h3 className="font-bold text-lg mb-2">Monthly Revenue Chart</h3>
                <div className="h-64 bg-gray-200 rounded flex items-end justify-around p-4">
                    <div className="w-8 bg-blue-500 rounded-t" style={{ height: '60%' }}></div>
                    <div className="w-8 bg-blue-500 rounded-t" style={{ height: '80%' }}></div>
                    <div className="w-8 bg-blue-500 rounded-t" style={{ height: '40%' }}></div>
                    <div className="w-8 bg-blue-500 rounded-t" style={{ height: '70%' }}></div>
                    <div className="w-8 bg-blue-500 rounded-t" style={{ height: '90%' }}></div>
                    <div className="w-8 bg-blue-500 rounded-t" style={{ height: '50%' }}></div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-8">
            <header className="bg-white shadow rounded-lg p-4 mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Car Rental Manager Dashboard</h1>
            </header>
            <div className="flex flex-col md:flex-row gap-8">
                <nav className="w-full md:w-64 bg-white shadow rounded-lg p-4">
                    <ul className="space-y-2">
                        <li>
                            <button
                                className={`w-full text-left p-2 rounded ${activeTab === 'cars' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
                                onClick={() => setActiveTab('cars')}
                            >
                                <FaCar className="inline mr-2" /> Car Management
                            </button>
                        </li>
                        <li>
                            <button
                                className={`w-full text-left p-2 rounded ${activeTab === 'drivers' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
                                onClick={() => setActiveTab('drivers')}
                            >
                                <FaUser className="inline mr-2" /> Driver Management
                            </button>
                        </li>
                        <li>
                            <button
                                className={`w-full text-left p-2 rounded ${activeTab === 'stats' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
                                onClick={() => setActiveTab('stats')}
                            >
                                <FaChartBar className="inline mr-2" /> Stats Monitoring
                            </button>
                        </li>
                    </ul>
                </nav>
                <main className="flex-grow bg-white shadow rounded-lg p-4">
                    {activeTab === 'cars' && renderCarManagement()}
                    {activeTab === 'drivers' && renderDriverManagement()}
                    {activeTab === 'stats' && renderStatsMonitoring()}
                </main>
            </div>
            <footer className="mt-8 text-center text-gray-500">
                <p>© 2023 Car Rental Manager. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default AiManagerV1;