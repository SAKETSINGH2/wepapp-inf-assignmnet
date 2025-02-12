import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaMusic, FaEye, FaEyeSlash } from "react-icons/fa";
import { loginApi } from "../service/user";
import { useAuth } from "./context/auth";

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false,
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { setToken } = useAuth();

    useEffect(() => {
        const rememberedEmail = localStorage.getItem("melodyverse_user");
        if (rememberedEmail) {
            setFormData({
                email: rememberedEmail,
                password: "",
                rememberMe: true,
            });
        }
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
        setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let errors = {};

        if (!formData.email) {
            errors.email = "Please enter your email";
        }
        if (!formData.password) {
            errors.password = "Please enter your password";
        } else if (formData.password.length < 6) {
            errors.password = "Password must be at least 6 characters.";
        }
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        try {
            const { data } = await loginApi({
                nameOrEmail: formData.email || formData.name,
                password: formData.password,
            });

            if (formData.rememberMe) {
                localStorage.setItem("melodyverse_user", formData.email);
            } else {
                localStorage.removeItem("melodyverse_user");
            }
            setErrors({});
            setToken(data?.token);
            navigate("/home");
        } catch (error) {
            setErrors({
                error: error.msg,
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-800 to-pink-600 p-4">
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-8">
                <div className="flex justify-center mb-6">
                    <FaMusic className="text-purple-600 text-4xl" />
                </div>
                <h2 className="text-3xl font-bold text-center mb-4">
                    MelodyVerse Login
                </h2>
                {errors.error && (
                    <p className="text-red-500 text-center mb-4">
                        {errors.error}
                    </p>
                )}
                <form
                    onSubmit={handleSubmit}
                    className="bg-blue-50 p-6 rounded"
                >
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
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
                                className="mt-1 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
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
                    <div className="flex items-center mb-4">
                        <input
                            type="checkbox"
                            name="rememberMe"
                            checked={formData.rememberMe}
                            onChange={handleChange}
                            id="rememberMe"
                            className="mr-2"
                        />
                        <label htmlFor="rememberMe" className="text-gray-700">
                            Remember Me
                        </label>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700"
                    >
                        Login
                    </button>
                </form>
                <div className="mt-4 flex justify-between text-sm">
                    <Link
                        to="/forgot_password"
                        className="text-purple-600 hover:underline"
                    >
                        Forgot Password?
                    </Link>
                    <Link
                        to="/signup"
                        className="text-purple-600 hover:underline"
                    >
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
