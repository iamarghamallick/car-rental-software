import Razorpay from 'razorpay';
import { NextRequest, NextResponse } from 'next/server';

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(req, res) {
    const data = await req.json();
    console.log(data);

    const options = {
        amount: parseInt(data.amount),
        currency: data.currency,
        receipt: 'rcp#1',
        payment_capture: 1
    };

    try {
        const order = await razorpay.orders.create(options);
        console.log(order);

        return NextResponse.json({
            orderId: order.id
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            error: error,
            orderId: ''
        }, { status: 500 });
    }
}
