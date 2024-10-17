"use client"
import BookingForm from '@/components/BookingForm';
import CarDetails from '@/components/CarDetails';
import React, { useEffect, useState } from 'react'

const Page = ({ params }) => {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");
    const [car, setCar] = useState(null);

    useEffect(() => {
        const getCar = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/cars?_id=${params.slug}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await res.json();
                if (res.ok) {
                    setCar(data.car);
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
        getCar();
    }, [])
    return (
        <section className='flex flex-col min-h-screen items-center justify-center'>
            {loading && <h1>Loading Car Details...</h1>}
            {car && <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8 bg-white shadow-lg rounded-lg hover:shadow-2xl transition-shadow duration-300">
                <CarDetails
                    title={car.title}
                    imageUrl={car.imageUrl}
                    fuel={car.fuel}
                    mileage={car.mileage}
                    space={car.space}
                    year={car.year}
                    price={car.price}
                />
                <BookingForm
                    title={car.title}
                    imageUrl={car.imageUrl}
                    fuel={car.fuel}
                    mileage={car.mileage}
                    space={car.space}
                    year={car.year}
                    price={car.price} />
            </div>}
        </section>
    )
}

export default Page