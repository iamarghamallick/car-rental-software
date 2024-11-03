import React from "react";
import { FaUser, FaPhone, FaEnvelope } from "react-icons/fa";

const CustomerInfo = ({ customer }) => {
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
                <h1 className="text-xl font-semibold text-center">Customer Info</h1>
                <div className="grid grid-cols-1 gap-2 md:gap-6 pb-6">
                    <DetailItem
                        icon={<FaUser size={24} />}
                        label="Name"
                        value={customer.name}
                        ariaLabel="Customer name"
                    />
                    <DetailItem
                        icon={<FaPhone size={24} />}
                        label="Phone"
                        value={customer.phone}
                        ariaLabel="Customer phone number"
                    />
                    <DetailItem
                        icon={<FaEnvelope size={24} />}
                        label="Email"
                        value={customer.email}
                        ariaLabel="Customer email address"
                    />
                </div>
            </div>
        </div>
    );
};

export default CustomerInfo;
