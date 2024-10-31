import React, { useState } from "react";
import { FaIdCard, FaMapMarkerAlt, FaCalendarAlt, FaClock, FaRulerHorizontal, FaMoneyBillWave } from "react-icons/fa";
import { RouteMapModal } from "./Map";

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

    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    return (
        <div className="mx-auto w-full bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-4 md:p-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-2 md:gap-6 pb-6 border-b-2">
                    <DetailItem
                        icon={<FaIdCard size={24} />}
                        label="Booking ID"
                        value={booking._id}
                        ariaLabel="Booking ID"
                    />
                    <button className="bg-blue-500 text-white p-2 px-4 rounded-lg md:mt-4" onClick={openModal}>View Route</button>
                    {isModalOpen && (
                        <RouteMapModal
                            title="Driving Route"
                            origin={booking.origin.latlng}
                            destination={booking.dest.latlng}
                            onClose={closeModal}
                        />
                    )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-6 pt-2">
                    <DetailItem
                        icon={<FaMapMarkerAlt size={24} />}
                        label="Origin"
                        value={booking.origin.locationName}
                        ariaLabel="Origin location"
                    />
                    <DetailItem
                        icon={<FaMapMarkerAlt size={24} />}
                        label="Destination"
                        value={booking.dest.locationName}
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
                        value={booking.distance + " km"}
                        ariaLabel="Travel distance"
                    />
                    <DetailItem
                        icon={<FaMoneyBillWave size={24} />}
                        label="Fare"
                        value={"₹ " + booking.fare}
                        ariaLabel="Booking fare"
                    />
                </div>
            </div>
        </div>
    );
};

export default BookingDetails;
