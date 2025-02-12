import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { FaMusic, FaEye, FaEyeSlash } from "react-icons/fa";
import { resetPasswordApi } from "../service/user";

function ResetPassword() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token") || "";

    const [formData, setFormData] = useState({
        token: token,
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    };

    const validate = () => {
        let errors = {};
        if (!formData.password) {
            errors.password = "please enter your new password";
        } else if (formData.password.length < 6) {
            errors.password = "password must be at least 6 characters";
        }
        if (!formData.confirmPassword) {
            errors.confirmPassword = "please confirm your new password";
        } else if (formData.confirmPassword !== formData.password) {
            errors.confirmPassword = "passwords do not match";
        }
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validate();
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }
        try {
            const { data, token } = await resetPasswordApi({
                token: formData.token,
                password: formData.password,
            });
            setMessage("password has been reset successfully");
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (error) {
            setErrors({ error: error.msg });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-red-800 to-pink-600 p-4">
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-8">
                <div className="flex justify-center mb-6">
                    <FaMusic className="text-red-600 text-4xl" />
                </div>
                <h2 className="text-3xl font-bold text-center mb-4">
                    Reset Password
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
                        <label className="block text-gray-700">
                            New Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="mt-1 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
                                placeholder="Enter new password"
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
                            Confirm New Password
                        </label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="mt-1 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
                                placeholder="Confirm new password"
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
                    <button
                        type="submit"
                        className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-700"
                    >
                        Reset Password
                    </button>
                </form>
                {message && (
                    <p className="text-green-600 text-center mt-4">{message}</p>
                )}
                <div className="mt-4 text-center text-sm">
                    <Link to="/login" className="text-red-600 hover:underline">
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;
