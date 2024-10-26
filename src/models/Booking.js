import { LatLng } from "leaflet";
import mongoose from "mongoose";
import { CustomerUser, DriverUser } from "./User";
import { Car } from "./Car";

const BookingSchema = new mongoose.Schema({
    user_id: { type: _id, required: true }, // customer_id
    car_id: { type: _id, required: true },
    driver_id: { type: _id, required: false, default: '' },
    origin: {
        locationName: { type: String, required: true },
        latlng: { type: LatLng, required: true }, // { lat: '', lng: '' }
    },
    dest: {
        locationName: { type: String, required: true },
        latlng: { type: LatLng, required: true }, // { lat: '', lng: '' }
    },
    date: { type: Date, required: true },
    time: { type: Time, required: true },
    distance: { type: Number, required: true, default: 0 }, // in km
    fare: { type: Number, required: true, default: 0 }, // in INR
    status: { type: String, required: false, default: 'active', value: "active" || "journey started" || "cancelled" },
    otp: { type: Number, required: false, default: 0, length: 4 },
    carDetails: { type: Car, required: true },
    customerDetails: { type: CustomerUser, required: true },
    driverDetails: { type: DriverUser, required: false, default: {} },
})

export const Booking = mongoose.model.BookingSchema || mongoose.model('Booking', BookingSchema);