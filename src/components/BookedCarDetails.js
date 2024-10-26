import React, { useState } from "react";
import OTPForm from "./OTPForm";
import { capitalize } from "@/utils/utility";

const BookedCarDetails = ({ userdata, booking, carDetails }) => {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");

    const handlePayment = async (booking, userdata) => {
        console.log(booking, userdata);
        setLoading(true);
        try {
            const res = await fetch('/api/bookings', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...booking, status: "completed" }),
            });
            const data = await res.json();
            if (res.ok) {
                setStatus(data.message);
                console.log(data);
                window.location.reload();
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
                {userdata.userType === "driver" && <div>
                    {booking.status === "active" && <OTPForm booking={booking} />}
                    {booking.status === "journey started" && <p className='bg-slate-200 text-lg w-full text-center p-2 rounded-lg font-semibold mt-4'>{capitalize(booking.status)}</p>}
                    {booking.status === "journey started" && <p className='bg-yellow-500 text-white text-lg w-full text-center p-2 rounded-lg font-semibold mt-4'>Pending Payment</p>}
                    {booking.status === "completed" && <p className='bg-green-500 text-white text-lg w-full text-center p-2 rounded-lg font-semibold mt-4'>Payment Done</p>}
                </div>}

                {userdata.userType === "customer" && booking.otp !== "0" && <div>
                    {booking.status === "active" && <h1 className="bg-slate-200 text-2xl w-full text-center p-2 rounded-lg font-semibold mt-4">{booking.otp}</h1>}
                    {booking.status === "active" && <p className='bg-slate-200 text-lg w-full text-center p-2 rounded-lg font-semibold mt-2'>Share this Journey Code with Driver</p>}
                    {booking.status === "journey started" && <p className='bg-slate-200 text-lg w-full text-center p-2 rounded-lg font-semibold mt-4'>{capitalize(booking.status)}</p>}
                    {booking.status === "journey started" && <button onClick={() => handlePayment(booking, userdata)} className='bg-green-600 text-white text-lg w-full text-center p-2 rounded-lg font-semibold mt-4'>{loading ? "Loading..." : "Make Payment"}</button>}
                </div>}
                {userdata.userType === "customer" && booking.otp === "0" && <div>
                    {booking.status === "active" && <p className='bg-slate-200 text-lg w-full text-center p-2 rounded-lg font-semibold mt-2'>Waiting for a driver...</p>}
                </div>}
                {booking.status === "completed" && <div>
                    <p className='bg-green-600 text-white text-lg w-full text-center p-2 rounded-lg font-semibold mt-4'>Journey Completed</p>
                </div>}
            </div>
        </div>
    );
};

export default BookedCarDetails;
