import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

const MONGO_URI = process.env.MONGO_URI;

export async function POST(req, res) {
    const client = new MongoClient(MONGO_URI);

    try {
        await client.connect();

        const database = client.db("crs");
        const collection = database.collection("bookings");

        const { searchParams } = new URL(req.url);
        const _id = searchParams.get('_id');
        const otp = searchParams.get('otp');

        if (_id && otp) {
            const booking = await collection.findOne({ _id: new ObjectId(_id) });

            if (!booking) {
                return NextResponse.json({
                    error: 'Booking not found',
                }, { status: 404 });
            }

            if (booking.otp !== parseInt(otp, 10)) {
                return NextResponse.json({
                    error: 'Wrong Journey Code',
                }, { status: 404 });
            }

            // update booking status as "journey started"
            const result = await collection.updateOne(
                { _id: new ObjectId(_id) },
                { $set: { status: "journey started" } }
            );

            return NextResponse.json({
                message: 'Journey Started Successfully',
            }, { status: 200 });
        } else {
            return NextResponse.json({
                error: 'OTP or Booking ID not provided',
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