import React from 'react';

const CarDetails = ({ title, imageUrl, fuel, mileage, space, year, price }) => {
    return (
        <div>
            <img
                src={imageUrl}
                alt={title}
                className="w-full h-64 object-cover rounded-t-lg"
            />
            <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div className="text-sm text-gray-600">
                        <strong>Fuel:</strong> {fuel}
                    </div>
                    <div className="text-sm text-gray-600">
                        <strong>Mileage:</strong> {mileage} km/l
                    </div>
                    <div className="text-sm text-gray-600">
                        <strong>Seating Capacity:</strong> {space} people
                    </div>
                    <div className="text-sm text-gray-600">
                        <strong>Year:</strong> {year}
                    </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                    <div className="text-xl font-semibold text-gray-800">₹{price}/km</div>
                </div>
            </div>
        </div>
    );
};

export default CarDetails;
