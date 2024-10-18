"use client"
import BookingForm from '@/components/BookingForm';
import CarDetails from '@/components/CarDetails';
import { verifyToken } from '@/utils/auth';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { BeatLoader } from 'react-spinners';

const Page = ({ params }) => {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");
    const [car, setCar] = useState(null);

    const route = useRouter();
    const [validUser, setValidUser] = useState(false);
    const [userId, setUserId] = useState(null);
    const [userdata, setUserdata] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const { valid, decodedToken, error } = verifyToken(token, "customer");
        if (!valid || error) {
            route.push('/login');
        } else {
            console.log(decodedToken);
            setUserId(decodedToken.user_data.id);
            setValidUser(true);
        }

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
                console.log(data);
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

        getCar();
        fetchUserDetails(decodedToken.user_data.id);
    }, [])

    return (
        <>
            {!validUser && <main className='flex flex-col min-h-screen items-center justify-center'>
                <h1 className='text-xl font-bold m-4'>Please wait a moment</h1>
                <BeatLoader color='blue' />
            </main>}

            {validUser && <section className='flex flex-col min-h-screen items-center justify-center'>
                {loading && <h1>Loading Car Details...</h1>}
                {car && userdata && <div className="max-w-6xl mx-auto p-6 my-6 grid grid-cols-1 md:grid-cols-2 gap-8 bg-white shadow-lg rounded-lg hover:shadow-2xl transition-shadow duration-300">
                    <CarDetails
                        user_id={userdata._id}
                        car_id={car._id}
                        title={car.title}
                        imageUrl={car.imageUrl}
                        fuel={car.fuel}
                        mileage={car.mileage}
                        space={car.space}
                        year={car.year}
                        price={car.price}
                    />
                    <BookingForm
                        user_id={userdata._id}
                        car_id={car._id}
                        title={car.title}
                        imageUrl={car.imageUrl}
                        fuel={car.fuel}
                        mileage={car.mileage}
                        space={car.space}
                        year={car.year}
                        price={car.price} />
                </div>}
            </section>}
        </>
    )
}

export default Page