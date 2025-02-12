// src/Signup.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaMusic, FaEye, FaEyeSlash } from "react-icons/fa";
import { signupApi } from "../service/user";
import { useAuth } from "./context/auth";

function Signup() {
    // manage state for form related data usign useState
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        agree: false,
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();
    const { setToken } = useAuth();

    // In this handler handle input changes and setErrors and setting formData
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
        setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    };

    // validate fields and return error with message
    const validate = () => {
        let errors = {};
        if (!formData.name.trim()) {
            errors.name = "Full name is required";
        }
        if (!formData.email.trim()) {
            errors.email = "Email is required";
        } else {
            // maintain a regecCheck pattern for validation
            const emailRegexCheck = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
            if (!emailRegexCheck.test(formData.email)) {
                errors.email = "Invalid email address.";
            }
        }
        if (!formData.password) {
            errors.password = "Password is required";
        } else if (formData.password.length < 6) {
            errors.password = "Password must be at least 6 characters";
        }
        if (!formData.confirmPassword) {
            errors.confirmPassword = "Please confirm your password";
        } else if (formData.confirmPassword !== formData.password) {
            errors.confirmPassword = "Passwords do not match";
        }
        if (!formData.agree) {
            errors.agree = "You must agree to the Terms & Conditions";
        }
        return errors;
    };

    // in this form submission handle  and also call the signup api and setting error if error occur
    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validate();
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }
        try {
            const { data, result } = await signupApi({
                name: formData.name,
                email: formData.email,
                password: formData.password,
            });

            alert("user signup successful,Welcome message sent to your email");
            setToken(data?.token);
            navigate("/login");
        } catch (error) {
            console.log(error);
            setErrors({
                error: error.msg,
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-700 to-teal-500 p-4">
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-8">
                <div className="flex justify-center mb-6">
                    <FaMusic className="text-blue-600 text-4xl" />
                </div>
                <h2 className="text-3xl font-bold text-center mb-4">
                    MelodyVerse Signup
                </h2>
                {errors.error && (
                    <p className="text-red-500 text-center mb-4">
                        {errors.error}
                    </p>
                )}
                <form
                    onSubmit={handleSubmit}
                    className="bg-green-50 p-6 rounded"
                >
                    <div className="mb-4">
                        <label className="block text-gray-700">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                            placeholder="Enter your full name"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.name}
                            </p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                            placeholder="Enter your email"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email}
                            </p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="mt-1 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                                placeholder="Enter your password"
                            />
                            <div
                                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <FaEyeSlash className="text-gray-600" />
                                ) : (
                                    <FaEye className="text-gray-600" />
                                )}
                            </div>
                        </div>
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password}
                            </p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="mt-1 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                                placeholder="Confirm your password"
                            />
                            <div
                                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                onClick={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                }
                            >
                                {showConfirmPassword ? (
                                    <FaEyeSlash className="text-gray-600" />
                                ) : (
                                    <FaEye className="text-gray-600" />
                                )}
                            </div>
                        </div>
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.confirmPassword}
                            </p>
                        )}
                    </div>
                    <div className="flex items-center mb-4">
                        <input
                            type="checkbox"
                            name="agree"
                            checked={formData.agree}
                            onChange={handleChange}
                            id="agree"
                            className="mr-2"
                        />
                        <label htmlFor="agree" className="text-gray-700">
                            I agree to the Terms &amp; Conditions
                        </label>
                    </div>
                    {errors.agree && (
                        <p className="text-red-500 text-sm mb-4">
                            {errors.agree}
                        </p>
                    )}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                    >
                        Sign Up
                    </button>
                </form>
                <div className="mt-4 text-center text-sm">
                    Already have an account?
                    <Link to="/login" className="text-blue-600 hover:underline">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Signup;
