import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash, FaUpload } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BeatLoader } from "react-spinners";
import { capitalize } from "@/utils/utility";

const UserProfile = ({ userId }) => {
    const [passwords, setPasswords] = useState({ current: "", new: "", confirm: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [userdata, setUserdata] = useState(null);
    const [status, setStatus] = useState("");

    useEffect(() => {
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
        fetchUserDetails(userId);
    }, [])

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswords({ ...passwords, [name]: value });
        validateField(name, value);
    };

    const validateField = (name, value) => {
        let newErrors = { ...errors };
        switch (name) {
            case "email":
                newErrors.email = /^\S+@\S+\.\S+$/.test(value) ? "" : "Invalid email format";
                break;
            case "phone":
                newErrors.phone = value.length === 10 ? "" : "Invalid phone number";
                break;
            case "new":
                newErrors.new = value.length < 8 ? "Password must be at least 8 characters" : "";
                break;
            case "confirm":
                newErrors.confirm = value !== passwords.new ? "Passwords do not match" : "";
                break;
            default:
                break;
        }
        setErrors(newErrors);
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUser({ ...user, profileImage: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const getStatusColor = (status) => {
        if (status === "approved")
            return "text-green-500";
        if (status === "suspended")
            return "text-yellow-500";
        if (status === "rejected")
            return "text-red-500";
        return "";
    }

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        console.log(userdata);
        setLoading(true);

        try {
            const res = await fetch('/api/users', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userdata),
            });
            const data = await res.json();
            if (res.ok) {
                setStatus(data.message);
                setUserdata(userdata);
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
            setIsEditing(false);
        }
    };

    const handleChangePassword = async () => {
        setLoading(true);
        // Simulating API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setLoading(false);
        setPasswords({ current: "", new: "", confirm: "" });
    };

    return (
        <>
            {!userdata && <BeatLoader color='blue' />}
            {userdata && <div className="bg-white rounded-lg shadow-xl p-8 max-w-4xl w-full">
                <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">User Profile</h1>
                <h1 className="text-xl font-bold text-center mb-8 text-gray-800">UID: {userId}</h1>

                {/* Basic Details Section */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-700">Basic Details</h2>
                    <div className="flex flex-col md:flex-row items-center mb-4">
                        <div className="relative w-32 h-32 mb-4 md:mb-0 md:mr-8">
                            <img
                                src='/assets/all-images/avater.png'
                                alt="Profile"
                                className="w-full h-full object-cover rounded-full"
                            />
                            {/* <label htmlFor="profileImage" className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600 transition duration-300">
                            <FaUpload />
                            <input
                                type="file"
                                id="profileImage"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageUpload}
                            />
                        </label> */}
                        </div>
                        <div className="flex-1 w-full">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={userdata.name}
                                        onChange={(e) => setUserdata({ ...userdata, name: e.target.value })}
                                        disabled={!isEditing}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={userdata.email}
                                        disabled={true}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${isEditing ? 'bg-white' : 'bg-gray-100'} ${errors.email ? 'border-red-500' : ''}`}
                                    />
                                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                    <input
                                        type="number"
                                        id="phone"
                                        name="phone"
                                        value={userdata.phone}
                                        onChange={(e) => setUserdata({ ...userdata, phone: e.target.value })}
                                        disabled={!isEditing}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${isEditing ? 'bg-white' : 'bg-gray-100'} ${errors.phone ? 'border-red-500' : ''}`}
                                    />
                                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                                </div>
                                <div>
                                    <label htmlFor="userType" className="block text-sm font-medium text-gray-700 mb-1">User Type</label>
                                    <input
                                        type="text"
                                        id="userType"
                                        name="userType"
                                        value={userdata.userType}
                                        disabled={true}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
                                    />
                                </div>
                                {userdata.userType == 'driver' && <div>
                                    <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-1">Region</label>
                                    <input
                                        type="text"
                                        id="region"
                                        name="region"
                                        value={userdata.region}
                                        onChange={(e) => setUserdata({ ...userdata, region: e.target.value })}
                                        disabled={!isEditing}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
                                    />
                                </div>}
                                {userdata.userType === 'driver' && <div>
                                    <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray-700 mb-1">License Number</label>
                                    <input
                                        type="text"
                                        id="licenseNumber"
                                        name="licenseNumber"
                                        value={userdata.licenseNumber}
                                        onChange={(e) => setUserdata({ ...userdata, licenseNumber: e.target.value })}
                                        disabled={userdata.licenseVerified == "true" || !isEditing}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
                                    />
                                </div>}
                                {userdata.userType === 'driver' && <div>
                                    <label htmlFor="licenseVerified" className="block text-sm font-medium text-gray-700 mb-1">License Verification Status</label>
                                    <input
                                        type="text"
                                        id="licenseVerified"
                                        name="licenseVerified"
                                        value={userdata.licenseVerified === "true" ? "Verified" : "Not Verified"}
                                        disabled={true}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    />
                                </div>}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        {!isEditing ? (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                            >
                                <MdEdit className="mr-2" /> Edit Profile
                            </button>
                        ) : (
                            <button
                                onClick={handleUpdateProfile}
                                disabled={loading}
                                className="flex items-center bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
                            >
                                {loading ? <AiOutlineLoading3Quarters className="animate-spin mr-2" /> : "Update Profile"}
                            </button>
                        )}
                    </div>
                </div>

                {/* Driver Status Section */}
                {userdata.userType === 'driver' && <div className="mb-8 bg-slate-100 rounded p-2">
                    <h2 className="text-2xl font-semibold text-gray-700 text-center">Driver Status:
                        <span className={`${getStatusColor(userdata.status)}`}> {capitalize(userdata.status)}</span>
                    </h2>
                </div>}

                {/* Password Management Section */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-700">Password Management</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="current" className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="current"
                                    name="current"
                                    value={passwords.current}
                                    onChange={handlePasswordChange}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-700"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="new" className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                            <input
                                type="password"
                                id="new"
                                name="new"
                                value={passwords.new}
                                onChange={handlePasswordChange}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.new ? 'border-red-500' : ''}`}
                            />
                            {errors.new && <p className="text-red-500 text-xs mt-1">{errors.new}</p>}
                        </div>
                        <div>
                            <label htmlFor="confirm" className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                            <input
                                type="password"
                                id="confirm"
                                name="confirm"
                                value={passwords.confirm}
                                onChange={handlePasswordChange}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.confirm ? 'border-red-500' : ''}`}
                            />
                            {errors.confirm && <p className="text-red-500 text-xs mt-1">{errors.confirm}</p>}
                        </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                        <button
                            onClick={handleChangePassword}
                            disabled={loading || Object.values(errors).some(error => error !== "")}
                            className="flex items-center bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition duration-300 disabled:opacity-50"
                        >
                            {loading ? <AiOutlineLoading3Quarters className="animate-spin mr-2" /> : "Change Password"}
                        </button>
                    </div>
                </div>
            </div>}
        </>
    );
};

export default UserProfile;
