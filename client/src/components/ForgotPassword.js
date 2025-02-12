import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaMusic } from "react-icons/fa";
import { forgotPasswordApi } from "../service/user";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            setError("Please enter your email");
            return;
        }
        setError("");
        try {
            const { data, result } = await forgotPasswordApi({ email });
            setMessage("password reset link sent via email ,please check");
        } catch (err) {
            setError(err.msg);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-800 to-teal-600 p-4">
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-8">
                <div className="flex justify-center mb-6">
                    <FaMusic className="text-green-600 text-4xl" />
                </div>
                <h2 className="text-3xl font-bold text-center mb-4">
                    Forgot Password
                </h2>
                <form
                    onSubmit={handleSubmit}
                    className="bg-blue-50 p-6 rounded"
                >
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
                            placeholder="Enter your email"
                        />
                        {error && (
                            <p className="text-red-500 text-sm mt-1">{error}</p>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
                    >
                        Submit
                    </button>
                </form>
                {message && (
                    <p className="text-green-600 text-center mt-4">{message}</p>
                )}
                <div className="mt-4 text-center text-sm">
                    <Link
                        to="/login"
                        className="text-green-600 hover:underline"
                    >
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
