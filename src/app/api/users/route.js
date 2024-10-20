import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

const MONGO_URI = process.env.MONGO_URI;

export async function GET(req, res) {
    const client = new MongoClient(MONGO_URI);

    try {
        await client.connect();

        const database = client.db("crs");
        const collection = database.collection("users");

        const { searchParams } = new URL(req.url);
        const _id = searchParams.get('_id');

        if (_id) {
            const user = await collection.findOne({ _id: new ObjectId(_id) });

            if (!user) {
                return NextResponse.json({
                    error: 'User not found',
                }, { status: 404 });
            }

            return NextResponse.json({
                message: 'User Details fetched successfully',
                user: user,
            }, { status: 200 });
        } else {
            return NextResponse.json({
                message: 'User not found',
            }, { status: 404 });
        }
    } catch (error) {
        return NextResponse.json({
            error: 'Server error! ' + error,
        }, { status: 500 });
    } finally {
        await client.close();
    }
}

export async function PUT(req) {
    const client = new MongoClient(MONGO_URI);

    try {
        await client.connect();

        const database = client.db("crs");
        const collection = database.collection("users");

        const body = await req.json();
        const { _id, ...updateData } = body;

        if (_id && ObjectId.isValid(_id)) {
            const result = await collection.updateOne(
                { _id: new ObjectId(_id) },
                { $set: updateData }
            );

            if (result.matchedCount === 0) {
                return NextResponse.json({
                    error: 'User not found',
                }, { status: 404 });
            }

            return NextResponse.json({
                message: 'User updated successfully',
                updatedCount: result.modifiedCount,
            }, { status: 200 });
        } else {
            return NextResponse.json({
                message: 'Invalid or missing user ID',
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