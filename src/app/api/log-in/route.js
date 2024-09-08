import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import jwt from 'jsonwebtoken';

const MONGO_URI = 'mongodb+srv://argha:argha@clustercrs.aeb0l.mongodb.net/?retryWrites=true&w=majority&appName=ClusterCRS';
const JWT_SECRET = 'adda_crs';

export async function POST(req, res) {
    const client = new MongoClient(MONGO_URI);

    try {
        await client.connect();
        const user = await req.json();

        const database = client.db("data_db");
        const collection = database.collection("data_collection");

        const userExists = await collection.findOne({ email: user.email });
        if (userExists) {
            if (userExists.password === user.password && userExists.userType === user.userType) {

                const payload = {
                    user_data: {
                        id: userExists._id,
                        email: user.email,
                        userType: user.userType
                    },
                };

                const jwt_token = await new Promise((resolve, reject) => {
                    jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
                        if (err) {
                            reject('Log in unsuccessful!');
                        } else {
                            resolve(token);
                        }
                    });
                });

                return NextResponse.json({
                    message: 'User found. Logged in successfully!',
                    token: jwt_token,
                }, { status: 200 });
            } else {
                return NextResponse.json({
                    message: 'Invalid credentials!',
                }, { status: 401 });
            }
        } else {
            return NextResponse.json({
                message: 'User not found!',
            }, { status: 404 });
        }
    } catch (error) {
        return NextResponse.json({
            error: 'Server error!',
        }, { status: 500 });
    } finally {
        await client.close();
    }
}
