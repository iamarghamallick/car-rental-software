import React, { useEffect, useState } from 'react'
import { MapModal } from './Map';
import { useRouter } from 'next/navigation';

const BookingForm = ({ user_id, car_id, title, imageUrl, fuel, mileage, space, year, price }) => {
    const GRAPHHOPPER_API_KEY = process.env.NEXT_PUBLIC_GRAPHHOPPER_API_KEY;

    const [newBooking, setNewBooking] = useState({
        user_id: user_id,
        car_id: car_id,
        driver_id: '',
        origin: { locationName: '', latlng: null },
        dest: { locationName: '', latlng: null },
        date: '',
        time: '',
        distance: 0,
        fare: 0,
        status: 'active',
        otp: "0",
        carDetails: {},
        customerDetails: {},
        driverDetails: {},
        paymentDetails: {
            paymentData: {},
            orderData: {},
        },
    });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");
    const [origin, setOrigin] = useState({ latlng: null, name: '' });
    const [destination, setDestination] = useState({ latlng: null, name: '' });
    const [isOriginModalOpen, setIsOriginModalOpen] = useState(false);
    const [isDestinationModalOpen, setIsDestinationModalOpen] = useState(false);
    const router = useRouter();

    const handleOriginSelect = (location) => {
        setOrigin(location);
        setNewBooking({ ...newBooking, origin: { locationName: origin.name, latlng: origin.latlng } })
        setIsOriginModalOpen(false);
    };

    const handleDestinationSelect = (location) => {
        setDestination(location);
        setNewBooking({ ...newBooking, dest: { locationName: destination.name, latlng: destination.latlng } })
        setIsDestinationModalOpen(false);
    };

    const calculateDistanceAndFare = async () => {
        if (!newBooking.origin.latlng || !newBooking.dest.latlng)
            return;

        const originLatLng = `${newBooking.origin.latlng.lat},${newBooking.origin.latlng.lng}`;
        const destinationLatLng = `${newBooking.dest.latlng.lat},${newBooking.dest.latlng.lng}`;

        const url = `https://graphhopper.com/api/1/route?point=${originLatLng}&point=${destinationLatLng}&key=${GRAPHHOPPER_API_KEY}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.paths && data.paths.length > 0) {
                const distance = (data.paths[0].distance / 1000).toFixed(0);
                const fare = distance * price;
                console.log(`Distance by road: ${distance} km and fare ${fare}`);
                setNewBooking({ ...newBooking, distance: distance, fare: fare });
                setStatus("");
            } else {
                console.error('No routes found');
                setStatus("No routes found");
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setStatus("Error fetching route");
        }
    }

    useEffect(() => {
        setNewBooking({ ...newBooking, origin: { locationName: origin.name, latlng: origin.latlng } })
    }, [origin.latlng]);

    useEffect(() => {
        setNewBooking({ ...newBooking, dest: { locationName: destination.name, latlng: destination.latlng } })
    }, [destination.latlng]);

    useEffect(() => {
        calculateDistanceAndFare();
    }, [newBooking.origin.latlng, newBooking.dest.latlng]);

    const getCustomerDetails = async (_id) => {
        const res = await fetch(`/api/users?_id=${_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();
        return data.user;
    }

    const getCarDetails = async (_id) => {
        const res = await fetch(`/api/cars?_id=${_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();
        return data.car;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(newBooking);
        setLoading(true);

        try {
            const carDetails = await getCarDetails(newBooking.car_id);
            const customerDetails = await getCustomerDetails(newBooking.user_id);

            setNewBooking({
                ...newBooking,
                carDetails: carDetails,
                customerDetails: customerDetails
            });

            const res = await fetch('/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...newBooking,
                    carDetails: carDetails,
                    customerDetails: customerDetails
                }),
            });
            const data = await res.json();
            if (res.ok) {
                setStatus(data.message);
                setNewBooking({
                    user_id: user_id,
                    car_id: car_id,
                    driver_id: '',
                    origin: { locationName: '', latlng: null },
                    dest: { locationName: '', latlng: null },
                    date: '',
                    time: '',
                    distance: 0,
                    fare: 0,
                    status: 'active',
                    otp: "0",
                    carDetails: {},
                    customerDetails: {},
                    driverDetails: {},
                    paymentDetails: {
                        paymentData: {},
                        orderData: {},
                    },
                });
                console.log(data);
            } else {
                console.log("Some Error Occured!");
                setStatus("Something went wrong!");
            }
        } catch (error) {
            console.log("Error:", error);
            setStatus("Something went wrong!");
        } finally {
            setLoading(false);
            router.push('/my-bookings');
        }
    };

    return (
        <div className="p-6 bg-gray-50 rounded-lg shadow-inner">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">{status ? status : "Rent This Car"}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className='grid grid-cols-2 gap-4 border-b-2 pb-4'>
                    <div className='flex flex-col items-center gap-y-2 pr-2 border-r-2'>
                        <button className='bg-blue-500 p-2 rounded-lg text-white font-semibold' onClick={() => setIsOriginModalOpen(true)}>Select Origin</button>
                        <span className='text-center'>{origin.name ? `${origin.name}` : "Not Selected"}</span>
                        <span className='text-center'>{origin.latlng ? `[${origin.latlng.lat}, ${origin.latlng.lng}]` : ""}</span>
                    </div>
                    <div className='flex flex-col items-center gap-y-2 pl-2 border-l-2'>
                        <button className='bg-blue-500 p-2 rounded-lg text-white font-semibold' onClick={() => setIsDestinationModalOpen(true)}>Select Destination</button>
                        <span className='text-center'>{destination.name ? `${destination.name}` : "Not Selected"}</span>
                        <span className='text-center'>{destination.latlng ? `[${destination.latlng.lat}, ${destination.latlng.lng}]` : ""}</span>
                    </div>
                    {/* Origin Modal */}
                    {isOriginModalOpen && (
                        <MapModal
                            onSelectLocation={handleOriginSelect}
                            title="Select Origin Location"
                            onClose={() => setIsOriginModalOpen(false)}
                        />
                    )}

                    {/* Destination Modal */}
                    {isDestinationModalOpen && (
                        <MapModal
                            onSelectLocation={handleDestinationSelect}
                            title="Select Destination Location"
                            onClose={() => setIsDestinationModalOpen(false)}
                        />
                    )}
                </div>
                <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                    <input
                        type="date"
                        id="date"
                        value={newBooking.date}
                        onChange={(e) => setNewBooking({ ...newBooking, date: e.target.value })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label>
                    <input
                        type="time"
                        id="time"
                        value={newBooking.time}
                        onChange={(e) => setNewBooking({ ...newBooking, time: e.target.value })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="distance" className="block text-sm font-medium text-gray-700">Distance (in km)</label>
                    <input
                        type="number"
                        id="distance"
                        value={newBooking.distance || 0}
                        readOnly
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-200"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="fare" className="block text-sm font-medium text-gray-700">Fare</label>
                    <input
                        type="text"
                        id="fare"
                        value={`₹${newBooking.fare || 0}`}
                        readOnly
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-200"
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                        {loading ? "In Progress..." : "Confirm Booking"}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default BookingForm