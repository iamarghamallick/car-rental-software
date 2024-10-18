import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

const MONGO_URI = process.env.MONGO_URI;

// export async function GET(req, res) {
//     const client = new MongoClient(MONGO_URI);

//     try {
//         await client.connect();

//         const database = client.db("crs");
//         const collection = database.collection("cars");

//         const { searchParams } = new URL(req.url);
//         const _id = searchParams.get('_id');

//         if (_id) {
//             const car = await collection.findOne({ _id: new ObjectId(_id) });

//             if (!car) {
//                 return NextResponse.json({
//                     error: 'Car not found',
//                 }, { status: 404 });
//             }

//             return NextResponse.json({
//                 message: 'Car fetched successfully',
//                 car: car,
//             }, { status: 200 });
//         } else {
//             const cars = await collection.find({}).toArray();

//             return NextResponse.json({
//                 message: 'Cars fetched successfully!',
//                 cars: cars,
//             }, { status: 200 });
//         }
//     } catch (error) {
//         return NextResponse.json({
//             error: 'Server error! ' + error,
//         }, { status: 500 });
//     } finally {
//         await client.close();
//     }
// }

export async function POST(req, res) {
    const client = new MongoClient(MONGO_URI);

    try {
        await client.connect();
        const booking = await req.json();
        console.log(booking);

        const database = client.db("crs");
        const collection = database.collection("bookings");

        await collection.insertOne(booking);

        return NextResponse.json({
            message: 'New booking accepted successfully!'
        }, { status: 201 });
    } catch (error) {
        return NextResponse.json({
            error: 'Server error!'
        }, { status: 500 });
    } finally {
        await client.close();
    }
}