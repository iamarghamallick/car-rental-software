import { NextResponse } from 'next/server';
import connectMongo from '../../lib/mongodb';
import User from '../../models/User';
import bcrypt from 'bcryptjs';

export async function POST(req, res) {
    await connectMongo();
    const { name, email, password, userType } = req.json();
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return NextResponse.json({
                message: 'User already exists'
            }, { status: 400 });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            userType,
        });

        await newUser.save();
        return NextResponse.json({
            message: 'User created successfully'
        }, { status: 201 });
    } catch (error) {
        return NextResponse.json({
            error: 'Server error'
        }, { status: 500 });
    }
}