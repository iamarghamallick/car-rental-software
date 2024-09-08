import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const MONGO_URI = 'mongodb+srv://argha:argha@clustercrs.aeb0l.mongodb.net/?retryWrites=true&w=majority&appName=ClusterCRS';

export async function POST(req, res) {
    const client = new MongoClient(MONGO_URI);

    try {
        await client.connect();
        const user = await req.json();
        console.log(user);

        const database = client.db("customer_data_db");
        const collection = database.collection("customer_data_collection");

        const userExists = await collection.findOne({ email: user.email });
        if (userExists) {
            return NextResponse.json({
                error: 'User already exists!'
            }, { status: 400 });
        }

        await collection.insertOne(user);

        return NextResponse.json({
            message: 'New Customer created successfully!'
        }, { status: 201 });
    } catch (error) {
        return NextResponse.json({
            error: 'Server error!'
        }, { status: 500 });
    }
}