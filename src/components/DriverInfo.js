import React from "react";
import { FaUser, FaPhone, FaEnvelope } from "react-icons/fa";

const DriverInfo = ({ driver }) => {
    const DetailItem = ({ icon, label, value, ariaLabel }) => (
        <div className="flex items-center p-3 hover:bg-gray-100 transition duration-300 ease-in-out rounded-lg">
            <div className="text-blue-600 mr-4">{icon}</div>
            <div>
                <p className="text-sm text-gray-600">{label}</p>
                <p className="font-semibold" aria-label={ariaLabel}>
                    {value || "N/A"}
                </p>
            </div>
        </div>
    );

    return (
        <div className="mx-auto w-full bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-8">
                <h1 className="text-xl font-semibold text-center">Driver Info</h1>
                {!driver && <div>
                    <h1 className="text-center pt-8">Your booking is yet to be accepted by a driver.</h1>
                </div>}
                {driver && <div className="grid grid-cols-1 gap-6 pb-6">
                    <DetailItem
                        icon={<FaUser size={24} />}
                        label="Name"
                        value={driver.name}
                        ariaLabel="Customer name"
                    />
                    <DetailItem
                        icon={<FaPhone size={24} />}
                        label="Phone"
                        value={driver.phone}
                        ariaLabel="Customer phone number"
                    />
                    <DetailItem
                        icon={<FaEnvelope size={24} />}
                        label="Email"
                        value={driver.email}
                        ariaLabel="Customer email address"
                    />
                </div>}
            </div>
        </div>
    );
};

export default DriverInfo;
