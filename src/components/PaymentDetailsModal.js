import React from "react";

const PaymentDetailsModal = ({ isOpen, onClose, paymentDetails }) => {
    if (!isOpen) return null;

    try {
        const {
            id,
            entity,
            amount,
            amount_paid,
            amount_due,
            currency,
            receipt,
            status,
            attempts,
            created_at,
        } = paymentDetails.orderData;

        const formatAmount = (amt) => `${currency} ${(amt / 100).toFixed(2)}`;
        const formatDate = (timestamp) =>
            new Date(timestamp * 1000).toLocaleString("en-GB", {
                dateStyle: "medium",
                timeStyle: "short",
            });

        return (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 space-y-6">
                    <h2 className="text-xl font-semibold text-gray-800 text-center">
                        Payment Details
                    </h2>
                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <span className="text-gray-500">Order ID:</span>
                            <span className="font-medium">{id}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Entity:</span>
                            <span className="font-medium capitalize">{entity}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Amount:</span>
                            <span className="font-medium">{formatAmount(amount)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Amount Paid:</span>
                            <span className="font-medium text-green-600">
                                {formatAmount(amount_paid)}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Amount Due:</span>
                            <span className="font-medium text-red-600">
                                {formatAmount(amount_due)}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Receipt:</span>
                            <span className="font-medium">{receipt}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Status:</span>
                            <span
                                className={`font-medium ${status === "paid" ? "text-green-600" : "text-red-600"
                                    }`}
                            >
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Attempts:</span>
                            <span className="font-medium">{attempts}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Created At:</span>
                            <span className="font-medium">{formatDate(created_at)}</span>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Close
                    </button>
                </div>
            </div>
        );

    } catch (error) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 space-y-6">
                    <h2 className="text-xl font-semibold text-gray-800 text-center">
                        Payment Details
                    </h2>
                    <p className="m-2 my-8 text-red-500 text-center">Failed to fetch your payment info. Please reach out to our customer support.</p>
                    <button
                        onClick={onClose}
                        className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Close
                    </button>
                </div>
            </div>
        );
    }
};

export default PaymentDetailsModal;
