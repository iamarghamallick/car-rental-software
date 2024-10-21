import React, { useEffect, useState } from "react";
import { FaCheck, FaTimes, FaPause, FaIdCard } from "react-icons/fa";
import { BeatLoader } from "react-spinners";

const DriverList = () => {
    const [drivers, setDrivers] = useState(null);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");

    const fetchAllDrivers = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/users?_id=all-drivers', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await res.json();
            if (res.ok) {
                setDrivers(data.drivers);
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
        fetchAllDrivers();
    }, [])

    const handleAction = (id, action) => {
        setDrivers(prevDrivers =>
            prevDrivers.map(driver =>
                driver.id === id ? { ...driver, status: action } : driver
            )
        );
    };

    const verifyLicense = async (driver) => {
        console.log(driver);
        setLoading(true);
        try {
            const res = await fetch('/api/users', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...driver, licenseVerified: "true" }),
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
        }
    };

    return (
        <div className="container mx-auto p-6">
            {loading && <BeatLoader className="text-center" color="blue" />}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                {drivers && drivers.map(driver => (
                    <div key={driver._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 focus-within:ring-2 focus-within:ring-blue-400">
                        <div className="flex justify-between">
                            <h2 className="text-xl font-semibold mb-2">{driver.name}</h2>
                            <h2 className="text-xl font-semibold mb-2">Status: {driver.status}</h2>
                        </div>
                        <p className="text-gray-600 mb-1">Email: {driver.email}</p>
                        <p className="text-gray-600 mb-1">Phone: {driver.phone}</p>
                        <p className="text-gray-600 mb-1">Region: {driver.region}</p>
                        <div className="flex items-center justify-between mb-4 bg-slate-200 rounded p-2">
                            <p className="text-gray-600 font-bold">License Number: {driver.licenseNumber}</p>
                            <button
                                disabled={driver.licenseVerified === "true"}
                                onClick={() => verifyLicense(driver)}
                                className={`flex items-center ml-2 ${driver.licenseVerified === "true" ? "bg-green-500 hover:bg-green-600 focus:ring-green-400" : "bg-blue-500 hover:bg-blue-600 focus:ring-blue-400"} text-white px-3 py-1 rounded  focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors duration-300`}
                            >
                                <FaIdCard className="inline mr-1" />
                                <span>{driver.licenseVerified === "true" ? "Verified" : "Mark as Verified"}</span>
                            </button>
                        </div>
                        <div className="flex justify-between">
                            <button
                                onClick={() => handleAction(driver.id, "approved")}
                                className={`${driver.status === "approved" ? "bg-green-500" : "bg-gray-200 text-gray-800"} px-4 py-2 rounded hover:bg-green-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 transition-colors duration-300`}
                                disabled={driver.status === "approved"}
                                aria-label={`Approve ${driver.name}`}
                            >
                                <FaCheck className="inline mr-1" /> Approve
                            </button>
                            <button
                                onClick={() => handleAction(driver.id, "rejected")}
                                className={`${driver.status === "rejected" ? "bg-red-500" : "bg-gray-200 text-gray-800"} px-4 py-2 rounded hover:bg-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 transition-colors duration-300`}
                                disabled={driver.status === "rejected"}
                                aria-label={`Reject ${driver.name}`}
                            >
                                <FaTimes className="inline mr-1" /> Reject
                            </button>
                            <button
                                onClick={() => handleAction(driver.id, "suspended")}
                                className={`${driver.status === "suspended" ? "bg-yellow-500" : "bg-gray-200 text-gray-800"} px-4 py-2 rounded hover:bg-yellow-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50 transition-colors duration-300`}
                                disabled={driver.status === "suspended"}
                                aria-label={`Suspend ${driver.name}`}
                            >
                                <FaPause className="inline mr-1" /> Suspend
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DriverList;
