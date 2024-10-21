import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const MONGO_URI = process.env.MONGO_URI;

export async function POST(req, res) {
    const client = new MongoClient(MONGO_URI);

    try {
        await client.connect();
        const user = await req.json();
        console.log(user);

        const database = client.db("crs");
        const collection = database.collection("users");

        const userExists = await collection.findOne({ email: user.email });
        if (userExists) {
            return NextResponse.json({
                error: 'User already exists!'
            }, { status: 400 });
        }

        await collection.insertOne(user);

        return NextResponse.json({
            message: 'New user created successfully!'
        }, { status: 201 });
    } catch (error) {
        return NextResponse.json({
            error: 'Server error!'
        }, { status: 500 });
    } finally {
        await client.close();
    }
}