import { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";

const OTPForm = ({ booking }) => {
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState("");

    useEffect(() => {
        if (otp.length > 0 && !/^\d+$/.test(otp)) {
            setError("Please enter numbers only");
        } else if (otp.length > 4) {
            setError("Please enter a valid code");
        } else {
            setError("");
        }
    }, [otp]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(otp);
        if (otp.length !== 4) {
            setError("Please enter a 4-digit OTP");
            return;
        }
        setIsSubmitting(true);
        try {
            const res = await fetch(`/api/validate-otp?_id=${booking._id}&otp=${otp}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await res.json();
            console.log(data);
            if (res.ok) {
                setStatus(data.message);
            } else {
                console.log("Some Error Occurred!");
                setStatus("Something went wrong!");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="grid grid-cols-4 gap-2 mt-4">
                <input
                    type="number"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className={`col-span-3 w-full px-4 py-3 text-lg font-mono tracking-widest text-center rounded-lg border-2 ${error ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-blue-500"} outline-none transition-all duration-300 shadow-sm focus:ring-2 focus:ring-blue-200`}
                    maxLength="4"
                    placeholder="Journey Code"
                    aria-label="Enter 4-digit OTP"
                    aria-invalid={error ? "true" : "false"}
                    aria-describedby="otp-error"
                />
                <button
                    type="submit"
                    disabled={isSubmitting || error || otp.length !== 4}
                    className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg text-white font-semibold transition-all duration-300 ${isSubmitting || error || otp.length !== 4 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 active:scale-[0.98] hover:shadow-lg"}`}
                    aria-label="Submit OTP"
                >
                    {isSubmitting ? (
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                        <>
                            Submit
                            <FaArrowRight className="text-sm" />
                        </>
                    )}
                </button>
            </form>
            {error && (
                <p
                    className="text-red-500 text-sm mt-1 transition-all duration-300"
                    id="otp-error"
                    role="alert"
                >
                    {error}
                </p>
            )}
            {status && (
                <p
                    className="text-blue-500 text-sm mt-1 transition-all duration-300"
                    id="otp-status"
                    role="alert"
                >
                    {status}
                </p>
            )}
        </>
    );
};

export default OTPForm;