import React, { useEffect, useState } from 'react';
import { FaUser, FaChartBar, FaCar } from 'react-icons/fa';
import { MdEmail } from "react-icons/md";
import { GrUserManager } from "react-icons/gr";
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import CarList from './CarList';
import AddCarForm from './AddCarForm';
import DriverList from './DriverList';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const Manager = ({ manager }) => {
    const [activeTab, setActiveTab] = useState('cars');
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
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");
    const [userdata, setUserdata] = useState(null);

    const fetchUserDetails = async (_id) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/users?_id=${_id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await res.json();
            if (res.ok) {
                setUserdata(data.user);
                setStatus(data.message);
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
    }

    useEffect(() => {
        fetchUserDetails(manager);
    }, [])

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="w-full bg-white shadow-lg">
                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <GrUserManager className="h-8 w-8 text-blue-500" />
                                <span className="ml-2 text-xl font-bold">{userdata ? userdata.name : "Loading Info..."}</span>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="flex-shrink-0 flex items-center">
                                <MdEmail className="h-8 w-8 text-blue-500" />
                                <span className="ml-2 text-xl font-bold">{userdata ? userdata.email : ""}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="mx-auto py-6 sm:px-6 lg:px-8">
                <div className="flex space-x-4 mb-4">
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
                    <button
                        onClick={() => setActiveTab('stats')}
                        className={`px-4 py-2 rounded-md ${activeTab === 'stats' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
                    >
                        <FaChartBar className="inline-block mr-2" />
                        Stats
                    </button>
                </div>

                {activeTab === 'cars' && (
                    <div className="bg-white shadow overflow-hidden sm:rounded-lg p-4">
                        <h2 className="text-2xl font-bold mb-4">Manage Cars</h2>
                        <AddCarForm />
                        <h1 className="text-4xl font-bold text-center mb-8">Available Cars</h1>
                        <CarList />
                    </div>
                )}

                {activeTab === 'drivers' && (
                    <div className="bg-white shadow overflow-hidden sm:rounded-lg p-4">
                        <h2 className="text-2xl font-bold mb-4">Manage Drivers</h2>
                        <DriverList />
                    </div>
                )}

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
            </div>
        </div>
    );
};

export default Manager;