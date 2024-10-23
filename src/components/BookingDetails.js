import React from "react";
import { FaIdCard, FaUser, FaCar, FaMapMarkerAlt, FaCalendarAlt, FaClock, FaRulerHorizontal, FaMoneyBillWave } from "react-icons/fa";

const BookingDetails = ({ booking }) => {
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
                <div className="grid grid-cols-1 gap-6">
                    <DetailItem
                        icon={<FaIdCard size={24} />}
                        label="Booking ID"
                        value={booking._id}
                        ariaLabel="Booking ID"
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <DetailItem
                        icon={<FaMapMarkerAlt size={24} />}
                        label="Origin"
                        value={booking.origin}
                        ariaLabel="Origin location"
                    />
                    <DetailItem
                        icon={<FaMapMarkerAlt size={24} />}
                        label="Destination"
                        value={booking.dest}
                        ariaLabel="Destination location"
                    />
                    <DetailItem
                        icon={<FaCalendarAlt size={24} />}
                        label="Date"
                        value={booking.date}
                        ariaLabel="Booking date"
                    />
                    <DetailItem
                        icon={<FaClock size={24} />}
                        label="Time"
                        value={booking.time}
                        ariaLabel="Booking time"
                    />
                    <DetailItem
                        icon={<FaRulerHorizontal size={24} />}
                        label="Distance"
                        value={booking.distance}
                        ariaLabel="Travel distance"
                    />
                    <DetailItem
                        icon={<FaMoneyBillWave size={24} />}
                        label="Fare"
                        value={booking.fare}
                        ariaLabel="Booking fare"
                    />
                </div>
            </div>
        </div>
    );
};

export default BookingDetails;
