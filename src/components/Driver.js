import React, { useState, useEffect } from 'react';
import { FaStar, FaEnvelope, FaCar, FaCalendarAlt, FaHistory } from 'react-icons/fa';
import BookingList from './BookingList';
import { BeatLoader } from 'react-spinners';
import { IoCall } from "react-icons/io5";
import { TbPointFilled } from "react-icons/tb";
import { MdContactEmergency } from "react-icons/md";

const Driver = ({ driver_id }) => {
    const [bookingData, setBookingData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");
    const [userdata, setUserdata] = useState(null);
    const [activeTab, setActiveTab] = useState(true);

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

    const fetchAllBookings = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/bookings', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await res.json();
            if (res.ok) {
                setBookingData(data.bookings);
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
        fetchUserDetails(driver_id);
        // fetchAllBookings();
    }, [])


    const [notifications, setNotifications] = useState([
        { id: '1', message: 'New ride request from Aman Santra' },
        { id: '2', message: 'Your next ride starts in 30 minutes' },
    ]);

    const handleAvailabilityToggle = async (userdata) => {
        console.log(userdata);
        setLoading(true);
        try {
            const res = await fetch('/api/users', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...userdata, active: userdata.active === "true" ? "false" : "true" }),
            });
            const data = await res.json();
            if (res.ok) {
                setStatus(data.message);
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
            await fetchUserDetails(driver_id);
        }
    };

    const switchTab = () => setActiveTab(!activeTab);

    return (
        <>
            {!userdata && <BeatLoader className='text-center' color='blue' />}

            {userdata && <div className="bg-gray-100 min-h-screen p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <img
                                    src="/assets/all-images/avater.png"
                                    alt="Driver"
                                    className="w-16 h-16 rounded-full object-cover"
                                />
                                <div>
                                    <div className='flex items-center'>
                                        <h2 className="text-2xl font-bold">{userdata.name}</h2>
                                        <TbPointFilled size={30} color={`${userdata.active === "true" ? "lightgreen" : "red"}`} />
                                        <h2 className="text-green-600">{`${userdata.active === "true" ? "Active Now" : ""}`}</h2>
                                    </div>
                                    <div className="flex items-center mt-1">
                                        <FaStar className="text-yellow-400 mr-1" />
                                        <span className="text-gray-600">4.8 (245 rides)</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center">
                                    <IoCall className="text-gray-400 mr-2" />
                                    <span className="text-gray-600">{userdata.phone}</span>
                                </div>
                                <div className="flex items-center">
                                    <FaEnvelope className="text-gray-400 mr-2" />
                                    <span className="text-gray-600">{userdata.email}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="col-span-2">
                            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                                <div className='flex flex-row items-center justify-between'>
                                    <div className='flex gap-4'>
                                        <button onClick={switchTab} className={`${activeTab ? 'bg-green-500 text-white' : 'bg-white'} p-2 rounded-lg border border-green-500 text-xl font-semibold`}>Active Bookings</button>
                                        <button onClick={switchTab} className={`${!activeTab ? 'bg-blue-500 text-white' : 'bg-white'} p-2 rounded-lg border border-blue-500 text-xl font-semibold`}>History</button>
                                    </div>
                                    <BeatLoader className={`${loading ? "" : "invisible"} text-center`} color="blue" />
                                </div>
                                {userdata.active === "true" ?
                                    <BookingList activeTab={activeTab} userdata={userdata} /> :
                                    <div className='container flex items-center justify-center min-h-80'>
                                        <h1 className='text-center'>Please start your shift to see Active Bookings</h1>
                                    </div>}
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
                                <div className='flex items-center justify-between mb-4'>
                                    <h3 className="text-xl font-semibold">Quick Actions</h3>
                                    <BeatLoader className={`${loading ? "" : "invisible"} text-center`} color="blue" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <button disabled={loading} onClick={() => handleAvailabilityToggle(userdata)} className={`${userdata.active === "false" ? "bg-green-600" : "bg-red-600"} bg-blue-500 text-white p-3 rounded-lg flex items-center justify-center`}>
                                        <FaCar className="mr-2" /> {userdata.active === "true" ? "End Shift" : "Start Shift"}
                                    </button>
                                    <button className="bg-purple-500 text-white p-3 rounded-lg flex items-center justify-center">
                                        <MdContactEmergency className="mr-2" /> E. Contact
                                    </button>
                                    <button className="bg-blue-500 text-white p-3 rounded-lg flex items-center justify-center">
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
            </div>}
        </>
    );
};

export default Driver;
