import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { BeatLoader } from 'react-spinners';

const CarList = () => {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");
    const [carList, setCarList] = useState(null);
    const pathname = usePathname();
    const [removingCarId, setRemovingCarId] = useState(null);
    const repeat = [1, 2, 3];

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

    useEffect(() => {
        getAllCars();
    }, [])

    const handleRemoveCar = async (carId) => {
        console.log("Removing Car", carId);
        setRemovingCarId(carId);
        setLoading(true);
        try {
            const res = await fetch(`/api/cars?_id=${carId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await res.json();
            if (res.ok) {
                setStatus(data.message);
                await getAllCars();
            } else {
                console.log("Error deleting the car");
                setStatus(data.error || "Failed to delete the car");
            }
        } catch (error) {
            console.log("Error:", error);
            setStatus("Something went wrong!");
        } finally {
            setLoading(false);
            setRemovingCarId(null);
        }
    };

    return (
        <div className='container'>
            <BeatLoader className={`${loading ? "" : "invisible"} text-center`} color="blue" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {!carList && repeat.map((_, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <img
                            src="/assets/all-images/car-loading.jpg"
                            alt="Car"
                            className="w-full h-48 object-cover"
                        />
                    </div>
                ))}

                {carList && carList.map((car) => (
                    <div key={car._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <img
                            src={car.imageUrl}
                            alt="Car"
                            className="w-full h-48 object-cover"
                        />
                        <div className="h-[200px] p-6 flex flex-col justify-between">
                            <h2 className="text-xl font-semibold mb-2">{car.title}</h2>
                            <p className="text-gray-700 mb-4">Price per hour: ${car.price}</p>
                            {pathname === '/manager-dashboard' ?
                                <button onClick={() => handleRemoveCar(car._id)} disabled={removingCarId === car._id} className="text-center mx-auto bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full">
                                    {removingCarId === car._id ? "Removing..." : "Remove this Car"}
                                </button> :
                                <Link href={"/booking/" + car._id} className="text-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full">
                                    Book Now
                                </Link>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CarList