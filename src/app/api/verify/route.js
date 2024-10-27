import { NextResponse } from 'next/server';
import crypto from 'crypto';

const generatedSignature = (razorpayOrderId, razorpayPaymentId) => {
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
        throw new Error('Razorpay key secret is not defined in environment variables.');
    }
    const sig = crypto
        .createHmac('sha256', keySecret)
        .update(`${razorpayOrderId}|${razorpayPaymentId}`)
        .digest('hex');
    return sig;
};

export async function POST(req, res) {
    try {
        const data = await req.json();
        console.log(data);

        // Generate the signature using the order and payment IDs
        const signature = generatedSignature(data.orderCreationId, data.razorpayPaymentId);

        // Check if the generated signature matches the received signature
        if (signature !== data.razorpaySignature) {
            return NextResponse.json(
                { message: 'Payment verification failed', isOk: false },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { message: 'Payment verified successfully', isOk: true },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error verifying payment:', error);
        return NextResponse.json(
            { message: 'Internal server error', error: error.message, isOk: false },
            { status: 500 }
        );
    }
}
