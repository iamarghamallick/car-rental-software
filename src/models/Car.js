import mongoose from "mongoose";

const CarSchema = new mongoose.Schema({
    title: { type: String, required: true },
    imageUrl: { type: URL, required: true },
    fule: { type: String, required: true, value: "diesel" || "petrol" || "electric" },
    milage: { type: Number, required: true }, // in km
    space: { type: Numer, required: true }, // seating capacity
    year: { type: String, required: true },
    price: { type: Number, required: true }, // price per hour
})

export const Car = mongoose.models.CarSchema || mongoose.model('Car', CarSchema);