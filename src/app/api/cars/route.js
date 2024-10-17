import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const MONGO_URI = process.env.MONGO_URI;

export async function GET(req, res) {
    const client = new MongoClient(MONGO_URI);

    try {
        await client.connect();

        const database = client.db("crs");
        const collection = database.collection("cars");

        const cars = await collection.find({}).toArray();

        return NextResponse.json({
            message: 'Cars fetched successfully!',
            cars: cars,
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            error: 'Server error!'
        }, { status: 500 });
    } finally {
        await client.close();
    }
}

export async function POST(req, res) {
    const client = new MongoClient(MONGO_URI);

    try {
        await client.connect();
        const car = await req.json();
        console.log(car);

        const database = client.db("crs");
        const collection = database.collection("cars");

        await collection.insertOne(car);

        return NextResponse.json({
            message: 'New car added successfully!'
        }, { status: 201 });
    } catch (error) {
        return NextResponse.json({
            error: 'Server error!'
        }, { status: 500 });
    } finally {
        await client.close();
    }
}