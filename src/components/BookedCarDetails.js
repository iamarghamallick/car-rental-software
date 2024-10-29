import React, { useRef, useState } from "react";
import OTPForm from "./OTPForm";
import { capitalize } from "@/utils/utility";
import Script from "next/script";
import PaymentDetailsModal from "./PaymentDetailsModal";
import FullPageLoader from "./FullPageLoader";

const BookedCarDetails = ({ userdata, booking, carDetails }) => {
    const [loading, setLoading] = useState(false);
    const [fullPageLoading, setFullPageLoading] = useState(false);
    const [status, setStatus] = useState("");
    const [paymentModalOpen, setPaymentModalOpen] = useState(false);
    const orderRef = useRef();

    const handlePostPayment = async (booking, userdata, paymentData, orderData) => {
        console.log(booking, userdata);
        setLoading(true);
        setFullPageLoading(true);
        try {
            const orderRes = await fetch('/api/order', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ orderId: orderData.id }),
            });
            const updatedOrderData = await orderRes.json();
            console.log(updatedOrderData);

            const res = await fetch('/api/bookings', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...booking, status: "completed", paymentDetails: { paymentData: paymentData, orderData: updatedOrderData.order } }),
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

    const createOrderId = async (booking) => {
        try {
            const response = await fetch("/api/order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    amount: parseInt(booking.fare) * 100,
                    currency: 'INR',
                }),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            console.log(data.order);
            orderRef.current = data.order;
            return;
        } catch (error) {
            console.error("There was a problem with your fetch operation:", error);
        }
    };

    const processPayment = async (booking, userdata) => {
        setLoading(true);
        await createOrderId(booking);
        const orderData = orderRef.current;
        const orderId = orderData.id;
        console.log(orderId);
        try {
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: parseFloat(booking.fare),
                currency: "INR",
                name: "WeDrive",
                description: "Demo Payment",
                order_id: orderId,
                handler: async function (response) {
                    const paymentData = {
                        orderCreationId: orderId,
                        razorpayPaymentId: response.razorpay_payment_id,
                        razorpayOrderId: response.razorpay_order_id,
                        razorpaySignature: response.razorpay_signature,
                    };

                    const result = await fetch("/api/verify", {
                        method: "POST",
                        body: JSON.stringify(paymentData),
                        headers: { "Content-Type": "application/json" },
                    });
                    const res = await result.json();

                    if (res.isOk) {
                        setFullPageLoading(true);
                        await handlePostPayment(booking, userdata, paymentData, orderData);
                    }
                    else alert(res.message);
                },
                theme: {
                    color: "#3399cc",
                },
            };
            const paymentObject = new window.Razorpay(options);
            paymentObject.on("payment.failed", function (response) {
                alert(response.error.description);
            });
            setLoading(false);
            paymentObject.open();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const openPaymentModal = () => setPaymentModalOpen(true);
    const closePaymentModal = () => setPaymentModalOpen(false);

    return (
        <>
            <Script
                id="razorpay-checkout-js"
                src="https://checkout.razorpay.com/v1/checkout.js"
            />

            {fullPageLoading && <FullPageLoader status="Just a moment... do not refresh this page." />}

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
                        {booking.status === "completed" && <p className='bg-green-500 text-white text-lg w-full text-center p-2 rounded-lg font-semibold mt-4'>Payment Completed</p>}
                    </div>}

                    {userdata.userType === "customer" && booking.otp !== "0" && <div>
                        {booking.status === "active" && <h1 className="bg-slate-200 text-2xl w-full text-center p-2 rounded-lg font-semibold mt-4">{booking.otp}</h1>}
                        {booking.status === "active" && <p className='bg-slate-200 text-lg w-full text-center p-2 rounded-lg font-semibold mt-2'>Share this Journey Code with Driver</p>}
                        {booking.status === "journey started" && <p className='bg-slate-200 text-lg w-full text-center p-2 rounded-lg font-semibold mt-4'>{capitalize(booking.status)}</p>}
                        {booking.status === "journey started" && <button onClick={() => processPayment(booking, userdata)} className='bg-green-600 text-white text-lg w-full text-center p-2 rounded-lg font-semibold mt-4'>{loading ? "Loading..." : "Make Payment"}</button>}
                        {booking.status === "completed" && <div className="flex justify-between items-center gap-2">
                            <p className='bg-green-500 text-white text-lg w-full text-center p-2 rounded-lg font-semibold mt-4'>Payment Completed</p>
                            <button onClick={openPaymentModal} className='bg-blue-500 text-white text-lg w-full text-center p-2 rounded-lg font-semibold mt-4'>View Details</button>
                            {paymentModalOpen &&
                                <PaymentDetailsModal
                                    isOpen={paymentModalOpen}
                                    onClose={closePaymentModal}
                                    paymentDetails={booking.paymentDetails}
                                />}
                        </div>}
                    </div>}
                    {userdata.userType === "customer" && booking.otp === "0" && <div>
                        {booking.status === "active" && <p className='bg-slate-200 text-lg w-full text-center p-2 rounded-lg font-semibold mt-2'>Waiting for a driver...</p>}
                    </div>}
                    {booking.status === "completed" && <div>
                        <p className='bg-green-600 text-white text-lg w-full text-center p-2 rounded-lg font-semibold mt-4'>Journey Completed</p>
                    </div>}
                </div>
            </div>
        </>
    );
};

export default BookedCarDetails;
