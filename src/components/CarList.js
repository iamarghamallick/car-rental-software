import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const CarList = () => {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");
    const [carList, setCarList] = useState(null);

    useEffect(() => {
        const getAllCars = async () => {
            setLoading(true);
            try {
                const res = await fetch('/api/cars', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await res.json();
                if (res.ok) {
                    setCarList(data.cars);
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
        getAllCars();
    }, [])

    return (
        <div className='container'>
            {loading && <h1 className='text-center'>Loading cars...</h1>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {carList && carList.map((car) => (
                    <div key={car._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <img
                            src={car.imageUrl}
                            alt="Car"
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-6">
                            <h2 className="text-2xl font-semibold mb-2">{car.title}</h2>
                            <p className="text-gray-700 mb-4">Price per hour: ${car.price}</p>
                            <Link href={"/booking/" + car._id} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full">
                                Book Now
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CarList