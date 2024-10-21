import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

const MONGO_URI = process.env.MONGO_URI;

export async function GET(req, res) {
    const client = new MongoClient(MONGO_URI);

    try {
        await client.connect();

        const database = client.db("crs");
        const collection = database.collection("cars");

        const { searchParams } = new URL(req.url);
        const _id = searchParams.get('_id');

        if (_id) {
            const car = await collection.findOne({ _id: new ObjectId(_id) });

            if (!car) {
                return NextResponse.json({
                    error: 'Car not found',
                }, { status: 404 });
            }

            return NextResponse.json({
                message: 'Car fetched successfully',
                car: car,
            }, { status: 200 });
        } else {
            const cars = await collection.find({}).toArray();

            return NextResponse.json({
                message: 'Cars fetched successfully!',
                cars: cars,
            }, { status: 200 });
        }
    } catch (error) {
        return NextResponse.json({
            error: 'Server error! ' + error,
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

export async function DELETE(req, res) {
    const client = new MongoClient(MONGO_URI);

    try {
        await client.connect();

        const database = client.db("crs");
        const collection = database.collection("cars");

        const { searchParams } = new URL(req.url);
        const _id = searchParams.get('_id');

        if (_id) {
            const result = await collection.deleteOne({ _id: new ObjectId(_id) });

            if (result.deletedCount === 0) {
                return NextResponse.json({
                    error: 'Car not found',
                }, { status: 404 });
            }

            return NextResponse.json({
                message: 'Car deleted successfully',
            }, { status: 200 });
        } else {
            return NextResponse.json({
                error: 'Car ID is required to delete a car',
            }, { status: 400 });
        }
    } catch (error) {
        return NextResponse.json({
            error: 'Server error! ' + error,
        }, { status: 500 });
    } finally {
        await client.close();
    }
}
