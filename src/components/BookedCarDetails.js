import React from "react";

const BookedCarDetails = ({ carDetails }) => {
    return (
        <div className="bg-white rounded-xl shadow-md">
            <img
                src={carDetails.imageUrl}
                alt={carDetails.title}
                className="w-full h-52 object-cover rounded-t-lg"
            />
            <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{carDetails.title}</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div className="text-sm text-gray-600">
                        <strong>Fuel:</strong> {carDetails.fuel}
                    </div>
                    <div className="text-sm text-gray-600">
                        <strong>Mileage:</strong> {carDetails.mileage} km/l
                    </div>
                    <div className="text-sm text-gray-600">
                        <strong>Seating Capacity:</strong> {carDetails.space} people
                    </div>
                    <div className="text-sm text-gray-600">
                        <strong>Year:</strong> {carDetails.year}
                    </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                    <div className="text-xl font-semibold text-gray-800">₹{carDetails.price}/km</div>
                </div>
            </div>
        </div>
    );
};

export default BookedCarDetails;
